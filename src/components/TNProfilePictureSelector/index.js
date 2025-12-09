import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableHighlight,
  Platform,
  StyleSheet,
  Dimensions,
  Image as RNImage,
  Image,
  PermissionsAndroid,
  Keyboard,
} from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import FastImage from '@d11/react-native-fast-image';
import { Images } from '../../constants/images';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import { CustomText } from '../global/CustomText';

const { height } = Dimensions.get('window');
const imageSize = height * 0.14;
const photoIconSize = imageSize * 0.27;

const TNProfilePictureSelector = props => {
  const [profilePictureURL, setProfilePictureURL] = useState(
    props.profilePictureURL || '',
  );
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [tappedImage, setTappedImage] = useState([]);
  const actionSheet = useRef(null);

  // ✅ Proper way to sync with props changes
  useEffect(() => {
    if (props.profilePictureURL !== profilePictureURL) {
      setProfilePictureURL(props.profilePictureURL || '');
    }
  }, [props.profilePictureURL]);

  const handleProfilePictureClick = url => {
    if (url) {
      const isAvatar = url.includes('avatar');
      const image = [
        {
          uri: url,
        },
      ];
      if (!isAvatar) {
        setTappedImage(image);
        setIsImageViewerVisible(true);
      } else {
        showActionSheet();
      }
    } else {
      showActionSheet();
    }
  };

  const onImageError = () => {
    console.warn('Profile picture failed to load');
    // Optionally set a default image
    const defaultProfilePhotoURL =
      'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pics.png?alt=media&token=c387f3dc-00bc-4535-be43-0d46f3b44bc0';
    setProfilePictureURL(defaultProfilePhotoURL);
  };

  const onPressAddPhotoBtn = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 0.8,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
        Alert.alert('Error', 'Failed to select image. Please try again.');
      } else if (response.errorCode) {
        console.error('ImagePicker Error Code: ', response.errorCode);
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setProfilePictureURL(asset.uri);
        if (props.setProfilePictureFile) {
          props.setProfilePictureFile(asset);
        }
      }
    });
  };

  const onPressTakePhoto = async () => {
    if (Platform.OS === 'android') {
      const checkPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (checkPermission) {
        launchCameraWithOptions();
        return;
      }
      const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
        launchCameraWithOptions();
      } else if (grantedCamera === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Required',
          'Camera permission is permanently denied. Please enable it from Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => {
                if (Platform.OS === 'android') {
                  const { Linking } = require('react-native');
                  Linking.openSettings();
                }
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to take photos.'
        );
      }
      return;
    }
    // For iOS, directly launch camera
    launchCameraWithOptions();
  };

  const launchCameraWithOptions = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 0.8,
      saveToPhotos: true,
      cameraType: 'front',
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.error('Camera Error: ', response.error);
        Alert.alert('Error', 'Failed to take photo. Please try again.');
      } else if (response.errorCode) {
        console.error('Camera Error Code: ', response.errorCode);
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setProfilePictureURL(asset.uri);
        if (props.setProfilePictureFile) {
          props.setProfilePictureFile(asset);
        }
      }
    });
  };

  const closeButton = () => (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setIsImageViewerVisible(false)}
    >
      <Icon name="close" size={20} color="#fff" />
    </TouchableOpacity>
  );

  const showActionSheet = () => {
    Keyboard.dismiss();
    setTimeout(() => {
    SheetManager.show('profile-photo-sheet');
  }, 200);
  };

  const onActionDone = index => {
    SheetManager.hide('profile-photo-sheet');

    setTimeout(() => {
      switch (index) {
        case 0: // Take Photo
          onPressTakePhoto();
          break;
        case 1: // Choose from Library
          onPressAddPhotoBtn();
          break;
        case 2: // Cancel - do nothing
          break;
        case 3: // Remove Profile Photo
          setProfilePictureURL('');
          if (props.setProfilePictureFile) {
            props.setProfilePictureFile(null);
          }
          break;
        default:
          break;
      }
    }, 300);
  };

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => handleProfilePictureClick(profilePictureURL)}
        >
          <Image
            style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
            source={
              profilePictureURL ? { uri: profilePictureURL } : Images.userAvatar
            }
            resizeMode="cover"
            onError={onImageError}
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={showActionSheet} style={styles.addButton}>
          <Icon name="camera" size={scale(16)} color="white" />
        </TouchableOpacity>
      </View>

      <ActionSheet
        id="profile-photo-sheet"
        gestureEnabled={true}
        containerStyle={styles.actionSheetContainer}
        indicatorStyle={styles.actionSheetIndicator}
        defaultOverlayOpacity={0.3}
      >
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => onActionDone(0)}
          >
            <Icon name="camera" size={20} color={Colors.text} />
            <CustomText style={styles.optionText}>Take Photo</CustomText>
          </TouchableOpacity>

          <View style={styles.optionDivider} />

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => onActionDone(1)}
          >
            <Icon name="image" size={20} color={Colors.text} />
            <CustomText style={styles.optionText}>
              Choose from Library
            </CustomText>
          </TouchableOpacity>

          {profilePictureURL && (
            <>
              <View style={styles.optionDivider} />
              <TouchableOpacity
                style={[styles.optionButton, styles.destructiveButton]}
                onPress={() => onActionDone(3)}
              >
                <Icon name="trash" size={20} color="#FF3B30" />
                <CustomText style={[styles.optionText, styles.destructiveText]}>
                  Remove Profile Photo
                </CustomText>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.optionDivider} />

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onActionDone(2)}
          >
            <CustomText style={styles.cancelText}>Cancel</CustomText>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      <ImageView
        images={tappedImage}
        imageIndex={0}
        visible={isImageViewerVisible}
        onRequestClose={() => setIsImageViewerVisible(false)}
        FooterComponent={() => closeButton()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  imageBlock: {
    flex: 2,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    marginBottom: scale(40),
  },
  imageContainer: {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize,
    shadowColor: '#006',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
    backgroundColor: Colors.black,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d6d6d6',
    opacity: 0.8,
    zIndex: 2,
    marginTop: imageSize * 0.77,
    marginLeft: -imageSize * 0.29,
    width: photoIconSize,
    height: photoIconSize,
    borderRadius: photoIconSize,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  closeButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginRight: 15,
    backgroundColor: '#333',
    width: 28,
    height: 28,
    borderRadius: 20,
    overflow: 'hidden',
  },
  actionSheetContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  actionSheetIndicator: {
    width: 100,
    height: 4,
    backgroundColor: '#D1D1D6',
  },
  optionsContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text || '#000',
    fontWeight: '500',
  },
  optionDivider: {
    height: 0.5,
    backgroundColor: '#E5E5EA',
    marginLeft: 32,
  },
  destructiveButton: {
    // Destructive button styling
  },
  destructiveText: {
    color: '#FF3B30',
  },
  cancelButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default TNProfilePictureSelector;
