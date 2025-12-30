import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import IonIcons from 'react-native-vector-icons/Ionicons';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Colors from '../../constants/Colors';
import ChatData from '../../data/ChatData';
import styles from './styles';
import { CustomText } from '../../components/global/CustomText';
import Header from '../../components/Header';
import ProfileHeader from '../../components/ProfileHeader';

const ChatScreen = () => {
  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <ProfileHeader
        back={true}
        headerBg={Colors.black}
        title={'Test user'}
        iconColor={Colors.white}
      />
      {/* Scroll view */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        {ChatData.map((chat, chatIndex) => {
          return (
            // Chat item container
            <View
              key={chatIndex}
              style={[
                chatIndex !== 0
                  ? styles.chatItemWrapper
                  : [
                      styles.chatItemWrapper,
                      styles.chatItemWrapperWithMarginTop,
                    ],
              ]}
            >
              {/* Avatar container */}
              {chat.align === 'left' ? (
                <View style={[styles.avatarContainer]}>
                  {/* Avatar badge container */}
                  <View
                    style={[
                      styles.avatarBadgeContainer,
                      {
                        backgroundColor: chat.isOnline
                          ? Colors.onlineMarkColor
                          : Colors.primary,
                      },
                    ]}
                  />

                  <View style={[styles.avatarImageContainer]}>
                    {/* Avatar */}
                    <Image source={chat.avatar} style={[styles.avatarImage]} />
                  </View>
                </View>
              ) : null}
              {chat.messages.map((message, messageIndex) => {
                return (
                  // Text message container
                  <View
                    key={messageIndex}
                    style={[
                      {
                        backgroundColor:
                          chat.align === 'left'
                            ? Colors.primary
                            : Colors.secondary,
                        alignSelf:
                          chat.align === 'left' ? 'flex-start' : 'flex-end',
                      },
                      chat.align === 'left'
                        ? { borderTopLeftRadius: 0 }
                        : { borderTopRightRadius: 0 },
                      styles.messageWrapper,
                    ]}
                  >
                    {/* Text message */}
                    <CustomText
                      style={[
                        {
                          color:
                            chat.align === 'right'
                              ? Colors.mainSubtextColor
                              : Colors.white,
                        },
                        styles.message,
                      ]}
                    >
                      {message.text}
                    </CustomText>
                  </View>
                );
              })}
              {chat.align === 'left' ? (
                // Received message age
                <CustomText
                  style={[
                    styles.messageAge,
                    { color: Colors.mainSubtextColor },
                  ]}
                >
                  {chat.age}
                </CustomText>
              ) : (
                // Sent message status
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <CustomText
                    style={[
                      styles.seenLabel,
                      { color: Colors.mainSubtextColor },
                    ]}
                  >
                    {chat.seen}
                  </CustomText>
                  {/* Seen checkmark */}
                  <IonIcons
                    name="checkmark-done-outline"
                    size={scale(16)}
                    color={Colors.primary}
                  />
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footerWrapper, { backgroundColor: Colors.black }]}>
        {/* Chat text input container */}
        <View
          style={[
            styles.chatTextInputContainer,
            { backgroundColor: Colors.grey6 },
          ]}
        >
          {/* Text input */}
          <TextInput
            placeholder="Type your message..."
            placeholderTextColor={Colors.mainSubtextColor}
            style={[styles.chatTextInput]}
            allowFontScaling={false}
          />
          {/* Emoji icon container */}
          <TouchableOpacity
            style={[
              styles.emojiIconContainer,
              { backgroundColor: Colors.white },
            ]}
            onPress={() => alert('Clicked on emoji icon!')}
          >
            <IonIcons
              name="camera-outline"
              size={scale(20)}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Send button */}
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: Colors.primary }]}
          onPress={() => alert('Clicked on send button!')}
        >
          {/* Send icon */}
          <IonIcons name="send" size={scale(20)} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  );
};

export default ChatScreen;
