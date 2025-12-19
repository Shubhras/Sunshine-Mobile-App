import React, { useCallback, useRef, useState } from 'react';
import { scale } from 'react-native-size-matters';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import ProfileHeader from '../../components/ProfileHeader';
import Colors from '../../constants/Colors';
import styles from './styles';
import { SubscriptionSlideData } from '../../data/SubscriptionSlideData';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  withSpring,
} from 'react-native-reanimated';
import { View } from 'react-native';
import { SCREEN_WIDTH } from '../../constants/Constants';
import { CustomText } from '../../components/global/CustomText';

const UpgradeAccount = ({ route }) => {
  const { title } = route.params;

  // Declaring shared value
  const scrollX = useSharedValue(0);

  // Declaring current index of the slide
  const currentIndex = useRef(0);

  // Defining reference for the Flatlist
  const flatListRef = useRef(null);

  // Handling scroll of the flat list
  const scrollHandler = useAnimatedScrollHandler(event => {
    // Storing scrolled offset value of the x direction
    scrollX.value = withSpring(event.contentOffset.x);
  });

  //
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length === 0) {
      return;
    }

    currentIndex.current = viewableItems[0].index;
  }, []);

  // Declaring viewability config for the Flatlist
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };

  // Declaring viewability config callback pairs for the Flatlist
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <ProfileHeader
        back={true}
        iconColor={Colors.white}
        title={title}
        titleAlight={'center'}
        titleFontSize={scale(16)}
        headerBg={Colors.black}
      />
      {Array.isArray(SubscriptionSlideData) &&
      SubscriptionSlideData.length > 0 ? (
        <View style={styles.carouselWrapper}>
          {/* Animated flatlist */}
          <Animated.FlatList
            ref={flatListRef}
            data={SubscriptionSlideData}
            renderItem={({ item, index }) => (
              <ProductSliderItem
                index={index}
                scrollX={scrollX}
                image={item.image}
                SubscriptionTitle={item.title}
                SubscriptionDescription={item.description}
                itemImageBgColor={item.item_bg_color}
                totalSlides={SubscriptionSlideData.length}
              />
            )}
            keyExtractor={item => item.id}
            style={styles.flatlist}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            scrollEnabled={true}
          />
        </View>
      ) : null}
    </CustomSafeAreaView>
  );
};

// Functional component
const ProductSliderItem = ({
  index,
  scrollX,
  image,
  itemImageBgColor,
  totalSlides,
  SubscriptionTitle,
  SubscriptionDescription,
}) => {
  // Defining
  const itemImageWrapperSize = SCREEN_WIDTH * 0.45;

  // Declaring input range to avoid its duplication
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];
  const scaleAndOpacityOutputRange = [0, 1, 0];

  // Defining item wrapper animated styles using useAnimatedStyle hook
  const itemImageWrapperAnimatedStyle = useAnimatedStyle(() => {
    // Scale
    const scale = interpolate(
      scrollX.value,
      inputRange,
      scaleAndOpacityOutputRange,
      Extrapolation.CLAMP,
    );

    // Opacity
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      scaleAndOpacityOutputRange,
      Extrapolation.CLAMP,
    );

    // Border radius
    const borderRadius = interpolate(
      scrollX.value,
      inputRange,
      [0, itemImageWrapperSize * 0.5, 0],
      Extrapolation.CLAMP,
    );

    // Returning animated styles
    return {
      transform: [
        {
          scale,
        },
      ],
      opacity,
      borderRadius,
    };
  });

  // Defining item image animated styles using useAnimatedStyle hook
  const itemImageAnimatedStyle = useAnimatedStyle(() => {
    // Translate Y
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
      Extrapolation.CLAMP,
    );

    // Opacity
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolation.CLAMP,
    );

    // Returning animated styles
    return {
      transform: [
        {
          translateY,
        },
      ],
      opacity,
    };
  });

  // Returning
  return (
    <View style={[styles.carouselItemWrapper, { width: SCREEN_WIDTH }]}>
      <Animated.View
        style={[
          styles.carouselItemImageWrapper,
          {
            height: itemImageWrapperSize,
            backgroundColor: itemImageBgColor,
          },
          itemImageWrapperAnimatedStyle,
        ]}
      >
        <Animated.Image
          style={[
            {
              flex: 1,
              width: null,
              height: null,
              aspectRatio: 1,
              resizeMode: 'contain',
            },
            itemImageAnimatedStyle,
          ]}
          source={image}
        />
      </Animated.View>

      {/* PAGINATION */}
      <View style={styles.indicatorContainer}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <PaginationDot key={i} index={i} scrollX={scrollX} />
        ))}
      </View>

      {/* TITLE + DESCRIPTION */}
      <View style={styles.textContainer}>
        <CustomText style={styles.titleText}>{SubscriptionTitle}</CustomText>
        <CustomText style={styles.descriptionText}>
          {SubscriptionDescription}
        </CustomText>
      </View>
    </View>
  );
};

const PaginationDot = ({ index, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    return {
      width: interpolate(
        scrollX.value,
        inputRange,
        [8, 24, 8],
        Extrapolation.CLAMP,
      ),
      opacity: interpolate(
        scrollX.value,
        inputRange,
        [0.3, 1, 0.3],
        Extrapolation.CLAMP,
      ),
    };
  });

  return <Animated.View style={[styles.indicator, animatedStyle]} />;
};

export default UpgradeAccount;

// import React, { useCallback, useRef, useState } from 'react';
// import { View } from 'react-native';
// import Animated, {
//   Extrapolation,
//   interpolate,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   useSharedValue,
// } from 'react-native-reanimated';
// import { scale } from 'react-native-size-matters';
// import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
// import { CustomText } from '../../components/global/CustomText';
// import ProfileHeader from '../../components/ProfileHeader';
// import Colors from '../../constants/Colors';
// import { SCREEN_WIDTH } from '../../constants/Constants';
// import { SubscriptionSlideData } from '../../data/subscriptionSlideData';
// import styles from './styles';

// const UpgradeAccount = ({ route }) => {
//   const { title } = route.params;

//   // Declaring shared value
//   const scrollX = useSharedValue(0);

//   // Declaring current index of the slide
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Defining reference for the Flatlist
//   const flatListRef = useRef(null);

//   // Handling scroll of the flat list
//   const scrollHandler = useAnimatedScrollHandler(event => {
//     scrollX.value = event.contentOffset.x;
//   });

//   // Handle viewable items changed
//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index);
//     }
//   }, []);

//   // Declaring viewability config for the Flatlist
//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 50,
//   }).current;

//   // Declaring viewability config callback pairs for the Flatlist
//   const viewabilityConfigCallbackPairs = useRef([
//     { viewabilityConfig, onViewableItemsChanged },
//   ]);

//   return (
//     <CustomSafeAreaView
//       style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
//     >
//       <ProfileHeader
//         back={true}
//         iconColor={Colors.white}
//         title={title}
//         titleAlight={'center'}
//         titleFontSize={scale(16)}
//         headerBg={Colors.black}
//       />
//       {Array.isArray(SubscriptionSlideData) &&
//       SubscriptionSlideData.length > 0 ? (
//         <View style={styles.carouselWrapper}>
//           {/* Slider */}
//           <Animated.FlatList
//             ref={flatListRef}
//             data={SubscriptionSlideData}
//             renderItem={({ item, index }) => (
//               <ProductSliderItem
//                 index={index}
//                 scrollX={scrollX}
//                 image={item.image}
//                 title={item.title}
//                 description={item.description}
//                 itemImageBgColor={item.item_bg_color}
//               />
//             )}
//             keyExtractor={item => item.id.toString()}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             bounces={false}
//             onScroll={scrollHandler}
//             scrollEventThrottle={16}
//             viewabilityConfigCallbackPairs={
//               viewabilityConfigCallbackPairs.current
//             }
//           />

//           {/* Pagination – image ke NEECH */}
//           <View style={styles.paginationWrapper}>
//             {SubscriptionSlideData.map((_, idx) => (
//               <PaginationDot key={idx} index={idx} scrollX={scrollX} />
//             ))}
//           </View>
//         </View>
//       ) : null}
//     </CustomSafeAreaView>
//   );
// };

// // Pagination Dot Component
// const PaginationDot = ({ index, scrollX }) => {
//   const dotWidth = 8;
//   const activeDotWidth = 24;

//   const animatedDotStyle = useAnimatedStyle(() => {
//     const inputRange = [
//       (index - 1) * SCREEN_WIDTH,
//       index * SCREEN_WIDTH,
//       (index + 1) * SCREEN_WIDTH,
//     ];

//     const width = interpolate(
//       scrollX.value,
//       inputRange,
//       [dotWidth, activeDotWidth, dotWidth],
//       Extrapolation.CLAMP,
//     );

//     const opacity = interpolate(
//       scrollX.value,
//       inputRange,
//       [0.3, 1, 0.3],
//       Extrapolation.CLAMP,
//     );

//     return {
//       width,
//       opacity,
//     };
//   });

//   return <Animated.View style={[styles.indicator, animatedDotStyle]} />;
// };

// // Functional component
// const ProductSliderItem = ({
//   index,
//   scrollX,
//   image,
//   title,
//   description,
//   itemImageBgColor,
// }) => {
//   // Defining
//   const itemImageWrapperSize = SCREEN_WIDTH * 0.5;
//   const translateYOffset = 50;
//   const textTranslateYOffset = 20;

//   // Declaring input range to avoid its duplication
//   const inputRange = [
//     (index - 1) * SCREEN_WIDTH,
//     index * SCREEN_WIDTH,
//     (index + 1) * SCREEN_WIDTH,
//   ];

//   // Defining item wrapper animated styles using useAnimatedStyle hook
//   const itemImageWrapperAnimatedStyle = useAnimatedStyle(() => {
//     // Scale
//     const scaleValue = interpolate(
//       scrollX.value,
//       inputRange,
//       [0.8, 1, 0.8],
//       Extrapolation.CLAMP,
//     );

//     // Opacity
//     const opacity = interpolate(
//       scrollX.value,
//       inputRange,
//       [0.5, 1, 0.5],
//       Extrapolation.CLAMP,
//     );

//     // Border radius
//     const borderRadius = interpolate(
//       scrollX.value,
//       inputRange,
//       [0, itemImageWrapperSize * 0.5, 0],
//       Extrapolation.CLAMP,
//     );

//     // Returning animated styles
//     return {
//       transform: [{ scale: scaleValue }],
//       opacity,
//       borderRadius,
//     };
//   });

//   // Defining item image animated styles using useAnimatedStyle hook
//   const itemImageAnimatedStyle = useAnimatedStyle(() => {
//     // Translate Y
//     const translateY = interpolate(
//       scrollX.value,
//       inputRange,
//       [translateYOffset, 0, -translateYOffset],
//       Extrapolation.CLAMP,
//     );

//     // Returning animated styles
//     return {
//       transform: [{ translateY }],
//     };
//   });

//   // Text animation styles
//   const textAnimatedStyle = useAnimatedStyle(() => {
//     const opacity = interpolate(
//       scrollX.value,
//       inputRange,
//       [0, 1, 0],
//       Extrapolation.CLAMP,
//     );

//     const translateY = interpolate(
//       scrollX.value,
//       inputRange,
//       [textTranslateYOffset, 0, -textTranslateYOffset],
//       Extrapolation.CLAMP,
//     );

//     return {
//       opacity,
//       transform: [{ translateY }],
//     };
//   });

//   // Returning
//   return (
//     <View style={[styles.carouselItemWrapper, { width: SCREEN_WIDTH }]}>
//       <Animated.View
//         style={[
//           styles.carouselItemImageWrapper,
//           {
//             width: itemImageWrapperSize,
//             height: itemImageWrapperSize,
//             backgroundColor: itemImageBgColor,
//           },
//           itemImageWrapperAnimatedStyle,
//         ]}
//       >
//         <Animated.Image
//           style={[
//             {
//               width: '70%',
//               height: '70%',
//               resizeMode: 'contain',
//             },
//             itemImageAnimatedStyle,
//           ]}
//           source={image}
//         />
//       </Animated.View>

//       {/* Title and Description */}
//       <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
//         <CustomText style={styles.titleText}>{title}</CustomText>
//         <CustomText style={styles.descriptionText}>{description}</CustomText>
//       </Animated.View>
//     </View>
//   );
// };

// export default UpgradeAccount;
