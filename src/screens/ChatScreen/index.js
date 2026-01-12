// import {
//   Image,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { scale } from 'react-native-size-matters';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
// import Colors from '../../constants/Colors';
// import ChatData from '../../data/ChatData';
// import styles from './styles';
// import { CustomText } from '../../components/global/CustomText';
// import Header from '../../components/Header';
// import ProfileHeader from '../../components/ProfileHeader';

// const ChatScreen = ({navigation, route}) => {
//    console.log('channel-------', route)
//   return (
//     <CustomSafeAreaView
//       style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
//     >
//       <ProfileHeader
//         back={true}
//         headerBg={Colors.black}
//         title={'Test user'}
//         iconColor={Colors.white}
//       />
//       {/* Scroll view */}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         bounces={false}
//         overScrollMode="never"
//       >
//         {ChatData.map((chat, chatIndex) => {
//           return (
//             // Chat item container
//             <View
//               key={chatIndex}
//               style={[
//                 chatIndex !== 0
//                   ? styles.chatItemWrapper
//                   : [
//                       styles.chatItemWrapper,
//                       styles.chatItemWrapperWithMarginTop,
//                     ],
//               ]}
//             >
//               {/* Avatar container */}
//               {chat.align === 'left' ? (
//                 <View style={[styles.avatarContainer]}>
//                   {/* Avatar badge container */}
//                   <View
//                     style={[
//                       styles.avatarBadgeContainer,
//                       {
//                         backgroundColor: chat.isOnline
//                           ? Colors.onlineMarkColor
//                           : Colors.primary,
//                       },
//                     ]}
//                   />

//                   <View style={[styles.avatarImageContainer]}>
//                     {/* Avatar */}
//                     <Image source={chat.avatar} style={[styles.avatarImage]} />
//                   </View>
//                 </View>
//               ) : null}
//               {chat.messages.map((message, messageIndex) => {
//                 return (
//                   // Text message container
//                   <View
//                     key={messageIndex}
//                     style={[
//                       {
//                         backgroundColor:
//                           chat.align === 'left'
//                             ? Colors.primary
//                             : Colors.secondary,
//                         alignSelf:
//                           chat.align === 'left' ? 'flex-start' : 'flex-end',
//                       },
//                       chat.align === 'left'
//                         ? { borderTopLeftRadius: 0 }
//                         : { borderTopRightRadius: 0 },
//                       styles.messageWrapper,
//                     ]}
//                   >
//                     {/* Text message */}
//                     <CustomText
//                       style={[
//                         {
//                           color:
//                             chat.align === 'right'
//                               ? Colors.mainSubtextColor
//                               : Colors.white,
//                         },
//                         styles.message,
//                       ]}
//                     >
//                       {message.text}
//                     </CustomText>
//                   </View>
//                 );
//               })}
//               {chat.align === 'left' ? (
//                 // Received message age
//                 <CustomText
//                   style={[
//                     styles.messageAge,
//                     { color: Colors.mainSubtextColor },
//                   ]}
//                 >
//                   {chat.age}
//                 </CustomText>
//               ) : (
//                 // Sent message status
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignSelf: 'flex-end',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <CustomText
//                     style={[
//                       styles.seenLabel,
//                       { color: Colors.mainSubtextColor },
//                     ]}
//                   >
//                     {chat.seen}
//                   </CustomText>
//                   {/* Seen checkmark */}
//                   <IonIcons
//                     name="checkmark-done-outline"
//                     size={scale(16)}
//                     color={Colors.primary}
//                   />
//                 </View>
//               )}
//             </View>
//           );
//         })}
//       </ScrollView>

//       {/* Footer */}
//       <View style={[styles.footerWrapper, { backgroundColor: Colors.black }]}>
//         {/* Chat text input container */}
//         <View
//           style={[
//             styles.chatTextInputContainer,
//             { backgroundColor: Colors.grey6 },
//           ]}
//         >
//           {/* Text input */}
//           <TextInput
//             placeholder="Type your message..."
//             placeholderTextColor={Colors.mainSubtextColor}
//             style={[styles.chatTextInput]}
//             allowFontScaling={false}
//           />
//           {/* Emoji icon container */}
//           <TouchableOpacity
//             style={[
//               styles.emojiIconContainer,
//               { backgroundColor: Colors.white },
//             ]}
//             onPress={() => alert('Clicked on emoji icon!')}
//           >
//             <IonIcons
//               name="camera-outline"
//               size={scale(20)}
//               color={Colors.primary}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Send button */}
//         <TouchableOpacity
//           style={[styles.sendButton, { backgroundColor: Colors.primary }]}
//           onPress={() => alert('Clicked on send button!')}
//         >
//           {/* Send icon */}
//           <IonIcons name="send" size={scale(20)} color={Colors.white} />
//         </TouchableOpacity>
//       </View>
//     </CustomSafeAreaView>
//   );
// };

// export default ChatScreen;

import React, { useEffect, useRef, useState } from 'react';
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
import { scale } from 'react-native-size-matters';
import IonIcons from 'react-native-vector-icons/Ionicons';
import * as channelManager from '../../api/firebase/channel';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import Colors from '../../constants/Colors';
import ChatData from '../../data/ChatData';
import styles from './styles';
import { CustomText } from '../../components/global/CustomText';
import ProfileHeader from '../../components/ProfileHeader';
import { useSelector } from 'react-redux';
import SingleChannelTracker from '../../api/firebase/singleChannelTracker';
import ThreadItem from '../../components/ThreadItem';
import ChatHeader from '../../components/ChatHeader';
import ActionSheet from 'react-native-actions-sheet';
import * as reportingManager from '../../api/firebase/reportingManager';
import { getImagesForUsers } from '../../constants/helpers/helperFunction';
import { processAndUploadMediaFileWithProgressTracking } from '../../api/firebase/storage';

const ChatScreen = ({ navigation, route }) => {
  const openedFromPushNotification = route?.params?.openedFromPushNotification;
  const otherUserInfo = route?.params?.otherUser;
  const flatListRef = useRef(null);
  const chatSettingsActionSheetRef = useRef(null);
  const chatImageSendActionSheetRef = useRef(null);
  const chatMsgActionSheetRef = useRef(null);
  const threadUnsubscribe = useRef(null);
  const singleChannelTracker = useRef(null);
  const userInfo = useSelector(state => state.users.users);
  const currentUser = useSelector(state => state.users.users);
  const isNumrology = route?.params?.isNumrology || false;
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState(ChatData);
  const [channel, setChannel] = useState(null);
  const [thread, setThread] = useState(null);
  const [downloadObject, setDownloadObject] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  useEffect(() => {
    const hydratedChannel = channelWithHydratedOtherParticipants(
      route.params?.channel,
    );
    if (!hydratedChannel) {
      return;
    }
    setChannel(hydratedChannel);

    singleChannelTracker.current = new SingleChannelTracker(
      hydratedChannel,
      userInfo?.id,
    );
    singleChannelTracker.current.subscribe(onRemoteChannelRetrieved, setThread);
  }, [userInfo?.id]);

  const onRemoteChannelRetrieved = remoteChannel => {
    if (!remoteChannel) {
      return;
    }
    // We have a hydrated channel, so we replace the partial channel we have on the state
    const hydratedChannel = channelWithHydratedOtherParticipants(remoteChannel);
    setChannel(hydratedChannel);
    markThreadItemAsReadIfNeeded(hydratedChannel);

    // We have a hydrated channel, so we update the title of the screen
    // if (openedFromPushNotification) {
    //   configureNavigation(hydratedChannel)
    // }
  };
  const markThreadItemAsReadIfNeeded = channel => {
    const {
      id: channelID,
      lastThreadMessageId,
      readUserIDs,
      participants,
      lastMessage,
    } = channel;
    const userID = userInfo?.id;
    const isRead = readUserIDs?.includes(userID);

    if (!isRead && channelID && lastMessage && userID) {
      const newReadUserIDs = readUserIDs ? [...readUserIDs, userID] : [userID];
      channelManager.markChannelThreadItemAsRead(
        channelID,
        userID,
        lastThreadMessageId,
        newReadUserIDs,
        participants,
      );
    }
  };

  const channelWithHydratedOtherParticipants = channel => {
    const allParticipants = channel?.participants;
    if (!allParticipants) {
      return channel;
    }
    // otherParticipants are all the participants in the chat, except for the currently logged in user
    const otherParticipants =
      allParticipants &&
      allParticipants.filter(
        participant => participant && participant.id != currentUser.id,
      );
    return { ...channel, otherParticipants };
  };

  /* ================= SEND MESSAGE ================= */
  const onSend = () => {
    // allow send if either message OR image available
    if (!message.trim() && !downloadObject) {
      Alert.alert('Message required', 'Please type a message or select image');
      return;
    }

    onSendInput(); // send
    setMessage('');
    setDownloadObject(null);
    setUploadProgress(0);
    Keyboard.dismiss();

    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ animated: true });
    }, 100);
  };
  const onSendInput = async () => {
    if (thread?.length > 0 || channel?.otherParticipants?.length > 1) {
      sendMessage();
      return;
    }
    if (isNumrology == true && thread?.length == 0) {
      createOne2OneChannel({
        isNumrology: isNumrology == true && thread?.length == 0,
      }).then(newChannel => {
        sendMessage(newChannel);
      });
    }

    // If we don't have a chat message, we need to create a 1-1 channel first
    createOne2OneChannel({ isNumrology: false }).then(newChannel => {
      sendMessage(newChannel);
    });
  };
  const createOne2OneChannel = ({ isNumrology = false }) => {
    return new Promise(resolve => {
      channelManager
        .createChannel(currentUser, channel?.otherParticipants, '', isNumrology)
        .then(response => {
          if (!response.channel && !response.message) {
            return;
          } else if (response.message == 'error') {
            Alert.alert(
              `Unmatched`,
              response.unsuccessfull,
              [
                {
                  text: 'OK',
                },
              ],
              { cancelable: false },
            );
            return;
          }
          setChannel(channelWithHydratedOtherParticipants(response.channel));
          threadUnsubscribe.current && threadUnsubscribe.current();
          threadUnsubscribe.current = channelManager.subscribeThreadSnapshot(
            response.channel,
            setThread,
            currentUser.id,
          );
          resolve(response.channel);
        });
    });
  };

  const getParticipantPictures = () => {
    if (channel?.otherParticipants) {
      return channel.otherParticipants.map(participant => {
        return {
          participantId: participant.id || participant.userID,
          profilePictureURL: participant.profilePictureURL,
        };
      });
    } else {
      return [];
    }
  };

  const broadcastPushNotifications = (inputValue, downloadObject) => {
    const participants = channel.otherParticipants;
    if (!participants || participants.length == 0) {
      return;
    }
    const sender = currentUser;
    const isGroupChat = channel.name && channel.name.length > 0;
    const fromTitle = isGroupChat
      ? channel.name
      : sender.firstName + ' ' + sender.lastName;
    var message;
    if (isGroupChat) {
      if (downloadObject) {
        if (
          downloadObject.mime &&
          downloaddownloadObjectURL.mime.startsWith('video')
        ) {
          message =
            sender.firstName + ' ' + sender.lastName + ' ' + 'sent a video.';
        } else {
          message =
            sender.firstName + ' ' + sender.lastName + ' ' + 'sent a photo.';
        }
      } else {
        message = sender.firstName + ' ' + sender.lastName + ': ' + inputValue;
      }
    } else {
      if (downloadObject) {
        if (downloadObject.mime && downloadObject.mime.startsWith('video')) {
          message = sender.firstName + ' ' + 'sent you a video.';
        } else if (
          downloadObject.mime &&
          downloadObject.mime.startsWith('audio')
        ) {
          message = sender.firstName + ' ' + 'sent you an audio message.';
        } else {
          message = sender.firstName + ' ' + 'sent you a photo.';
        }
      } else {
        message = inputValue;
      }
    }

    // participants.forEach(participant => {
    //   if (participant.id !== currentUser.id) {
    //     notificationManager.sendPushNotification(
    //       participant,
    //       fromTitle,
    //       message,
    //       'chat_message',
    //       { channelID: channel.id },
    //     )
    //   }
    // })
  };

  const sendMessage = newChannel => {
    const tempInputValue = message || '';
    const tempInReplyToItem = null;
    const participantProfilePictureURLs = getParticipantPictures();
    const channel = route.params?.channel;
    console.log('channel-------', channel);
    // return
    channelManager
      .sendMessage(
        userInfo,
        newChannel || channel,
        tempInputValue,
        downloadObject?.uri ? downloadObject?.uri : null,
        tempInReplyToItem,
        participantProfilePictureURLs,
        isNumrology == true && thread?.length == 0
          ? true
          : thread?.length > 0
          ? true
          : false, // isNumrology == true //digiprima
      )
      .then(response => {
        console.log('responseresponseresponse..', response);
        // return;
        if (response.error) {
          console.log('error2..', response.error);
          alert(error);
          // setInputValue(tempInputValue)
          // setInReplyToItem(tempInReplyToItem)
        } else if (response.message == 'error') {
          console.log('error3..', response.message);
          Alert.alert(
            `Unmatched`,
            response.unsuccessfull,
            [
              {
                text: 'OK',
              },
            ],
            { cancelable: false },
          );
          return;
        } else {
          setDownloadObject(null);
          broadcastPushNotifications(tempInputValue, downloadObject);
        }
      });
  };
  const handleReportUser = type => {
    if (type == 'delete') {
      chatMsgActionSheetRef.current?.hide();

      // Then show alert after a small delay
      setTimeout(() => {
        Alert.alert(
          'Are you sure?',
          `Are you sure you want to ${type} this message? You won't see their messages again.`,
          [
            {
              text: 'Yes',
              onPress: () => onDeleteThreadItem(deleteMsg),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      }, 300);
    } else {
      // First close the sheet
      chatSettingsActionSheetRef.current?.hide();

      // Then show alert after a small delay
      setTimeout(() => {
        Alert.alert(
          'Are you sure?',
          `Are you sure you want to ${type} this user? You won't see their messages again.`,
          [
            {
              text: 'Yes',
              onPress: () => reportAbuse(type),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      }, 300);
    }
  };

  const reportAbuse = type => {
    const myID = userInfo.id;
    const otherUserID = otherUserInfo.id;
    reportingManager.markAbuse(myID, otherUserID, type).then(response => {
      console.log('markAbusemarkAbusemarkAbuse', response);
      if (!response.error) {
        navigation.goBack();
      }
    });
  };
  const onSettingsPress = () => {
    console.log('Opening ActionSheet...');
    if (chatSettingsActionSheetRef.current) {
      chatSettingsActionSheetRef.current.show();
    } else {
      console.log('ActionSheet ref is null');
    }
  };
  const onMsgPress = () => {
    console.log('Opening ActionSheet...');
    if (chatMsgActionSheetRef.current) {
      chatMsgActionSheetRef.current.show();
    } else {
      console.log('ActionSheet ref is null');
    }
  };

  const onDeleteThreadItem = threadItem => {
    let newLastCreatedThreadItem = null;
    let isLastCreatedThreadItem = false;

    if (thread.length > 0 && thread[0].id === threadItem?.id) {
      isLastCreatedThreadItem = true;
      newLastCreatedThreadItem = thread[1];
    }

    const params = {
      isLastCreatedThreadItem,
      newLastCreatedThreadItem,
      channel,
      sender: currentUser,
      threadItemID: threadItem?.id,
    };

    channelManager.deleteMessage(params);
    setDeleteMsg(null);
  };

  // image send in chat
  const handleImage = async type => {
    const asset = await getImagesForUsers(type);

    if (!asset) return;

    console.log('image asset =>', asset);
    chatImageSendActionSheetRef.current?.hide();
    startUpload(asset);

    // Example
    // setDownloadObject(asset)
    // sendMessageWithImage(asset)
  };

  const startUpload = uploadData => {
    const mime = uploadData?.type;

    processAndUploadMediaFileWithProgressTracking(
      uploadData,
      async snapshot => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('uploadProgress', uploadProgress);

        setUploadProgress(uploadProgress);
      },
      async url => {
        if (url) {
          const fileObj = {
            ...uploadData,
            source: url,
            uri: url,
            url,
            mime,
          };
          console.log('fileObjfileObjfileObjfileObj', fileObj);

          setDownloadObject(fileObj);
          setTimeout(() => {
            setUploadProgress(0);
          }, 3000);

          // ✅ auto send image after upload
          // sendMessage(channel); // or
          // onSendInput()
        }
      },
      error => {
        setUploadProgress(0);
        Alert.alert('Error', 'Oops! upload failed, try again.');
      },
    );
  };

  /* ================= RENDER MESSAGE ================= */
  const renderItem = ({ item, index }) => {
    const isMe = item.senderID === userInfo?.id;
    const isSeen = item.readUserIDs?.includes(userInfo?.id);
    return (
      <ThreadItem
        item={item}
        isMe={isMe}
        index={index}
        isSeen={isSeen}
        onLongPress={() => {
          setDeleteMsg(item);
          onMsgPress();
        }}
      />
    );
  };

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <ChatHeader
        back
        headerBg={Colors.black}
        title={otherUserInfo?.firstName + ' ' + otherUserInfo?.lastName}
        profilePictureURL={otherUserInfo?.profilePictureURL}
        iconColor={Colors.white}
        onRightPress={() => {
          onSettingsPress();
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        // keyboardVerticalOffset={scale(70)}
        keyboardVerticalOffset={Platform.OS === 'ios' ? scale(40) : 0}
      >
        {/* CHAT LIST */}
        <FlatList
          ref={flatListRef}
          inverted
          data={thread}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          // onContentSizeChange={() =>
          //   flatListRef.current?.scrollToUp({ animated: true })
          // }
        />

        {/* FOOTER */}
        {uploadProgress > 0 || downloadObject?.uri ? (
          <View style={{ padding: 10 }}>
            {/* ✅ Loader while upload is going OR URL not received */}
            {uploadProgress > 0 && !downloadObject?.uri ? (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  backgroundColor: Colors.grayBgColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CustomText style={{ color: Colors.white, fontSize: 12 }}>
                  Uploading...
                </CustomText>

                <CustomText
                  style={{ color: Colors.white, marginTop: 4, fontSize: 12 }}
                >
                  {Math.round(uploadProgress)}%
                </CustomText>
              </View>
            ) : downloadObject?.uri ? (
              <Image
                source={{ uri: downloadObject.uri }}
                style={{ width: 80, height: 80, borderRadius: 10 }}
              />
            ) : null}

            {/* ✅ Remove */}
            <TouchableOpacity
              onPress={() => {
                setDownloadObject(null);
                setUploadProgress(0);
              }}
              style={{ marginTop: 6 }}
            >
              <CustomText style={{ color: Colors.white }}>Remove</CustomText>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={[styles.footerWrapper, { backgroundColor: Colors.black }]}>
          <View
            style={[
              styles.chatTextInputContainer,
              { backgroundColor: Colors.grey6 },
            ]}
          >
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
              placeholderTextColor={Colors.mainSubtextColor}
              style={styles.chatTextInput}
              allowFontScaling={false}
              multiline
            />
            {/* <View
              style={[styles.progressBar, { width: `${uploadProgress}%` }]}
            /> */}
            <TouchableOpacity
              style={[
                styles.emojiIconContainer,
                { backgroundColor: Colors.white },
              ]}
              onPress={() => {
                console.log('Opening ActionSheet...');
                if (chatImageSendActionSheetRef.current) {
                  chatImageSendActionSheetRef.current.show();
                } else {
                  console.log('ActionSheet ref is null');
                }
              }}
            >
              <IonIcons
                name="camera-outline"
                size={scale(20)}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: Colors.primary }]}
            disabled={uploadProgress > 0}
            onPress={() => {
              onSend();
            }}
          >
            <IonIcons name="send" size={scale(20)} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Modern ActionSheet */}
      <ActionSheet
        ref={chatSettingsActionSheetRef}
        gestureEnabled={true}
        closeOnTouchBackdrop={true}
        containerStyle={styles.actionSheetContainer}
        indicatorStyle={styles.actionSheetIndicator}
      >
        <View style={styles.actionSheetContent}>
          <View style={styles.actionSheetHeader}>
            <CustomText style={styles.actionSheetTitle}>Actions</CustomText>
          </View>
          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={() => handleReportUser('block')}
          >
            <CustomText style={styles.actionSheetOptionTextDanger}>
              Block user
            </CustomText>
          </TouchableOpacity>

          <View style={styles.actionSheetDivider} />
          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={() => handleReportUser('report')}
          >
            <CustomText style={styles.actionSheetOptionTextDanger}>
              Report user
            </CustomText>
          </TouchableOpacity>

          <View style={styles.actionSheetDivider} />

          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={() => chatSettingsActionSheetRef.current?.hide()}
          >
            <CustomText style={styles.actionSheetOptionText}>Cancel</CustomText>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      {/* chat log press ActionSheet */}
      <ActionSheet
        ref={chatMsgActionSheetRef}
        gestureEnabled={true}
        closeOnTouchBackdrop={true}
        containerStyle={styles.actionSheetContainer}
        indicatorStyle={styles.actionSheetIndicator}
      >
        <View style={styles.actionSheetContent}>
          {/* <View style={styles.actionSheetHeader}>
            <CustomText style={styles.actionSheetTitle}>Actions</CustomText>
          </View> */}
          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={() => handleReportUser('delete')}
          >
            <CustomText style={styles.actionSheetOptionText}>
              Delete Message
            </CustomText>
          </TouchableOpacity>

          {/* <View style={styles.actionSheetDivider} /> */}
          {/* <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={()=>handleReportUser('report')}
          >
            <CustomText style={styles.actionSheetOptionTextDanger}>
              Reply
            </CustomText>
          </TouchableOpacity> */}

          <View style={styles.actionSheetDivider} />

          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={() => chatMsgActionSheetRef.current?.hide()}
          >
            <CustomText
              style={[
                styles.actionSheetOptionTextDanger,
                { color: Colors.mainSubtextColor },
              ]}
            >
              Cancel
            </CustomText>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      {/* Send Image ActionSheet */}
      <ActionSheet
        ref={chatImageSendActionSheetRef}
        gestureEnabled={true}
        closeOnTouchBackdrop={true}
        containerStyle={styles.actionSheetContainer}
        indicatorStyle={styles.actionSheetIndicator}
      >
        <View style={styles.actionSheetContent}>
          <View style={styles.actionSheetHeader}>
            <CustomText style={styles.actionSheetTitle}>Actions</CustomText>
          </View>
          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={() => {
              handleImage('camera');
            }}
          >
            <CustomText style={styles.actionSheetOptionTextDanger}>
              Launch Camera
            </CustomText>
          </TouchableOpacity>

          <View style={styles.actionSheetDivider} />
          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={() => {
              handleImage('gallery');
            }}
          >
            <CustomText style={styles.actionSheetOptionTextDanger}>
              Open Photo Gallery
            </CustomText>
          </TouchableOpacity>

          <View style={styles.actionSheetDivider} />

          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={() => chatImageSendActionSheetRef.current?.hide()}
          >
            <CustomText style={styles.actionSheetOptionText}>Cancel</CustomText>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </CustomSafeAreaView>
  );
};

export default ChatScreen;
