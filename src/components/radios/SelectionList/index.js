import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Colors from '../../../constants/Colors';
import { CustomText } from '../../global/CustomText';
import styles from './styles';

// Functional component
function SelectionList({
  index,
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
          borderColor: isSelected
            ? Colors.onlineMarkColor
            : Colors.hairlineColor,
        },
      ]}
      onPress={() => onPress(index)}
    >
      <View style={styles.flagImageAndLanguageLabelWrapper}>
        <CustomText style={[styles.languageLabel, { color: labelColor }]}>
          {label}
        </CustomText>
      </View>
      <View
        style={[
          styles.radioCheckBox,
          {
            backgroundColor: isSelected
              ? checkedRadioBackgroundColor
              : uncheckedRadioBackgroundColor,
          },
        ]}
      >
        {isSelected && (
          <FeatherIcons
            color={checkIconColor}
            name={'check'}
            size={scale(16)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

// Exporting
export default memo(SelectionList);
