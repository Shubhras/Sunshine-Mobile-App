import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionSheet, {
  ScrollView,
  SheetManager,
} from 'react-native-actions-sheet';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import CardDetailsView from '../cards/CardDetailsView';
import SwipeControls from '../cards/SwipeControls';

const PostUserProfileInfoSheet = props => {
  const { item, useSwiper } = props;

  const handleLike = () => {
    SheetManager.hide('post-user-profile-info-sheet');

    setTimeout(() => {
      useSwiper.current?.swipeRight();
    }, 250);
  };

  const handleDislike = () => {
    SheetManager.hide('post-user-profile-info-sheet');

    setTimeout(() => {
      useSwiper.current?.swipeLeft();
    }, 250);
  };

  return (
    <>
      <ActionSheet
       id="post-user-profile-info-sheet"
        gestureEnabled={true}
        containerStyle={styles.actionSheetContainer}
        indicatorStyle={styles.actionSheetIndicator}
        defaultOverlayOpacity={0.3}

        // id={'post-user-profile-info-sheet'}
        // defaultOverlayOpacity={0.3}
        // isModal={true}
        // onClose={() => SheetManager.hide(props.sheetId)}
        // gestureEnabled={true}
        // keyboardHandlerEnabled={true}
        // enableGesturesInScrollView={true}
        // containerStyle={styles.actionSheetContainer}
        // indicatorStyle={styles.actionSheetIndicator}
      >
        <ScrollView
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewWrapper}
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
              onPress={() => SheetManager.hide('post-user-profile-info-sheet')}
            />
          )}
        </ScrollView>
        <View style={styles.bottomTabBarContainer}>
          <SwipeControls
            onLikePressed={handleLike}
            onDislikePressed={handleDislike}
          />
        </View>
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
  scrollViewWrapper: {
    flexGrow: 1,
    paddingBottom: scale(100),
  },
  bottomTabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.black,
  },
});

export default PostUserProfileInfoSheet;
