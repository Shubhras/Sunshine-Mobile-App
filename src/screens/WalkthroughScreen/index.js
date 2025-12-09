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

const WalkthroughScreen = ({ navigation }) => {
  const slides = DatingConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => ({
      key: index,
      text: screenSpec.description,
      title: screenSpec.title,
      image: screenSpec.icon,
    }),
  );

  const handleDone = () => {
    navigation.navigate('AuthStack', { screen: 'Welcome' });
  };

  const handleLogin = () => {
    navigation.navigate('AuthStack', { screen: 'Login' });
  };

  const handleSignup = () => {
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
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
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
              <Text style={styles.title}>
                {DatingConfig.onboardingConfig.welcomeTitle}
              </Text>
              <Text style={styles.caption}>
                {DatingConfig.onboardingConfig.welcomeCaption}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.loginContainer}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signupContainer}
                  onPress={handleSignup}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}
      </View>
    );
  };

  const renderDoneButton = () => {
    return <Text style={styles.doneButton}>Done</Text>;
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
