import React, { useContext, useEffect, useRef } from 'react';
import IMConversationList from '../IMConversationList';
import { ReactReduxContext, useSelector } from 'react-redux';
import FirebaseChannelsTracker from '../../../api/firebase/channelsTracker';

const IMConversationListView = props => {
  const {
    localConversations,
    currentUser,
    navigation,
    emptyStateConfig,
    messageType,
  } = props;
  const channels = useSelector(state => state.chat.channels)
 const userInfo = useSelector(state => state.users.users);
  const { store } = useContext(ReactReduxContext)
  const channelsTracker = useRef(null)

  useEffect(() => {
    const userId = userInfo.id || userInfo.userID
    if (!userId) {
      return
    }
    channelsTracker.current = new FirebaseChannelsTracker(store, userId)
    channelsTracker.current.subscribeIfNeeded()
  }, [userInfo?.id])

  useEffect(() => {
    return () => {
      channelsTracker.current?.unsubscribe()
    }
  }, [])

  const onConversationPress = channel => {
    console.log("....",channel)
    // navigation.navigate('PersonalChat', {
    //   channel: { ...channel, name: channel.title },
    // })
     navigation.navigate('Chat', {
      channel,
      otherUser: channel.participants.find(p => p.id !== userInfo.id && p.userID !== userInfo.userID),
    });
  }

  return (
    <IMConversationList
     loading={channels == null}
      conversations={channels}
      onConversationPress={onConversationPress}
      // setConversations={props.setConversations || (() => {})}
      emptyStateConfig={emptyStateConfig}
      user={userInfo}
      // headerComponent={props.headerComponent}
    />
  );
};

export default IMConversationListView;
