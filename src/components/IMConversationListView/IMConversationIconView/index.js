import React, { useState, memo, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from '@d11/react-native-fast-image';
import styles from './styles';
import { defaultProfilePhotoURL } from '../../../constants/images';

const Image = FastImage;

const defaultAvatar = defaultProfilePhotoURL

const IMConversationIconView = memo(props => {
  const { participants, imageStyle, style } = props;

  const [profileImage, setProfileImage] = useState('');
  const [profileImage1, setProfileImage1] = useState('');


  useEffect(() => {
    if (
      participants[0].profilePictureURL ===
      'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pic2.jpg?alt=media&token=0afb6fe0-16c4-4600-8b81-5dbd618c71d5'
    ) {
      setProfileImage(
        'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pics.png?alt=media&token=c387f3dc-00bc-4535-be43-0d46f3b44bc0',
      );
    } else {
      setProfileImage(participants[0].profilePictureURL);
    }
  }, [participants[0].profilePictureURL]);

  const [imgErr, setImgErr] = useState(false);
  const [secondImgErr, setSecondImgErr] = useState(false);

  let firstUri = profileImage;
  // participants.length > 0 &&
  // participants[0].profilePictureURL &&
  // participants[0].profilePictureURL.length > 0
  //   ? participants[0].profilePictureURL
  //   : defaultAvatar
  let secondUri =
    participants.length > 1 &&
    participants[1].profilePictureURL &&
    participants[1].profilePictureURL.length > 0
      ? participants[1].profilePictureURL
      : defaultAvatar;

  const onImageError = () => {
    setImgErr(true);
  };

  const onSecondImageError = () => {
    setSecondImgErr(true);
  };

  return (
    <View style={styles.container}>
      {participants.length == 0 && (
        <View style={styles.singleParticipation}>
          <Image
            style={styles.singleChatItemIcon}
            source={{ uri: defaultAvatar }}
          />
        </View>
      )}

      {participants.length === 1 && (
        <View style={style ? style : styles.singleParticipation}>
          <Image
            style={[styles.singleChatItemIcon, imageStyle]}
            onError={onImageError}
            source={{uri:  profileImage }}
            // source={imgErr ? { uri: defaultAvatar } : { uri: profileImage }}
          />
          {participants[0].isOnline && <View style={styles.onlineMark} />}
        </View>
      )}

      {participants.length > 1 && (
        <View style={styles.multiParticipation}>
          <Image
            style={[styles.multiPaticipationIcon, styles.bottomIcon]}
            onError={onImageError}
            source={imgErr ? { uri: defaultAvatar } : { uri: firstUri }}
          />

          <View style={styles.middleIcon} />
          <Image
            style={[styles.multiPaticipationIcon, styles.topIcon]}
            onError={onSecondImageError}
            source={secondImgErr ? { uri: defaultAvatar } : { uri: secondUri }}
          />
        </View>
      )}
    </View>
  );
});

IMConversationIconView.propTypes = {
  participants: PropTypes.array,
  style: PropTypes.object,
};

export default IMConversationIconView;
