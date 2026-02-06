
// import React, { useRef, useEffect, memo, useState } from 'react';
// import { View, Alert } from 'react-native';
// import Swiper from 'react-native-deck-swiper';
// import TinderItemCard from '../TinderItemCard';
// import styles from './styles';
// import { CustomText } from '../../global/CustomText';
// import SwipeControls from '../SwipeControls';
// import PostUserProfileInfoSheet from '../../actionSheets/PostUserProfileInfoSheet';
// import { SheetManager } from 'react-native-actions-sheet';

// const DeckItemCard = ({
//   data,
//   setShowMode,
//   onUndoSwipe,
//   onSwipe,
//   onAllCardsSwiped,
//   isPlanActive,
//   setSubscriptionVisible,
//   renderEmptyState,
//   canUserSwipe,
//   navigation,
// }) => {
//   const useSwiper = useRef(null);
//   const hasActivePlan = useRef(false);
//   const currentDeckIndex = useRef(0);
//   const [cardInfo, setCardInfo] = useState(null);

//   useEffect(() => {
//     hasActivePlan.current = isPlanActive;
//   }, [isPlanActive]);

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

//   const handleSwipe = (type, index) => {
//     const currentDeckItem = data[index]
//     currentDeckIndex.current = index
//     if (type === 'like' && (canUserSwipe || hasActivePlan.current)) {
//       onSwipe(type, currentDeckItem)
//       // Navigate to chat page only when liked
//       // navigation.navigate('Chat', { user: currentDeckItem })
//     } else if (type === 'dislike') {
//       // Handle the dislike action, such as showing a message or any other logic
//        onSwipe(type, currentDeckItem)
//       console.log('Disliked:', currentDeckItem)
//     } else {
//       // Handle other cases, such as when the user cannot swipe or does not have an active plan
//       useSwiper.current.swipeBack()
//       alertDailySwipeExceeded()
//     }
//   }

//   const onSwipedLeft = index => {
//     handleSwipe('dislike', index);
//   };

//   const onSwipedRight = index => {
//     handleSwipe('like', index);
//   };

//   const onSwipedTop = index => {
//     handleSwipe('like', index);
//   };

//   const onSwipedAll = () => {
//     onAllCardsSwiped();
//   };

//   const undoSwipe = () => {
//     // if (!hasActivePlan.current) {
//     //   Alert.alert(
//     //     'Upgrade account',
//     //     'Upgrade your account now to undo a swipe.',
//     //     [
//     //       { text: 'Upgrade Now', onPress: () => setSubscriptionVisible(true) },
//     //       { text: 'Cancel' },
//     //     ],
//     //   );
//     //   return;
//     // }

//     useSwiper.current?.swipeBack(i => {
//       const prev = data[i - 1];
//       currentDeckIndex.current = i;
//       onUndoSwipe(prev);
//     });
//   };

//   const renderCard = item =>
//     item && (
//       <TinderItemCard
//         key={'TinderCard' + item.id}
//         url={item.profilePictureURL}
//         name={item.firstName}
//         lastName={item.lastName}
//         age={item.age}
//         school={item.school}
//         distance={item.distance}
//         undoSwipe={undoSwipe}
//       />
//     );

//   const renderOverlayLabel = (label, color) => (
//     <View style={[styles.overlayLabel, { borderColor: color }]}>
//       <CustomText style={[styles.overlayLabelText, { color }]}>
//         {label}
//       </CustomText>
//     </View>
//   );

//   // 👉 This opens sheet ONLY when card itself is tapped
//   const handleTapCard = index => {
//     currentDeckIndex.current = index;
//     setCardInfo?.(data[index]);
//     setTimeout(() => {
//       SheetManager.show('post-user-profile-info-sheet');
//     }, 250);
//   };

//   const onDislikePressed = () => {
//     useSwiper.current.swipeLeft();
//   };

//   const onLikePressed = () => {
//     useSwiper.current.swipeRight();
//   };

//   if (data.length === 0) {
//     return <View style={styles.noMoreCards}>{renderEmptyState()}</View>;
//   }

//   return (
//     <>
//       <View style={styles.container}>
//         <Swiper
//           ref={useSwiper}
//           cards={data}
//           renderCard={renderCard}
//           cardIndex={0}
//           stackSize={2}
//           verticalSwipe
//           showSecondCard
//           infinite={false}
//           backgroundColor="white"
//           containerStyle={styles.swiperContainer}
//           overlayLabels={{
//             left: {
//               title: 'NOPE',
//               element: renderOverlayLabel('NOPE', '#E5566D'),
//               style: {
//                 wrapper: styles.overlayWrapper,
//               },
//             },
//             right: {
//               title: 'LIKE',
//               element: renderOverlayLabel('LIKE', '#4CCC93'),
//               style: {
//                 wrapper: {
//                   ...styles.overlayWrapper,
//                   alignItems: 'flex-start',
//                   marginLeft: 30,
//                 },
//               },
//             },
//           }}
//           onTapCard={handleTapCard}
//           onSwipedRight={onSwipedRight}
//           onSwipedTop={onSwipedTop}
//           onSwipedLeft={onSwipedLeft}
//           onSwipedAll={onSwipedAll}
//           swipeBackCard
//           animateCardOpacity
//         />
//       </View>
//       <View style={styles.bottomTabBarContainer}>
//         <SwipeControls
//           onDislikePressed={onDislikePressed}
//           onLikePressed={onLikePressed}
//         />
//       </View>
//       <PostUserProfileInfoSheet item={cardInfo} useSwiper={useSwiper} />
//     </>
//   );
// };

// export default memo(DeckItemCard);


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
  onUndoSwipe,
  onSwipe,
  onAllCardsSwiped,
  isPlanActive,
  setSubscriptionVisible,
  renderEmptyState,
  canUserSwipe,
}) => {
  const swiperRef = useRef(null);
  const photoInfoActionSheetRef = useRef(null);
  const [cardIndex, setCardIndex] = useState(0); // Use state to track current visible card
  const [cardInfo, setCardInfo] = useState(null);

  // Sync cardInfo whenever the index changes
  useEffect(() => {
    if (data && data[cardIndex]) {
      setCardInfo(data[cardIndex]);
    }
  }, [cardIndex, data]);

  const alertDailySwipeExceeded = () => {
    Alert.alert(
      'Daily swipes exceeded',
      'You have exceeded the daily swipes limit. Upgrade your account now to enjoy unlimited swipes',
      [
        { text: 'Upgrade Now', onPress: () => setSubscriptionVisible(true) },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  const handleSwipe = (type, index) => {
    const currentDeckItem = data[index];
    
    // Check limits for 'like'
    if (type === 'like' && !(canUserSwipe || isPlanActive)) {
      swiperRef.current?.swipeBack();
      alertDailySwipeExceeded();
      return;
    }

    // Move to next index state
    setCardIndex(index + 1);
    onSwipe(type, currentDeckItem);
  };

  const undoSwipe = () => {
    // If you want to restrict undo to premium users, uncomment this:
    /*
    if (!isPlanActive) {
       setSubscriptionVisible(true);
       return;
    }
    */

    if (cardIndex > 0) {
      swiperRef.current?.swipeBack();
      const prevIndex = cardIndex - 1;
      setCardIndex(prevIndex);
      onUndoSwipe(data[prevIndex]);
    }
  };

  const renderCard = (item) => {
    if (!item) return null;
    return (
      <TinderItemCard
        key={item.id}
        url={item.profilePictureURL}
        name={item.firstName}
        lastName={item.lastName}
        age={item.age}
        school={item.school}
        distance={item.distance}
        undoSwipe={undoSwipe}
      />
    );
  };

  const renderOverlayLabel = (label, color) => (
    <View style={[styles.overlayLabel, { borderColor: color }]}>
      <CustomText style={[styles.overlayLabelText, { color }]}>
        {label}
      </CustomText>
    </View>
  );

  const handleTapCard = (index) => {
    setCardInfo(data[index]);
    setTimeout(() => {
      // SheetManager.show('post-user-profile-info-sheet');
      photoInfoActionSheetRef.current?.show();
    }, 100);
  };

  if (!data || data.length === 0 || cardIndex >= data.length) {
    return <View style={styles.noMoreCards}>{renderEmptyState()}</View>;
  }

  return (
    <>
      <View style={styles.container}>
        <Swiper
          ref={swiperRef}
          cards={data}
          renderCard={renderCard}
          cardIndex={cardIndex} // Controlled index
          stackSize={2}
          verticalSwipe={true}
          showSecondCard={true}
          infinite={false}
          disableBottomSwipe
          backgroundColor="transparent"
          containerStyle={styles.swiperContainer}
          overlayLabels={{
            left: {
              title: 'NOPE',
              element: renderOverlayLabel('NOPE', '#E5566D'),
              style: { wrapper: styles.overlayWrapper },
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
          onTapCard={handleTapCard}
          onSwipedLeft={(index) => handleSwipe('dislike', index)}
          onSwipedRight={(index) => handleSwipe('like', index)}
          onSwipedTop={(index) => handleSwipe('like', index)}
          onSwipedAll={onAllCardsSwiped}
          animateCardOpacity
        />
      </View>
      <View style={styles.bottomTabBarContainer}>
        <SwipeControls
          onDislikePressed={() => swiperRef.current?.swipeLeft()}
          onLikePressed={() => swiperRef.current?.swipeRight()}
          onUndoPressed={undoSwipe} // Added undo to controls if available
        />
      </View>
      <PostUserProfileInfoSheet photoInfoActionSheetRef={photoInfoActionSheetRef}  item={cardInfo} useSwiper={swiperRef} />
    </>
  );
};

export default memo(DeckItemCard);