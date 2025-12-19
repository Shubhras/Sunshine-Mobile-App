import {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';

// Functional component
function PaymentMethod({
  index,
  backgroundColor,
  icon,
  label,
  labelColor,
  uncheckedRadioBackgroundColor,
  checkedRadioBackgroundColor,
  checkIconColor,
  isSelected,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.radioWrapper,
        {
          backgroundColor: backgroundColor,
        },
      ]}
      onPress={() => onPress(index)}>
      <Text style={[styles.paymentMethodLabel, {color: labelColor}]}>
        {label}
      </Text>
      <View style={styles.paymentMethodIconAndCheckboxWrapper}>
        {icon}
        <View
          style={[
            styles.radioCheckBox,
            {
              backgroundColor: isSelected
                ? checkedRadioBackgroundColor
                : uncheckedRadioBackgroundColor,
            },
          ]}>
          {isSelected && (
            <FeatherIcons
              color={checkIconColor}
              name={'check'}
              size={scale(10)}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Exporting
export default memo(PaymentMethod);
