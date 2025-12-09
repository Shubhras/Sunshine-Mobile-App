import React, { useEffect, useRef, useState } from 'react';
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

const codeInputCellCount = 6;

const SmsAuthenticationScreen = ({ navigation, route }) => {
  const appConfig = DatingConfig;
  const { isSigningUp } = route?.params || {};
  // Phone input ref
  const phoneRef = useRef(null);
  // Local states
  const [inputFields, setInputFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [countriesPickerData, setCountriesPickerData] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [codeInputValue, setCodeInputValue] = useState('');

  const myCodeInput = useBlurOnFulfill({
    codeInputValue,
    value: codeInputValue,
    cellCount: codeInputCellCount,
  });
  const [codeInputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    codeInputValue,
    value: codeInputValue,
    setCodeInputValue,
    setValue: setCodeInputValue,
  });

  // Initialize countries data from PhoneInput
  useEffect(() => {
    if (phoneRef.current) {
      const countries = phoneRef.current.getPickerData();
      setCountriesPickerData(countries);
    }
  }, []);

  const onPressFlag = () => {
    setCountryModalVisible(true);
  };

  const onPressCancelContryModalPicker = () => {
    setCountryModalVisible(false);
  };

  const onChangeInputFields = (text, key) => {
    setInputFields(prevFields => ({
      ...prevFields,
      [key]: text,
    }));
  };

  const selectCountry = country => {
    phoneRef.current.selectCountry(country.iso2);
  };

  const renderPhoneInput = () => {
    return (
      <>
        {/* Text input */}
        <View style={styles.textInputComponentWrapper}>
          <PhoneInput
            style={styles.InputContainer}
            flagStyle={styles.flagStyle}
            textStyle={styles.phoneInputTextStyle}
            ref={phoneRef}
            onPressFlag={onPressFlag}
            offset={10}
            allowZeroAfterCountryCode
            textProps={{
              placeholder: 'Phone number',
              placeholderTextColor: '#aaaaaa',
            }}
          />
        </View>

        {countriesPickerData && (
          <CountriesModalPicker
            data={countriesPickerData}
            onChange={country => {
              selectCountry(country);
            }}
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

        {/* Send Button */}
        <View style={styles.buttonWrapper}>
          <Button
            label={'Send Code'}
            labelColor={Colors.white}
            backgroundColor={Colors.primary}
          />
        </View>
      </>
    );
  };

  const renderCodeInputCell = ({ index, symbol, isFocused }) => {
    let textChild = symbol;

    if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.codeInputCell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };

  const renderCodeInput = () => {
    return (
      <View style={styles.codeFieldContainer}>
        <CodeField
          ref={myCodeInput}
          {...codeInputProps}
          value={codeInputValue}
          onChangeText={setCodeInputValue}
          cellCount={codeInputCellCount}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCodeInputCell}
        />
      </View>
    );
  };

  const renderInputField = (field, index) => {
    const isLast = index === appConfig.smsSignupFields.length - 1;
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
          secureTextEntry={field.secureTextEntry}
          onChangeText={text => onChangeInputFields(text, field.key)}
          value={inputFields[field.key]}
          keyboardType={field.type}
          underlineColorAndroid="transparent"
          autoCapitalize={field.autoCapitalize}
        />
      </View>
    );
  };

  const renderAsSignUpState = () => {
    return (
      <>
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
        {appConfig.smsSignupFields.map(renderInputField)}

        {isPhoneVisible ? renderPhoneInput() : renderCodeInput()}
         <CustomText style={styles.orTextStyle}>OR</CustomText>
        {/* Link */}
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
    );
  };

  const renderAsLoginState = () => {
    return (
      <>
        <View style={styles.largeHeadingComponentWrapper}>
          <LargeHeading headingText="Sign In" headingColor={Colors.white} />
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
        {isSigningUp && renderAsSignUpState()}
        {!isSigningUp && renderAsLoginState()}
      </KeyboardAwareScrollView>
    </CustomSafeAreaView>
  );
};

export default SmsAuthenticationScreen;
