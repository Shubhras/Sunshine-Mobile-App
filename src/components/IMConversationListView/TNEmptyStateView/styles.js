import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import {
  FONT_SIZE_LG,
  FONT_SIZE_MD,
  FONT_SIZE_XXS,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_SPACING,
} from '../../../constants/Constants';
import { scale } from 'react-native-size-matters';

// Exporting style
export default StyleSheet.create({
  title: {
    fontSize: FONT_SIZE_LG,
    fontFamily: POPPINS_SEMIBOLD,
    alignSelf: 'center',
    color: Colors.mainTextColor,
    marginBottom: STANDARD_SPACING,
  },
  description: {
    fontSize: FONT_SIZE_XXS,
    fontFamily: POPPINS_REGULAR,
    alignSelf: 'center',
    color: Colors.mainTextColor,
    textAlign: 'center',
    width: '85%',
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    width: '75%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: STANDARD_BUTTON_HEIGHT,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.1,
    paddingHorizontal: scale(15),
    marginTop: 30,
  },
  buttonName: {
    color: '#ffffff',
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
  },
  container: {
    backgroundColor: 'transparent',
  },
});
