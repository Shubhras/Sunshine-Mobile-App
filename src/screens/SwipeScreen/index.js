import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import DeckItemCard from '../../components/cards/DeckItemCard';
import Colors from '../../constants/Colors';
import { Images } from '../../constants/images';
import styles from './styles';
import SwiperData from '../../data/SwiperData';
import FastImage from '@d11/react-native-fast-image';
import PostUserProfileInfoSheet from '../../components/actionSheets/PostUserProfileInfoSheet';
import { SheetManager } from 'react-native-actions-sheet';
import NoMoreCard from '../../components/cards/NoMoreCard';
import MatchScreen from '../MatchScreen';
import firestore from '@react-native-firebase/firestore';
import SwipeTracker from '../../api/firebase/tracker';
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux'

const SwipeScreen = ({ navigation }) => {
  // Local State
  const userInfo = useSelector(state => state.users.users);
  const [showMode, setShowMode] = useState(0);
  const [canUserSwipe, setCanUserSwipe] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [currentMatchData, setCurrentMatchData] = useState(null);
  const [cardInfo, setCardInfo] = useState(null);
  const [user, setUser] = useState({
    id: 'current_user_id',
    userID: 'current_user_id',
  });

  // // Swipe tracker object simulation
  // const swipeTracker = React.useRef({
  //   addSwipe: (user, swipeItem, type, callback) => {
  //     console.log(`Swiped ${type} on:`, swipeItem.firstName);
  //     callback();

  //     // If it's a like, simulate a match (50% chance)
  //     if (type === 'like' && Math.random() > 0.5) {
  //       setCurrentMatchData(swipeItem);
  //       setShowMode(2);
  //     }
  //   },
  //   removeSwipe: (swipeToUndoId, userID) => {
  //     console.log('Undo swipe for:', swipeToUndoId);
  //   },
  // });
  const { store } = useContext(ReactReduxContext)
  const swipeTracker = useRef(new SwipeTracker(store, userInfo.userID))
 const isLoadingRecommendations = useRef(false)
   const recommendationBatchLimit = 75
  const swipeThreshold = 5
  const usersRef = firestore().collection('users')
 const swipeCountDetail = useRef({})

 const [
    hasConsumedRecommendationsStream,
    setHasConsumedRecommendationsStream,
  ] = useState(false)
 
  const recommendationRef = useRef(
  usersRef
    .orderBy('createdAt', 'desc')
    .limit(recommendationBatchLimit)
);

useEffect(()=>{
  getUserSwipeCount()
getMoreRecommendationsIfNeeded()
},[])






  const getUserSwipeCount = async () => {
    const userID = userInfo.userID

    const swipeCountInfo = await swipeTracker.current.getUserSwipeCount(userID)

    if (swipeCountInfo) {
      swipeCountDetail.current = swipeCountInfo
    } else {
      resetSwipeCountDetail()
    }

    getCanUserSwipe(false)
  }

    const resetSwipeCountDetail = () => {
    swipeCountDetail.current = {
      count: 0,
      createdAt: {
        seconds: Date.now() / 1000,
      },
    }
  }
    const updateSwipeCountDetail = () => {
    const userID = userInfo.userID

    swipeTracker.current.updateUserSwipeCount(
      userID,
      swipeCountDetail.current.count,
    )
  }

  const getMoreRecommendationsIfNeeded = async () => {
    if (isLoadingRecommendations.current || hasConsumedRecommendationsStream) {
      return
    }

    isLoadingRecommendations.current = true

    try {
      const documentSnapshots = await recommendationRef.current.get()
      const docs = documentSnapshots.docs

      if (docs.length > 0) {
        // Get the last visible recommendation document and construct a new query starting at this document,
        recommendationRef.current = usersRef
          .orderBy('id', 'desc')
          .startAfter(documentSnapshots.docs[docs.length - 1])
          .limit(recommendationBatchLimit)

        // Filter out invalid recommendations and update the UI data source
        const newRecommendations = filteredAndHydratedRecommendations(docs)

        isLoadingRecommendations.current = false

        if (newRecommendations.length > 0) {
          setRecommendations([...recommendations, ...newRecommendations])
        } else {
          getMoreRecommendationsIfNeeded()
        }
      } else {
        isLoadingRecommendations.current = false
        setHasConsumedRecommendationsStream(true)
      }
    } catch (error) {
      alert(error)
      isLoadingRecommendations.current = false
    }
  }

  const filteredAndHydratedRecommendations = docs => {
    const hydratedRecommendations = docs.map(doc => {
      return hydratedValidRecommendation(doc.data())
    })
    return hydratedRecommendations.filter(
      recommendation => recommendation != null,
    )
  }
    const hydratedValidRecommendation = otherUser => {
      return otherUser
    var userSettings = user.settings
    if (!userSettings) {
      userSettings = {
        distance_radius: 'unlimited',
        gender: 'none',
        gender_preference: 'all',
        show_me: true,
        sun_sign: 'none',
        moon_sign: 'none',
        venus_sign: 'none',
        min: 17,
        max: 100,
      }
      let newUser = { ...user, settings: userSettings }
      userAPIManager.updateUserData(user?.id, newUser)
      dispatch(setUserData({ user: newUser }))
    }
    var a = userSettings?.min
    var b = userSettings?.max
    // if (a == undefined) {
    //   Object.assign(userSettings, { min: 17 });
    // }
    if (a == undefined && b == undefined) {
      // return
    } else {
      if (a !== undefined) {
        if (b == undefined) {
          Object.assign(userSettings, { max: 100 })
        }
      } else if (b !== undefined) {
        if (a == undefined) {
          Object.assign(userSettings, { min: 17 })
        }
      }
    }
    const myLocation = user.location
    const myGenderPre =
      (userSettings && userSettings?.gender_preference) || 'all'
    const appDistance = (userSettings &&
      userSettings.distance_radius &&
      userSettings.distance_radius.toLowerCase() != 'unlimited' &&
      userSettings.distance_radius.split(' ')) || ['100000']
    const distanceValue = Number(appDistance[0])
    const { firstName, email, phone, profilePictureURL, id } = otherUser
    const defaultAvatar =
      'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'
    const gender = otherUser.settings ? otherUser.settings.gender : 'none'
    const genderPre = otherUser.settings
      ? otherUser.settings.gender_preference
      : 'all'
    const location = otherUser.location ? otherUser.location : 'unlimited'
    const isNotCurrentUser = id != user.id
    const hasNotBeenBlockedByCurrentUser =
      bannedUserIDs != null && !bannedUserIDs.includes(id)
    const hasPreviouslyNotBeenSwiped =
      swipes != null && !swipes.find(user => user.id == id)

    const isGenderCompatible =
      myGenderPre == 'all' || myGenderPre == 'Both'
        ? true
        : gender == myGenderPre
    const otherUserProfileIsPublic =
      otherUser.settings && otherUser.settings.show_me != null
        ? otherUser.settings.show_me == 'true' ||
          otherUser.settings.show_me == true
        : true
    const mySunSignPref = (userSettings && userSettings?.sun_sign) || 'none'
    const otherUserSunSignPref = otherUser.settings
      ? otherUser.settings.sun_sign
      : 'none'
    const isSunSignPref =
      mySunSignPref == 'none' ? true : mySunSignPref == otherUserSunSignPref
    const myMoonSignPref = (userSettings && userSettings?.moon_sign) || 'none'
    const otherUserMoonSignPref = otherUser.settings
      ? otherUser.settings.moon_sign
      : 'none'
    const isMoonSignPref =
      myMoonSignPref == 'none' ? true : myMoonSignPref == otherUserMoonSignPref
    const myVenusSignPref = (userSettings && userSettings?.venus_sign) || 'none'
    const otherUserVenusSignPref = otherUser.settings
      ? otherUser.settings.venus_sign
      : 'none'
    const isVenusSignPref =
      myVenusSignPref == 'none'
        ? true
        : myVenusSignPref == otherUserVenusSignPref
    const myMinAgePref = (userSettings && userSettings?.min) || 'none'
    const otherAge = otherUser.age !== undefined ? otherUser.age : 'none'
    const ageRangeVal =
      otherAge >= userSettings?.min && otherAge <= userSettings?.max
    const myAgePref = myMinAgePref == 'none' ? true : ageRangeVal

    if (
      firstName &&
      firstName.length > 0 &&
      (email || phone) &&
      profilePictureURL &&
      // profilePictureURL != defaultAvatar && // Uncomment this line if you don't want users with no avatar show up in the recommendations
      (location || appDistance == '100000') &&
      isNotCurrentUser &&
      hasPreviouslyNotBeenSwiped &&
      isGenderCompatible &&
      otherUserProfileIsPublic &&
      hasNotBeenBlockedByCurrentUser &&
      isSunSignPref &&
      isMoonSignPref &&
      isVenusSignPref &&
      myAgePref
    ) {
      if (!location || !myLocation) {
        otherUser.distance = IMLocalized('> 100 miles away')
        return otherUser
      }

      otherUser.distance = distance(
        location.latitude,
        location.longitude,
        myLocation.latitude,
        myLocation.longitude,
      )

      const otherUserDistanceNumber = otherUser.distance.match(/\d+/)
      const isWithinDistanceRadius =
        otherUserDistanceNumber?.length > 0 &&
        otherUserDistanceNumber[0] <= distanceValue

      if (appDistance == '100000' || isWithinDistanceRadius) {
        return otherUser
      }
    }
    return null
  }

    const getSwipeTimeDifference = swipeCountDetail => {
    let now = +new Date()
    let createdAt = +new Date()

    if (swipeCountDetail?.createdAt?.seconds) {
      createdAt = +new Date(swipeCountDetail.createdAt.seconds * 1000)
    }

    return now - createdAt
  }
  const getCanUserSwipe = (shouldUpdate = true) => {
    // if (isPlanActive) {
    //   setCanUserSwipe(true)

    //   return true
    // }

    const oneDay = 60 * 60 * 24 * 1000

    const swipeTimeDifference = getSwipeTimeDifference(swipeCountDetail.current)

    if (swipeTimeDifference > oneDay) {
      resetSwipeCountDetail()
      updateSwipeCountDetail()

      setCanUserSwipe(true)

      return true
    }

    if (swipeCountDetail.current.count >= 0) {
      if (shouldUpdate) {
        swipeCountDetail.current.count += 1
        updateSwipeCountDetail()
      }

      setCanUserSwipe(swipeCountDetail.current.count + 1 >= 0)

      return true
    }

    if (
      swipeTimeDifference < oneDay &&
      swipeCountDetail.current.count >= DatingConfig.dailySwipeLimit
    ) {
      setCanUserSwipe(false)

      return false
    }
  }







  // const getCanUserSwipe = (shouldUpdate = true) => {
  //   // For testing, always return true
  //   setCanUserSwipe(true);
  //   return true;
  // };

  const undoSwipe = swipeToUndo => {
    if (!swipeToUndo) {
      return
    }

    const swipeToUndoId = swipeToUndo.id || swipeToUndo.userID
    const userID = userInfo.id || userInfo.userID

    swipeTracker.current.removeSwipe(swipeToUndoId, userID)
  }


  const onSwipe = (type, swipeItem) => {
    const canSwipe = getCanUserSwipe();

    if (!canSwipe) {
      return;
    }
    console.log("LPLPLKKJJHFDFGDFGXFTXDXZFXDX",type);

    if (swipeItem && canSwipe) {
      
      swipeTracker.current.addSwipe(userInfo, swipeItem, type, response => {});
    }
  };

  const onAllCardsSwiped = () => {
    // Reset recommendations or show empty state
    console.log('All cards swiped!');
    setRecommendations([]);
  };

  const renderEmptyState = () => {
    return <NoMoreCard profilePictureURL={userInfo.profilePictureURL} />;
  };

  const renderNewMatch = () => {
    if (!currentMatchData) return null;
    return (
      <MatchScreen
        url={currentMatchData.profilePictureURL}
        onSendMessage={() => handleNewMatchButtonTap('Conversations')}
        onKeepSwiping={() => handleNewMatchButtonTap(null)}
      />
    );
  };

  const handleNewMatchButtonTap = nextScreen => {
    setShowMode(0);
    setCurrentMatchData(null);
    if (nextScreen) {
      navigation.navigate(nextScreen);
    }
  };

  // Return
  return (
    <View style={[styles.mainWrapper, { backgroundColor: Colors.black }]}>
      <ImageBackground
        source={Images.backgroundImage}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <DeckItemCard
          data={recommendations}
          // setShowMode={setShowMode}
          onUndoSwipe={undoSwipe}
          onSwipe={onSwipe}
          onAllCardsSwiped={onAllCardsSwiped}
          isPlanActive={true}
          setSubscriptionVisible={() => console.log('Show subscription')}
          renderEmptyState={renderEmptyState}
          renderNewMatch={renderNewMatch}
          canUserSwipe={canUserSwipe}
          navigation={navigation}
          // useSwiper={useSwiper}
          // onPressCard={va => {
          //   setCardInfo(va);
          //   SheetManager.show('PostUserProfileInfoSheet');
          // }}
        />
      </ImageBackground>
    </View>
  );
};

export default SwipeScreen;
