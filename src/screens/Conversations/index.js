import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import IMConversationListView from '../../components/IMConversationListView/IMConversationListView';
import TNStoriesTray from '../../components/TNStoriesTray';
import Colors from '../../constants/Colors';
import { Images } from '../../constants/images';
import styles from './styles';
import { ReactReduxContext, useSelector } from 'react-redux';
import FirebaseChannelsTracker from '../../api/firebase/channelsTracker';
import { CustomText } from '../../components/global/CustomText';

const Conversations = ({ navigation }) => {
  const matches = useSelector(state => state.dating.matches);
  const userInfo = useSelector(state => state.users.users);
  const isPlanActive = useSelector(state => state.inAppPurchase.isPlanActive);

  // const [matches, setMatches] = useState([]);
  const [conversations, setConversations] = useState([]);

  const onMatchUserItemPress = otherUser => {
    const id1 = userInfo.id || userInfo.userID;
    const id2 = otherUser.id || otherUser.userID;
    const channel = {
      id: id1 < id2 ? id1 + id2 : id2 + id1,
      participants: [otherUser],
    };
    navigation.navigate('Chat', {
      channel,
      otherUser,
    });
  };

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
    navigation.navigate('SwipeStack');
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
        {isPlanActive ? (
          <>
            <TNStoriesTray
              onStoryItemPress={onMatchUserItemPress}
              onRemoveUser={handleRemoveUser}
              storyItemContainerStyle={styles.userImageContainer}
              data={matches.filter(fil => fil.userID !== userInfo?.userID)}
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
          </>
        ) : (
          <>
            <Image
              source={require('../../assets/images/subscribe.png')}
              style={styles.imageBackground}
            />
            <View style={styles.button}>
              <CustomText style={styles.textsize}>
                Explore the experince of matching
              </CustomText>
              <CustomText style={styles.textsize}>
                Dietary option, Exercise option, Personality traits, Love
                language
              </CustomText>
              <CustomText style={styles.textsize}>
                and for general searches for all in one price .
              </CustomText>
              <CustomText style={styles.textsize}>
                Subscribe to Explore!
              </CustomText>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UpgradeAccount', {
                    title: 'Upgrade Account',
                  });
                }}
                style={styles.buttoncontainer}
              >
                <CustomText style={styles.text}>Subscribe</CustomText>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
};

export default Conversations;
