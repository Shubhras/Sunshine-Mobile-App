import FastImage from '@d11/react-native-fast-image';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import ImageView from 'react-native-image-viewing';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';
import { SCREEN_WIDTH } from '../../../constants/Constants';
import { Images } from '../../../constants/images';
import SwipeControls from '../SwipeControls';
import styles from './styles';
import { CustomText } from '../../global/CustomText';

const HIT_SLOP = { top: 15, left: 15, right: 15, bottom: 15 };
const changeImage =
  'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pics.png?alt=media&token=c387f3dc-00bc-4535-be43-0d46f3b44bc0';
const staticImage =
  'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pic2.jpg?alt=media&token=0afb6fe0-16c4-4600-8b81-5dbd618c71d5';

const CardDetailsView = props => {
  const [firstName] = useState(props.firstName || '');
  const [lastName] = useState(props.lastName || '');
  const [age] = useState(props.age || '');
  const [school] = useState(props.school || 'UCLA');
  const [distance] = useState(props.distance || '');
  const [bio] = useState(props.bio || '');
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [tappedImageIndex, setTappedImageIndex] = useState(null);
  const [photosUpdated, setPhotosUpdated] = useState(false);
  const [swiperDotWidth, setSwiperDotWidth] = useState(null);
  const privateSettingsActionSheetRef = useRef(null);
  const [myPhotos] = useState(props.instagramPhotos || profileImage);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (
      props?.profilePictureURL ==
      'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pic2.jpg?alt=media&token=0afb6fe0-16c4-4600-8b81-5dbd618c71d5'
    ) {
      setProfileImage(
        'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pics.png?alt=media&token=c387f3dc-00bc-4535-be43-0d46f3b44bc0',
      );
    } else {
      setProfileImage(props?.profilePictureURL);
    }
  }, []);

  const [instagramPhotos, setInstagramPhotos] = useState(
    props.instagramPhotos || [],
  );

  const updatePhotos = photos => {
    let myphotos = [];
    let temp = [];

    if (photos.length > 0) {
      photos.map((item, index) => {
        item && temp.push(item);

        if (index % 6 == 5) {
          temp && myphotos.push(temp);
          temp = [];
        }
      });

      myphotos.push(temp);
      setInstagramPhotos(myphotos);
      setPhotosUpdated(true);
    }
  };

  useEffect(() => {
    updatePhotos(instagramPhotos);
    setSwiperDotWidth(Math.floor(SCREEN_WIDTH / myPhotos.length) - 4);
  }, []);

  const onDislikePressed = () => {
    props.setShowMode(0);
    props.onSwipeLeft();
  };

  const onLikePressed = () => {
    props.setShowMode(0);
    props.onSwipeRight();
  };

  const onSuperLikePressed = () => {
    props.setShowMode(0);
    props.onSwipeTop();
  };

  const closeButton = () => (
    <TouchableOpacity
      hitSlop={HIT_SLOP}
      style={styles.closeButton}
      onPress={() => setIsImageViewerVisible(false)}
    >
      <Text style={styles.closeButton__text}>×</Text>
    </TouchableOpacity>
  );

  const formatViewerImages = () => {
    const myPhotos = [];

    if (photosUpdated) {
      instagramPhotos.map(photos => {
        photos.map(photo => {
          myPhotos.push({
            source: {
              uri: photo && photo,
            },
            width: Dimensions.get('window').width,
            height: Math.floor(Dimensions.get('window').height * 0.6),
          });
        });
      });

      return myPhotos;
    } else {
      return [];
    }
  };

  const onSettingsPress = () => {
    alert('deveploment');
  };

  const onPrivateSettingsActionDone = index => {
    if (index == 1) {
      return;
    }
    var message, actionCallback;
    if (index == 0) {
      message =
        "Are you sure you want to report this user? You won't see their messages again.";
    }
    Alert.alert('Are you sure?', message, [
      {
        text: 'Yes',
        onPress: () => reportAbuse('block'),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const reportAbuse = type => {
    // Implementation here
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.photoView}>
        <Swiper
          style={styles.wrapper}
          removeClippedSubviews={false}
          showsButtons={false}
          loop={false}
          paginationStyle={{ top: 5, bottom: null }}
          dot={<View style={[styles.swiperDot, { width: swiperDotWidth }]} />}
          activeDot={
            <View style={[styles.swiperActiveDot, { width: swiperDotWidth }]} />
          }
        >
          {myPhotos.map((photos, i) => {
            return (
              photos && (
                <View style={styles.imageWrapper}>
                  <FastImage
                    key={'photos' + i}
                    style={styles.profilePhoto}
                    source={{
                      uri: profileImage,
                      priority: FastImage.priority.high,
                    }}
                  />
                </View>
              )
            );
          })}
        </Swiper>
      </View>
      <TouchableOpacity style={styles.backView} onPress={props.onPress}>
        <Image style={styles.backIcon} source={Images.arrowdownIcon} />
      </TouchableOpacity>
      <View style={styles.titleView}>
        <CustomText style={styles.nameText}>
          {firstName} {lastName}
        </CustomText>
        <CustomText style={styles.ageText}>{age}</CustomText>
      </View>
      <View style={styles.captionView}>
        <View style={styles.itemView}>
          <Image style={styles.icon} source={Images.schoolIcon} />
          <CustomText style={styles.text}>{school}</CustomText>
        </View>
        {props.distance && (
          <View style={styles.itemView}>
            <Image style={styles.icon} source={Images.markerIcon} />
            <CustomText style={styles.distanceText}>
              {props.distance}
            </CustomText>
          </View>
        )}
      </View>
      <View style={styles.bioView}>
        <CustomText style={styles.bioText}>{bio}</CustomText>
      </View>
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => {
          onSettingsPress();
        }}
      >
        <CustomText style={styles.reportButtonText}>
          Report {firstName} {lastName}
        </CustomText>
      </TouchableOpacity>
      <ActionSheet
        ref={privateSettingsActionSheetRef}
        title={'Actions'}
        options={['Report user', 'Cancel']}
        cancelButtonIndex={1}
        onPress={onPrivateSettingsActionDone}
      />
      {instagramPhotos.length > 0 && (
        <View style={styles.instagramView}>
          <View style={styles.itemView}>
            <CustomText style={[styles.label, styles.photosLabel]}>
              Photos
            </CustomText>
          </View>
          <Swiper
            showsButtons={false}
            loop={false}
            paginationStyle={{ top: -240, left: null, right: 0 }}
            dot={<View style={styles.instagramSwiperDot} />}
            activeDot={<View style={styles.instagramSwiperActiveDot} />}
          >
            {instagramPhotos.map((photos, i) => (
              <View key={'photos' + i} style={styles.slide}>
                <View style={styles.slideActivity}>
                  <FlatList
                    horizontal={false}
                    numColumns={3}
                    data={photos}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setIsImageViewerVisible(true);
                          setTappedImageIndex(6 * i + index);
                        }}
                        key={'item' + index}
                        style={styles.myphotosItemView}
                      >
                        {photosUpdated && item && (
                          <FastImage
                            style={styles.photoFullSize}
                            source={{
                              uri: item == staticImage ? changeImage : item,
                              priority: FastImage.priority.high,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            ))}
          </Swiper>
        </View>
      )}
      <View style={styles.inlineActionsContainer}>
        {props.SwipeControls && (
          <SwipeControls
            isDone={props.isDone}
            onDislikePressed={onDislikePressed}
            onSuperLikePressed={onSuperLikePressed}
            onLikePressed={onLikePressed}
            containerStyle={styles.swipeControlsContainer}
          />
        )}
        <ImageView
          isSwipeCloseEnabled={false}
          images={formatViewerImages()}
          isVisible={isImageViewerVisible}
          onClose={() => setIsImageViewerVisible(false)}
          imageIndex={tappedImageIndex}
          controls={{ close: closeButton }}
        />
      </View>
    </View>
  );
};

CardDetailsView.propTypes = {
  firstName: PropTypes.string,
  age: PropTypes.string,
  school: PropTypes.string,
  distance: PropTypes.string,
  profilePictureURL: PropTypes.string,
  instagramPhotos: PropTypes.array,
  bio: PropTypes.string,
  onPress: PropTypes.bool,
  setShowMode: PropTypes.func,
  SwipeControls: PropTypes.bool,
};

export default CardDetailsView;
