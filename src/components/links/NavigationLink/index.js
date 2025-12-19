import FastImage from '@d11/react-native-fast-image';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { CustomText } from '../../global/CustomText';
import styles from './styles';

// Functional component
const NavigationLink = ({ images, imageColor, label, labelColor, onPress }) => {
  // Returning
  return (
    <Pressable style={styles.link} onPress={onPress}>
      {/* Navigation icon & label */}
      <View style={styles.leftIconLabelWrapper}>
        <View style={styles.leftIconWrapper}>
          <FastImage
            source={images}
            style={styles.images}
            {...(imageColor && { tintColor: imageColor })}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <CustomText style={[styles.label, { color: labelColor }]}>
          {label}
        </CustomText>
      </View>
    </Pressable>
  );
};

// Exporting
export default memo(NavigationLink);
