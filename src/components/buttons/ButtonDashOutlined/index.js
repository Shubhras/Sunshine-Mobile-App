import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../global/CustomText';
import styles from './styles';

// Functional component
const ButtonDashOutlined = ({
  icon,
  iconWrapperBackgroundColor,
  label,
  labelColor,
  borderColor,
}) => {
  return (
    <TouchableOpacity style={[styles.button, { borderColor: borderColor }]}>
      <View style={styles.buttonIconLabelWrapper}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: iconWrapperBackgroundColor },
          ]}
        >
          {icon}
        </View>
        <CustomText style={[styles.label, { color: labelColor }]}>
          {label}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

// Exporting
export default memo(ButtonDashOutlined);
