import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../../components/global/CustomText';
import styles from './styles';

const SwipeScreen = () => {
  return (
    <View style={[styles.mainWrapper, { backgroundColor: 'green' }]}>
      <CustomText style={styles.text}>Swipe Screen</CustomText>
    </View>
  );
};

export default SwipeScreen;
