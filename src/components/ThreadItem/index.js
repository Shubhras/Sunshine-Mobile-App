import React, { memo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';
import { CustomText } from '../global/CustomText';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { getMessageTime } from '../../constants/helpers/helperFunction';
import FastImage from '@d11/react-native-fast-image';

const ThreadItem = ({ item, isMe, index, isSeen, onLongPress }) => {
  // ✅ Only message image (NOT senderProfilePictureURL)
  const imageUri =
    item?.url || item?.downloadObject?.url || item?.downloadObject?.source;

  const isImageMessage = !!imageUri;

  return (
    <View style={styles.chatItemWrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        onLongPress={onLongPress}
        style={[
          styles.messageWrapper,
          {
            backgroundColor: isMe ? Colors.secondary : Colors.primary,
            alignSelf: isMe ? 'flex-end' : 'flex-start',
            borderTopLeftRadius: isMe ? scale(12) : 0,
            borderTopRightRadius: isMe ? 0 : scale(12),
          },
        ]}
      >
        {/* ✅ IMAGE MESSAGE */}
        {isImageMessage ? (
          <FastImage
            source={{ uri: imageUri, priority: FastImage.priority.high, cache: FastImage.cacheControl.immutable }}
            style={{
              width: scale(220),
              height: scale(220),
              borderRadius: scale(12),
              marginBottom: item?.content ? scale(6) : 0,
            }}
            resizeMode="cover"
          />
        ) : null}

        {/* ✅ TEXT MESSAGE */}
        {!!item?.content && (
          <CustomText
            style={[
              styles.message,
              { color: isMe ? Colors.mainSubtextColor : Colors.white },
            ]}
          >
            {item.content}
          </CustomText>
        )}

        {/* TIME + READ ICON */}
        <View
          style={[
            styles.timeRow,
            { alignSelf: isMe ? 'flex-end' : 'flex-start' },
          ]}
        >
          <CustomText
            style={[
              styles.messageTime,
              {
                textAlign: isMe ? 'left' : 'right',
                color: isMe ? Colors.mainSubtextColor : Colors.white,
              },
            ]}
          >
            {getMessageTime(item.createdAt)}
          </CustomText>

          {isMe && (
            <IonIcons
              name={isSeen ? 'checkmark-done-outline' : 'checkmark-outline'}
              size={scale(14)}
              color={isSeen ? Colors.primary : Colors.mainSubtextColor}
              style={{ marginLeft: scale(4) }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ThreadItem);
