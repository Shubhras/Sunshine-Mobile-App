import FastImage from '@d11/react-native-fast-image';
import { memo } from 'react';
import { View } from 'react-native';
import { CustomText } from '../../global/CustomText';
import styles from './styles';

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
}) {
  return (
    <View key={index} style={styles.itemListWrapper}>
      <View style={styles.blockUserImageAndLabelWrapper}>
        <View style={styles.blockUserImageWrapper}>
          <FastImage
            style={[styles.blockUserImage]}
            source={{
              uri: blockUserImage,
              priority: FastImage.priority.high,
            }}
            resizeMode="cover"
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
        <View style={styles.unblockWrapper}>
          <CustomText style={[styles.unblock, { color: unblockColor }]}>
            unblock
          </CustomText>
        </View>
      )}
    </View>
  );
}

// Exporting
export default memo(BlockUserItemCard);
