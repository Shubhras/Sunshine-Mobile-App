// import React, { useRef, useState, useContext } from 'react';
// import { FlatList, ScrollView, I18nManager } from 'react-native';
// import { useSelector, ReactReduxContext } from 'react-redux';
// import TNStoryItem from './TNStoryItem';
// import ActionSheet from 'react-native-actions-sheet';
// import PropTypes from 'prop-types';
// // import { SwipeTracker } from '../../../api/';
// import styles from './styles';

// function TNStoriesTray(props) {
//   const {
//     data,
//     onStoryItemPress,
//     onUserItemPress,
//     user,
//     displayUserItem,
//     userItemShouldOpenCamera,
//     storyItemContainerStyle,
//     userStoryTitle,
//     displayLastName,
//     showOnlineIndicator,
//   } = props;
//   const currentUser = useSelector(state => state.users.users);
//   const { store } = useContext(ReactReduxContext);
//   const swipeTracker = useRef(new SwipeTracker(store, currentUser.id));
//   const threadItemActionSheetRef = useRef();
//   const [unmatchingUser, setUnmatchingUser] = useState(null);
//   console.log('data........', data);
//   const converLongPress = item => {
//     setUnmatchingUser(item);
//     threadItemActionSheetRef.current.show();
//   };
//   console.log('aaaaaa');
//   const unmatchUser = index => {
//     if (index == 0) {
//       proceedUnmatch();
//     }
//   };
//   const proceedUnmatch = () => {
//     swipeTracker.current.unMatchUser(unmatchingUser, currentUser);
//   };
//   const renderItem = ({ item, index }) => {
//     const isSeen =
//       item.items && item.idx + 1 === item.items.length && styles.seenStyle;

//     return (
//       <TNStoryItem
//         onPress={onStoryItemPress}
//         converLongPress={() => converLongPress(item)}
//         item={{ ...item, lastName: displayLastName ? item.lastName : ' ' }}
//         index={index}
//         title={true}
//         showOnlineIndicator={showOnlineIndicator && item.isOnline}
//         imageContainerStyle={
//           storyItemContainerStyle ? storyItemContainerStyle : isSeen
//         }
//       />
//     );
//   };
//   return (
//     <>
//       <FlatList
//         ListHeaderComponent={
//           displayUserItem ? (
//             <TNStoryItem
//               onPress={(item, index, refIndex) =>
//                 onUserItemPress(userItemShouldOpenCamera, refIndex, index)
//               }
//               title={true}
//               index={0}
//               item={{ ...user, firstName: userStoryTitle, lastName: '' }}
//             />
//           ) : null
//         }
//         style={styles.storiesContainer}
//         data={data}
//         inverted={I18nManager.isRTL}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index + 'item'}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//       />
//       <>
//         <ActionSheet
//           ref={threadItemActionSheetRef}
//           title={'Remove contact'}
//           options={['Remove', 'Cancel']}
//           cancelButtonIndex={1}
//           // destructiveButtonIndex={1}
//           onPress={unmatchUser}
//         />
//       </>
//     </>
//   );
// }

// TNStoriesTray.propTypes = {
//   data: PropTypes.array,
//   onStoryItemPress: PropTypes.func,
//   onUserItemPress: PropTypes.func,
//   displayUserItem: PropTypes.bool,
//   userItemShouldOpenCamera: PropTypes.bool,
//   storyItemContainerStyle: PropTypes.oneOfType([
//     PropTypes.object,
//     PropTypes.array,
//   ]),
// };
// TNStoriesTray.defaultProps = {
//   displayLastName: true,
// };

// export default TNStoriesTray;

import React, { useRef, useState } from 'react';
import { FlatList, I18nManager, Alert, View } from 'react-native';
import TNStoryItem from './TNStoryItem';
import ActionSheet from 'react-native-actions-sheet';
import PropTypes from 'prop-types';
import styles from './styles';

function TNStoriesTray(props) {
  const {
    data,
    onStoryItemPress,
    onUserItemPress,
    user,
    displayUserItem,
    userItemShouldOpenCamera,
    storyItemContainerStyle,
    userStoryTitle,
    displayLastName,
    showOnlineIndicator,
    onRemoveUser, // New prop to handle user removal
  } = props;

  const threadItemActionSheetRef = useRef();
  const [unmatchingUser, setUnmatchingUser] = useState(null);

  const converLongPress = item => {
    setUnmatchingUser(item);
    threadItemActionSheetRef.current?.show();
  };

  const unmatchUser = index => {
    if (index === 0) {
      proceedUnmatch();
    }
  };

  const proceedUnmatch = () => {
    if (unmatchingUser) {
      // If parent component provides onRemoveUser callback, use it
      if (onRemoveUser) {
        onRemoveUser(unmatchingUser);
      } else {
        // Otherwise just show an alert (for demo purposes)
        Alert.alert(
          'Remove Contact',
          `Are you sure you want to remove ${unmatchingUser.firstName}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Remove',
              onPress: () => {
                console.log('User removed:', unmatchingUser);
                // In a real app, you would update the data source here
              },
              style: 'destructive',
            },
          ],
        );
      }
      setUnmatchingUser(null);
    }
  };

  const renderItem = ({ item, index }) => {
    const isSeen =
      item.items && item.idx + 1 === item.items.length && styles.seenStyle;

    return (
      <TNStoryItem
        onPress={onStoryItemPress}
        converLongPress={() => converLongPress(item)}
        item={{ ...item, lastName: displayLastName ? item.lastName : ' ' }}
        index={index}
        title={true}
        showOnlineIndicator={showOnlineIndicator && item.isOnline}
        imageContainerStyle={
          storyItemContainerStyle ? storyItemContainerStyle : isSeen
        }
      />
    );
  };

  return (
    <View>
      <FlatList
        bounces={false}
        overScrollMode="never"
        ListHeaderComponent={
          displayUserItem ? (
            <TNStoryItem
              onPress={(item, index, refIndex) =>
                onUserItemPress(userItemShouldOpenCamera, refIndex, index)
              }
              title={true}
              index={0}
              item={{ ...user, firstName: userStoryTitle, lastName: '' }}
            />
          ) : null
        }
        // style={styles.storiesContainer}
        data={data}
        inverted={I18nManager.isRTL}
        renderItem={renderItem}
        keyExtractor={(item, index) => index + 'item'}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <ActionSheet
        ref={threadItemActionSheetRef}
        title={'Remove contact'}
        options={['Remove', 'Cancel']}
        cancelButtonIndex={1}
        onPress={unmatchUser}
      />
    </View>
  );
}

TNStoriesTray.propTypes = {
  data: PropTypes.array,
  onStoryItemPress: PropTypes.func,
  onUserItemPress: PropTypes.func,
  displayUserItem: PropTypes.bool,
  userItemShouldOpenCamera: PropTypes.bool,
  storyItemContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onRemoveUser: PropTypes.func, // Optional callback for removing users
  showOnlineIndicator: PropTypes.bool,
  displayLastName: PropTypes.bool,
  user: PropTypes.object,
  userStoryTitle: PropTypes.string,
};

TNStoriesTray.defaultProps = {
  displayLastName: true,
  showOnlineIndicator: false,
};

export default TNStoriesTray;
