import PropTypes from 'prop-types';
import React, { memo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { Images } from '../../../constants/images';
import IMConversationView from '../IMConversationView';
import TNEmptyStateView from '../TNEmptyStateView';
import styles from './styles';

const IMConversationList = memo(props => {
  const {
    onConversationPress,
    emptyStateConfig,
    conversations,
    loading,
    user,
    headerComponent,
    setConversations,
  } = props;

  const [itemToDelete, setItemToDelete] = useState(null);
  const threadItemActionSheetRef = useRef();

  const onChatLongPress = item => {
    setItemToDelete(item);
    threadItemActionSheetRef.current.show();
  };

  // console.log("conversations",conversations)
  const renderConversationView = ({ item }) => (
    <IMConversationView
      onChatItemPress={onConversationPress}
      onChatLongPress={() => onChatLongPress(item)}
      item={item}
      user={user}
    />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.backgroundImage}
          resizeMode="cover"
          style={{
            flex: 1,
          }}
        >
          <ActivityIndicator style={{ marginTop: 15 }} size="small" />
        </ImageBackground>
      </View>
    );
  }

  const deleteChat = () => {
    if (!itemToDelete || !setConversations) return;

    // Locally remove the conversation from the list
    setConversations(prevConversations =>
      prevConversations.filter(conv => conv.id !== itemToDelete.id),
    );

    // Optional: log or show a toast
    console.log('Conversation deleted locally:', itemToDelete.title);
  };

  const onGroupSettingsActionDone = index => {
    if (index === 0) {
      // "Delete Conversation" selected
      deleteChat();
    }
    // Close the action sheet anyway
    threadItemActionSheetRef.current?.hide();
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatsChannelContainer}>
        {conversations && conversations.length > 0 && (
          <ImageBackground
            source={Images.backgroundImage}
            resizeMode="cover"
            style={{
              flex: 1,
            }}
          >
            <FlatList
              vertical={true}
              bounces={false}
              overScrollMode="never"
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={conversations}
              renderItem={renderConversationView}
              keyExtractor={item => `${item.id}`}
              contentContainerStyle={{
                paddingTop: 10, // Stories tray ke neeche thoda gap
                paddingBottom: 20, // Bottom safe area ke liye
              }}
              removeClippedSubviews={false}
              ListHeaderComponent={headerComponent}
            />
          </ImageBackground>
        )}

        {conversations && conversations.length <= 0 && (
          <ImageBackground
            source={Images.backgroundImage}
            resizeMode="cover"
            style={{
              flex: 1,
            }}
          >
            <View style={styles.emptyViewContainer}>
              <TNEmptyStateView emptyStateConfig={emptyStateConfig} />
            </View>
          </ImageBackground>
        )}
        <>
          <ActionSheet
            ref={threadItemActionSheetRef}
            title={'Group Settings'}
            options={['Delete Conversation', 'Cancel']}
            cancelButtonIndex={1}
            // destructiveButtonIndex={1}
            onPress={onGroupSettingsActionDone}
          />
        </>
      </View>
    </View>
  );
});

IMConversationList.propTypes = {
  onConversationPress: PropTypes.func,
  conversations: PropTypes.array,
};

export default IMConversationList;
