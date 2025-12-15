import React from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { CustomText } from '../../components/global/CustomText';
import Colors from '../../constants/Colors';
import styles from './styles';
import { View } from 'react-native';

const MyProfileScreen = () => {
  return (
    <View style={[styles.mainWrapper, { backgroundColor: 'green' }]}>
      <CustomText style={styles.text}>My Profile Screen</CustomText>
    </View>
  );
};

export default MyProfileScreen;
