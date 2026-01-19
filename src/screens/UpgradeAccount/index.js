import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
  AppState,
} from 'react-native';
import {
  useIAP,
  ErrorCode,
  requestPurchase,
  presentCodeRedemptionSheetIOS,
  getAvailablePurchases,
  getActiveSubscriptions,
} from 'react-native-iap';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import ProfileHeader from '../../components/ProfileHeader';
import Colors from '../../constants/Colors';
import styles from './styles';
import SubscriptionSliders from './SubscriptionSliders';
import { FONT_SIZE_XXS, productIds } from '../../constants/Constants';
import { CustomText } from '../../components/global/CustomText';
import {
  setPlans,
  setIsPlanActive,
  setFirstTimeSubscribe,
  mySubscribedPlan,
  setSubscriptionPlan,
  setSelectedPlan,
} from '../../redux/slices/inAppPurchaseSlice';
import { updateUserSubscription, getUserSubscription as getFirebaseSubscription } from '../../api/firebase/firebase';
import { deepNormalize } from '../../constants/helpers/helperFunction';


const getSubscriptionDurationLabel = item => {
  // ✅ ANDROID: use billingPeriod from pricingPhases
  if (Platform.OS === 'android') {
    const period =
      item?.subscriptionOfferDetailsAndroid?.[0]?.pricingPhases
        ?.pricingPhaseList?.[0]?.billingPeriod;

    if (period === 'P1M') return '1 Month';
    if (period === 'P3M') return '3 Months';
    if (period === 'P6M') return '6 Months';
    if (period === 'P1Y') return '1 Year';
  }

  // ✅ iOS: use subscriptionPeriodNumberIOS + subscriptionPeriodUnitIOS
  const number = item?.subscriptionPeriodNumberIOS;
  const unit = item?.subscriptionPeriodUnitIOS;

  if (!number || !unit) return '';

  if (unit === 'month') {
    if (number === '1') return '1 Month';
    if (number === '3') return '3 Months';
    if (number === '6') return '6 Months';
    return `${number} Months`;
  }

  return `${number} ${unit}`;
};

const UpgradeAccount = ({ navigation, route }) => {
  const { title } = route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.users.users);

  const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] =
    React.useState(0);
  const [processing, setProcessing] = React.useState(false);
  const isPlanActive = useSelector(state => state.inAppPurchase.isPlanActive);
  const currentPlanId = useSelector(state => state.inAppPurchase.planId);

  const { 
    connected, 
    subscriptions, 
    fetchProducts, 
    finishTransaction,
    getActiveSubscriptions,
    getAvailablePurchases,
  } = useIAP(
    {
      onPurchaseSuccess: async purchase => {
        try {
          console.log('✅ Purchase successful:', purchase);
          console.log('✅ Current userInfo:', userInfo);
          
          const subscriptionPlan = {
            active: true,
            productId: purchase.productId || purchase.id,
            transactionDate: purchase.transactionDate || Date.now(),
            purchaseToken: purchase.purchaseToken || '',
            receipt: purchase?.transactionReceipt || '', // iOS receipt
            platform: Platform.OS,
            source: 'purchase',
            userID: userInfo?.id
          };

          // ✅ Get user ID - try multiple possible fields
          const userID = userInfo?.id || userInfo?.userID || userInfo?.uid;
          
          if (!userID) {
            console.error('❌ User ID not found. UserInfo:', userInfo);
            Alert.alert(
              'Error',
              'User information not found. Subscription purchased but not saved. Please restore purchases after logging in.',
            );
            setProcessing(false);
            return;
          }

          console.log('✅ Saving subscription to Firebase for userID:', userID);
          
          // ✅ store in firebase
          try {
            await updateUserSubscription(userID, subscriptionPlan);
            console.log('✅ Subscription saved to Firebase successfully');
          } catch (firebaseError) {
            console.error('❌ Error saving to Firebase:', firebaseError);
            Alert.alert(
              'Warning',
              'Purchase successful but failed to save. Please restore purchases.',
            );
          }

          // ✅ Save purchase data in redux
          // dispatch(mySubscribedPlan(purchase));
           dispatch(mySubscribedPlan(deepNormalize(purchase)));
          dispatch(
            setSubscriptionPlan({ planId: purchase.productId || purchase.id }),
          );
          dispatch(setIsPlanActive(true));
          dispatch(setFirstTimeSubscribe(true));

          // ✅ Finish transaction
          await finishTransaction({ purchase, isConsumable: false });

          Alert.alert('Success', 'Subscription Activated!');
          navigation.goBack();
        } catch (e) {
          console.log('onPurchaseSuccess error =>', e);
        } finally {
          setProcessing(false);
        }
      },

      onPurchaseError: error => {
        console.log('❌ Purchase failed:', error);
        setProcessing(false);

        if (error.code === ErrorCode.UserCancelled) {
          // User cancelled, no need to show error
          console.log('Purchase cancelled by user');
        } else if (error.code === ErrorCode.PaymentInvalid) {
          Alert.alert('Payment Error', 'Your payment method was declined. Please check your payment information and try again.');
        } else if (error.code === ErrorCode.ProductAlreadyOwned) {
          Alert.alert('Already Owned', 'You already own this subscription.');
        } else if (error.code === ErrorCode.E_NETWORK_ERROR) {
          Alert.alert('Network Error', 'Please check your internet connection and try again.');
        } else {
          Alert.alert('Purchase Failed', error.message || 'An error occurred during purchase. Please try again.');
        }
      },
    },
  );

  // ✅ Fetch subscriptions
  React.useEffect(() => {
    if (connected) {
      fetchProducts({ skus: productIds, type: 'subs' });
    }
  }, [connected]);

  // ✅ Save subscription plans list into redux
  React.useEffect(() => {
    if (Array.isArray(subscriptions) && subscriptions.length > 0) {
      dispatch(setPlans({ plans: subscriptions }));

      // default plan selection
      const defaultPlan = subscriptions[selectedSubscriptionIndex];
      if (defaultPlan?.id) {
        dispatch(setSelectedPlan(defaultPlan));
        dispatch(setSubscriptionPlan({ planId: defaultPlan.id }));
      }
    }
  }, [subscriptions]);

  const appStateRef = React.useRef(AppState.currentState);
  const [redeemStarted, setRedeemStarted] = React.useState(false);
  const beforeRedeemSubIdsRef = React.useRef(new Set());

  React.useEffect(() => {
    const sub = AppState.addEventListener('change', async nextState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        if (Platform.OS === 'android' && redeemStarted) {
          setRedeemStarted(false);

          // ✅ now user returned after redeem - check for NEW subscriptions
          const { activeSubs } = await refreshPurchases();

          // Filter to only NEW subscriptions that weren't there before
          const newSubs = (activeSubs || []).filter(
            sub => !beforeRedeemSubIdsRef.current.has(sub.productId || sub.id)
          );

          if (newSubs && newSubs.length > 0) {
            // New subscription found - user actually redeemed a code
            await handleSubscriptionFromRestore(newSubs);
          } else {
            // No new subscription - user closed without redeeming or code was invalid
            setProcessing(false);
            // Silent close - don't show error if they just didn't redeem
            if (!activeSubs || activeSubs.length === 0) {
              // No subscriptions at all - they might have tried but failed
              Alert.alert(
                'No Subscription Found',
                'No new subscription was found. If you redeemed a code, please verify it was valid.',
              );
            }
          }

          // Clear the ref
          beforeRedeemSubIdsRef.current.clear();
        }
      }
      appStateRef.current = nextState;
    });

    return () => sub.remove();
  }, [redeemStarted]);

  // ✅ select plan
  const onSubscriptioinPlanPress = (item, index) => {
    setSelectedSubscriptionIndex(index);
    dispatch(setSelectedPlan(item));
    dispatch(setSubscriptionPlan({ planId: item.id }));
  };

  const handleSubscription = async () => {
    try {
      if (!subscriptions?.length || processing) {
        if (processing) {
          Alert.alert('Processing', 'Please wait while your purchase is being processed.');
        }
        return;
      }

      const subscription = subscriptions[selectedSubscriptionIndex];
      if (!subscription?.id) {
        Alert.alert('Error', 'Invalid subscription plan selected.');
        return;
      }

      // ✅ Check if user already owns this subscription
      const selectedPlanId = subscription.id;
      
      // Check 1: Redux state - is there an active plan?
      if (isPlanActive && currentPlanId === selectedPlanId) {
        Alert.alert(
          'Already Subscribed',
          'You already have an active subscription for this plan. If you want to change your plan, please cancel your current subscription first.',
        );
        return;
      }

      // Check 2: Store purchases - check if subscription exists in store
      try {
        const [activeSubs, availablePurchases] = await Promise.all([
          getActiveSubscriptions(),
          getAvailablePurchases(),
        ]);

        // Combine both lists
        const allPurchases = [...(activeSubs || []), ...(availablePurchases || [])];
        
        // Check if selected plan is already owned
        const existingSubscription = allPurchases.find(
          purchase => (purchase.productId || purchase.id) === selectedPlanId
        );

        if (existingSubscription) {
          // User already owns this subscription - activate it instead
          Alert.alert(
            'Subscription Already Owned',
            'You already own this subscription. Would you like to restore it?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Restore',
                onPress: async () => {
                  setProcessing(true);
                  try {
                    await handleSubscriptionFromRestore([existingSubscription]);
                  } catch (e) {
                    setProcessing(false);
                    console.log('Restore error:', e);
                  }
                },
              },
            ],
          );
          return;
        }
      } catch (checkError) {
        console.warn('Error checking existing subscriptions:', checkError);
        // Continue with purchase if check fails
      }

      setProcessing(true);

      // Build request based on platform
      const purchaseRequest = {
        type: 'subs',
        request: {},
      };

      if (Platform.OS === 'ios') {
        // iOS subscription purchase
        purchaseRequest.request.apple = {
          sku: subscription.id,
        };
      } else if (Platform.OS === 'android') {
        // Android subscription purchase
        const offers = subscription.subscriptionOfferDetailsAndroid || [];
        purchaseRequest.request.google = {
          skus: [subscription.id],
          subscriptionOffers: offers.length > 0
            ? offers.map(offer => ({
              sku: subscription.id,
              offerToken: offer.offerToken,
            }))
            : [],
        };
      }

      await requestPurchase(purchaseRequest);
      // Note: onPurchaseSuccess/onPurchaseError will handle the result
    } catch (e) {
      console.log('handleSubscription error =>', e);
      setProcessing(false);
      
      // Handle specific error codes
      if (e.code === ErrorCode.ProductAlreadyOwned) {
        Alert.alert(
          'Already Owned',
          'You already own this subscription. Please restore your purchases if you need to reactivate it.',
        );
      } else {
        Alert.alert(
          'Purchase Error',
          e?.message || 'Failed to initiate purchase. Please try again.',
        );
      }
    }
  };

  const refreshPurchases = async () => {
    try {
      const [purchases, activeSubs] = await Promise.all([
        getAvailablePurchases(),
        getActiveSubscriptions(),
      ]);

      console.log('✅ Available purchases:', purchases);
      console.log('✅ Active subscriptions:', activeSubs);

      // Filter to only include our product IDs
      const filteredActiveSubs = (activeSubs || []).filter(sub =>
        productIds.includes(sub.productId || sub.id)
      );

      return {
        purchases: purchases || [],
        activeSubs: filteredActiveSubs.length > 0 ? filteredActiveSubs : (activeSubs || [])
      };
    } catch (e) {
      console.warn('Refresh purchases failed:', e);
      return { purchases: [], activeSubs: [] };
    }
  };

  const handleSubscriptionFromRestore = async (activeSubs = []) => {
    console.log('🔵 handleSubscriptionFromRestore called with:', activeSubs?.length || 0, 'subscriptions');
    try {
      if (!activeSubs?.length) {
        console.warn('⚠️ No active subscriptions provided to handleSubscriptionFromRestore');
        Alert.alert('Not Active', 'No active subscription found after redeem.');
        setProcessing(false);
        return;
      }
      
      console.log('✅ Processing subscription activation...');

      // Find the best matching subscription (prioritize our productIds)
      let latest = activeSubs.find(sub =>
        productIds.includes(sub.productId || sub.id)
      ) || activeSubs[0];

      console.log('✅ Restored subscription:', latest);
      console.log('✅ Current userInfo:', userInfo);

      // ✅ Get user ID - try multiple possible fields
      const userID = userInfo?.id || userInfo?.userID || userInfo?.uid;
      
      if (!userID) {
        console.error('❌ User ID not found. UserInfo:', userInfo);
        Alert.alert(
          'Error', 
          'User information not found. Please ensure you are logged in and try again.',
        );
        setProcessing(false);
        return;
      }

      console.log('✅ Saving subscription for userID:', userID);

      const subscriptionPlan = {
        active: true,
        productId: latest.productId || latest.id,
        transactionDate: latest.transactionDate || Date.now(),
        purchaseToken: latest.purchaseToken || '',
        receipt: latest.transactionReceipt || '',
        platform: Platform.OS,
        source: 'redeem_restore',
        userID: userInfo?.id
      };

      // ✅ Save to Firebase
      console.log('✅ Updating subscription in Firebase...');
      console.log('✅ Subscription plan data:', JSON.stringify(subscriptionPlan, null, 2));
      console.log('✅ UserID for Firebase:', userID);
      
      try {
        const result = await updateUserSubscription(userID, subscriptionPlan);
        console.log('✅ updateUserSubscription returned:', result);
        console.log('✅ Subscription saved to Firebase successfully');
        
        // ✅ Small delay to ensure Firebase has processed the write
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // ✅ Verify subscription was saved (for debugging)
        try {
          console.log('✅ Verifying subscription in Firebase for userID:', userID);
          const verifyRes = await getFirebaseSubscription(userID);
          console.log('✅ Verification result:', verifyRes);
          
          if (verifyRes?.success && verifyRes?.subscription?.active) {
            console.log('✅ Verified: Subscription is active in Firebase');
            console.log('✅ Subscription data:', JSON.stringify(verifyRes.subscription, null, 2));
          } else {
            console.warn('⚠️ Warning: Subscription not found in Firebase after save');
            console.warn('⚠️ Verification result:', verifyRes);
            Alert.alert(
              'Warning',
              'Subscription may not have been saved to Firebase. Please try restoring purchases.',
            );
          }
        } catch (verifyError) {
          console.error('❌ Error verifying subscription:', verifyError);
          console.error('❌ Verify error details:', JSON.stringify(verifyError, null, 2));
          Alert.alert(
            'Warning',
            'Could not verify subscription save. Please check Firebase manually.',
          );
        }
      } catch (firebaseError) {
        console.error('❌ Error saving to Firebase:', firebaseError);
        console.error('❌ Firebase error details:', JSON.stringify(firebaseError, null, 2));
        console.error('❌ Firebase error message:', firebaseError?.message);
        console.error('❌ Firebase error code:', firebaseError?.code);
        Alert.alert(
          'Error',
          `Failed to save subscription to Firebase: ${firebaseError?.message || 'Unknown error'}. Please try restoring purchases.`,
        );
        // Continue to update Redux even if Firebase fails
      }

      // ✅ Finish transaction if needed (for subscriptions)
      // Note: For restored subscriptions from getActiveSubscriptions(), 
      // the purchase object might not have an 'id' field - only 'productId'
      // So we need to construct a proper purchase object for finishTransaction
      try {
        // For iOS, finishTransaction needs purchase.id or transactionReceipt
        // For restored subscriptions, we might not have the original purchase object
        // So we skip finishing if it's a restored subscription
        if (latest.transactionId || latest.transactionReceipt || latest.id) {
          const purchaseForFinish = {
            ...latest,
            id: latest.id || latest.transactionId || latest.productId,
          };
          await finishTransaction({ purchase: purchaseForFinish, isConsumable: false });
          console.log('✅ Transaction finished successfully');
        } else {
          console.log('ℹ️ Skipping finishTransaction - restored subscription may not need it');
        }
      } catch (finishError) {
        console.warn('⚠️ Error finishing transaction:', finishError);
        console.warn('⚠️ This is not critical - subscription is already saved to Firebase');
        // Continue even if finishing transaction fails - subscription is already saved
      }

      // ✅ Update Redux - This is critical for UI update
      console.log('✅ Updating Redux state...');
      // dispatch(mySubscribedPlan(latest));
      dispatch(mySubscribedPlan(deepNormalize(latest)));

      dispatch(setSubscriptionPlan({ planId: latest.productId || latest.id }));
      dispatch(setIsPlanActive(true));
      dispatch(setFirstTimeSubscribe(true));
      
      console.log('✅ Redux state updated. isPlanActive should now be true');

      Alert.alert('Success ✅', 'Subscription activated successfully!');
      
      // ✅ Small delay to ensure state is updated before navigating
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (e) {
      console.error('❌ handleSubscriptionFromRestore error:', e);
      Alert.alert(
        'Error',
        `Failed to activate subscription: ${e?.message || 'Unknown error'}. Please try restoring purchases manually.`,
      );
      setProcessing(false);
    }
  };

  const onRedeemPress = async () => {
    try {
      if (processing) {
        Alert.alert('Processing', 'Please wait for the current operation to complete.');
        return;
      }

      // ✅ Verify user is logged in before redeeming
      const currentUserID = userInfo?.id || userInfo?.userID || userInfo?.uid;
      if (!currentUserID) {
        Alert.alert(
          'Login Required',
          'Please ensure you are logged in before redeeming a code. Your subscription needs to be linked to your account.',
        );
        return;
      }

      console.log('✅ User logged in, userID:', currentUserID);

      if (Platform.OS === 'ios') {
        // iOS: Present code redemption sheet
        try {
          // Get current subscriptions BEFORE opening redemption sheet
          const { activeSubs: beforeSubs } = await refreshPurchases();
          const beforeSubIds = new Set(
            (beforeSubs || []).map(sub => sub.productId || sub.id)
          );

          await presentCodeRedemptionSheetIOS();

          // Wait a bit for the sheet to appear and user interaction
          // The sheet is modal, so when it closes, we check for new subscriptions
          setTimeout(async () => {
            try {
              // ✅ Check user is logged in before processing
              const currentUserID = userInfo?.id || userInfo?.userID || userInfo?.uid;
              if (!currentUserID) {
                setProcessing(false);
                Alert.alert(
                  'Error',
                  'Please ensure you are logged in before redeeming a code.',
                );
                return;
              }

              // Small delay to ensure store has processed the redemption
              // For new subscriptions, sometimes it takes a few seconds
              console.log('⏳ Waiting for store to process redemption...');
              await new Promise(resolve => setTimeout(resolve, 3000));

              console.log('✅ Checking for new subscriptions after redemption...');
              const { activeSubs: afterSubs } = await refreshPurchases();

              console.log('📊 Before subscriptions count:', beforeSubIds.size);
              console.log('📊 After subscriptions count:', afterSubs?.length || 0);
              console.log('📊 After subscriptions:', afterSubs);

              // Check if there's a NEW subscription that wasn't there before
              const newSubs = (afterSubs || []).filter(
                sub => !beforeSubIds.has(sub.productId || sub.id)
              );

              console.log('📊 New subscriptions found:', newSubs.length);

              if (newSubs && newSubs.length > 0) {
                // New subscription found - user actually redeemed a code
                console.log('✅ New subscription detected, activating...');
                await handleSubscriptionFromRestore(newSubs);
              } else if (afterSubs && afterSubs.length > 0) {
                // ✅ CRITICAL FIX: Even if not "new", if user redeemed a code and has active subscriptions,
                // we should activate the latest/current subscription to sync with Firebase
                // This handles the case where user redeems a code for a subscription they might already have
                console.log('✅ No new subscription ID, but active subscriptions exist.');
                console.log('✅ User may have redeemed a code. Activating current subscription to sync with account...');
                
                // Get the subscription that matches our productIds (prioritize matching product)
                const matchingSub = afterSubs.find(sub =>
                  productIds.includes(sub.productId || sub.id)
                ) || afterSubs[0];
                
                console.log('✅ Activating subscription:', matchingSub.productId);
                console.log('✅ Calling handleSubscriptionFromRestore with:', matchingSub);
                
                try {
                  await handleSubscriptionFromRestore([matchingSub]);
                  console.log('✅ handleSubscriptionFromRestore completed successfully');
                } catch (restoreError) {
                  console.error('❌ Error in handleSubscriptionFromRestore:', restoreError);
                  console.error('❌ Restore error details:', JSON.stringify(restoreError, null, 2));
                  Alert.alert(
                    'Error',
                    `Failed to activate subscription: ${restoreError?.message || 'Unknown error'}`,
                  );
                  setProcessing(false);
                }
              } else {
                // No subscriptions at all - they might have tried to redeem but failed
                setProcessing(false);
                Alert.alert(
                  'No Subscription Found',
                  'No active subscription was found. If you redeemed a code, please verify it was valid and try again.',
                );
              }
            } catch (refreshError) {
              console.warn('Error refreshing purchases after redeem:', refreshError);
              setProcessing(false);
              Alert.alert(
                'Verification Error',
                'Unable to verify subscription. Please check your subscriptions manually.',
              );
            }
          }, 1000);
        } catch (e) {
          setProcessing(false);
          if (e.code === ErrorCode.E_SERVICE_ERROR) {
            Alert.alert('Service Error', 'Unable to open redemption sheet. Please try again later.');
          } else {
            console.warn('iOS redeem error:', e);
            Alert.alert('Error', 'Failed to open redemption sheet.');
          }
        }
      } else if (Platform.OS === 'android') {
        // Android: Open Google Play redeem URL
        try {
          // Get current subscriptions BEFORE opening Google Play
          const { activeSubs: beforeSubs } = await refreshPurchases();
          beforeRedeemSubIdsRef.current = new Set(
            (beforeSubs || []).map(sub => sub.productId || sub.id)
          );

          setRedeemStarted(true);
          setProcessing(true);
          const url = 'https://play.google.com/redeem';
          const canOpen = await Linking.canOpenURL(url);

          if (canOpen) {
            await Linking.openURL(url);
            Alert.alert(
              'Redeem Code',
              'Please redeem your code in Google Play Store, then return to this app. Your subscription will be activated automatically.',
            );
          } else {
            Alert.alert('Error', 'Unable to open Google Play Store. Please redeem manually in the Play Store app.');
            setRedeemStarted(false);
            setProcessing(false);
            beforeRedeemSubIdsRef.current.clear();
          }
        } catch (e) {
          console.warn('Android redeem error:', e);
          Alert.alert('Error', 'Failed to open Google Play Store.');
          setRedeemStarted(false);
          setProcessing(false);
          beforeRedeemSubIdsRef.current.clear();
        }
      } else {
        Alert.alert(
          'Not Supported',
          'Offer code redemption is not supported on this platform.',
        );
      }
    } catch (e) {
      console.warn('Redeem flow failed:', e);
      Alert.alert('Error', 'Failed to redeem code. Please try again.');
      setRedeemStarted(false);
    }
  };

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <ProfileHeader
        back={true}
        iconColor={Colors.white}
        title={title}
        titleAlight={'center'}
        titleFontSize={scale(16)}
        headerBg={Colors.black}
      />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <SubscriptionSliders />
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}
          >
            <CustomText style={styles.featureTextStyle}>
              Dietary option, Exercise option, Personality traits, Love language
              included in search
            </CustomText>
          </View>
        </View>
        {/* Subscription Plans */}
        <View style={styles.subscriptionPlansContainer}>
          {Array.isArray(subscriptions) && subscriptions.map((item, index) => {
            const durationLabel = getSubscriptionDurationLabel(item);

            return (
              <View key={item.id} style={styles.subscriptionContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onSubscriptioinPlanPress(item, index)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.selectContainer}>
                      <View
                        style={[
                          styles.tickIconContainer,
                          selectedSubscriptionIndex === index &&
                          styles.selectedSubscription,
                        ]}
                      >
                        {selectedSubscriptionIndex === index && (
                          <Image
                            style={styles.tick}
                            source={require('../../assets/icons/png/tick.png')}
                          />
                        )}
                      </View>
                    </View>

                    <View style={styles.rateContainer}>
                      <CustomText style={styles.rateText}>
                        {item?.displayPrice || ''}
                        <CustomText style={styles.monthText}>
                          {' / '}
                          {durationLabel}
                        </CustomText>
                      </CustomText>
                    </View>
                  </View>

                  <View style={styles.trialOptionContainer}>
                    <View style={styles.trialContainer}>
                      <CustomText style={styles.trialText}>
                        {'Select Plan'}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Bottom */}
        <View style={styles.bottomContainer}>
          <CustomText style={styles.bottomHeaderTitle}>
            {'Recurring billing, cancel anytime'}
          </CustomText>

          <CustomText style={styles.titleDescription}>
            {`By tapping Continue, your payment will be charged to your ${Platform.OS === 'ios' ? 'Apple account' : 'Play Account'
              }, and your subscription will automatically renew for the same package length at the same price until you cancel in settings in the ${Platform.OS === 'ios' ? 'Apple Store' : 'Play Store'
              } at least 24 hours prior to the end of the current period. By tapping Continue, you agree to our `}
            <CustomText
              style={{
                color: Colors.primary,
                fontSize: FONT_SIZE_XXS,
                textDecorationLine: 'underline',
              }}
              onPress={() =>
                Linking.openURL('https://sunsigninc.com/terms-conditions/')
              }
            >
              {'Terms '}
            </CustomText>
            {' and '}
            <CustomText
              style={{
                color: Colors.primary,
                fontSize: FONT_SIZE_XXS,
                textDecorationLine: 'underline',
              }}
              onPress={() =>
                Linking.openURL('https://sunsigninc.com/privacypolicy/')
              }
            >
              {'Privacy Policy'}
            </CustomText>
          </CustomText>

          <TouchableOpacity
            disabled={processing || !subscriptions?.length}
            onPress={handleSubscription}
            style={styles.bottomButtonContainer}
          >
            <CustomText style={styles.buttonTitle}>
              {processing ? 'Processing...' : 'Purchase'}
            </CustomText>
          </TouchableOpacity>

          {/* {Platform.OS !== 'ios' && (
             <TouchableOpacity onPress={onClose}>
               <CustomText style={styles.cancelTitle}>{'Cancel'}</CustomText>
             </TouchableOpacity>
           )} */}
          <TouchableOpacity
            disabled={processing || !subscriptions?.length}
            onPress={onRedeemPress}
            style={styles.bottomButtonContainer}
          >
            <CustomText style={styles.buttonTitle}>
              {'Redeem Offer Code'}
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={{ height: scale(20) }} />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default UpgradeAccount;
