import FastImage from '@d11/react-native-fast-image';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../../global/CustomText';
import styles from './styles';

const NoMoreCard = props => {
  return (
    <View style={styles.container}>
      {props.profilePictureURL && (
        <View style={styles.ImageWrapper}>
          <FastImage
            source={{
              uri: props.profilePictureURL,
              priority: FastImage.priority.high,
            }}
            resizeMode="cover"
            style={styles.user_pic_style}
          />
        </View>
      )}

      {props.profilePictureURL ? (
        <CustomText style={styles.empty_state_text_style}>
          There's no one new around you.
        </CustomText>
      ) : (
        <View style={{ width: '75%', alignItems: 'center' }}>
          <CustomText style={[styles.empty_state_text_style]}>
            Please complete your dating profile to view recommendations.
          </CustomText>
        </View>
      )}
    </View>
  );
};

NoMoreCard.propTypes = {
  isProfileComplete: PropTypes.bool,
  profilePictureURL: PropTypes.string,
  url: PropTypes.string,
};

export default NoMoreCard;
