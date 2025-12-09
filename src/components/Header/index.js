import React, { use } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Surface, Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const IconSize = scale(22);

const Header = ({
  style,
  menu,
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
}) => {
  // Navigation hook
  const navigation = useNavigation();
  // Left view component
  const LeftView = () => (
    <View style={styles.view}>
      {menu && (
        <TouchableOpacity onPress={() => {}}>
          <Feather name="menu" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo name="chevron-thin-left" size={IconSize} color={iconColor} />
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
            <Feather name={right} size={IconSize} color={iconColor} />
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

export default Header;
