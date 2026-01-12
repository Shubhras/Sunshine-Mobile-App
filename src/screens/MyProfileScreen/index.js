import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import TNProfilePictureSelector from '../../components/TNProfilePictureSelector';
import { CustomText } from '../../components/global/CustomText';
import NavigationLink from '../../components/links/NavigationLink';
import Colors from '../../constants/Colors';
import NavigationData from '../../data/NavigationData';
import styles from './styles';
import {
  updateProfilePhoto,
  updateUserInfo,
  userLogout,
} from '../../api/firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateUser } from '../../redux/slices/SessionUser';
import { showToast } from '../../components/alerts/Toast/ToastManager';
import TNActivityIndicator from '../../components/TNActivityIndicator';
import { processAndUploadMediaFile } from '../../api/firebase/storage';
import Swiper from 'react-native-swiper';
import FastImage from '@d11/react-native-fast-image';
import Icons from '../../components/Icons/Icons';
import PostPictureSelector from '../../components/PostPictureSelector';
import PostPictureMoreOption from '../../components/PostPictureSelector/PostPictureMoreOption';
import { Images } from '../../constants/images';
import { deleteAllLocations } from '../../redux/slices/LocationSlice';
import { deleteDisputeResons } from '../../redux/slices/DisputeResonsSlice';
import { resetDating } from '../../redux/slices/datingSlice';
import { resetUserReports } from '../../redux/slices/userReportsSlice';
import {  resetAllChat } from '../../redux/slices/chatSlice';
import { usersTrackesLogout } from '../../redux/slices/usersTrackerSlice';

var selectedItemIndex = -1;
// const myphotoss = [
//   [
//     { add: true },
//     "https://example.com/photo1.jpg",
//     "https://example.com/photo2.jpg",
//     "https://example.com/photo3.jpg",
//     "https://example.com/photo4.jpg",
//     "https://example.com/photo5.jpg",
//   ],
//   [
//     "https://example.com/photo6.jpg",
//     "https://example.com/photo7.jpg",
//     "https://example.com/photo8.jpg",
//     null,
//     null,
//     null,
//   ],
// ];

const MyProfileScreen = ({ navigation }) => {
  const userInfo = useSelector(state => state.users.users);
  const dispatch = useDispatch();
  const photoDialogActionSheetRef = useRef(null);
  const photoUploadDialogActionSheetRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // const [myphotos, setMyphotos] = useState(myphotoss)
  const [myphotos, setMyphotos] = useState([]);
  const updatePhotos = photos => {

    let myUpdatePhotos = [];
    let pphotos = photos ? [...photos] : [];
    let temp = [];

    pphotos.push({ add: true });
    pphotos.map((item, index) => {
      temp.push(item);

      if (index % 6 == 5) {
        myUpdatePhotos.push(temp);
        temp = [];
      } else if (item && item.add) {
        myUpdatePhotos.push(temp);
        temp = [];
      }
    });
    setMyphotos(myUpdatePhotos);
    selectedItemIndex = -1;
  };

  useEffect(() => {
    if (userInfo) {
      updatePhotos(userInfo.photos);
    }
  }, []);

  const startPostUpload = source => {
    setLoading(true);

    if (!source) {
      setLoading(false);
      showToast({
        title: 'Picture Upload Failed',
        text: 'We couldn’t upload your picture. Please try again.',
        duration: 2000,
        type: 'error',
      });
      return;
    }
console.log("source",source);

    processAndUploadMediaFile(source)
      .then(({ downloadURL }) => {
        console.log("downloadURL", downloadURL);
        
        if (downloadURL) {
          updateUserPhotos(downloadURL);
        } else {
          // an error occurred
          setLoading(false);
          showToast({
            title: 'Picture Upload Failed',
            text: 'We couldn’t upload your picture. Please try again.',
            duration: 2000,
            type: 'error',
          });
        }
      })
      .catch(error => {
        setLoading(false);
        showToast({
          title: 'Picture Upload Failed',
          text: 'We couldn’t upload your picture. Please try again.',
          duration: 2000,
          type: 'error',
        });
      });
  };

  const updatePostInfo = data => {
    console.log('updatePostInfoupdatePostInfoupdatePostInfo', data);
    setLoading(true)
    const tempUser = userInfo;
    // optimistically update the UI
    dispatch(updateUser({ ...userInfo, ...data }));
    updateUserInfo(userInfo?.userID, data)
      // userRef
      //   .update(data)
      .then(res => {
        console.log('resrsrrrrrsrrsrsrsrsrsrrs', res);

        setLoading(false);
      })
      .catch(error => {
        // const { message } = error;
        setLoading(false);
        dispatch(updateUser({ ...tempUser }));
        showToast({
          title: 'Picture Upload Failed',
          text: 'We couldn’t upload your picture. Please try again.',
          duration: 2000,
          type: 'error',
        });
      });
  };

  //   const updateUserPhotos = uri => {

  //     const { photos=[] } = userInfo;
  //     let pphotos = photos ? photos : [];

  //     console.log("updateUserPhotosupdateUserPhotosupdateUserPhotos",uri, pphotos);
  //     pphotos.push(uri);
  //     console.log("pphotospphotospphotos",pphotos);

  //     const data = {
  //       photos: pphotos,
  //     };
  // console.log('datadatadatadatadatadatadatadatadatadatadatadatadat0',data);

  //     updatePostInfo(data);
  //     updatePhotos(pphotos);
  //   };

  const updateUserPhotos = uri => {
    if (!uri) return;

    const photos = userInfo?.photos ?? [];

    // create new array (DO NOT mutate existing)
    const updatedPhotos = [...photos, uri];

    const data = {
      photos: updatedPhotos,
    };

    console.log('Updated photos:', updatedPhotos);

    updatePostInfo(data);
    updatePhotos(updatedPhotos);
  };

  const updateProfilePictureURL = file => {
    console.log('valvalvalvalvalvalvalval', file);
    if (file) {
      setLoading(true);
      processAndUploadMediaFile(file).then(response => {
        if (response.error) {
          dispatch(
            updateUser({
              ...userInfo,
              profilePictureURL: userInfo?.profilePictureURL,
            }),
          );
          setLoading(false);
          showToast({
            title: 'Profile Picture Upload Failed',
            text: 'We couldn’t upload your profile picture. Please try again.',
            duration: 2000,
            type: 'error',
          });
        } else {
          updateProfilePhoto(userInfo?.userID, response.downloadURL).then(
            _result => {
              dispatch(
                updateUser({
                  ...userInfo,
                  profilePictureURL: response.downloadURL,
                }),
              );
              setLoading(false);
              showToast({
                title: 'Profile Picture Uploaded',
                text: 'Your profile picture has been uploaded successfully.',
                duration: 2000,
                type: 'success',
              });
            },
          );
        }
      });
    }
    // startUpload(file, uri => updateUserInfo({ profilePictureURL: uri }));
  };

  const handleLogout = () => {
    setLoading(true);
    // userLogout(userInfo?.userID)
    //   .then(val => {
    //     // if (val.success) {
    //     //   dispatch(logoutUser());
    //     //   dispatch(deleteAllLocations());
    //     //   dispatch(deleteDisputeResons());
    //     //   dispatch(resetDating());
    //     //   dispatch(resetUserReports());
    //     //   dispatch(logOut());
    //     //   dispatch(resetAllChat());
    //     //   navigation.reset({
    //     //     index: 0,
    //     //     routes: [{ name: 'AuthStack' }],
    //     //   });
    //     // } else {
    //     //   showToast({
    //     //     title: 'Logout Failed',
    //     //     text: 'Unable to logout at this time.',
    //     //     duration: 3000,
    //     //     type: 'error',
    //     //   });
    //     // }
     
    //   })
    //   .catch(() => {
    //     // showToast({
    //     //   title: 'Logout Failed',
    //     //   text: 'Unable to logout at this time.',
    //     //   duration: 3000,
    //     //   type: 'error',
    //     // });
    //   })
    //   .finally(() => {
         dispatch(logoutUser());
          dispatch(deleteAllLocations());
          dispatch(deleteDisputeResons());
          dispatch(resetDating());
          dispatch(resetUserReports());
          dispatch(resetAllChat());
          dispatch(usersTrackesLogout());
          navigation.reset({
            index: 0,
            routes: [{ name: 'AuthStack' }],
          });
        setLoading(false);
      // });
  };

  const onSelectDelPhoto = index => {
    selectedItemIndex = index;

    // photoDialogActionSheetRef.current?.show();
    setTimeout(() => {
      SheetManager.show('profile-photo-sheet-post-more-option');
    }, 200);
  };

  // const onPhotoDialogDone = actionSheetActionIndex => {
  //   const { photos=[] } = userInfo

  //   console.log("selectedItemIndex",selectedItemIndex);
  //   if (selectedItemIndex == -1 || selectedItemIndex >= photos.length) {
  //     return
  //   }

  //   if (actionSheetActionIndex == 0) {
  //     if (photos) {
  //       photos.splice(selectedItemIndex, 1)
  //     }
  //     console.log('photosphotosphotosphotosphotosSPlice',photos);

  //     updatePostInfo(photos)
  //     updatePhotos(photos)
  //   }

  //   if (actionSheetActionIndex == 2) {
  //     const photoToUpdate = photos[selectedItemIndex]
  //     updatePostInfo({ profilePictureURL: photoToUpdate })
  //   }
  // }
  const onPhotoDialogDone = actionSheetActionIndex => {
    const photos = userInfo?.photos ?? [];

    console.log('selectedItemIndex', selectedItemIndex);

    if (selectedItemIndex === -1 || selectedItemIndex >= photos.length) {
      return;
    }

    // 🗑 Remove photo
    if (actionSheetActionIndex === 0) {
      const updatedPhotos = photos.filter(
        (_, index) => index !== selectedItemIndex,
      );

      console.log('updatedPhotos', updatedPhotos);

      updatePostInfo({ photos: updatedPhotos });
      updatePhotos(updatedPhotos);
    }

    // ⭐ Set profile picture
    if (actionSheetActionIndex === 2) {
      const photoToUpdate = photos[selectedItemIndex];

      updatePostInfo({ profilePictureURL: photoToUpdate });
    }
  };

  return (
    <View style={[styles.mainWrapper, { backgroundColor: Colors.black }]}>
      <ImageBackground
        source={Images.backgroundImage}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <ScrollView
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewWrapper}
        >
          <View style={styles.profilePictureContainer}>
            <TNProfilePictureSelector
              setProfilePictureFile={updateProfilePictureURL}
              profilePictureURL={userInfo?.profilePictureURL}
            />
          </View>
          {/* Profile name & email */}
          <View style={styles.profileNameWrapper}>
            <CustomText style={[styles.profileName, { color: Colors.primary }]}>
              {userInfo?.firstName} {userInfo?.lastName}
            </CustomText>
          </View>
          <View style={styles.photosSectionWrapper}>
            <CustomText
              style={[styles.sectionTitle, { color: Colors.mainTextColor }]}
            >
              My Photos
            </CustomText>
            <View
              style={[
                styles.myphotosView,
                myphotos[0] && myphotos[0].length <= 3
                  ? { height: scale(150) }
                  : { height: scale(230) },
              ]}
            >
              {/* <Pressable
              onPress={() => alert('select photo')}
              style={styles.photosListWrapper}
            >
              <Icon name="camera" size={scale(30)} color={Colors.black} />
            </Pressable> */}
              <Swiper
                removeClippedSubviews={false}
                showsButtons={false}
                loop={false}
                paginationStyle={{ top: scale(-225), left: null, right: 0 }}
                dot={<View style={styles.inactiveDot} />}
                activeDot={
                  <View
                    style={{
                      backgroundColor: Colors.primary,
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
                {myphotos.map((photos, i) => (
                  <View key={'photos' + i} style={styles.slide}>
                    <View style={styles.slideActivity}>
                      <FlatList
                        horizontal={false}
                        numColumns={3}
                        data={photos}
                        scrollEnabled={false}
                        renderItem={({ item, index }) =>
                          item?.add ? (
                            <PostPictureSelector
                              setProfilePictureFile={startPostUpload}
                            />
                          ) : (
                            <TouchableOpacity
                              key={'item' + index}
                              style={styles.myphotosItemView}
                              onPress={() => onSelectDelPhoto(i * 6 + index)}
                            >
                              <FastImage
                                style={{ width: '100%', height: '100%' }}
                                source={{
                                  uri: item,
                                }}
                              />
                            </TouchableOpacity>
                          )
                        }
                      />
                    </View>
                  </View>
                ))}
              </Swiper>
            </View>
          </View>
          {NavigationData[0].my_profile.map((item, index) => (
            <View
              key={index}
              style={[
                styles.navigationLinkWrapper,
                {
                  marginBottom: index === 5 ? scale(25) : null,
                },
              ]}
            >
              <NavigationLink
                images={item.images}
                imageColor={item.imageColor}
                label={item.label}
                labelColor={Colors.mainTextColor}
                onPress={() => {
                  navigation.navigate(item?.onPress, {
                    title: item?.hederTitle,
                  });
                }}
              />
            </View>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are sure you want logout',
                [
                  {
                    text: 'Ok',
                    onPress: () => handleLogout(),
                  },
                  {
                    text: 'Cancel',
                  },
                ],
                { cancelable: true },
              );
            }}
          >
            <CustomText style={[styles.label, { color: Colors.mainTextColor }]}>
              Logout
            </CustomText>
          </TouchableOpacity>
        </ScrollView>
        {loading && <TNActivityIndicator />}
        <PostPictureMoreOption
          onPressRemove={() => {
            onPhotoDialogDone(0);
          }}
          onPressMakeProfile={() => {
            onPhotoDialogDone(2);
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default MyProfileScreen;
