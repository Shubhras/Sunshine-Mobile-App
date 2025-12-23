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
  // const colorScheme = useColorScheme();
  // // const styles = dynamicStyles(colorScheme);
  // const currentUser = useSelector(state => state.auth.user);
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
        // 'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pic2.jpg?alt=media&token=0afb6fe0-16c4-4600-8b81-5dbd618c71d5',

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
    // privateSettingsActionSheetRef.current.show();
  };

  const onPrivateSettingsActionDone = index => {
    if (index == 1) {
      return;
    }
    var message, actionCallback;
    if (index == 0) {
      // actionCallback = onUserReportPress
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
    // const myID = currentUser.id;
    // const otherUserID = props.usrid;
    // reportingManager.markAbuse(myID, otherUserID, type).then(response => {
    //   onDislikePressed();
    //   if (!response.error) {
    //     props.navigation.goBack(null);
    //   }
    // });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={styles.body}
      >
        <View style={styles.photoView}>
          <Swiper
            style={styles.wrapper}
            removeClippedSubviews={false}
            showsButtons={false}
            loop={false}
            paginationStyle={{ top: 5, bottom: null }}
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,.2)',
                  width: swiperDotWidth,
                  height: 4,
                  borderRadius: 4,
                  margin: 2,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: 'white',
                  width: swiperDotWidth,
                  height: 4,
                  borderRadius: 4,
                  margin: 2,
                }}
              />
            }
          >
            {myPhotos.map((photos, i) => {
              return (
                photos && (
                  <FastImage
                    key={'photos' + i}
                    style={styles.profilePhoto}
                    source={{ uri: profileImage }}
                  />
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

              <CustomText style={[styles.text, { marginLeft: 2 }]}>
                {props.distance}
              </CustomText>
            </View>
          )}
        </View>
        <View style={styles.lineView} />
        <View style={styles.bioView}>
          <CustomText style={styles.bioText}>{bio}</CustomText>
        </View>
        <View style={{ alignItems: 'center', height: 40 }}>
          <TouchableOpacity
            style={{
              borderColor: '#C78023',
              borderWidth: 1,
              width: Dimensions.get('window').width - 60,
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              onSettingsPress();
            }}
          >
            <CustomText
              style={{
                fontSize: 20,
                color: '#7A7A7A',
                textAlign: 'center',
                paddingVertical: 5,
              }}
            >
              Report {firstName} {lastName}
            </CustomText>
          </TouchableOpacity>
        </View>
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
              <CustomText style={[styles.label, { fontWeight: 'bold' }]}>
                Photos
              </CustomText>
            </View>
            <Swiper
              showsButtons={false}
              loop={false}
              paginationStyle={{ top: -240, left: null, right: 0 }}
              dot={
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,.2)',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: '#db6470',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                />
              }
            >
              {instagramPhotos.map((photos, i) => (
                <View key={'photos' + i} style={styles.slide}>
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
                            style={{ width: '100%', height: '100%' }}
                            source={{
                              uri: item == staticImage ? changeImage : item,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ))}
            </Swiper>
          </View>
        )}
        <View style={{ height: 95 }} />
      </ScrollView>
      <View style={styles.inlineActionsContainer}>
        {props.SwipeControls && (
          <SwipeControls
            isDone={props.isDone}
            onDislikePressed={onDislikePressed}
            onSuperLikePressed={onSuperLikePressed}
            onLikePressed={onLikePressed}
            containerStyle={{ width: '58%' }}
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
