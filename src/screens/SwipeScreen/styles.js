import { StyleSheet } from 'react-native';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  POPPINS_MEDIUM,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../constants/Constants';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    // paddingHorizontal: STANDARD_SPACING * 3.5,
  },

  imageBackground: {
    width: Math.floor(SCREEN_WIDTH * 0.9),
    height: Math.floor(SCREEN_WIDTH * 0.22),
    marginTop: SCREEN_HEIGHT * 0.2,
    marginBottom: SCREEN_HEIGHT * 0.05,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    marginHorizontal: scale(30),
  },
  textsize: {
    // marginBottom: scale(2),
    color: Colors.textHighContrast,
    fontFamily:POPPINS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  buttoncontainer: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    textAlign: 'center',
    padding: scale(12),
    borderRadius: scale(20),
    marginTop: scale(18),
  },
  text: {
    color: Colors.textHighContrast,
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
});
