import { memo } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import styles from './styles';

const BORDER_WIDTH = Platform.OS === 'ios' ? scale(0.5) : scale(1.0)
// Functional component
const Button = ({label, labelColor, backgroundColor, onPress, borderWidth=false}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: backgroundColor, borderWidth: borderWidth ? BORDER_WIDTH : 0}]}
      onPress={onPress}>
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

// Exporting
export default memo(Button);
