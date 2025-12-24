import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, ImageBackground, ScrollView, View } from 'react-native';
import * as Yup from 'yup';
import ProfileHeader from '../../components/ProfileHeader';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import {
  CustomText,
  CustomTextInput,
} from '../../components/global/CustomText';
import Colors from '../../constants/Colors';
import DatingConfig from '../../data/DatingConfig';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, updateUserInfo } from '../../api/firebase/auth';
import { logoutUser, updateUser } from '../../redux/slices/SessionUser';
import { showToast } from '../../components/alerts/Toast/ToastManager';
import TNActivityIndicator from '../../components/TNActivityIndicator';
import Button from '../../components/buttons/Button';
import { ErrorCode, localizedErrorMessage } from '../../utils/ErrorCode';

const editInputField = DatingConfig.editProfileFields.sections;

const regexForNames = /^[A-Za-z\s]+$/; // Only alphabets & space
const regexForAge = /^(1[89]|[2-9][0-9]|100)$/; // 18 to 100
const regexForPhoneNumber = /^\+?[0-9]{10,15}$/; // Basic international phone

// Yup Validation Schema (English messages)
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .matches(regexForNames, 'Only alphabets are allowed')
    .trim(),
  lastName: Yup.string()
    .required('Last Name is required')
    .matches(regexForNames, 'Only alphabets are allowed')
    .trim(),
  age: Yup.string()
    .required('Age is required')
    .matches(regexForAge, 'Please enter a valid age')
    .test('age-range', 'Age must be between 18 and 100', value => {
      if (!value) return true;
      const ageNum = parseInt(value, 10);
      return ageNum >= 18 && ageNum <= 100;
    }),
  bio: Yup.string().max(500, 'Bio cannot exceed 500 characters').trim(),
  school: Yup.string().max(100, 'Education level is too long').trim(),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(regexForPhoneNumber, 'Please enter a valid phone number')
    .nullable(),
});

const AccountDetails = ({ route, navigation }) => {
  const { title } = route.params;

  const userInfo = useSelector(state => state.users.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  console.log('userInfouserInfouserInfo', userInfo);

  const initialValues = {
    firstName: userInfo?.firstName ?? '',
    lastName: userInfo?.lastName ?? '',
    age: userInfo?.age ?? '',
    bio: userInfo?.bio ?? '',
    school: userInfo?.school ?? '',
    email: userInfo?.email ?? '',
    phone: userInfo?.phone ?? '',
  };

  const handleSubmit = values => {
    console.log('Submitted Form Data:', values);
    // Add your API call here
    setLoading(true);
    updateUserInfo(userInfo?.userID, values)
      .then(res => {
        dispatch(updateUser({ ...userInfo, ...values }));
        console.log('resrsrrrrrsrrsrsrsrsrsrrs', res);

        setLoading(false);
        navigation.goBack();
      })
      .catch(error => {
        // const { message } = error;
        setLoading(false);
        dispatch(updateUser({ ...userInfo }));
        showToast({
          title: 'Update Failed',
          text: 'Unable to update user information. Please try again.',
          duration: 2000,
          type: 'error',
        });
      });

    //
  };

  const renderTextField = (field, index, totalLen, formik) => {
    const value = formik.values[field.key] ?? '';
    const error = formik.errors[field.key];
    const touched = formik.touched[field.key];
    const showError = Boolean(touched && error);

    return (
      <View key={field.key}>
        <View style={styles.settingsTypeContainer}>
          <CustomText style={styles.inputTitle}>{field.displayName}</CustomText>
          <View style={styles.textinputWrapper}>
            <CustomTextInput
              style={styles.textInput}
              value={value}
              onChangeText={formik.handleChange(field.key)}
              onBlur={formik.handleBlur(field.key)}
              placeholder={field.placeholder}
              placeholderTextColor={Colors.inputPlaceholder}
              keyboardType={field.keyboardType || 'default'}
              selectionColor={Colors.primary}
              multiline={field.multiline === true}
              numberOfLines={field.multiline ? 4 : 1}
              editable={field.editable !== false}
              autoCapitalize={field.key === 'email' ? 'none' : 'words'}
            />
            {showError && (
              <CustomText style={styles.errorText}>{error}</CustomText>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderSection = (section, formik) => {
    return (
      <View key={section.title}>
        <View style={styles.settingsTitleContainer}>
          <CustomText style={styles.settingsTitle}>{section.title}</CustomText>
        </View>
        <View style={styles.contentContainer}>
          {section.fields.map((field, index) => {
            if (field.type === 'text') {
              return renderTextField(
                field,
                index,
                section.fields.length,
                formik,
              );
            }
            return null;
          })}
        </View>
      </View>
    );
  };

  const onDeletePrompt = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to remove your account? This will delete all your data and the action is not reversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => onDeleteAccount(), // ✅ correct
          style: 'destructive',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  };

  const onDeleteAccount = () => {
    setLoading(true);
    removeUser(userInfo?.userID).then(response => {
      if (response.success) {
        Alert.alert('Success', 'Successfully deleted account');
        handleLogout();

        return;
      }
      if (response.error === ErrorCode.requiresRecentLogin) {
        setLoading(false);
        Alert.alert('Error', localizedErrorMessage(response?.error));
        return;
      } else {
        Alert.alert('Error', 'We were not able to delete your account');
        setLoading(false);
      }
    });
  };

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <ImageBackground
        source={require('../../assets/images/black.png')}
        style={{ flex: 1, backgroundColor: Colors.error }}
        resizeMode="cover"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formik => (
            <>
              <ProfileHeader
                back={true}
                titleAlight={'center'}
                headerBg={Colors.black}
                iconColor={Colors.white}
                title={title}
                right={true}
                rightTitle={'Done'}
                onRightPress={formik.handleSubmit}
              />
              <ScrollView
                bounces={false}
                overScrollMode="never"
                contentContainerStyle={[
                  styles.scrollViewWrapper,
                  { backgroundColor: Colors.black },
                ]}
              >
                <View
                  style={[
                    styles.mainWrapper,
                    { backgroundColor: Colors.black },
                  ]}
                >
                  {editInputField?.map(section =>
                    renderSection(section, formik),
                  )}
                </View>
              </ScrollView>
            </>
          )}
        </Formik>
        <View style={styles.buttonWrapper}>
          <Button
            label={'Delete Account'}
            labelColor={Colors.error}
            onPress={() => {
              onDeletePrompt();
            }}
          />
          <Button
            label={'Restore Purchase'}
            labelColor={Colors.primary}
            onPress={() => {
              alert('subscription module IN development');
            }}
          />
        </View>
        {loading && <TNActivityIndicator />}
      </ImageBackground>
    </CustomSafeAreaView>
  );
};

export default AccountDetails;
