import FastImage from '@d11/react-native-fast-image';
import { memo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { CustomText } from '../../global/CustomText';
import styles from './styles';
import { defaultProfilePhotoURL } from '../../../constants/images';

// Functional component
function BlockUserItemCard({
  index,
  blockUserImage,
  blockUserName,
  blockUserNameColor,
  blockUserEmail,
  blockUserEmailColor,
  unblock,
  unblockColor,
  onPressUnblock
}) {
  const [imageError, setImageError] = useState(false);
  return (
    <View key={index} style={styles.itemListWrapper}>
      <View style={styles.blockUserImageAndLabelWrapper}>
        <View style={styles.blockUserImageWrapper}>
          <FastImage
            style={styles.blockUserImage}
            source={{
              uri: imageError
                ? defaultProfilePhotoURL
                : blockUserImage || defaultProfilePhotoURL,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onError={() => setImageError(true)}
          />
        </View>
        <View style={styles.blockUserDetails}>
          <CustomText
            style={[styles.blockUserName, { color: blockUserNameColor }]}
          >
            {blockUserName}
          </CustomText>
          <CustomText
            style={[styles.blockUserEmail, { color: blockUserEmailColor }]}
          >
            {blockUserEmail}
          </CustomText>
        </View>
      </View>
      {unblock && (
        <Pressable style={styles.unblockWrapper} onPress={onPressUnblock}>
          <CustomText style={[styles.unblock, { color: unblockColor }]}>
            Unblock
          </CustomText>
        </Pressable>
      )}
    </View>
  );
}

// Exporting
export default memo(BlockUserItemCard);
