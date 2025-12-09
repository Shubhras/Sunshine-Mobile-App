import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors';
import {
  FONT_SIZE_MD,
  POPPINS_SEMIBOLD,
  STANDARD_BUTTON_HEIGHT
} from '../../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  label: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: STANDARD_BUTTON_HEIGHT,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.5,
    paddingHorizontal: scale(15),
    borderColor: Colors.primary
  },
});
