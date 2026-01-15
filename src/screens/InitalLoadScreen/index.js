import React, { useEffect } from 'react';
import { ImageBackground, Platform, StatusBar, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../constants/images';
import styles from './styles';
import { useIAP } from 'react-native-iap';
import {
  mySubscribedPlan,
  setActiveSubscriptions,
  setIsPlanActive,
  setSubscriptionPlan,
} from '../../redux/slices/inAppPurchaseSlice';
import { productIds } from '../../constants/Constants';
import { getUserSubscription } from '../../api/firebase/firebase';

const InitalLoadScreen = ({ navigation }) => {
  const userInfo = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      handleNavigationScreen();
    }, 5000);
  }, []);

  const { getActiveSubscriptions, connected,hasActiveSubscriptions } = useIAP();

  useEffect(() => {
    const checkStorePurchases = async () => {
      // const isActive = await hasActiveSubscriptions(productIds);
      const list = await getActiveSubscriptions();
      dispatch(setActiveSubscriptions(list));
    };

    if (connected) checkStorePurchases();
  }, [connected]);

  useEffect(() => {
    const loadSubFromFirebase = async () => {
      const userID = userInfo?.id || userInfo?.userID;
      if (!userID) return;

      // ✅ reset first
      dispatch(setIsPlanActive(false));
      dispatch(mySubscribedPlan(null));
      dispatch(setSubscriptionPlan({ planId: '' }));

      // ✅ then load
      const res = await getUserSubscription(userID);

      if (res?.success && res?.subscription?.active) {
        dispatch(setIsPlanActive(true));
        dispatch(mySubscribedPlan(res.subscription));
        dispatch(setSubscriptionPlan({ planId: res.subscription.productId }));
      }
    };

    if (userInfo?.id) loadSubFromFirebase();
  }, [userInfo?.id]);

  const handleNavigationScreen = () => {
    const { isLogin = false, isOnbording = false } = userInfo || {};

    console.log(
      'userInfouserInfouserInfouserInfouserInfouserInfouserInfo',
      userInfo,
    );
    if (!isLogin && isOnbording) {
      // ✅ Logged in + Business chosen but no review setup yet
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AuthStack',
          },
        ],
      });
    } else if (isLogin) {
      // ✅ Logged in but business not chosen yet
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeTopTab',
          },
        ],
      });
    } else {
      // ✅ Not logged in → Go to Welcome screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'WalkthroughScreen' }],
      });
    }
  };
  return (
    <Animatable.View
      style={[styles.mainWrapper]}
      delay={100}
      animation="fadeIn"
      easing="ease-in-out-sine"
      useNativeDriver={true}
    >
      {/* StatusBar */}
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content" // or "dark-content" based on your background
      />
      {/* Image background */}
      <ImageBackground
        source={Images.backgroundImage}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.imageBackgroundOverlay}>
          {/* Logo wrapper */}
          <View style={styles.logoWrapper}>
            {/* Logo */}
            <Animatable.Image
              source={Images.MainLogo}
              style={styles.logo}
              delay={600}
              animation="fadeInDown"
              easing="ease-in-out-back"
              useNativeDriver={true}
            />
          </View>
          {/* Title wrapper */}
          <View style={styles.titleWrapper}>
            {/* Title */}
            <Animatable.Text
              allowFontScaling={false}
              style={styles.title}
              delay={1100}
              animation="fadeInLeft"
              easing="ease-in-out-sine"
              useNativeDriver={true}
            >
              SunShine{' '}
            </Animatable.Text>
            {/* Title highlighted */}
            <Animatable.Text
              allowFontScaling={false}
              style={[styles.title, styles.titleHighlighted]}
              delay={1600}
              animation="fadeInRight"
              easing="ease-in-out-sine"
              useNativeDriver={true}
            >
              Match
            </Animatable.Text>
          </View>
        </View>
      </ImageBackground>
    </Animatable.View>
  );
};

export default InitalLoadScreen;
