import React, { useState } from 'react';
import { View } from 'react-native';
import Button from '../../components/buttons/Button';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Header from '../../components/Header';
import LargeHeading from '../../components/headings/LargeHeading';
import TextInput from '../../components/inputs/TextInput';
import Colors from '../../constants/Colors';
import styles from './styles';

const ResetPasswordScreen = ({ navigation }) => {
  // Local states
  const [email, setEmail] = useState('');

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <Header
        back={true}
        headerBg={Colors.black}
        iconColor={Colors.white}
      />
      {/* Large heading */}
      <View style={styles.largeHeadingComponentWrapper}>
        <LargeHeading headingText="Reset Password" headingColor={Colors.primary} />
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
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default ResetPasswordScreen;
