import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Badge, Surface, Text } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { CustomText } from '../global/CustomText';
import styles from './styles';

const IconSize = scale(20);

const ProfileHeader = ({
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
}) => {
  // Navigation hook
  const navigation = useNavigation();
  // Left view component
  const LeftView = () => (
    <View style={styles.view}>
      {back && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="arrow-left" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
  // Right view component
  const RightView = () =>
    rightComponent ? (
      rightComponent
    ) : (
      <View style={[styles.view, styles.rightView]}>
        {optionalBtn && (
          <TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
            <Feather name={optionalBtn} size={IconSize} color={iconColor} />
            {optionalBadge && (
              <Badge style={{ position: 'absolute', top: -5, right: -10 }}>
                {optionalBadge}
              </Badge>
            )}
          </TouchableOpacity>
        )}
        {right && (
          <TouchableOpacity onPress={onRightPress}>
            <CustomText style={styles.rightTitle}>{rightTitle}</CustomText>
          </TouchableOpacity>
        )}
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

export default ProfileHeader;
