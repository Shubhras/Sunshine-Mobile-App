import { Formik } from 'formik';
import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
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

  const initialValues = {
    firstName: '',
    lastName: '',
    age: '',
    bio: '',
    school: '',
    email: '',
    phone: '',
  };

  const handleSubmit = values => {
    console.log('Submitted Form Data:', values);
    // Add your API call here
    // navigation.goBack();
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

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <ImageBackground
        source={require('../../assets/images/black.png')}
        style={{ flex: 1 }}
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
              <ScrollView bounces={false} overScrollMode="never">
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
      </ImageBackground>
    </CustomSafeAreaView>
  );
};

export default AccountDetails;
