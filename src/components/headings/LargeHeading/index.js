import { memo } from 'react';
import { Text } from 'react-native';
import styles from './styles';
import { FONT_SIZE_XL } from '../../../constants/Constants';

// Functional component
const LargeHeading = ({ headingText, headingColor, textAlign, fontSize }) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.style,
        {
          color: headingColor,
          textAlign: textAlign,
          fontSize: fontSize ? fontSize : FONT_SIZE_XL,
        },
      ]}
    >
      {headingText}
    </Text>
  );
};

// Exporting
export default memo(LargeHeading);
