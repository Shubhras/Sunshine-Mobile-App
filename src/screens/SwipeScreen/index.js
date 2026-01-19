import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  AppState,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
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
import firestore, {
  collection,
  doc,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
} from '@react-native-firebase/firestore';
import SwipeTracker from '../../api/firebase/tracker';
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux';
import {
  getUserSubscription,
  updateUserSubscription,
} from '../../api/firebase/firebase';
import {
  mySubscribedPlan,
  setIsPlanActive,
} from '../../redux/slices/inAppPurchaseSlice';
import Geolocation from '@react-native-community/geolocation';
import { updateUser } from '../../redux/slices/SessionUser';
import { getApp } from '@react-native-firebase/app';
import {
  deepNormalize,
  filterUsers,
  filterUsersByMyProfile,
} from '../../constants/helpers/helperFunction';
import TNActivityIndicator from '../../components/TNActivityIndicator';
import { SCREEN_WIDTH } from '../../constants/Constants';
import { CustomText } from '../../components/global/CustomText';

const shuffleArray = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

const SwipeScreen = ({ navigation }) => {
  // Local State
  const userInfo = useSelector(state => state.users.users);
  const swipes = useSelector(state => state.dating.swipes);
  const bannedUserIDs = useSelector(state => state.userReports.bannedUserIDs);
  const matches = useSelector(state => state.dating.matches);
  const isPlanActive = useSelector(state => state.inAppPurchase.isPlanActive);
  const dispatch = useDispatch();
  const [showMode, setShowMode] = useState(0);
  const [canUserSwipe, setCanUserSwipe] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [currentMatchData, setCurrentMatchData] = useState(null);
  const [cardInfo, setCardInfo] = useState(null);
  const user = userInfo;

  const [appState, setAppState] = useState(AppState.currentState);
  const [positionWatchID, setPositionWatchID] = useState(null);
  const [userSettingsDidChange, setUserSettingsDidChange] = useState(false);

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
  const { store } = useContext(ReactReduxContext);
  const swipeTracker = useRef(new SwipeTracker(store, userInfo.userID));
  const isLoadingRecommendations = useRef(false);
  const recommendationBatchLimit = 75;
  const swipeThreshold = 5;
  const db = getFirestore(getApp());
  const usersRef = collection(db, 'users');
  var userRef = null;
  if (user) {
    userRef = doc(usersRef, user.id);
  }
  const swipeCountDetail = useRef({});

  const [
    hasConsumedRecommendationsStream,
    setHasConsumedRecommendationsStream,
  ] = useState(false);

  const recommendationRef = useRef(
    query(
      usersRef,
      orderBy('createdAt', 'desc'),
      limit(recommendationBatchLimit),
    ),
  );

  const [subscription, setSubscription] = useState(null);
  const loadSubscription = async () => {
    const userID = userInfo.id || userInfo.userID;

    const { subscription } = await getUserSubscription(userID);

    setSubscription(subscription);
    //console.log("bahi..4..",subscription )
    // validateIOSPlan(subscription)
  };
  const validateIOSReceipt = async receipt => {
    const isTestEnvironment = __DEV__;

    const receiptBody = {
      'receipt-data': receipt,
      password: '0e204fa5b8e54c6aabfcf404747f5c44',
    };
    //console.log("bahi..3...")
    try {
      // const validatedReceipt = await validateReceiptIos(
      //   receiptBody,
      //   isTestEnvironment,
      // )
      // //console.log("bahi..3...")
      // return validatedReceipt
      return true;
    } catch (error) {
      //console.log("bahi..3...",error)
      return {};
    }
  };
  const validateIOSPlan = async subscription => {
    //console.log("bahi..2.....",subscription)
    const { transactionDate, subscriptionPeriod, receipt, productId, active } =
      subscription;
    //console.log("bahi..21", receipt)
    const userID = userInfo.id || userInfo?.userID;

    const { status, latest_receipt } = await validateIOSReceipt(receipt);
    console.log('status..1', status);
    const updatedReceipt = { receipt: latest_receipt, active: true };

    if (status === receiptValidationStatus.SUCCESS) {
      dispatch(setIsPlanActive(true));
      // dispatch(mySubscribedPlan(subscription));

      dispatch(mySubscribedPlan(deepNormalize(subscription)));
      if (userID) {
        updateUserSubscription(userID, updatedReceipt);
        // updateUser(userID, { isVIP: true })
      }

      return;
    }
  };

  const handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      userRef
        .update({
          isOnline: true,
        })
        .then(() => {
          dispatch(updateUser({ isOnline: true }));
        })
        .then(() => {
          setAppState(nextAppState);
        })
        .catch(error => {});
    } else {
      userRef
        .update({
          isOnline: false,
        })
        .then(() => {
          dispatch(updateUser({ isOnline: false }));
        })
        .then(() => {
          setAppState(nextAppState);
        })
        .catch(error => {});
    }
  };

  const watchPositionChange = async () => {
    if (Platform.OS === 'ios') {
      setPositionWatchID(watchPosition());
    } else {
      handleAndroidLocationPermission();
    }
  };

  const handleAndroidLocationPermission = async () => {
    try {
      // const { status } = await Location.requestForegroundPermissionsAsync()
      // if (status === 'granted') {
      setPositionWatchID(watchPosition());
      // } else {
      //   alert(
      //     IMLocalized(
      //       'Location permission denied. Turn on location to use the app.',
      //     ),
      //   )
      // }
    } catch (err) {}
  };

  const watchPosition = () => {
    return Geolocation.watchPosition(position => {
      const locationDict = {
        position: {
          // for legacy reasons
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      };
      userRef
        .update(locationDict)
        .then(() => {
          dispatch(updateUser({ ...user, ...locationDict }));
        })
        .catch(error => {});
    });
  };

  // useEffect(() => {
  //   if (!isPlanActive && Platform.OS === 'ios') {
  //     loadSubscription();
  //   }
  // }, []);

  //
  useEffect(() => {
    // StatusBar.setHidden(false)
    swipeTracker.current.subscribeIfNeeded();

    // let didFocusSubscription = navigation.addListener('focus', payload =>
    //   handleComponentDidFocus(),
    // )

    // AppState.addEventListener('change', handleAppStateChange)

    if (user) {
      userRef = doc(usersRef, user.id);
    }

    // if (!isDatingProfileCompleteForUser(user)) {
    //   handleIncompleteUserData();
    // } else {
    //   setHasValidatedCurrentProfile(true);
    // }

    getUserSwipeCount();

    // watchPositionChange();

    // handleAppStateChange();
    return () => {
      // didFocusSubscription && didFocusSubscription()
      // AppState.removeEventListener('change', handleAppStateChange)
      positionWatchID != null && Geolocation.clearWatch(positionWatchID);
      swipeTracker.current.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (matches != null) {
      // We retrieve all new matches and notify the user
      const unseenMatches = matches.filter(match => !match.matchHasBeenSeen);
      if (unseenMatches.length > 0 && !currentMatchData) {
        // Send push notification
        // notificationManager.sendPushNotification(
        //   unseenMatches[0],
        //   IMLocalized('New match!'),
        //   IMLocalized('You just got a new match!'),
        //   'dating_match',
        //   { fromUser: user },
        // )
        setCurrentMatchData(unseenMatches[0]);
      }
    }
  }, [matches, currentMatchData]);

  useEffect(() => {
    if (currentMatchData) {
      swipeTracker.current.markSwipeAsSeen(currentMatchData, user);
      renderNewMatch();
    }
  }, [currentMatchData]);

  useEffect(() => {
    if (recommendations.length === 0 && swipes) {
      getMoreRecommendationsIfNeeded();
    }
  }, [swipes, recommendations]);

  useEffect(() => {
    setRecommendations([]);
    isLoadingRecommendations.current = false;
    setHasConsumedRecommendationsStream(false);
    recommendationRef.current = query(
      usersRef,
      orderBy('id', 'desc'),
      limit(recommendationBatchLimit),
    );
  }, [userInfo?.settings]);

  const getUserSwipeCount = async () => {
    const userID = userInfo.userID;

    const swipeCountInfo = await swipeTracker.current.getUserSwipeCount(userID);
    if (swipeCountInfo) {
      swipeCountDetail.current = swipeCountInfo;
    } else {
      resetSwipeCountDetail();
    }

    getCanUserSwipe(false);
  };

  const resetSwipeCountDetail = () => {
    swipeCountDetail.current = {
      count: 0,
      createdAt: {
        seconds: Date.now() / 1000,
      },
    };
  };
  const updateSwipeCountDetail = () => {
    const userID = userInfo.userID;

    swipeTracker.current.updateUserSwipeCount(
      userID,
      swipeCountDetail.current.count,
    );
  };

  const getMoreRecommendationsIfNeeded = async () => {
    if (isLoadingRecommendations.current || hasConsumedRecommendationsStream) {
      return;
    }

    isLoadingRecommendations.current = true;

    try {
      const documentSnapshots = await recommendationRef.current.get();
      const docs = documentSnapshots.docs;

      if (docs.length > 0) {
        // Get the last visible recommendation document and construct a new query starting at this document,
        recommendationRef.current = query(
          usersRef,
          orderBy('id', 'desc'),
          startAfter(documentSnapshots.docs[docs.length - 1]),
          limit(recommendationBatchLimit),
        );

        // Filter out invalid recommendations and update the UI data source
        const newRecommendations = filteredAndHydratedRecommendations(docs);
        // const matchedUsers = filterUsersByMyProfile(newRecommendations, userInfo)
        const matchedUsers = filterUsers(
          newRecommendations,
          userInfo,
          bannedUserIDs,
        );
        console.log('All otherUser  list home', matchedUsers);
        isLoadingRecommendations.current = false;

        if (matchedUsers.length > 0) {
          setRecommendations([...recommendations, ...matchedUsers]);
          // setRecommendations([...recommendations, ...newRecommendations]);
        } else {
          getMoreRecommendationsIfNeeded();
        }
      } else {
        isLoadingRecommendations.current = false;
        setHasConsumedRecommendationsStream(true);
      }
    } catch (error) {
      alert(error);
      isLoadingRecommendations.current = false;
    }
  };

  const filteredAndHydratedRecommendations = docs => {
    const hydratedRecommendations = docs.map(doc => {
      // return hydratedValidRecommendation(doc.data());
      return doc.data();
    });
    return hydratedRecommendations.filter(
      recommendation => recommendation != null,
    );
  };
  const hydratedValidRecommendation = otherUser => {
    return otherUser;
    var userSettings = user.settings;
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
      };
      let newUser = { ...user, settings: userSettings };
      userAPIManager.updateUserData(user?.id, newUser);
      dispatch(setUserData({ user: newUser }));
    }
    var a = userSettings?.min;
    var b = userSettings?.max;
    // if (a == undefined) {
    //   Object.assign(userSettings, { min: 17 });
    // }
    if (a == undefined && b == undefined) {
      // return
    } else {
      if (a !== undefined) {
        if (b == undefined) {
          Object.assign(userSettings, { max: 100 });
        }
      } else if (b !== undefined) {
        if (a == undefined) {
          Object.assign(userSettings, { min: 17 });
        }
      }
    }
    const myLocation = user.location;
    const myGenderPre =
      (userSettings && userSettings?.gender_preference) || 'all';
    const appDistance = (userSettings &&
      userSettings.distance_radius &&
      userSettings.distance_radius.toLowerCase() != 'unlimited' &&
      userSettings.distance_radius.split(' ')) || ['100000'];
    const distanceValue = Number(appDistance[0]);
    const { firstName, email, phone, profilePictureURL, id } = otherUser;
    const defaultAvatar =
      'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';
    const gender = otherUser.settings ? otherUser.settings.gender : 'none';
    const genderPre = otherUser.settings
      ? otherUser.settings.gender_preference
      : 'all';
    const location = otherUser.location ? otherUser.location : 'unlimited';
    const isNotCurrentUser = id != user.id;
    const hasNotBeenBlockedByCurrentUser =
      bannedUserIDs != null && !bannedUserIDs.includes(id);
    const hasPreviouslyNotBeenSwiped =
      swipes != null && !swipes.find(user => user.id == id);

    const isGenderCompatible =
      myGenderPre == 'all' || myGenderPre == 'Both'
        ? true
        : gender == myGenderPre;
    const otherUserProfileIsPublic =
      otherUser.settings && otherUser.settings.show_me != null
        ? otherUser.settings.show_me == 'true' ||
          otherUser.settings.show_me == true
        : true;
    const mySunSignPref = (userSettings && userSettings?.sun_sign) || 'none';
    const otherUserSunSignPref = otherUser.settings
      ? otherUser.settings.sun_sign
      : 'none';
    const isSunSignPref =
      mySunSignPref == 'none' ? true : mySunSignPref == otherUserSunSignPref;
    const myMoonSignPref = (userSettings && userSettings?.moon_sign) || 'none';
    const otherUserMoonSignPref = otherUser.settings
      ? otherUser.settings.moon_sign
      : 'none';
    const isMoonSignPref =
      myMoonSignPref == 'none' ? true : myMoonSignPref == otherUserMoonSignPref;
    const myVenusSignPref =
      (userSettings && userSettings?.venus_sign) || 'none';
    const otherUserVenusSignPref = otherUser.settings
      ? otherUser.settings.venus_sign
      : 'none';
    const isVenusSignPref =
      myVenusSignPref == 'none'
        ? true
        : myVenusSignPref == otherUserVenusSignPref;
    const myMinAgePref = (userSettings && userSettings?.min) || 'none';
    const otherAge = otherUser.age !== undefined ? otherUser.age : 'none';
    const ageRangeVal =
      otherAge >= userSettings?.min && otherAge <= userSettings?.max;
    const myAgePref = myMinAgePref == 'none' ? true : ageRangeVal;

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
        otherUser.distance = IMLocalized('> 100 miles away');
        return otherUser;
      }

      otherUser.distance = distance(
        location.latitude,
        location.longitude,
        myLocation.latitude,
        myLocation.longitude,
      );

      const otherUserDistanceNumber = otherUser.distance.match(/\d+/);
      const isWithinDistanceRadius =
        otherUserDistanceNumber?.length > 0 &&
        otherUserDistanceNumber[0] <= distanceValue;

      if (appDistance == '100000' || isWithinDistanceRadius) {
        return otherUser;
      }
    }
    return null;
  };

  const getSwipeTimeDifference = swipeCountDetail => {
    let now = +new Date();
    let createdAt = +new Date();

    if (swipeCountDetail?.createdAt?.seconds) {
      createdAt = +new Date(swipeCountDetail.createdAt.seconds * 1000);
    }

    return now - createdAt;
  };
  const getCanUserSwipe = (shouldUpdate = true) => {
    // if (isPlanActive) {
    //   setCanUserSwipe(true)

    //   return true
    // }

    const oneDay = 60 * 60 * 24 * 1000;

    const swipeTimeDifference = getSwipeTimeDifference(
      swipeCountDetail.current,
    );

    if (swipeTimeDifference > oneDay) {
      resetSwipeCountDetail();
      updateSwipeCountDetail();

      setCanUserSwipe(true);

      return true;
    }

    if (swipeCountDetail.current.count >= 0) {
      if (shouldUpdate) {
        swipeCountDetail.current.count += 1;
        updateSwipeCountDetail();
      }

      setCanUserSwipe(swipeCountDetail.current.count + 1 >= 0);

      return true;
    }

    if (
      swipeTimeDifference < oneDay &&
      swipeCountDetail.current.count >= DatingConfig.dailySwipeLimit
    ) {
      setCanUserSwipe(false);

      return false;
    }
  };

  // const getCanUserSwipe = (shouldUpdate = true) => {
  //   // For testing, always return true
  //   setCanUserSwipe(true);
  //   return true;
  // };

  const undoSwipe = swipeToUndo => {
    if (!swipeToUndo) {
      return;
    }

    const swipeToUndoId = swipeToUndo.id || swipeToUndo.userID;
    const userID = userInfo.id || userInfo.userID;

    swipeTracker.current.removeSwipe(swipeToUndoId, userID);
  };

  const onSwipe = (type, swipeItem) => {
    const canSwipe = getCanUserSwipe();

    if (!canSwipe) {
      return;
    }
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
    // if (!currentMatchData) return null;
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
        {isPlanActive ? (
          <>
            {!hasConsumedRecommendationsStream &&
            recommendations.length === 0 ? (
              <TNActivityIndicator />
            ) : (
              <DeckItemCard
                data={shuffleArray(recommendations)}
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
            )}
          </>
        ) : (
          <>
            <Image
              source={require('../../assets/images/subscribe.png')}
              style={styles.imageBackground}
            />
            <View style={styles.button}>
              <CustomText style={styles.textsize}>
                Explore the experince of matching
              </CustomText>
              <CustomText style={styles.textsize}>
                 Dietary option, Exercise option, Personality traits, Love language
              </CustomText>
              <CustomText style={styles.textsize}>
                and for general searches for all in one price .
              </CustomText>
              <CustomText style={styles.textsize}>Subscribe to Explore!</CustomText>
              
              <TouchableOpacity
                onPress={() => {navigation.navigate('UpgradeAccount', {title: 'Upgrade Account'})}}
                style={styles.buttoncontainer}
              >
                <CustomText style={styles.text}>Subscribe</CustomText>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
};

export default SwipeScreen;
