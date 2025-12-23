import React, { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import TNProfilePictureSelector from '../../components/TNProfilePictureSelector';
import { CustomText } from '../../components/global/CustomText';
import NavigationLink from '../../components/links/NavigationLink';
import Colors from '../../constants/Colors';
import NavigationData from '../../data/NavigationData';
import styles from './styles';
import { Images } from '../../constants/images';

const MyProfileScreen = ({ navigation }) => {
  const [myphotos, setMyphotos] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(false);

  const startUpload = (source, updateUserData) => {
    setLoading(true);

    if (!source) {
      updateUserData(null);
      return;
    }
  };

  const updateUserInfo = data => {};

  const updateProfilePictureURL = file => {
    startUpload(file, uri => updateUserInfo({ profilePictureURL: uri }));
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
              profilePictureURL={profileImage}
            />
          </View>
          {/* Profile name & email */}
          <View style={styles.profileNameWrapper}>
            <CustomText style={[styles.profileName, { color: Colors.primary }]}>
              lisa Doe
            </CustomText>
          </View>
          <View style={styles.photosSectionWrapper}>
            <CustomText
              style={[styles.sectionTitle, { color: Colors.mainTextColor }]}
            >
              My Photos
            </CustomText>
            <Pressable
              onPress={() => alert('select photo')}
              style={styles.photosListWrapper}
            >
              <Icon name="camera" size={scale(30)} color={Colors.black} />
            </Pressable>
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
              alert('okk logout');
            }}
          >
            <CustomText style={[styles.label, { color: Colors.mainTextColor }]}>
              Logout
            </CustomText>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default MyProfileScreen;
