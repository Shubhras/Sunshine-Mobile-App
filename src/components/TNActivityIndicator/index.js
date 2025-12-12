import React from 'react';
import { View } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { CustomText } from '../global/CustomText';
import styles from './styles';

const TNActivityIndicator = props => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <UIActivityIndicator
          color="#f5f5f5"
          size={30}
          animationDuration={400}
        />
        {props.text && props.text.length > 1 && (
          <CustomText style={styles.text}>{props.text}</CustomText>
        )}
      </View>
    </View>
  );
};

export default TNActivityIndicator;
