// import React from 'react';
// import {
//   Image,
//   Linking,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useIAP } from 'react-native-iap';
// import { scale } from 'react-native-size-matters';

// import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
// import ProfileHeader from '../../components/ProfileHeader';
// import Colors from '../../constants/Colors';
// import styles from './styles';
// import SubscriptionSliders from './SubscriptionSliders';
// import { FONT_SIZE_XXS } from '../../constants/Constants';
// import { CustomText } from '../../components/global/CustomText';
// import { useDispatch } from 'react-redux';
// import { setFirstTimeSubscribe } from '../../redux/slices/inAppPurchaseSlice';

// const productIds = [
//   'vip_access_099_1m',
//   'vip_access_099_03m',
//   'vip_access_099_06m',
//   'vip_access_0999_1m', // ⚠️ if this is not created in store, remove
// ];

// const UpgradeAccount = ({ route, navigation }) => {
//   const { title } = route.params;
//   const dispatch = useDispatch();
//   const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] =
//     React.useState(0);
//   const [processing, setProcessing] = React.useState(false);

//   const {
//     connected,
//     subscriptions,
//     fetchProducts,
//     requestPurchase,
//     validateReceipt,
//     finishTransaction,
//   } = useIAP({
//     onPurchaseSuccess: async purchase => {
//       console.log('✅ Purchase successful:', purchase);

//       const valid = await validatePurchase(purchase);

//       if (valid) {
//         console.log('✅ Receipt Valid - Unlock Premium');

//         await finishTransaction({
//           purchase,
//           isConsumable: false,
//         });
//          dispatch(setFirstTimeSubscribe(true))
//          setProcessing(false);
//       } else {
//         console.log('❌ Invalid purchase receipt');
//       }
//     },
//     onPurchaseError: error => {
//       console.log('❌ Purchase failed:', error);
//       setProcessing(false);
//     },
//   });

//   // ✅ Fetch subscription products
//   React.useEffect(() => {
//     if (connected) {
//       fetchProducts({ skus: productIds, type: 'subs' });
//     }
//   }, [connected]);

//   const validatePurchase = async purchase => {
//     try {
//       if (Platform.OS === 'ios') {
//         if (!purchase?.transactionReceipt) return false;

//         const result = await validateReceipt({
//           ios: {
//             receiptBody: {
//               'receipt-data': purchase.transactionReceipt,
//               password: 'YOUR_SHARED_SECRET', // Only for subscription
//             },
//           },
//         });

//         return result?.isValid === true;
//       }

//       if (Platform.OS === 'android') {
//         return !!purchase?.purchaseToken;
//       }

//       return false;
//     } catch (e) {
//       console.log('❌ Validation failed:', e);
//       return false;
//     }
//   };

//   // ✅ Select Plan
//   const onSubscriptioinPlanPress = (item, index) => {
//     setSelectedSubscriptionIndex(index);
//   };

//   // ✅ Purchase selected plan
//  const handleSubscription = async () => {
//   if (!subscriptions?.length || processing) return;

//   const selectedPlan = subscriptions[selectedSubscriptionIndex];
//   if (!selectedPlan?.id) return;

//   setProcessing(true);
//  try {
//     if (!subscriptions?.length) return;

//     const subscription = subscriptions[selectedSubscriptionIndex];

//     await requestPurchase({
//       type: 'subs',
//       request: {
//         apple: {
//           sku: subscription.id, // ✅ iOS SKU
//         },
//         google: {
//           skus: [subscription.id], // ✅ Android SKU
//           subscriptionOffers:
//             subscription.subscriptionOfferDetailsAndroid?.map(offer => ({
//               sku: subscription.id,
//               offerToken: offer.offerToken,
//             })) || [],
//         },
//       },
//     });
//   } catch (e) {
//     setProcessing(false);
//     console.log('buySubscription error =>', e);
//   }
// };

//   const redeemOffer = () => {
//     console.log('Redeem offer pressed');
//   };

//   const onClose = () => {
//     navigation.goBack();
//   };

//   return (
//     <CustomSafeAreaView
//       style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
//     >
//       <ProfileHeader
//         back={true}
//         iconColor={Colors.white}
//         title={title}
//         titleAlight={'center'}
//         titleFontSize={scale(16)}
//         headerBg={Colors.black}
//       />

//       <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
//         <SubscriptionSliders />

//         <View style={{ flexDirection: 'row' }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginVertical: 5,
//               // flex: 1,
//             }}
//           >
//             <CustomText style={styles.featureTextStyle}>
//               Dietary option, Exercise option, Personality traits, Love language
//               included in search
//             </CustomText>
//           </View>
//         </View>
//         {/* Subscription Plans */}
//         <View style={styles.subscriptionPlansContainer}>
//           {Array.isArray(subscriptions) &&
//             subscriptions.map((item, index) => {
//               const monthText = `${item?.subscriptionPeriodNumberIOS || ''} ${
//                 item?.subscriptionPeriodUnitIOS || ''
//               }`.trim();

//               return (
//                 <View
//                   key={item.id || index}
//                   style={styles.subscriptionContainer}
//                 >
//                   {/* Feature row */}

//                   <TouchableOpacity
//                     activeOpacity={0.7}
//                     onPress={() => onSubscriptioinPlanPress(item, index)}
//                     style={{ flexDirection: 'row', justifyContent: 'space-between' }}
//                   >
//                     {/* Tick */}
//                     <View style={{flexDirection:'row'}}>

//                     <View style={styles.selectContainer}>
//                       <View
//                         style={[
//                           styles.tickIconContainer,
//                           selectedSubscriptionIndex === index &&
//                             styles.selectedSubscription,
//                         ]}
//                       >
//                         {selectedSubscriptionIndex === index && (
//                           <Image
//                             style={styles.tick}
//                             source={require('../../assets/icons/png/tick.png')}
//                           />
//                         )}
//                       </View>
//                     </View>

//                     {/* Price */}
//                     <View style={styles.rateContainer}>
//                       <CustomText style={styles.rateText}>
//                         {item?.displayPrice || ''}
//                         <CustomText style={styles.monthText}>
//                           {'  / '}
//                           {monthText}
//                         </CustomText>
//                       </CustomText>
//                     </View>
//                     </View>

//                     {/* Button */}
//                     <View style={styles.trialOptionContainer}>
//                       <View style={styles.trialContainer}>
//                         <CustomText style={styles.trialText}>{'Select Plan'}</CustomText>
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               );
//             })}
//         </View>

//         {/* Bottom */}
//         <View style={styles.bottomContainer}>
//           <CustomText style={styles.bottomHeaderTitle}>
//             {'Recurring billing, cancel anytime'}
//           </CustomText>

//           <CustomText style={styles.titleDescription}>
//             {`By tapping Continue, your payment will be charged to your ${
//               Platform.OS === 'ios' ? 'Apple account' : 'Play Account'
//             }, and your subscription will automatically renew for the same package length at the same price until you cancel in settings in the ${
//               Platform.OS === 'ios' ? 'Apple Store' : 'Play Store'
//             } at least 24 hours prior to the end of the current period. By tapping Continue, you agree to our `}
//             <CustomText
//               style={{ color: Colors.primary, fontSize: FONT_SIZE_XXS, textDecorationLine:'underline' }}
//               onPress={() =>
//                 Linking.openURL('https://sunsigninc.com/terms-conditions/')
//               }
//             >
//               {'Terms '}
//             </CustomText>
//             {' and '}
//             <CustomText
//               style={{ color: Colors.primary, fontSize: FONT_SIZE_XXS, textDecorationLine:'underline' }}
//               onPress={() =>
//                 Linking.openURL('https://sunsigninc.com/privacypolicy/')
//               }
//             >
//               {'Privacy Policy'}
//             </CustomText>
//           </CustomText>

//           <TouchableOpacity
//             disabled={processing || !subscriptions?.length}
//             onPress={handleSubscription}
//             style={styles.bottomButtonContainer}
//           >
//             <CustomText style={styles.buttonTitle}>
//               {processing ? 'Processing...' : 'Purchase'}
//             </CustomText>
//           </TouchableOpacity>

//           {/* {Platform.OS !== 'ios' && (
//             <TouchableOpacity onPress={onClose}>
//               <CustomText style={styles.cancelTitle}>{'Cancel'}</CustomText>
//             </TouchableOpacity>
//           )} */}

//           <TouchableOpacity
//             onPress={redeemOffer}
//             style={styles.bottomButtonContainer}
//           >
//             <CustomText style={styles.buttonTitle}>{'Redeem Offer Code'}</CustomText>
//           </TouchableOpacity>
//         </View>
//         <View style={{ height: scale(20) }} />
//       </ScrollView>
//     </CustomSafeAreaView>
//   );
// };

// export default UpgradeAccount;

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
import { FONT_SIZE_XXS } from '../../constants/Constants';
import { CustomText } from '../../components/global/CustomText';

import {
  setPlans,
  setIsPlanActive,
  setFirstTimeSubscribe,
  mySubscribedPlan,
  setSubscriptionPlan,
  setSelectedPlan,
} from '../../redux/slices/inAppPurchaseSlice';
import { updateUserSubscription } from '../../api/firebase/firebase';

const productIds = [
  'vip_access_099_1m',
  'vip_access_099_03m',
  'vip_access_099_06m',
  'vip_access_0999_1m',
];

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

  const { connected, subscriptions, fetchProducts, finishTransaction } = useIAP(
    {
      onPurchaseSuccess: async purchase => {
        try {
          console.log('✅ Purchase successful:', purchase);
          const subscriptionPlan = {
            active: true,
            productId: purchase.productId || purchase.id,
            transactionDate: purchase.transactionDate || Date.now(),
            purchaseToken: purchase.purchaseToken || '',
            receipt: purchase?.transactionReceipt || '', // iOS receipt
            platform: Platform.OS,
          };

          const userID = userInfo?.id || userInfo?.userID;

          // ✅ store in firebase
          await updateUserSubscription(userID, subscriptionPlan);

          // ✅ Save purchase data in redux
          dispatch(mySubscribedPlan(purchase));
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

        if (error.code !== ErrorCode.UserCancelled) {
          Alert.alert('Purchase Failed', error.message);
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

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const findValidSubscription = (purchases = [], activeSubs = []) => {
  const all = [...activeSubs, ...purchases];

  // Only keep your subscription SKUs
  const matched = all.find(p =>
    productIds.includes(p.productId || p.id),
  );

  return matched || null;
};

const refreshAfterRedeem = async () => {
  // Retry 6 times with delay (total ~30 sec)
  for (let i = 0; i < 6; i++) {
    const { purchases, activeSubs } = await refreshPurchases();
    const sub = findValidSubscription(purchases, activeSubs);

    console.log(`🔁 Redeem retry ${i + 1}`, {
      purchasesCount: purchases.length,
      activeSubsCount: activeSubs.length,
      found: !!sub,
    });

    if (sub) return sub;

    await sleep(5000); // wait 5 seconds
  }

  return null;
};
  React.useEffect(() => {
    const sub = AppState.addEventListener('change', async nextState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        if (Platform.OS === 'android' && redeemStarted) {
          setRedeemStarted(false);

          // ✅ now user returned after redeem
          // const { activeSubs } = await refreshPurchases();
          // await handleSubscriptionFromRestore(activeSubs);
          const restoredSub = await refreshAfterRedeem();

if (restoredSub) {
  await handleSubscriptionFromRestore([restoredSub]);
} else {
  Alert.alert(
    'Not Active',
    'Redeem successful but subscription is not visible yet. Please try Restore again in a minute.',
  );
}
        }
      }
      appStateRef.current = nextState;
    });

    return () => sub.remove();
  }, [redeemStarted]);

  console.log('pppppPPsubscriptionssubscriptions', Platform.OS, subscriptions);

  // ✅ select plan
  const onSubscriptioinPlanPress = (item, index) => {
    setSelectedSubscriptionIndex(index);
    dispatch(setSelectedPlan(item));
    dispatch(setSubscriptionPlan({ planId: item.id }));
  };

  const handleSubscription = async () => {
    try {
      if (!subscriptions?.length || processing) return;

      const subscription = subscriptions[selectedSubscriptionIndex];
      if (!subscription?.id) return;

      setProcessing(true);

      await requestPurchase({
        type: 'subs',
        request: {
          apple: { sku: subscription.id },
          google: {
            skus: [subscription.id],
            subscriptionOffers:
              subscription.subscriptionOfferDetailsAndroid?.map(offer => ({
                sku: subscription.id,
                offerToken: offer.offerToken,
              })) || [],
          },
        },
      });
    } catch (e) {
      console.log('handleSubscription error =>', e);
      setProcessing(false);
    }
  };

  const refreshPurchases = async () => {
    try {
      const [purchases, activeSubs] = await Promise.all([
        getAvailablePurchases(),
        getActiveSubscriptions(),
      ]);

      console.log('✅ available purchases:', purchases);
      console.log('✅ active subscriptions:', activeSubs);

      return { purchases, activeSubs };
    } catch (e) {
      console.warn('Refresh purchases failed:', e);
      return { purchases: [], activeSubs: [] };
    }
  };

  const handleSubscriptionFromRestore = async (activeSubs = []) => {
    try {
      if (!activeSubs?.length) {
        Alert.alert('Not Active', 'No active subscription found after redeem.');
        return;
      }

      const latest = activeSubs[0]; // you can also match productIds
      console.log('✅ Restored subscription:', latest);

      const userID = userInfo?.id || userInfo?.userID;

      const subscriptionPlan = {
        active: true,
        productId: latest.productId || latest.id,
        transactionDate: latest.transactionDate || Date.now(),
        purchaseToken: latest.purchaseToken || '',
        receipt: latest.transactionReceipt || '',
        platform: Platform.OS,
        source: 'redeem_restore',
      };

      // ✅ save firebase
      await updateUserSubscription(userID, subscriptionPlan);

      // ✅ redux update
      dispatch(mySubscribedPlan(latest));
      dispatch(setSubscriptionPlan({ planId: latest.productId || latest.id }));
      dispatch(setIsPlanActive(true));
      dispatch(setFirstTimeSubscribe(true));

      Alert.alert('Success ✅', 'Subscription activated successfully.');
      navigation.goBack();
    } catch (e) {
      console.log('handleSubscriptionFromRestore error:', e);
    }
  };

  const onRedeemPress = async () => {
    try {
      if (Platform.OS === 'ios') {
        await presentCodeRedemptionSheetIOS();
        // iOS sheet returns no result, user redeems and closes sheet manually
        // After that, refresh purchases
        // ✅ after closing sheet
        const { activeSubs } = await refreshPurchases();
        await handleSubscriptionFromRestore(activeSubs);
      } else if (Platform.OS === 'android') {
        setRedeemStarted(true);
        await Linking.openURL('https://play.google.com/redeem');

        Alert.alert(
          'Redeem Code',
          'Please redeem code in Google Play, then come back to the app.',
        );

        // Refresh purchases when user returns
        // await refreshPurchases();
      } else {
        Alert.alert(
          'Not supported',
          'Offer code redeem not supported on this platform.',
        );
      }
    } catch (e) {
      console.warn('Redeem flow failed:', e);
      Alert.alert('Error', 'Failed to redeem code. Please try again.');
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
          {subscriptions?.map((item, index) => {
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
        {/* Bottom */}
        <View style={styles.bottomContainer}>
          <CustomText style={styles.bottomHeaderTitle}>
            {'Recurring billing, cancel anytime'}
          </CustomText>

          <CustomText style={styles.titleDescription}>
            {`By tapping Continue, your payment will be charged to your ${
              Platform.OS === 'ios' ? 'Apple account' : 'Play Account'
            }, and your subscription will automatically renew for the same package length at the same price until you cancel in settings in the ${
              Platform.OS === 'ios' ? 'Apple Store' : 'Play Store'
            } at least 24 hours prior to the end of the current period. By tapping Continue, you agree to our `}
            <CustomText
              style={{
                color: Colors.primary,
                fontSize: FONT_SIZE_XXS,
                textDecorationLine: 'underline',
              }}
              onPress={() =>
                Linking.openURL('https:sunsigninc.com/terms-conditions/')
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
                Linking.openURL('https:sunsigninc.com/privacypolicy/')
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
              {processing ? 'Processing...' : 'Redeem Offer Code'}
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={{ height: scale(20) }} />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default UpgradeAccount;
