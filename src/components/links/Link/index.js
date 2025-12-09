import { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { CustomText } from '../../global/CustomText';
import styles from './styles';

// Functional component
const Link = ({ label, labelColor, onPress }) => {
  // Returning
  return (
    <TouchableOpacity onPress={onPress}>
      <CustomText style={[styles.style, { color: labelColor }]}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

// Exporting
export default memo(Link);
