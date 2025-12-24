import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import ActionSheet, {
  SheetManager,
  ScrollView,
} from 'react-native-actions-sheet';
import CardDetailsView from '../cards/CardDetailsView';
import Colors from '../../constants/Colors';
import { CustomText } from '../global/CustomText';

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
        defaultOverlayOpacity={0.3}
        isModal={true}
        onClose={() => SheetManager.hide(props.sheetId)}
        gestureEnabled={true}
        keyboardHandlerEnabled={true}
        enableGesturesInScrollView={true}
        containerStyle={styles.actionSheetContainer}
        indicatorStyle={styles.actionSheetIndicator}
      >
        <ScrollView
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
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
                item?.photos?.length > 0
                  ? item.photos
                  : [item?.profilePictureURL]
              }
              setShowMode={setShowMode}
              onSwipeTop={onSuperLikePressed}
              onSwipeRight={onLikePressed}
              onSwipeLeft={onDislikePressed}
              onPress={() => SheetManager.hide('PostUserProfileInfoSheet')}
              bottomTabBar={bottomTabBar}
            />
          )}
        </ScrollView>
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    flex: 1,
    top: 0,
    backgroundColor: Colors.black,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // paddingBottom: 20,
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
