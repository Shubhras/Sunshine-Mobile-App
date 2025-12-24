import React, { useEffect } from 'react';
import { ImageBackground, StatusBar, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { Images } from '../../constants/images';
import styles from './styles';

const InitalLoadScreen = ({ navigation }) => {
  const userInfo = useSelector(state => state.users.users);

  useEffect(() => {
    setTimeout(() => {
      handleNavigationScreen();
    }, 5000);
  }, []);

  const handleNavigationScreen = () => {
    const { isLogin = false, isOnbording = false } = userInfo || {};

    console.log('jsdhjfhhdsjkfhjdhsjkfhjkdhf', userInfo);
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
              SunSign{' '}
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
