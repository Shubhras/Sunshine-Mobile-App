import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Header from '../../components/Header';
import LargeHeading from '../../components/headings/LargeHeading';
import Colors from '../../constants/Colors';
import styles from './styles';
import TextInput from '../../components/inputs/TextInput';
import Link from '../../components/links/Link';
import Button from '../../components/buttons/Button';
import { STANDARD_SPACING } from '../../constants/Constants';
import { loginUser } from '../../redux/slices/SessionUser';
import { CustomText } from '../../components/global/CustomText';

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  // Local states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async values => {
    console.log('val', values);
    return;
    await loginUser(values)
      .then(() => {
        // Handle successful login
        console.log('Login successful with values:', values);
        // Navigate to the next screen or perform other actions
      })
      .catch(error => {
        // Handle login error
        console.error('Login failed:', error);
      });
  };

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

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
        }) => (
          <>
            {/* Text input */}
            <View style={styles.textInputComponentWrapper}>
              <TextInput
                placeholder="E-mail"
                placeholderTextColor={Colors.inputPlaceholder}
                backgroundColor={Colors.black}
                textInputValueColor={Colors.textHighContrast}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <CustomText style={styles.errorText}>{errors.email}</CustomText>
              )}
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
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <CustomText style={styles.errorText}>
                  {errors.password}
                </CustomText>
              )}
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
                onPress={handleSubmit}
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
          </>
        )}
      </Formik>
    </CustomSafeAreaView>
  );
};

export default LoginScreen;
