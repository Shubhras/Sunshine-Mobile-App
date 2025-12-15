import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../../components/global/CustomText';
import styles from './styles';

const ChatScreen = () => {
  return (
    <View style={[styles.mainWrapper, { backgroundColor: 'green' }]}>
      <CustomText style={styles.text}>Chat Screen</CustomText>
    </View>
  );
};

export default ChatScreen;
