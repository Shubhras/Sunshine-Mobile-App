import { PixelRatio, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { STANDARD_SPACING } from '../../../constants/Constants';
import Colors from '../../../constants/Colors';

const TAB_BAR_PADDING = scale(16);
const HAIRLINE = 1 / PixelRatio.get();

// Exporting style
export default StyleSheet.create({
  tabWrapper: {
    flexDirection: 'row',
    paddingHorizontal: TAB_BAR_PADDING,
    paddingVertical: STANDARD_SPACING,
    backgroundColor: Colors.black,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: Colors.hairlineColor,
  },
  icons: {
    width: scale(25),
    height: scale(25),
  },
});
