import React, { useRef, useState } from 'react';
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
import { useSelector } from 'react-redux';
import MatchScreen from '../MatchScreen';

const SwipeScreen = ({ navigation }) => {
  // Local State
  const userInfo = useSelector(state => state.users.users);
  const [showMode, setShowMode] = useState(0);
  const [canUserSwipe, setCanUserSwipe] = useState(true);
  const [recommendations, setRecommendations] = useState(SwiperData);
  const [currentMatchData, setCurrentMatchData] = useState(null);
  const [cardInfo, setCardInfo] = useState(null);
  const [user, setUser] = useState({
    id: 'current_user_id',
    userID: 'current_user_id',
  });

  // Swipe tracker object simulation
  const swipeTracker = React.useRef({
    addSwipe: (user, swipeItem, type, callback) => {
      console.log(`Swiped ${type} on:`, swipeItem.firstName);
      callback();

      // If it's a like, simulate a match (50% chance)
      if (type === 'like' && Math.random() > 0.5) {
        setCurrentMatchData(swipeItem);
        setShowMode(2);
      }
    },
    removeSwipe: (swipeToUndoId, userID) => {
      console.log('Undo swipe for:', swipeToUndoId);
    },
  });

  const getCanUserSwipe = (shouldUpdate = true) => {
    // For testing, always return true
    setCanUserSwipe(true);
    return true;
  };

  const undoSwipe = swipeToUndo => {
    if (!swipeToUndo) {
      return;
    }

    const swipeToUndoId = swipeToUndo.id || swipeToUndo.userID;
    const userID = user.id || user.userID;

    swipeTracker.current.removeSwipe(swipeToUndoId, userID);
  };

  const onSwipe = (type, swipeItem) => {
    const canSwipe = getCanUserSwipe();

    if (!canSwipe) {
      return;
    }

    if (swipeItem && canSwipe) {
      swipeTracker.current.addSwipe(user, swipeItem, type, response => {});
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
