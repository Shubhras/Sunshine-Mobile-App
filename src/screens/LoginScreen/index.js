import { Formik } from 'formik';
import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { fetchAndStorePushTokenIfPossible, loginWithEmailAndPassword } from '../../api/firebase/auth';
import { showToast } from '../../components/alerts/Toast/ToastManager';
import Button from '../../components/buttons/Button';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { CustomText } from '../../components/global/CustomText';
import Header from '../../components/Header';
import LargeHeading from '../../components/headings/LargeHeading';
import TextInput from '../../components/inputs/TextInput';
import Link from '../../components/links/Link';
import TNActivityIndicator from '../../components/TNActivityIndicator';
import Colors from '../../constants/Colors';
import { STANDARD_SPACING } from '../../constants/Constants';
import { localizedErrorMessage } from '../../utils/ErrorCode';
import styles from './styles';
import { updateUser } from '../../redux/slices/SessionUser';
import { deepNormalize, normalizeTimestamp } from '../../constants/helpers/helperFunction';
import { getUserSubscription } from '../../api/firebase/firebase';
import {
  mySubscribedPlan,
  setIsPlanActive,
  setSubscriptionPlan,
} from '../../redux/slices/inAppPurchaseSlice';

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
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleLogin = async values => {
    console.log('val', values);
    // return;
    Keyboard.dismiss();
    setLoading(true);
    await loginWithEmailAndPassword({
      email: values.email,
      password: values.password,
    })
      .then(async res => {
        // Handle successful login
        console.log('Login successful with values:', res);
        if (res?.user) {
          const userID = res.user?.id || res.user?.userID;
          fetchAndStorePushTokenIfPossible(userID)
          // ✅ Clear subscription state first (in case of previous user data)
          dispatch(setIsPlanActive(false));
          dispatch(mySubscribedPlan(null));
          dispatch(setSubscriptionPlan({ planId: '' }));
          
          // ✅ Load subscription from Firebase (user-specific, not device-specific)
          const resSubcription = await getUserSubscription(userID);
          console.log('resSubcription', resSubcription, userID);
          
          if (resSubcription?.success && resSubcription?.subscription?.active) {
            // ✅ User has active subscription
            dispatch(setIsPlanActive(true));
            // dispatch(mySubscribedPlan(resSubcription.subscription));
             dispatch(mySubscribedPlan(deepNormalize(resSubcription.subscription)));
            dispatch(
              setSubscriptionPlan({
                planId: resSubcription.subscription.productId,
              }),
            );
          } else {
            // ✅ No active subscription for this user
            dispatch(setIsPlanActive(false));
            dispatch(mySubscribedPlan(null));
            dispatch(setSubscriptionPlan({ planId: '' }));
          }
          dispatch(
            updateUser({
              ...res.user,
              isLogin: true,
              createdAt: normalizeTimestamp(res.user?.createdAt),
              lastOnlineTimestamp: normalizeTimestamp(
                res.user?.lastOnlineTimestamp,
              ),
            }),
          );
          setTimeout(() => {
            setLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeTopTab' }],
            });
          }, 2000);
        } else {
          setLoading(false);
          showToast({
            title: 'Login Failed',
            text:
              localizedErrorMessage(res?.error) ||
              'Unable to login at this time.',
            duration: 3000,
            type: 'error',
          });
        }
        // Navigate to the next screen or perform other actions
      })
      .catch(error => {
        // Handle login error
        showToast({
          title: 'Login Failed',
          text: 'Unable to login at this time.',
          duration: 3000,
          type: 'error',
        });
        setLoading(false);
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
      {loading && <TNActivityIndicator />}
    </CustomSafeAreaView>
  );
};

export default LoginScreen;
