import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import Button from '../../components/buttons/Button';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Header from '../../components/Header';
import LargeHeading from '../../components/headings/LargeHeading';
import TextInput from '../../components/inputs/TextInput';
import Colors from '../../constants/Colors';
import styles from './styles';
import { forgotPassword } from '../../api/firebase/auth';
import TNActivityIndicator from '../../components/TNActivityIndicator';

const ResetPasswordScreen = ({ navigation }) => {
  // Local states
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSendPasswordResetEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(email?.trim());

    if (isValidEmail) {
      setLoading(true);
      forgotPassword(email.trim()).then(res => {
        setLoading(false);
        if (res.success == true) {
          Alert.alert(
            'Link sent successfully',
            'Kindly check your email and follow the link to reset your password.',
            [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ],
            { cancelable: false },
          );
        } else {
          Alert.alert(
            'Error',
            res.message ||
              'An error occurred while sending the password reset email. Please try again later.',
            [{ text: 'OK' }],
            { cancelable: false },
          );
        }
      });
    } else {
      Alert.alert(
        'Invalid email',
        'The email entered is invalid. Please try again',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }
  };

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <Header back={true} headerBg={Colors.black} iconColor={Colors.white} />
      {/* Large heading */}
      <View style={styles.largeHeadingComponentWrapper}>
        <LargeHeading
          headingText="Reset Password"
          headingColor={Colors.primary}
        />
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

      {/* Send Button */}
      <View style={styles.buttonWrapper}>
        <Button
          label={'Send Link'}
          labelColor={Colors.white}
          backgroundColor={Colors.primary}
          onPress={() => onSendPasswordResetEmail()}
        />
      </View>
        {loading && <TNActivityIndicator />}
    </CustomSafeAreaView>
  );
};

export default ResetPasswordScreen;
