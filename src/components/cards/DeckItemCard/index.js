import React, { useRef, useEffect, memo } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TinderItemCard from '../TinderItemCard';
import styles from './styles';
import { CustomText } from '../../global/CustomText';
import SwipeControls from '../SwipeControls';
// import BottomTabBar from './bottom_tab_bar';
import CardDetailsView from '../CardDetailsView';

const DeckItemCard = props => {
  const {
    data,
    setShowMode,
    onUndoSwipe,
    onSwipe,
    showMode,
    onAllCardsSwiped,
    isPlanActive,
    setSubscriptionVisible,
    renderEmptyState,
    renderNewMatch,
    canUserSwipe,
    navigation,
    onPressCard,
  } = props;
  //const isPlanActive = useSelector(state => state.inAppPurchase.isPlanActive)

  const useSwiper = useRef(null);
  const hasActivePlan = useRef(false);
  const currentDeckIndex = useRef(0);

  useEffect(() => {
    hasActivePlan.current = isPlanActive;
  }, [isPlanActive]);

  useEffect(() => {
    if (showMode === 1 && data[currentDeckIndex.current]) {
      navigation.navigate('SwiperCardDetails', {
        cardData: data[currentDeckIndex.current],
      });
      // Reset showMode after navigation
      setShowMode(0);
    }
  }, [showMode, navigation, data]);

  const onDislikePressed = () => {
    useSwiper.current.swipeLeft();
  };

  const onSuperLikePressed = () => {
    useSwiper.current.swipeTop();
  };

  const onLikePressed = () => {
    useSwiper.current.swipeRight();
  };

  const handleSwipe = (type, index) => {
    const currentDeckItem = data[index];
    currentDeckIndex.current = index;
    if (type === 'like' && (canUserSwipe || hasActivePlan.current)) {
      onSwipe(type, currentDeckItem);
      // Navigate to chat page only when liked
    } else if (type === 'dislike') {
      // Handle the dislike action, such as showing a message or any other logic
      console.log('Disliked:', currentDeckItem);
    } else {
      // Handle other cases, such as when the user cannot swipe or does not have an active plan
      useSwiper.current.swipeBack();
      alertDailySwipeExceeded();
    }
  };

  const onSwipedLeft = index => {
    handleSwipe('dislike', index);
  };

  const onSwipedRight = index => {
    handleSwipe('like', index);
  };

  const onSwipedTop = index => {
    handleSwipe('like', index);
  };

  const onSwipedAll = () => {
    onAllCardsSwiped();
  };

  const onTapCard = index => {
    // alert('onTapCard', index);
    currentDeckIndex.current = index;
    setShowMode(1);
  };

  const undoSwipe = () => {
    if (!hasActivePlan.current) {
      requestUpgrade();

      return;
    }

    useSwiper.current.swipeBack(index => {
      const prevDeckItem = data[index - 1];

      currentDeckIndex.current = index;
      onUndoSwipe(prevDeckItem);
    });
  };

  const requestUpgrade = () => {
    Alert.alert(
      'Upgrade account',
      'Upgrade your account now to undo a swipe.',
      [
        {
          text: 'Upgrade Now',
          onPress: () => setSubscriptionVisible(true),
        },
        {
          text: 'Cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const alertDailySwipeExceeded = () => {
    Alert.alert(
      'Daily swipes exceeded',
      'You have exceeded the daily swipes limit. Upgrade your account now to enjoy unlimited swipes',
      [
        {
          text: 'Upgrade Now',
          onPress: () => setSubscriptionVisible(true),
        },
        {
          text: 'Cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const renderCard = item => {
    // console.log('ram...', profilePictureURL)
    if (item) {
      return (
        <TinderItemCard
          key={'TinderCard' + item.id}
          url={item.profilePictureURL}
          name={item.firstName}
          lastName={item.lastName}
          age={item.age}
          school={item.school}
          distance={item.distance}
          setShowMode={setShowMode}
          undoSwipe={undoSwipe}
        />
      );
    }
  };

  const renderCardDetail = (item, isDone) => {
    return (
      item && (
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
          bottomTabBar={true}
        />
      )
    );
  };

  const renderOverlayLabel = (label, color) => {
    return (
      <View style={[styles.overlayLabel, { borderColor: color }]}>
        <CustomText style={[styles.overlayLabelText, { color }]}>
          {label}
        </CustomText>
      </View>
    );
  };

  const renderBottomTabBar = (containerStyle, buttonContainerStyle) => {
    return (
      <View style={styles.bottomTabBarContainer}>
        <SwipeControls
          onDislikePressed={onDislikePressed}
          onSuperLikePressed={onSuperLikePressed}
          onLikePressed={onLikePressed}
          containerStyle={containerStyle}
          buttonContainerStyle={buttonContainerStyle}
        />
      </View>
    );
  };

  if (data.length === 0) {
    // return <View style={styles.noMoreCards}>{renderEmptyState()}</View>;
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={useSwiper}
        animateCardOpacity={true}
        containerStyle={styles.swiperContainer}
        cards={data}
        renderCard={renderCard}
        cardIndex={0}
        backgroundColor="white"
        stackSize={2}
        verticalSwipe={true}
        infinite={false}
        showSecondCard={true}
        animateOverlayLabelsOpacity={true}
        onTapCard={va => {
          console.log('vaLPLPLPLPLPLPLPLPLPLPL', va);

          onPressCard(data[va]);
        }}
        onSwipedRight={onSwipedRight}
        onSwipedTop={onSwipedTop}
        onSwipedLeft={onSwipedLeft}
        onSwipedAll={onSwipedAll}
        swipeBackCard={true}
        overlayLabels={{
          left: {
            title: 'NOPE',
            element: renderOverlayLabel('NOPE', '#E5566D'),
            style: {
              wrapper: styles.overlayWrapper,
            },
          },
          right: {
            title: 'LIKE',
            element: renderOverlayLabel('LIKE', '#4CCC93'),
            style: {
              wrapper: {
                ...styles.overlayWrapper,
                alignItems: 'flex-start',
                marginLeft: 30,
              },
            },
          },
        }}
      />
      {renderBottomTabBar()}
      {showMode == 1 && data[currentDeckIndex.current] && (
        <Modal animationType={'slide'}>
          <View style={styles.cardDetailContainer}>
            <View style={styles.cardDetailL}>
              {renderCardDetail(data[currentDeckIndex.current])}
            </View>
          </View>
        </Modal>
      )}
      {showMode == 2 && (
        <Modal
          transparent={false}
          visible={showMode == 2 ? true : false}
          animationType={'slide'}
        >
          <View style={styles.newMatch}>{renderNewMatch()}</View>
        </Modal>
      )}
    </View>
  );
};

// Exporting
export default memo(DeckItemCard);
