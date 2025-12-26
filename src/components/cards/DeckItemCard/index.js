// import React, { useRef, useEffect, memo } from 'react';
// import { View, Text, StyleSheet, Dimensions, Modal, Alert } from 'react-native';
// import Swiper from 'react-native-deck-swiper';
// import TinderItemCard from '../TinderItemCard';
// import styles from './styles';
// import { CustomText } from '../../global/CustomText';
// import SwipeControls from '../SwipeControls';

// const DeckItemCard = ({
//   data,
//   setShowMode,
//   onUndoSwipe,
//   onSwipe,
//   onAllCardsSwiped,
//   isPlanActive,
//   setSubscriptionVisible,
//   renderEmptyState,
//   renderNewMatch,
//   canUserSwipe,
//   navigation,
//   onPressCard,
//   useSwiper,
// }) => {
//   //const isPlanActive = useSelector(state => state.inAppPurchase.isPlanActive)

//   // const useSwiper = useRef(null);
//   const hasActivePlan = useRef(false);
//   const currentDeckIndex = useRef(0);

//   useEffect(() => {
//     hasActivePlan.current = isPlanActive;
//   }, [isPlanActive]);

//   const onDislikePressed = () => {
//     console.log('onDislikePressed called from DeckItemCard');
//     Alert.alert('DeckItemCard', 'Dislike Pressed!');
//     // if (useSwiper.current) {
//     //   useSwiper.current.swipeLeft();
//     // }
//   };

//   const onLikePressed = () => {
//     console.log('onLikePressed called from DeckItemCard');
//     Alert.alert('DeckItemCard', 'Like Pressed!');
//     // if (useSwiper.current) {
//     //   useSwiper.current.swipeRight();
//     // }
//   };

//   const handleSwipe = (type, index) => {
//     const currentDeckItem = data[index];
//     currentDeckIndex.current = index;
//     if (type === 'like' && (canUserSwipe || hasActivePlan.current)) {
//       onSwipe(type, currentDeckItem);
//       // Navigate to chat page only when liked
//     } else if (type === 'dislike') {
//       // Handle the dislike action, such as showing a message or any other logic
//       console.log('Disliked:', currentDeckItem);
//     } else {
//       // Handle other cases, such as when the user cannot swipe or does not have an active plan
//       useSwiper.current.swipeBack();
//       alertDailySwipeExceeded();
//     }
//   };

//   const onSwipedLeft = index => {
//     handleSwipe('dislike', index);
//   };

//   const onSwipedRight = index => {
//     alert('right');
//     // handleSwipe('like', index);
//   };

//   const onSwipedTop = index => {
//     handleSwipe('like', index);
//   };

//   const onSwipedAll = () => {
//     onAllCardsSwiped();
//   };

//   const onTapCard = index => {
//     // alert('onTapCard', index);
//     currentDeckIndex.current = index;
//     setShowMode(1);
//   };

//   const undoSwipe = () => {
//     if (!hasActivePlan.current) {
//       requestUpgrade();

//       return;
//     }

//     useSwiper.current.swipeBack(index => {
//       const prevDeckItem = data[index - 1];

//       currentDeckIndex.current = index;
//       onUndoSwipe(prevDeckItem);
//     });
//   };

//   const requestUpgrade = () => {
//     Alert.alert(
//       'Upgrade account',
//       'Upgrade your account now to undo a swipe.',
//       [
//         {
//           text: 'Upgrade Now',
//           onPress: () => setSubscriptionVisible(true),
//         },
//         {
//           text: 'Cancel',
//         },
//       ],
//       { cancelable: true },
//     );
//   };

//   const alertDailySwipeExceeded = () => {
//     Alert.alert(
//       'Daily swipes exceeded',
//       'You have exceeded the daily swipes limit. Upgrade your account now to enjoy unlimited swipes',
//       [
//         {
//           text: 'Upgrade Now',
//           onPress: () => setSubscriptionVisible(true),
//         },
//         {
//           text: 'Cancel',
//         },
//       ],
//       { cancelable: true },
//     );
//   };

//   const renderCard = item => {
//     // console.log('ram...', profilePictureURL)
//     if (item) {
//       return (
//         <TinderItemCard
//           key={'TinderCard' + item.id}
//           url={item.profilePictureURL}
//           name={item.firstName}
//           lastName={item.lastName}
//           age={item.age}
//           school={item.school}
//           distance={item.distance}
//           undoSwipe={undoSwipe}
//         />
//       );
//     }
//   };

//   const renderOverlayLabel = (label, color) => {
//     return (
//       <View style={[styles.overlayLabel, { borderColor: color }]}>
//         <CustomText style={[styles.overlayLabelText, { color }]}>
//           {label}
//         </CustomText>
//       </View>
//     );
//   };

//   // const RenderBottomTabBar = () => {
//   //   return (
//   //     <View style={styles.bottomTabBarContainer}>
//   //       <SwipeControls
//   //         onDislikePressed={() => alert('onDislikePressed DeckItemCard')}
//   //         onLikePressed={() => alert('onLikePressed DeckItemCard')}
//   //       />
//   //     </View>
//   //   );
//   // };

//   if (data.length === 0) {
//     // return <View style={styles.noMoreCards}>{renderEmptyState()}</View>;
//   }

//   return (
//     <View style={styles.container}>
//       <Swiper
//         ref={useSwiper}
//         animateCardOpacity={true}
//         containerStyle={styles.swiperContainer}
//         cards={data}
//         renderCard={renderCard}
//         cardIndex={0}
//         backgroundColor="white"
//         stackSize={2}
//         verticalSwipe={true}
//         infinite={false}
//         showSecondCard={true}
//         animateOverlayLabelsOpacity={true}
//         onTapCard={va => {
//           console.log('vaLPLPLPLPLPLPLPLPLPLPL', va);
//           onPressCard(data[va]);
//         }}
//         onSwipedRight={onSwipedRight}
//         onSwipedTop={onSwipedTop}
//         onSwipedLeft={onSwipedLeft}
//         onSwipedAll={onSwipedAll}
//         swipeBackCard={true}
//         overlayLabels={{
//           left: {
//             title: 'NOPE',
//             element: renderOverlayLabel('NOPE', '#E5566D'),
//             style: {
//               wrapper: styles.overlayWrapper,
//             },
//           },
//           right: {
//             title: 'LIKE',
//             element: renderOverlayLabel('LIKE', '#4CCC93'),
//             style: {
//               wrapper: {
//                 ...styles.overlayWrapper,
//                 alignItems: 'flex-start',
//                 marginLeft: 30,
//               },
//             },
//           },
//         }}
//       />
//       <View style={styles.bottomTabBarContainer} pointerEvents="box-only">
//         <SwipeControls
//           onLikePressed={() => {
//             console.log('Like button pressed');
//             Alert.alert('DeckItemCard', 'Like Pressed!');
//             // optional swipe
//             // useSwiper.current?.swipeRight();
//           }}
//           onDislikePressed={() => {
//             console.log('Dislike button pressed');
//             Alert.alert('DeckItemCard', 'Dislike Pressed!');
//             useSwiper.current?.swipeLeft();
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// // Exporting
// export default memo(DeckItemCard);

{
  /* {showMode == 1 && data[currentDeckIndex.current] && (
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
      )} */
}

import React, { useRef, useEffect, memo, useState } from 'react';
import { View, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TinderItemCard from '../TinderItemCard';
import styles from './styles';
import { CustomText } from '../../global/CustomText';
import SwipeControls from '../SwipeControls';
import PostUserProfileInfoSheet from '../../actionSheets/PostUserProfileInfoSheet';
import { SheetManager } from 'react-native-actions-sheet';

const DeckItemCard = ({
  data,
  setShowMode,
  onUndoSwipe,
  onSwipe,
  onAllCardsSwiped,
  isPlanActive,
  setSubscriptionVisible,
  renderEmptyState,
  canUserSwipe,
  navigation,
}) => {
  const hasActivePlan = useRef(false);
  const currentDeckIndex = useRef(0);
  const useSwiper = useRef(null);
  const [cardInfo, setCardInfo] = useState(null);

  useEffect(() => {
    hasActivePlan.current = isPlanActive;
  }, [isPlanActive]);

  const handleSwipe = (type, index) => {
    const item = data[index];
    currentDeckIndex.current = index;

    if (!item) return;

    if (type === 'like') {
      onSwipe('like', item);
    } else if (type === 'dislike') {
      onSwipe('dislike', item);
    }
  };

  const onSwipedLeft = index => handleSwipe('dislike', index);
  const onSwipedTop = index => handleSwipe('like', index);
  const onSwipedRight = index => handleSwipe('like', index);
  const onSwipedAll = () => onAllCardsSwiped?.();

  const undoSwipe = () => {
    if (!hasActivePlan.current) {
      Alert.alert(
        'Upgrade account',
        'Upgrade your account now to undo a swipe.',
        [
          { text: 'Upgrade Now', onPress: () => setSubscriptionVisible(true) },
          { text: 'Cancel' },
        ],
      );
      return;
    }

    useSwiper.current?.swipeBack(i => {
      const prev = data[i - 1];
      currentDeckIndex.current = i;
      onUndoSwipe?.(prev);
    });
  };

  const renderCard = item =>
    item && (
      <TinderItemCard
        key={'TinderCard' + item.id}
        url={item.profilePictureURL}
        name={item.firstName}
        lastName={item.lastName}
        age={item.age}
        school={item.school}
        distance={item.distance}
        undoSwipe={undoSwipe}
      />
    );

  const renderOverlayLabel = (label, color) => (
    <View style={[styles.overlayLabel, { borderColor: color }]}>
      <CustomText style={[styles.overlayLabelText, { color }]}>
        {label}
      </CustomText>
    </View>
  );

  // 👉 This opens sheet ONLY when card itself is tapped
  const handleTapCard = index => {
    currentDeckIndex.current = index;
    setCardInfo?.(data[index]);
    setTimeout(() => {
      SheetManager.show('PostUserProfileInfoSheet');
    }, 250);
  };

  const onDislikePressed = () => {
    Alert.alert('onDislikePressed');
    // useSwiper.current.swipeLeft();
  };

  const onLikePressed = () => {
    Alert.alert('onLikePressed');
    // useSwiper.current.swipeRight();
  };

  const renderBottomTabBar = (containerStyle, buttonContainerStyle) => {
    return (
      <View style={styles.bottomTabBarContainer}>
        <SwipeControls
          onDislikePressed={onDislikePressed}
          onLikePressed={onLikePressed}
          containerStyle={containerStyle}
          buttonContainerStyle={buttonContainerStyle}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Swiper
          ref={useSwiper}
          cards={data}
          renderCard={renderCard}
          cardIndex={0}
          stackSize={2}
          verticalSwipe
          showSecondCard
          infinite={false}
          backgroundColor="white"
          containerStyle={styles.swiperContainer}
          overlayLabels={{
            left: {
              title: 'NOPE',
              element: renderOverlayLabel('NOPE', '#E5566D'),
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              element: renderOverlayLabel('LIKE', '#4CCC93'),
              style: {
                wrapper: { ...styles.overlayWrapper, marginLeft: 30 },
              },
            },
          }}
          onTapCard={handleTapCard}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          onSwipedTop={onSwipedTop}
          onSwipedAll={onSwipedAll}
          swipeBackCard
          animateCardOpacity
        />
      </View>
      {renderBottomTabBar()}
      <PostUserProfileInfoSheet item={cardInfo} useSwiper={useSwiper} />
    </>
  );
};

export default memo(DeckItemCard);
