import {memo} from 'react';
import {View, Text, Pressable} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import styles from './styles';

// Functional component
const NavigationLink = ({
  linkBackgroundColor,
  leftIconName,
  leftIconColor,
  leftIconWrapperBackgroundColor,
  iconSize,
  label,
  labelColor,
  chevronColor,
  onPress,
}) => {
  // Returning
  return (
    <Pressable
      style={[styles.link, {backgroundColor: linkBackgroundColor}]}
      onPress={onPress}>
      {/* Navigation icon & label */}
      <View style={styles.leftIconLabelWrapper}>
        <View
          style={[
            styles.leftIconWrapper,
            {
              backgroundColor: leftIconWrapperBackgroundColor,
            },
          ]}>
          <FeatherIcons
            name={leftIconName}
            size={iconSize}
            color={leftIconColor}
          />
        </View>

        <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
      </View>
      <FeatherIcons name="chevron-right" size={iconSize} color={chevronColor} />
    </Pressable>
  );
};

// Exporting
export default memo(NavigationLink);
