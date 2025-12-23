import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import DeckItemCard from '../../components/cards/DeckItemCard';
import Colors from '../../constants/Colors';
import { Images } from '../../constants/images';
import styles from './styles';
import SwiperData from '../../data/SwiperData';
import FastImage from '@d11/react-native-fast-image';
import PostUserProfileInfoSheet from '../../components/actionSheets/PostUserProfileInfoSheet';
import { SheetManager } from 'react-native-actions-sheet';

const SwipeScreen = ({ navigation }) => {
  // Local State
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
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#fff' }}>
          No more profiles to show
        </Text>
      </View>
    );
  };

  const renderNewMatch = () => {
    if (!currentMatchData) return null;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          It's a Match! 🎉
        </Text>
        <FastImage
          source={{ uri: currentMatchData.profilePictureURL }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            marginBottom: 20,
          }}
        />
        <Text style={{ fontSize: 20, marginBottom: 30 }}>
          You and {currentMatchData.firstName} liked each other!
        </Text>
        <TouchableOpacity
          onPress={() => handleNewMatchButtonTap('Conversations')}
          style={{
            backgroundColor: '#4CCC93',
            padding: 15,
            borderRadius: 25,
            marginBottom: 10,
            width: 200,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
            Send Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNewMatchButtonTap(null)}
          style={{
            backgroundColor: '#E5566D',
            padding: 15,
            borderRadius: 25,
            width: 200,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
            Keep Swiping
          </Text>
        </TouchableOpacity>
      </View>
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
          setShowMode={setShowMode}
          onUndoSwipe={undoSwipe}
          onSwipe={onSwipe}
          showMode={showMode}
          onAllCardsSwiped={onAllCardsSwiped}
          isPlanActive={true}
          setSubscriptionVisible={() => console.log('Show subscription')}
          renderEmptyState={renderEmptyState}
          renderNewMatch={renderNewMatch}
          canUserSwipe={canUserSwipe}
          navigation={navigation}
          onPressCard={va => {
            setCardInfo(va);
            SheetManager.show('PostUserProfileInfoSheet');
          }}
        />
      </ImageBackground>

      <PostUserProfileInfoSheet item={cardInfo} />
    </View>
  );
};

export default SwipeScreen;
