import React, { Component } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import DatingConfig from '../../data/DatingConfig';
import { Images } from '../../constants/images';
import styles from './styles';
import Button from '../../components/buttons/Button';
import Colors from '../../constants/Colors';

const WelcomeScreen = ({ navigation, route }) => {
  // const appConfig = route.params.appConfig
  // const appConfig = props?.appConfig
  //   ? props?.appConfig
  //   : props.route?.params?.appConfig

    console.log('WelcomeScreen Props', route.params);
    
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/black.png')}
        style={styles.imageBackground}
      >
        <View style={styles.logo}>
          <Image style={styles.logoImage} source={Images.Logo} />
        </View>
        <Text style={styles.title}>{DatingConfig.onboardingConfigwelcomeTitle}</Text>
        <Text style={styles.caption}>{DatingConfig.onboardingConfig.welcomeCaption}</Text>
        <View style={{ marginHorizontal: 80, gap: 20 }}>
          <Button
            label={'Log In'}
            labelColor={Colors.white}
            backgroundColor={Colors.primary}
            onPress={() => {
              navigation.navigate('AuthStack', { screen: 'Login' });
            }}
          />

          <Button
            label={'Sign Up'}
            borderWidth={true}
            labelColor={Colors.primary}
            backgroundColor={Colors.white}
            onPress={() => {
              navigation.navigate('AuthStack', {
                screen: 'Signup',
                params: {
                  isSigningUp: true,
                },
              });
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
