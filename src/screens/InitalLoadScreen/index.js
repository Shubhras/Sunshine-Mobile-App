import React, { useEffect, useLayoutEffect } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import DatingConfig from '../../data/DatingConfig';
import styles from './styles';
import { Images } from '../../constants/images';
import { CustomText } from '../../components/global/CustomText';
import { useSelector } from 'react-redux';

const InitalLoadScreen = ({ navigation }) => {
  const userInfo = useSelector(state => state.users.users);
  
  useEffect(() => {
    setTimeout(() => {
      handleNavigationScreen();
    }, 5000);
  }, []);
  
  const handleNavigationScreen = () => {
    const { isLogin=false, isOnbording=false } = userInfo || {};
    
    console.log("jsdhjfhhdsjkfhjdhsjkfhjkdhf",userInfo);
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>HELLO</Text>
    </View>
  );
};

export default InitalLoadScreen;
