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

const HomeScreen = ({ navigation }) => {
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
        title={'HomeScreen'}
      />
     
    </CustomSafeAreaView>
  );
};

export default HomeScreen;
