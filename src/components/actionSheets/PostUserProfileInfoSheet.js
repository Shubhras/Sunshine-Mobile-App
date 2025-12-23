import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import CardDetailsView from '../cards/CardDetailsView';
import Colors from '../../constants/Colors';

const PostUserProfileInfoSheet = props => {
  const { sheetId, payload, item } = props;
  const {
    // item,
    setShowMode,
    onSuperLikePressed,
    onLikePressed,
    onDislikePressed,
    bottomTabBar,
    isDone,
  } = payload || {};

  const showActionSheet = () => {
    SheetManager.show('PostUserProfileInfoSheet');
  };
  const closedActionSheet = () => {
    SheetManager.hide('PostUserProfileInfoSheet');
  };
  console.log('kjkJKJKJKJKKKJKJKJKJKJKJ', item);

  return (
    <>
      <ActionSheet
        id={'PostUserProfileInfoSheet'}
        gestureEnabled={true}
        containerStyle={styles.actionSheetContainer}
        indicatorStyle={styles.actionSheetIndicator}
        defaultOverlayOpacity={0.3}
        snapPoints={[100]}
        initialSnapIndex={0}
        drawUnderStatusBar={true}
        statusBarTranslucent={true}
      >
        {/* <View style={styles.contentContainer}> */}
        {item && (
          <CardDetailsView
            key={'CardDetail' + item.id}
            usrid={item.id}
            profilePictureURL={item?.profilePictureURL}
            firstName={item.firstName}
            lastName={item.lastName}
            age={item.age}
            school={item.school}
            distance={item.distance}
            bio={item.bio}
            instagramPhotos={
              item?.photos?.length > 0 ? item.photos : [item?.profilePictureURL]
            }
            setShowMode={setShowMode}
            onSwipeTop={onSuperLikePressed}
            onSwipeRight={onLikePressed}
            onSwipeLeft={onDislikePressed}
            isDone={isDone}
            bottomTabBar={bottomTabBar}
          />
        )}
        {/* </View> */}
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingBottom: 20,
  },
  actionSheetIndicator: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default PostUserProfileInfoSheet;
