import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../../components/global/CustomText';
import Colors from '../../constants/Colors';
import styles from './styles';

const SwipeScreen = () => {
  return (
    <View style={[styles.mainWrapper, { backgroundColor: Colors.black }]}>
      <CustomText style={styles.text}>Swipe Screen</CustomText>
    </View>
  );
};

export default SwipeScreen;
