import React, { memo } from 'react';
import {
  Image,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';
import { CustomText } from '../global/CustomText';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { getMessageTime } from '../../constants/helpers/helperFunction';
const ThreadItem = ({ item, isMe, index, isSeen, onLongPress }) => {
  return (
    <View style={styles.chatItemWrapper}>
      {/* LEFT Avatar */}
      {/* {!isMe && (
        <View style={styles.avatarContainer}>
          <View
            style={[
              styles.avatarBadgeContainer,
              { backgroundColor: Colors.onlineMarkColor },
            ]}
          />
          <View style={styles.avatarImageContainer}>
            <Image
              source={{ uri: item.senderProfilePictureURL }}
              style={styles.avatarImage}
            />
          </View>
        </View>
      )} */}

      {/* MESSAGE BUBBLE */}
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
        {/* Text */}
        <CustomText
          style={[
            styles.message,
            { color: isMe ? Colors.mainSubtextColor : Colors.white },
          ]}
        >
          {item.content}
        </CustomText>

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
