import React, { useState } from 'react';
import { View } from 'react-native';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Header from '../../components/Header';
import LargeHeading from '../../components/headings/LargeHeading';
import Colors from '../../constants/Colors';
import styles from './styles';
import TextInput from '../../components/inputs/TextInput';
import Link from '../../components/links/Link';
import Button from '../../components/buttons/Button';
import { STANDARD_SPACING } from '../../constants/Constants';

const LoginScreen = ({ navigation }) => {
  // Local states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Returning
  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <Header
        back={true}
        titleAlight={'center'}
        headerBg={Colors.black}
        iconColor={Colors.white}
        title={'Find Your Soulmate'}
      />
      {/* Large heading */}
      <View style={styles.largeHeadingComponentWrapper}>
        <LargeHeading headingText="Sign In" headingColor={Colors.white} />
      </View>

      {/* Text input */}
      <View style={styles.textInputComponentWrapper}>
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={Colors.inputPlaceholder}
          backgroundColor={Colors.black}
          textInputValueColor={Colors.textHighContrast}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      {/* Text input */}
      <View
        style={[
          styles.textInputComponentWrapper,
          { marginBottom: STANDARD_SPACING },
        ]}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.inputPlaceholder}
          backgroundColor={Colors.black}
          textInputValueColor={Colors.white}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      {/* Link */}
      <View style={styles.linkWrapper}>
        <Link
          label={'Forgot password?'}
          labelColor={Colors.primary}
          onPress={() => navigation.navigate('ResetPassword')}
        />
      </View>

      {/* Submit button */}
     <View style={styles.buttonWrapper}>
     <Button
        label={'Log In'}
        labelColor={Colors.white}
        backgroundColor={Colors.primary}
      />
     </View>

      {/* Link */}
      <View style={styles.loginMobileLinkWrapper}>
        <Link
          label={'Login with phone number'}
          labelColor={Colors.primary}
          onPress={() => navigation.navigate('Sms')}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default LoginScreen;
