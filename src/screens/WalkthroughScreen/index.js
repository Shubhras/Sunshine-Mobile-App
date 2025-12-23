import React, { useLayoutEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/SessionUser';

const WalkthroughScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const slides = DatingConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => ({
      key: index,
      text: screenSpec.description,
      title: screenSpec.title,
      image: screenSpec.icon,
    }),
  );

  const handleDone = () => {
    dispatch(updateUser({isOnbording:true}))
    navigation.navigate('AuthStack', { screen: 'Welcome' });
  };

  const handleLogin = () => {
    dispatch(updateUser({isOnbording:true}))
    navigation.navigate('AuthStack', { screen: 'Login' });
  };

  const handleSignup = () => {
    dispatch(updateUser({isOnbording:true}))
    navigation.navigate('AuthStack', {
      screen: 'Signup',
      params: {
        appIdentifier: DatingConfig.appIdentifier,
      },
    });
  };

  const renderItem = ({ item, dimensions }) => {
    return (
      <View style={[styles.container, dimensions]}>
        {item.image && (
          <Image
            style={styles.image}
            source={item.image}
            resizeMode="contain"
          />
        )}
        {item.title && (
          <View>
            <CustomText style={styles.title}>{item.title}</CustomText>
            <CustomText style={styles.text}>{item.text}</CustomText>
          </View>
        )}
        {item.key === 0 && (
          <ImageBackground
            source={require('../../assets/images/black.png')}
            style={{
              flex: 1,
              width: '105%',
              height: '100%',
            }}
          >
            <View style={{ alignItems: 'center', marginTop: '35%' }}>
              <View style={{ width: 150, height: 150, alignItems: 'center' }}>
                <Image
                  source={Images.Logo}
                  style={{ height: '100%', width: '100%' }}
                />
              </View>
              <CustomText style={styles.title}>
                {DatingConfig.onboardingConfig.welcomeTitle}
              </CustomText>
              <CustomText style={styles.caption}>
                {DatingConfig.onboardingConfig.welcomeCaption}
              </CustomText>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.loginContainer}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <CustomText style={styles.loginText}>Log In</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signupContainer}
                  onPress={handleSignup}
                  activeOpacity={0.8}
                >
                  <CustomText style={styles.signupText}>Sign Up</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}
      </View>
    );
  };

  const renderDoneButton = () => {
    return <CustomText style={styles.doneButton}>Done</CustomText>;
  };

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        onDone={handleDone}
        onSkip={handleDone}
        showNextButton={false}
        renderDoneButton={renderDoneButton}
      />
    </>
  );
};

export default WalkthroughScreen;
