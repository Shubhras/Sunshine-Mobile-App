import React, {useCallback, useState} from 'react';
import {Alert, Platform, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIAP} from 'react-native-iap';



// import {updateUserSubscription} from '../../api/firebase/firebase';
import { setIsPlanActive,
  mySubscribedPlan,
  setSubscriptionPlan, } from '../../redux/slices/inAppPurchaseSlice';
import { updateUserSubscription } from '../../api/firebase/firebase';
import { productIds } from '../../constants/Constants';
import Button from '../../components/buttons/Button';
import Colors from '../../constants/Colors';
import { deepNormalize } from '../../constants/helpers/helperFunction';

// const productIds = [
//   'vip_access_099_1m',
//   'vip_access_099_03m',
//   'vip_access_099_06m',
//   'vip_access_0999_1m',
// ];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function RestorePurchaseButton({navigation, style}) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.users.users);
  const [loading, setLoading] = useState(false);

  const {
    connected,
    getAvailablePurchases,
    getActiveSubscriptions,
    availablePurchases,
    activeSubscriptions,
    finishTransaction,
  } = useIAP();

  const findMySubscription = () => {
    const merged = [...(activeSubscriptions || []), ...(availablePurchases || [])];

    return (
      merged.find(p => productIds.includes(p?.productId || p?.id)) || null
    );
  };

  const restorePurchase = useCallback(async () => {
    try {
      if (!connected || loading) return;

      setLoading(true);

      const userID = userInfo?.id || userInfo?.userID;
      if (!userID) {
        Alert.alert('Error', 'User not found');
        setLoading(false);
        return;
      }

      // ✅ refresh play/app store purchases
      await Promise.all([getAvailablePurchases(), getActiveSubscriptions()]);

      // ✅ wait for hook-state update
      await sleep(600);

      // ✅ find subscription
      const restored = findMySubscription();

      if (!restored) {
        dispatch(setIsPlanActive(false));
        await updateUserSubscription(userID, {active: false});
        navigation.goBack()
        // Alert.alert('Restore Purchase', 'No active subscription found.');
        return;
      }

      const planId = restored?.productId || restored?.id;

      // ✅ save firebase
      await updateUserSubscription(userID, {
        active: true,
        productId: planId,
        transactionDate: restored?.transactionDate || Date.now(),
        purchaseToken: restored?.purchaseToken || '',
        receipt: restored?.transactionReceipt || '',
        platform: Platform.OS,
        source: 'restore',
      });

      // ✅ update redux
      dispatch(mySubscribedPlan(deepNormalize(restored)));
      dispatch(setSubscriptionPlan({planId}));
      dispatch(setIsPlanActive(true));

      // ✅ finish transaction
      try {
        await finishTransaction({purchase: restored, isConsumable: false});
      } catch (e) {
        console.log('finishTransaction warning:', e);
      }

      Alert.alert('Restored ✅', 'Your purchase restored successfully.');
    } catch (e) {
      console.log('restorePurchase error:', e);
      Alert.alert('Restore Failed', e?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [
    connected,
    loading,
    userInfo,
    getAvailablePurchases,
    getActiveSubscriptions,
    availablePurchases,
    activeSubscriptions,
    finishTransaction,
  ]);

  return (
    <Button
                label={'Restore Purchase'}
                labelColor={Colors.primary}
                onPress={() => {
                 restorePurchase()
                }}
              />
    // <TouchableOpacity disabled={loading} onPress={restorePurchase} style={style}>
    //   {children}
    // </TouchableOpacity>
  );
}
