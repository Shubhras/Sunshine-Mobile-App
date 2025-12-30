import React from 'react';
import IMConversationList from '../IMConversationList';

const IMConversationListView = props => {
  const {
    localConversations,
    currentUser,
    navigation,
    emptyStateConfig,
    messageType,
  } = props;

  const channels = localConversations || [];
  const user = currentUser || { id: 'currentUser', userID: 'currentUser' };

  const onConversationPress = channel => {
    console.log('Opening conversation:', channel);
    navigation.navigate('Chat', {
      channel: { ...channel, name: channel.title },
      // appStyles: appStyles, // if needed
    });
  };

  return (
    <IMConversationList
      loading={false}
      conversations={channels}
      onConversationPress={onConversationPress}
      setConversations={props.setConversations || (() => {})}
      emptyStateConfig={emptyStateConfig}
      user={user}
      headerComponent={props.headerComponent}
    />
  );
};

export default IMConversationListView;
