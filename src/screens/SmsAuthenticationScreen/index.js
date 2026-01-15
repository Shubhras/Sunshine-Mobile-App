import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountriesModalPicker from '../../components/CountriesModalPicker';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Header from '../../components/Header';
import LargeHeading from '../../components/headings/LargeHeading';
import Colors from '../../constants/Colors';
import styles from './styles';
import Button from '../../components/buttons/Button';
import Link from '../../components/links/Link';
import TermsOfUseView from '../../components/TermsOfUseView';
import DatingConfig from '../../data/DatingConfig';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { CustomText } from '../../components/global/CustomText';
import TNProfilePictureSelector from '../../components/TNProfilePictureSelector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../../components/inputs/TextInput';
import { scale } from 'react-native-size-matters';

import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  fetchUserProfileViaUUID,
  getUserDataByPhone,
  sendSMSToPhoneNumber,
  setUserInfo,
  updateUserInfo,
} from '../../api/firebase/auth';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import { updateUser } from '../../redux/slices/SessionUser';
import { serverTimestamp } from '@react-native-firebase/firestore';
import TNActivityIndicator from '../../components/TNActivityIndicator';
import { useDispatch } from 'react-redux';
import { normalizeTimestamp } from '../../constants/helpers/helperFunction';

const codeInputCellCount = 6;

const SmsAuthenticationScreen = ({ navigation, route }) => {
  const appConfig = DatingConfig;
  const { isSigningUp, isUser } = route?.params || {};
  const phoneRef = useRef(null);
  const dispatch = useDispatch();

  const [countriesPickerData, setCountriesPickerData] = useState(null);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    // Subscriber for auth state changes
    const subscriber = onAuthStateChanged(auth, user => {
      if (!isUser) {
        
        if (user) {
          console.log('User UID:', user.uid);
          if (isSigningUp) {
            setUserInfo(user.uid, formValues).then(res => {
              handleStoreNavigation(res?.user);
            });
          } else {
            fetchUserProfileViaUUID(userCredential.user.uid).then(res => {
              console.log('USER INFORMATIONuserrrrrrRRRRRRRR', res);
              handleStoreNavigation(res);
            });
          }
  
          // fetchUserProfileViaUUID(user.uid).then(res => {
          //   console.log('USER INFORMATIONUUUUSSSEEEFFFEEECCCTT', res);
          //   if (res.success) {
          //     // sendOTP(number)
          //   } else {
          //     alert(res.message);
          //   }
          // });
          // Successful login: Navigate or update UI
        }
      }
    });
    return subscriber; // cleanup on unmount
  }, []);

  // Initialize countries data from PhoneInput
  useEffect(() => {
    if (phoneRef.current) {
      const countries = phoneRef.current.getPickerData();
      setCountriesPickerData(countries);
    }
  }, []);

  const onPressFlag = () => setCountryModalVisible(true);
  const onPressCancelContryModalPicker = () => setCountryModalVisible(false);

  const selectCountry = country => {
    phoneRef.current.selectCountry(country.iso2);
  };

  // ✅ Create dynamic initial values from config
  const initialValues = useMemo(() => {
    const obj = {
      phoneNumber: '',
      otpCode: '',
    };

    if (isSigningUp) {
      appConfig.smsSignupFields.forEach(f => {
        obj[f.key] = '';
      });
    }

    return obj;
  }, [isSigningUp]);

  // ✅ Dynamic Yup schema from config fields
  const validationSchema = useMemo(() => {
    const shape = {
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .min(7, 'Enter valid phone number'),
    };

    if (isSigningUp) {
      appConfig.smsSignupFields.forEach(f => {
        // ✅ Age validation
        if (f.key === 'age') {
          shape.age = Yup.number()
            .typeError('Age must be a number')
            .min(18, 'You must be at least 18 years old')
            .max(100, 'Age must be less than 100')
            .required('Age is required');
        }
        // ✅ Normal fields validation
        else {
          shape[f.key] = Yup.string().required(`${f.placeholder} is required`);
        }
      });
    }

    shape.otpCode = Yup.string().when([], {
      is: () => !isPhoneVisible,
      then: schema =>
        schema
          .required('OTP is required')
          .matches(/^\d{6}$/, 'OTP must be 6 digits'),
      otherwise: schema => schema.notRequired(),
    });

    return Yup.object().shape(shape);
  }, [isSigningUp, isPhoneVisible]);

  const renderCodeInputCell = ({ index, symbol, isFocused }) => {
    let textChild = symbol;

    if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <CustomText
        key={index}
        style={[styles.codeInputCell, isFocused && styles.focusCell]}
      >
        {textChild}
      </CustomText>
    );
  };

  const findUserByPhone = (number, values) => {
    getUserDataByPhone(number).then(res => {
      console.log('res confirmation', res);
      setIsPhoneVisible(false);
      setFormValues(values);
      if (!res.success) {
        sendOTP(number);
      }
    });
  };
  const sendOTP = number => {
    sendSMSToPhoneNumber(number).then(res => {
      console.log('res confirmation', res);
      setConfirm(res.confirmationResult);
      if (res?.error) {
        alert('Error sending OTP: ' + res.error);
      } else {
        alert('OTP sent successfully');
      }
    });
  };

  const verifyOTP = async (code, values) => {
    try {
      // 1. If this succeeds, the user is authenticated
      const userCredential = await confirm.confirm(code);

      // Successful verification logic here
      console.log('Verification successful! User:', userCredential.user.uid, formValues);
      if (isSigningUp) {
        setUserInfo(userCredential.user.uid, formValues).then(res => {
          handleStoreNavigation(res?.user);
        });
      } else {
        fetchUserProfileViaUUID(userCredential.user.uid).then(res => {
          console.log('USER INFORMATION', res);
          handleStoreNavigation(res);
        });
      }
      // Example: Navigate to Home screen
      // navigation.navigate('Home');
    } catch (error) {
      // If the code is wrong, it enters this block
      console.error('Invalid Verification Code:', error.message);
      alert('The code you entered is incorrect.');
    }
  };

  const handleStoreNavigation = values => {
    dispatch(
      updateUser({
        ...values,
        isLogin: true,
        createdAt: normalizeTimestamp(values?.createdAt),
        lastOnlineTimestamp: normalizeTimestamp(values?.createdAt),
      }),
    );
    setTimeout(() => {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTopTab' }],
      });
    }, 2000);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={values => {
        if (isPhoneVisible) {
          // ✅ Send Code button submit
          const fullPhone =
            phoneRef.current?.getValue?.() || values.phoneNumber;
          findUserByPhone(fullPhone, values);
        } else {
          // ✅ Verify OTP submit
          verifyOTP(values.otpCode, formValues);
          alert('Verify OTP: ' + values.otpCode);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => {
        const renderPhoneInput = () => {
          return (
            <>
              <View style={styles.textInputComponentWrapper}>
                <PhoneInput
                  style={styles.InputContainer}
                  flagStyle={styles.flagStyle}
                  textStyle={styles.phoneInputTextStyle}
                  ref={phoneRef}
                  onPressFlag={onPressFlag}
                  offset={10}
                  initialCountry="in"
                  allowZeroAfterCountryCode
                  onChangePhoneNumber={text => {
                    setFieldValue('phoneNumber', text);
                  }}
                  textProps={{
                    placeholder: 'Phone number',
                    placeholderTextColor: '#aaaaaa',
                  }}
                />
              </View>

              {/* ✅ show phone error */}
              {touched.phoneNumber && errors.phoneNumber ? (
                <CustomText style={{ color: 'red', marginTop: 6 }}>
                  {errors.phoneNumber}
                </CustomText>
              ) : null}

              {countriesPickerData && (
                <CountriesModalPicker
                  data={countriesPickerData}
                  onChange={country => selectCountry(country)}
                  cancelText={'Cancel'}
                  visible={countryModalVisible}
                  onCancel={onPressCancelContryModalPicker}
                />
              )}

              {isSigningUp && (
                <TermsOfUseView
                  tosLink={appConfig.tosLink}
                  privacyPolicyLink={appConfig.privacyPolicyLink}
                  style={styles.tos}
                />
              )}

              <View style={styles.buttonWrapper}>
                <Button
                  label={'Send Code'}
                  labelColor={Colors.white}
                  backgroundColor={Colors.primary}
                  onPress={handleSubmit}
                />
              </View>
            </>
          );
        };

        const renderCodeInput = () => {
          return (
            <>
              <View style={styles.codeFieldContainer}>
                <CodeField
                  value={values.otpCode}
                  onChangeText={text => setFieldValue('otpCode', text)}
                  cellCount={codeInputCellCount}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={renderCodeInputCell}
                />
              </View>

              {/* ✅ otp error */}
              {touched.otpCode && errors.otpCode ? (
                <CustomText style={{ color: 'red', marginTop: 6 }}>
                  {errors.otpCode}
                </CustomText>
              ) : null}

              <View style={styles.buttonWrapper}>
                <Button
                  label={'Verify Code'}
                  labelColor={Colors.white}
                  backgroundColor={Colors.primary}
                  onPress={handleSubmit}
                />
              </View>
            </>
          );
        };

        const renderInputField = (field, index) => {
          const isLast = index === appConfig.smsSignupFields.length - 1;
          const errorMsg =
            touched[field.key] && errors[field.key] ? errors[field.key] : null;

          return (
            <View
              key={index?.toString()}
              style={[
                styles.textInputComponentWrapper,
                isLast && { marginBottom: 0 },
              ]}
            >
              <TextInput
                placeholder={field.placeholder}
                placeholderTextColor="#aaaaaa"
                textInputValueColor={Colors.textHighContrast}
                secureTextEntry={field.secureTextEntry}
                onChangeText={handleChange(field.key)}
                value={values[field.key]}
                keyboardType={field.type}
                underlineColorAndroid="transparent"
                autoCapitalize={field.autoCapitalize}
              />

              {/* ✅ Field error */}
              {errorMsg && (
                <CustomText style={styles.errorText}>{errorMsg}</CustomText>
              )}
            </View>
          );
        };

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

            <KeyboardAwareScrollView
              style={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="always"
            >
              {isSigningUp ? (
                <>
                  <View style={styles.largeHeadingComponentWrapper}>
                    <LargeHeading
                      fontSize={scale(20)}
                      headingText="Create new account"
                      headingColor={Colors.white}
                    />
                  </View>

                  <TNProfilePictureSelector
                    setProfilePictureFile={file => {
                      setProfilePictureFile(file);
                      // if you want validate it via formik:
                      // setFieldValue('profilePicture', file);
                    }}
                  />

                  {appConfig.smsSignupFields.map(renderInputField)}

                  {isPhoneVisible ? renderPhoneInput() : renderCodeInput()}

                  <CustomText style={styles.orTextStyle}>OR</CustomText>

                  <View style={styles.loginMobileLinkWrapper}>
                    <Link
                      label={'Sign in with E-mail'}
                      labelColor={Colors.primary}
                      onPress={() =>
                        navigation.navigate('Signup', {
                          appConfig,
                        })
                      }
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.largeHeadingComponentWrapper}>
                    <LargeHeading
                      headingText="Sign In"
                      headingColor={Colors.white}
                    />
                  </View>

                  {isPhoneVisible ? renderPhoneInput() : renderCodeInput()}

                  <View style={styles.loginMobileLinkWrapper}>
                    <Link
                      label={'Sign in with E-mail'}
                      labelColor={Colors.primary}
                      onPress={() => navigation.navigate('Login')}
                    />
                  </View>
                </>
              )}
            </KeyboardAwareScrollView>
            {loading && <TNActivityIndicator />}
          </CustomSafeAreaView>
        );
      }}
    </Formik>
  );
};

export default SmsAuthenticationScreen;
