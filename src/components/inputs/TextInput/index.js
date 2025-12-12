import { memo } from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Colors from '../../../constants/Colors';

// Functional component
const TextInput = ({
  label,
  labelColor,
  placeholder,
  placeholderTextColor,
  keyboardType,
  autoCapitalize,
  value = '',
  onChangeText,
  onBlur,
  editable = true,
  maxLength,
  leftIcon,
  rightIcon,
  backgroundColor,
  textInputValueColor,
  onPressSecure = () => {},
  secureText = false,
  underlineColorAndroid = 'transparent',
  ...props
}) => {
  // Returning
  return (
    <>
      {label && (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      )}
      <View
        style={[styles.textInputWrapper, { backgroundColor: backgroundColor }]}
      >
        {leftIcon && (
          <View style={[styles.textInputIconWrapper]}>{leftIcon}</View>
        )}
        {rightIcon && (
          <View
            style={[
              styles.textInputIconWrapperWithRightZero,
              styles.textInputIconWrapper,
            ]}
          >
            {rightIcon}
          </View>
        )}
        <RNTextInput
          placeholder={placeholder}
          style={[styles.textInput, { color: textInputValueColor }]}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          editable={editable}
          maxLength={maxLength}
          selectionColor={Colors.primary}
          underlineColorAndroid={underlineColorAndroid}
          allowFontScaling={false}
          // textAlignVertical="center"
          {...props}
        />
        {secureText && (
          <TouchableOpacity onPress={onPressSecure} style={styles.secureButton}>
            <Text style={styles.secureText}>{secureText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

// Exporting
export default memo(TextInput);
