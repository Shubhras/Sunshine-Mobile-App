import FastImage from '@d11/react-native-fast-image';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import ImageView from 'react-native-image-viewing';
import Swiper from 'react-native-swiper';
import {
  SCREEN_WIDTH,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../../constants/Constants';
import { Images } from '../../../constants/images';
import SwipeControls from '../SwipeControls';
import styles from './styles';
import { CustomText } from '../../global/CustomText';
import Icons from '../../Icons/Icons';
import Colors from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { markAbuse } from '../../../api/firebase/reportingManager';

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
  const [myPhotos] = useState(props.instagramPhotos || []);
  const [profileImage, setProfileImage] = useState('');
console.log("props.instagramPhotosprops.instagramPhotosprops.instagramPhotos",props);
 const userInfo = useSelector(state => state.users.users);
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
  }, [props?.profilePictureURL]);

  const [instagramPhotos, setInstagramPhotos] = useState(
    props.instagramPhotos || [],
  );

  const updatePhotos = photos => {
    let myphotos = [];
    let temp = [];

    if (photos.length > 0) {
      photos.forEach((item, index) => {
        if (item) {
          temp.push(item);
        }

        if (index % 6 === 5) {
          if (temp.length > 0) {
            myphotos.push(temp);
          }
          temp = [];
        }
      });

      if (temp.length > 0) {
        myphotos.push(temp);
      }
      setInstagramPhotos(myphotos);
      setPhotosUpdated(true);
    }
  };

  useEffect(() => {
    if (props.instagramPhotos && props.instagramPhotos.length > 0) {
      updatePhotos(props.instagramPhotos);
      setSwiperDotWidth(
        Math.floor(SCREEN_WIDTH / props.instagramPhotos.length) - 4,
      );
    }
  }, [props.instagramPhotos]);

const onDislikePressed = () => {
  props.setShowMode?.(0);
  props.onSwipeLeft?.();
};

const onLikePressed = () => {
  props.setShowMode?.(0);
  props.onSwipeRight?.();
};

const onSuperLikePressed = () => {
  props.setShowMode?.(0);
  props.onSwipeTop?.();
};

  const closeButton = () => (
    <TouchableOpacity
      hitSlop={HIT_SLOP}
      style={styles.closeButton}
      onPress={() => setIsImageViewerVisible(false)}
    >
      <Icons
        iconType={'Ionicons'}
        name={'close-sharp'}
        color={Colors.white}
        size={STANDARD_VECTOR_ICON_SIZE}
      />
    </TouchableOpacity>
  );

  const formatViewerImages = () => {
    const formattedImages = [];

    if (photosUpdated && instagramPhotos.length > 0) {
      instagramPhotos.forEach(photos => {
        photos.forEach(photo => {
          if (photo) {
            formattedImages.push({
              uri: photo,
            });
          }
        });
      });
    }

    return formattedImages;
  };

  const onSettingsPress = () => {
    console.log('Opening ActionSheet...');
    if (privateSettingsActionSheetRef.current) {
      privateSettingsActionSheetRef.current.show();
    } else {
      console.log('ActionSheet ref is null');
    }
  };

  const handleReportUser = () => {
    // First close the sheet
    privateSettingsActionSheetRef.current?.hide();

    // Then show alert after a small delay
    setTimeout(() => {
      Alert.alert(
        'Are you sure?',
        "Are you sure you want to report this user? You won't see their messages again.",
        [
          {
            text: 'Yes',
            onPress: () => reportAbuse('block'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
    }, 300);
  };

   const reportAbuse = type => {
    const myID = userInfo.id
    const otherUserID = props.usrid
    markAbuse(myID, otherUserID, type).then(response => {
      console.log("markAbusemarkAbusemarkAbuse",response);
      props?.handleDislike()
      // onDislikePressed()
      // if (!response.error) {
      //   props.navigation.goBack(null)
      // }
    })
  }
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
          {myPhotos && myPhotos.length > 0 ? (
            [...[profileImage], ...myPhotos].map((photos, i) => (
              <View style={styles.imageWrapper} key={`photo-swiper-${i}`}>
                <FastImage
                  style={styles.profilePhoto}
                  source={{
                    uri: photos,
                    priority: FastImage.priority.high,
                  }}
                />
              </View>
            ))
          ) : (
            <View style={styles.imageWrapper} key="default-photo">
              <FastImage
                style={styles.profilePhoto}
                source={{
                  uri: profileImage,
                  priority: FastImage.priority.high,
                }}
              />
            </View>
          )}
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

      <TouchableOpacity style={styles.reportButton} onPress={onSettingsPress}>
        <CustomText style={styles.reportButtonText}>
          Report {firstName} {lastName}
        </CustomText>
      </TouchableOpacity>

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
              <View key={`instagram-page-${i}`} style={styles.slide}>
                <View style={styles.slideActivity}>
                  <FlatList
                    horizontal={false}
                    numColumns={3}
                    data={photos}
                    scrollEnabled={false}
                    keyExtractor={(item, index) =>
                      `instagram-photo-${i}-${index}`
                    }
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setIsImageViewerVisible(true);
                          setTappedImageIndex(6 * i + index);
                        }}
                        style={styles.myphotosItemView}
                      >
                        {photosUpdated && item && (
                          <FastImage
                            style={styles.photoFullSize}
                            source={{
                              uri: item === staticImage ? changeImage : item,
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
          images={formatViewerImages()}
          imageIndex={tappedImageIndex || 0}
          visible={isImageViewerVisible}
          onRequestClose={() => setIsImageViewerVisible(false)}
          swipeToCloseEnabled={false}
          HeaderComponent={() => closeButton()}
          presentationStyle="overFullScreen"
          backgroundColor={Colors.black}
        />
      </View>

      {/* Modern ActionSheet */}
      <ActionSheet
        ref={privateSettingsActionSheetRef}
        gestureEnabled={true}
        closeOnTouchBackdrop={true}
        containerStyle={styles.actionSheetContainer}
        indicatorStyle={styles.actionSheetIndicator}
      >
        <View style={styles.actionSheetContent}>
          <View style={styles.actionSheetHeader}>
            <CustomText style={styles.actionSheetTitle}>Actions</CustomText>
          </View>

          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={handleReportUser}
          >
            <CustomText style={styles.actionSheetOptionTextDanger}>
              Report user
            </CustomText>
          </TouchableOpacity>

          <View style={styles.actionSheetDivider} />

          <TouchableOpacity
            style={styles.actionSheetOption}
            onPress={() => privateSettingsActionSheetRef.current?.hide()}
          >
            <CustomText style={styles.actionSheetOptionText}>Cancel</CustomText>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </View>
  );
};

CardDetailsView.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  age: PropTypes.string,
  school: PropTypes.string,
  distance: PropTypes.string,
  profilePictureURL: PropTypes.string,
  instagramPhotos: PropTypes.array,
  bio: PropTypes.string,
  onPress: PropTypes.func,
  setShowMode: PropTypes.func,
  SwipeControls: PropTypes.bool,
  isDone: PropTypes.bool,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  onSwipeTop: PropTypes.func,
  handleDislike: PropTypes.func,
};

export default CardDetailsView;
