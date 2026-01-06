import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import IMConversationListView from '../../components/IMConversationListView/IMConversationListView';
import TNStoriesTray from '../../components/TNStoriesTray';
import Colors from '../../constants/Colors';
import { Images } from '../../constants/images';
import styles from './styles';
import { ReactReduxContext, useSelector } from 'react-redux';
import FirebaseChannelsTracker from '../../api/firebase/channelsTracker';

const INITIAL_MATCHES_DATA = [
  {
    id: 'user1',
    userID: 'user1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    profilePictureURL: 'https://randomuser.me/api/portraits/women/1.jpg',
    isOnline: true,
    items: [],
    idx: 0,
  },
  {
    id: 'user2',
    userID: 'user2',
    firstName: 'Mike',
    lastName: 'Chen',
    profilePictureURL: 'https://randomuser.me/api/portraits/men/2.jpg',
    isOnline: false,
    items: [],
    idx: 0,
  },
  {
    id: 'user3',
    userID: 'user3',
    firstName: 'Emma',
    lastName: 'Davis',
    profilePictureURL: 'https://randomuser.me/api/portraits/women/3.jpg',
    isOnline: true,
    items: [],
    idx: 0,
  },
  {
    id: 'user4',
    userID: 'user4',
    firstName: 'James',
    lastName: 'Wilson',
    profilePictureURL: 'https://randomuser.me/api/portraits/men/4.jpg',
    isOnline: true,
    items: [],
    idx: 0,
  },
  {
    id: 'user5',
    userID: 'user5',
    firstName: 'Olivia',
    lastName: 'Brown',
    profilePictureURL: 'https://randomuser.me/api/portraits/women/5.jpg',
    isOnline: false,
    items: [],
    idx: 0,
  },
  {
    id: 'user6',
    userID: 'user6',
    firstName: 'Alex',
    lastName: 'Martinez',
    profilePictureURL: 'https://randomuser.me/api/portraits/men/6.jpg',
    isOnline: true,
    items: [],
    idx: 0,
  },
  {
    id: 'user7',
    userID: 'user7',
    firstName: 'Sophia',
    lastName: 'Anderson',
    profilePictureURL: 'https://randomuser.me/api/portraits/women/7.jpg',
    isOnline: false,
    items: [],
    idx: 0,
  },
  {
    id: 'user8',
    userID: 'user8',
    firstName: 'David',
    lastName: 'Taylor',
    profilePictureURL: 'https://randomuser.me/api/portraits/men/8.jpg',
    isOnline: true,
    items: [],
    idx: 0,
  },
];

const SAMPLE_CONVERSATIONS = [
  {
    id: 'conv1',
    title: 'Sarah Johnson',
    participants: [
      {
        id: 'user1',
        userID: 'user1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        profilePictureURL: 'https://randomuser.me/api/portraits/women/1.jpg',
        isOnline: true,
      },
    ],
    content: 'Hey! How are you doing? 😊',
    createdAt: { seconds: Math.floor(Date.now() / 1000) - 300 }, // 5 minutes ago
    markedAsRead: false,
  },
  {
    id: 'conv2',
    title: 'Mike Chen',
    participants: [
      {
        id: 'user2',
        userID: 'user2',
        firstName: 'Mike',
        lastName: 'Chen',
        profilePictureURL: 'https://randomuser.me/api/portraits/men/2.jpg',
        isOnline: false,
      },
    ],
    content: 'That sounds great! Let me know when you are free.',
    createdAt: { seconds: Math.floor(Date.now() / 1000) - 3600 }, // 1 hour ago
    markedAsRead: true,
  },
  {
    id: 'conv3',
    title: 'Emma Davis',
    participants: [
      {
        id: 'user3',
        userID: 'user3',
        firstName: 'Emma',
        lastName: 'Davis',
        profilePictureURL: 'https://randomuser.me/api/portraits/women/3.jpg',
        isOnline: true,
      },
    ],
    content: 'See you tomorrow! 👋',
    createdAt: { seconds: Math.floor(Date.now() / 1000) - 7200 }, // 2 hours ago
    markedAsRead: true,
  },
  {
    id: 'conv4',
    title: 'James Wilson',
    participants: [
      {
        id: 'user4',
        userID: 'user4',
        firstName: 'James',
        lastName: 'Wilson',
        profilePictureURL: 'https://randomuser.me/api/portraits/men/4.jpg',
        isOnline: true,
      },
    ],
    content: 'Thanks for the recommendation!',
    createdAt: { seconds: Math.floor(Date.now() / 1000) - 10800 }, // 3 hours ago
    markedAsRead: false,
  },
  {
    id: 'conv5',
    title: 'Olivia Brown',
    participants: [
      {
        id: 'user5',
        userID: 'user5',
        firstName: 'Olivia',
        lastName: 'Brown',
        profilePictureURL: 'https://randomuser.me/api/portraits/women/5.jpg',
        isOnline: false,
      },
    ],
    content: {
      mime: 'image/jpeg',
      url: { mime: 'image/jpeg' },
    },
    createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 }, // 1 day ago
    markedAsRead: true,
  },
  {
    id: 'conv6',
    title: 'Group Chat',
    participants: [
      {
        id: 'user2',
        userID: 'user2',
        firstName: 'Mike',
        lastName: 'Chen',
        profilePictureURL: 'https://randomuser.me/api/portraits/men/2.jpg',
        isOnline: false,
      },
      {
        id: 'user4',
        userID: 'user4',
        firstName: 'James',
        lastName: 'Wilson',
        profilePictureURL: 'https://randomuser.me/api/portraits/men/4.jpg',
        isOnline: true,
      },
    ],
    content: 'Group meeting at 3 PM today',
    createdAt: { seconds: Math.floor(Date.now() / 1000) - 14400 }, // 4 hours ago
    markedAsRead: false,
  },
];

const Conversations = ({ navigation}) => {
 const matches = useSelector(state => state.dating.matches)
  const userInfo = useSelector(state => state.users.users);
  const likeMessages = useSelector(state => state.dating.matches)
  // const [matches, setMatches] = useState([]);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {}, [userInfo, matches, likeMessages])
 const onMatchUserItemPress = otherUser => {
    const id1 = userInfo.id || userInfo.userID
    const id2 = otherUser.id || otherUser.userID
    const channel = {
      id: id1 < id2 ? id1 + id2 : id2 + id1,
      participants: [otherUser],
    }
    navigation.navigate('Chat', {
      channel,
      otherUser,
    });
  }


  // Handle removing a user from the matches list
  const handleRemoveUser = userToRemove => {
    // setMatches(prevMatches =>
    //   prevMatches.filter(
    //     user =>
    //       user.id !== userToRemove.id && user.userID !== userToRemove.userID,
    //   ),
    // );
    console.log('User removed from matches:', userToRemove);
  };

  const onEmptyStatePress = () => {
    navigation.navigate('SwipeStack')
  };

  const emptyStateConfig = {
    title: 'No Conversations',
    description:
      'Start chatting with the people you matched. Your conversations will show up here.',
    buttonName: 'Start swiping',
    onPress: onEmptyStatePress,
  };

  return (
    <View style={[styles.mainWrapper, { backgroundColor: Colors.black }]}>
      <ImageBackground
        source={Images.backgroundImage}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <TNStoriesTray
          onStoryItemPress={onMatchUserItemPress}
          onRemoveUser={handleRemoveUser}
          storyItemContainerStyle={styles.userImageContainer}
          data={matches}
          displayLastName={false}
          showOnlineIndicator={true}
        />
        <IMConversationListView
          navigation={navigation}
          emptyStateConfig={emptyStateConfig}
          messageType="liked"
          // localConversations={channels}
          setConversations={setConversations}
          // currentUser={userInfo}
        />
      </ImageBackground>
    </View>
  );
};

export default Conversations;
