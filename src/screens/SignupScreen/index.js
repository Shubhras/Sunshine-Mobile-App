// import React, { useState } from 'react';
// import { View } from 'react-native';
// import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
// import Header from '../../components/Header';
// import LargeHeading from '../../components/headings/LargeHeading';
// import Colors from '../../constants/Colors';
// import styles from './styles';
// import TextInput from '../../components/inputs/TextInput';
// import Link from '../../components/links/Link';
// import Button from '../../components/buttons/Button';
// import {
//   isSMSAuthEnabled,
//   privacyPolicyLink,
//   signupFields,
//   STANDARD_SPACING,
//   tosLink,
// } from '../../constants/Constants';
// import { scale } from 'react-native-size-matters';
// import TNProfilePictureSelector from '../../components/TNProfilePictureSelector';
// import TermsOfUseView from '../../components/TermsOfUseView';
// import { CustomText } from '../../components/global/CustomText';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const SignupScreen = ({ navigation }) => {
//   // Local states
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [profilePictureFile, setProfilePictureFile] = useState(null);
//   const [inputFields, setInputFields] = useState({});

//   const onChangeInputFields = (text, key) => {
//     setInputFields(prevFields => ({
//       ...prevFields,
//       [key]: text,
//     }));
//   };

//   const renderInputField = (field, index) => {
//     const isLast = index === signupFields.length - 1;
//     return (
//       <View
//         key={index?.toString()}
//         style={[
//           styles.textInputComponentWrapper,
//           isLast && { marginBottom: 0 },
//         ]}
//       >
//         <TextInput
//           placeholder={field.placeholder}
//           placeholderTextColor="#aaaaaa"
//           secureTextEntry={field.secureTextEntry}
//           onChangeText={text => onChangeInputFields(text, field.key)}
//           value={inputFields[field.key]}
//           keyboardType={field.type}
//           underlineColorAndroid="transparent"
//           autoCapitalize={field.autoCapitalize}
//         />
//       </View>
//     );
//   };

//   const renderSignupWithEmail = () => {
//     return (
//       <>
//         {signupFields.map(renderInputField)}
//         <TermsOfUseView
//           tosLink={tosLink}
//           privacyPolicyLink={privacyPolicyLink}
//           style={styles.tos}
//         />
//         {/* Submit button */}
//         <View style={styles.buttonWrapper}>
//           <Button
//             label={'Sign Up'}
//             labelColor={Colors.white}
//             backgroundColor={Colors.primary}
//           />
//         </View>
//       </>
//     );
//   };

//   // Returning
//   return (
//     <CustomSafeAreaView
//       style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
//     >
//        <Header
//         back={true}
//         titleAlight={'center'}
//         headerBg={Colors.inlineActionsColor}
//         iconColor={Colors.white}
//         title={'Find Your Soulmate'}
//       />
//       <KeyboardAwareScrollView
//         bounces={false}
//         showsVerticalScrollIndicator={false}
//         style={styles.keyboardAwareScrollView}
//         contentContainerStyle={styles.mainScrollView}
//         keyboardShouldPersistTaps="always"
//       >
//         {/* Large heading */}
//         <View style={styles.largeHeadingComponentWrapper}>
//           <LargeHeading
//             fontSize={scale(20)}
//             headingText="Create new account"
//             headingColor={Colors.white}
//           />
//         </View>

//         <TNProfilePictureSelector
//           setProfilePictureFile={setProfilePictureFile}
//         />

//         {renderSignupWithEmail()}
//         {isSMSAuthEnabled && (
//           <>
//             <CustomText style={styles.orTextStyle}>OR</CustomText>
//             {/* Link */}
//             <View style={styles.signWithEmailContainer1}>
//               <Link
//                 label={'Sign up with phone number'}
//                 labelColor={Colors.primary}
//                 onPress={() =>
//                   navigation.navigate('Sms', {
//                     isSigningUp: true,
//                   })
//                 }
//               />
//             </View>
//           </>
//         )}
//       </KeyboardAwareScrollView>
//     </CustomSafeAreaView>
//   );
// };

// export default SignupScreen;

// {
//   /* Text input */
// }
// //  <View style={styles.textInputComponentWrapper}>
// //   <TextInput
// //     placeholder="E-mail"
// //     placeholderTextColor={Colors.inputPlaceholder}
// //     backgroundColor={Colors.black}
// //     textInputValueColor={Colors.textHighContrast}
// //     autoCapitalize={'none'}
// //     keyboardType={'email-address'}
// //     value={email}
// //     onChangeText={text => setEmail(text)}
// //   />
// // </View>

// {
//   /* Text input */
// }
// {
//   /* <View
//         style={[
//           styles.textInputComponentWrapper,
//           { marginBottom: STANDARD_SPACING },
//         ]}
//       >
//         <TextInput
//           placeholder="Password"
//           placeholderTextColor={Colors.inputPlaceholder}
//           backgroundColor={Colors.black}
//           textInputValueColor={Colors.white}
//           secureTextEntry={true}
//           value={password}
//           onChangeText={text => setPassword(text)}
//         />
//       </View> */
// }

import React, { use, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale } from 'react-native-size-matters';
import Header from '../../components/Header';
import TNProfilePictureSelector from '../../components/TNProfilePictureSelector';
import TermsOfUseView from '../../components/TermsOfUseView';
import Button from '../../components/buttons/Button';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { CustomText } from '../../components/global/CustomText';
import LargeHeading from '../../components/headings/LargeHeading';
import TextInput from '../../components/inputs/TextInput';
import Link from '../../components/links/Link';
import Colors from '../../constants/Colors';
import {
  isSMSAuthEnabled,
  privacyPolicyLink,
  signupFields,
  tosLink,
} from '../../constants/Constants';
import styles from './styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showToast } from '../../components/alerts/Toast/ToastManager';
import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { register, updateProfilePhoto } from '../../api/firebase/auth';
import { localizedErrorMessage } from '../../utils/ErrorCode';
import { processAndUploadMediaFile } from '../../api/firebase/storage';
import { defaultProfilePhotoURL } from '../../constants/images';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/SessionUser';
import TNActivityIndicator from '../../components/TNActivityIndicator';

// Validation Schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    )
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  age: Yup.number()
    .min(18, 'You must be at least 18 years old')
    .max(100, 'Age must be less than 100')
    .required('Age is required'),
});

const SignupScreen = ({ navigation, route }) => {
  const { appIdentifier } = route.params || {};
  const dispatch = useDispatch();
  // Local states
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  console.log('Profile Picture File:', profilePictureFile);
  const [loading, setLoading] = useState(false);
  const initialValues = signupFields.reduce((acc, field) => {
    acc[field.key] = '';
    return acc;
  }, {});

  const trimFields = fields => {
    var trimmedFields = {};
    Object.keys(fields).forEach(key => {
      if (fields[key]) {
        trimmedFields[key] = fields[key].trim();
      }
    });
    return trimmedFields;
  };

  const handleSignup = async (values, { setSubmitting, setErrors }) => {
    if (!profilePictureFile) {
      showToast({
        title: 'Profile Picture Required',
        text: 'Please upload your profile picture to continue.',
        duration: 2000,
        type: 'error',
      });
      setSubmitting(false);
      return;
    }
    setLoading(true);
    const userDetails = {
      ...trimFields(values),
      photoFile: profilePictureFile,
    };
    await register(userDetails, appIdentifier)
      .then(response => {
        if (response.error) {
          setSubmitting(false);
          setLoading(false);
          showToast({
            title: 'Signup Failed',
            text: response?.error?.message || 'Unable to create account',
            duration: 3000,
            type: 'error',
          });
        } else {
          let user = response.user;
          if (profilePictureFile) {
            processAndUploadMediaFile(profilePictureFile).then(response => {
              if (response.error) {
                dispatch(
                  updateUser({
                    ...user,
                    profilePictureURL: defaultProfilePhotoURL,
                  }),
                );
                setLoading(false);
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'HomeScreen' }],
                });
                // dispatch
              } else {
                updateProfilePhoto(user.id, response.downloadURL).then(
                  _result => {
                    dispatch(
                      updateUser({
                        ...user,
                        profilePictureURL: response.downloadURL,
                      }),
                    );
                    setLoading(false);
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'HomeScreen' }],
                    });
                  },
                );
              }
            });
          } else {
            dispatch(
              updateUser({
                ...user,
                profilePictureURL: defaultProfilePhotoURL,
              }),
            );
            setLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            });
          }
        }
      })
      .catch(error => {
        console.error('Unexpected error:', error);
        setSubmitting(false);
        setLoading(false);
        showToast({
          title: 'Error',
          text: 'An unexpected error occurred',
          duration: 3000,
          type: 'error',
        });
      });
  };

  const onChangeInputFields = (text, key) => {
    setInputFields(prevFields => ({
      ...prevFields,
      [key]: text,
    }));
  };

  const renderInputField = (field, index, formik) => {
    const isLast = index === signupFields.length - 1;
    const fieldError = formik.touched[field.key] && formik.errors[field.key];
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
          onChangeText={formik.handleChange(field.key)}
          onBlur={formik.handleBlur(field.key)}
          value={formik.values[field.key]}
          keyboardType={field.type}
          underlineColorAndroid="transparent"
          autoCapitalize={field.autoCapitalize}
        />
        {fieldError && (
          <CustomText style={styles.errorText}>
            {formik.errors[field.key]}
          </CustomText>
        )}
      </View>
    );
  };

  const renderSignupWithEmail = formik => {
    return (
      <>
        {signupFields.map((field, index) =>
          renderInputField(field, index, formik),
        )}

        {formik.errors.submit && (
          <CustomText style={styles.errorText}>
            {formik.errors.submit}
          </CustomText>
        )}

        <TermsOfUseView
          tosLink={tosLink}
          privacyPolicyLink={privacyPolicyLink}
          style={styles.tos}
        />
        {/* Submit button */}
        <View style={styles.buttonWrapper}>
          <Button
            label={'Sign Up'}
            labelColor={Colors.white}
            backgroundColor={Colors.primary}
            // onPress={()=>{
            //    if (profilePictureFile) {
            //   processAndUploadMediaFile(profilePictureFile).then(response => {
            //     console.log("ERERERERERERERERERERERE:",response);
            //     // if (response.error) {
            //     //   // if account gets created, but photo upload fails, we still log the user in

            //     // } else {
            //     //   authAPI
            //     //     .updateProfilePhoto(user.id, response.downloadURL)
            //     //     .then(_result => {
            //     //       resolve({
            //     //         user: {
            //     //           ...user,
            //     //           profilePictureURL: response.downloadURL,
            //     //         },
            //     //       })
            //     //     })
            //     // }
            //   })
            // }
            // }}
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting || !formik.isValid}
          />
        </View>
      </>
    );
  };

  // Returning
  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <Header
        back={true}
        titleAlight={'center'}
        headerBg={Colors.inlineActionsColor}
        iconColor={Colors.white}
        title={'Find Your Soulmate'}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
        validateOnMount={false}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {formik => (
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={styles.keyboardAwareScrollView}
            contentContainerStyle={styles.mainScrollView}
            keyboardShouldPersistTaps="always"
          >
            {/* Large heading */}
            <View style={styles.largeHeadingComponentWrapper}>
              <LargeHeading
                fontSize={scale(20)}
                headingText="Create new account"
                headingColor={Colors.white}
              />
            </View>

            <TNProfilePictureSelector
              setProfilePictureFile={setProfilePictureFile}
            />

            {renderSignupWithEmail(formik)}
            {isSMSAuthEnabled && (
              <>
                <CustomText style={styles.orTextStyle}>OR</CustomText>
                {/* Link */}
                <View style={styles.signWithEmailContainer1}>
                  <Link
                    label={'Sign up with phone number'}
                    labelColor={Colors.primary}
                    onPress={() =>
                      navigation.navigate('Sms', {
                        isSigningUp: true,
                      })
                    }
                  />
                </View>
              </>
            )}
          </KeyboardAwareScrollView>
        )}
      </Formik>
      {loading && <TNActivityIndicator />}
    </CustomSafeAreaView>
  );
};

export default SignupScreen;
