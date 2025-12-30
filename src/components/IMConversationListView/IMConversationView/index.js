import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../global/CustomText';
import IMConversationIconView from '../IMConversationIconView';
import styles from './styles';

function IMConversationView(props) {
  const { onChatItemPress, item, user, onChatLongPress } = props;

  const userID = user.userID || user.id;
  const lastName = item.lastName || '';

  // console.log('item', item.participants)

  let title = item.title;
  const getIsRead = () => {
    return item.markedAsRead;
  };

  const formatMessage = message => {
    const mime = message?.url?.mime || message?.mime;
    if (mime) {
      if (mime.startsWith('video')) {
        return 'Someone sent a video.';
      } else if (mime.startsWith('audio')) {
        return 'Someone sent an audio.';
      } else if (mime.startsWith('image')) {
        return 'Someone sent a photo.';
      }
    }
    if (message?.content && message.content.length > 0) {
      return message?.content;
    } else if (message && message.length > 0) {
      return message;
    } else if (message) {
      return JSON.stringify(message);
    }
    return '';
  };

  const timeFormat = timeStamp => {
    if (timeStamp) {
      if (moment(timeStamp).isValid()) {
        return moment.unix(timeStamp).fromNow();
      }
      if (moment().diff(moment.unix(timeStamp.seconds), 'days') == 0) {
        return moment.unix(timeStamp.seconds).format('H:mm');
      }
      return moment.unix(timeStamp.seconds).fromNow();
    }
    return ' ';
  };

  return (
    <TouchableOpacity
      onPress={() => onChatItemPress(item)}
      onLongPress={onChatLongPress}
      style={styles.chatItemContainer}
    >
      <IMConversationIconView participants={item.participants} />
      <View style={styles.chatItemContent}>
        <CustomText
          style={[styles.chatFriendName, !getIsRead() && styles.unReadmessage]}
        >
          {title}
        </CustomText>

        <View style={styles.content}>
          <CustomText
            numberOfLines={1}
            ellipsizeMode={'middle'}
            style={[styles.message, !getIsRead() && styles.unReadmessage]}
          >
            {formatMessage(item.content)} {' · '}
            <CustomText
              numberOfLines={1}
              ellipsizeMode={'middle'}
              style={[styles.message, !getIsRead() && styles.unReadmessage]}
            >
              {timeFormat(item.createdAt)}
            </CustomText>
          </CustomText>
        </View>

        {/* <Text
          style={[styles.chatFriendName, !getIsRead() && styles.unReadmessage]}>
          {`${item.participants[0].firstName} ${item.participants[0].lastName}`}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
}

IMConversationView.propTypes = {
  item: PropTypes.object,
  onChatItemPress: PropTypes.func,
};

export default IMConversationView;
