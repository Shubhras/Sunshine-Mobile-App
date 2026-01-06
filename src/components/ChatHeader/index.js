import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable,  View } from 'react-native';
import { Badge, Surface, Text } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { CustomText } from '../global/CustomText';
import styles from './styles';
import FastImage from '@d11/react-native-fast-image';
import { defaultProfilePhotoURL } from '../../constants/images';
import Colors from '../../constants/Colors';

const IconSize = scale(20);

const ChatHeader = ({
  style,
  back,
  title,
  right,
  onRightPress,
  optionalBtn,
  optionalBtnPress,
  rightComponent,
  headerBg,
  iconColor,
  titleAlight,
  optionalBadge,
  rightTitle,
  profilePictureURL,
}) => {
  // Navigation hook
  const navigation = useNavigation();
  // Left view component
  const LeftView = () => (
    <View style={styles.view}>
      {back && (
        <>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Feather name="arrow-left" size={IconSize} color={iconColor} />
          </Pressable>
          <View style={styles.avatarImageContainer}>
            <FastImage
              source={{
                uri: profilePictureURL ?? defaultProfilePhotoURL,
                priority: FastImage.priority.high,
              }}
              style={styles.avatarImage}
            />
          </View>
        </>
      )}
    </View>
  );
  // Right view component
  const RightView = () => (
    <View style={[styles.view, styles.rightView]}>
     
     
    
        <Pressable onPress={onRightPress}>
           <Feather name="settings" size={IconSize} color={Colors.grayBgColor} />
        </Pressable>
   
    </View>
  );
  // Title view component
  const TitleView = () => (
    <View style={styles.titleView}>
      <Text
        variant="titleLarge"
        allowFontScaling={false}
        style={[styles.title, { color: iconColor, textAlign: titleAlight }]}
      >
        {title}
      </Text>
    </View>
  );
  // Return
  return (
    <Surface style={[styles.header, style, { backgroundColor: headerBg }]}>
      <LeftView />
      <TitleView />
      <RightView />
    </Surface>
  );
};

export default ChatHeader;
