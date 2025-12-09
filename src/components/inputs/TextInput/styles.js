import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  FONT_SIZE_XS,
  STANDARD_TEXT_INPUT_HEIGHT,
  POPPINS_REGULAR,
} from '../../../constants/Constants';
import Colors from '../../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  label: {
    marginBottom: scale(7.5),
    fontFamily: POPPINS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  textInputWrapper: {
    overflow: 'hidden',
    position: 'relative',
    height: STANDARD_TEXT_INPUT_HEIGHT,
    borderRadius: STANDARD_TEXT_INPUT_HEIGHT * 0.5,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  textInput: {
    flex: 1,
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    paddingLeft: STANDARD_TEXT_INPUT_HEIGHT * 0.5,
  },
  textInputIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: STANDARD_TEXT_INPUT_HEIGHT,
    height: STANDARD_TEXT_INPUT_HEIGHT,
  },
  textInputIconWrapperWithRightZero: {
    right: 0,
  },
  secureButton: {
    marginLeft: scale(8),
  },
  secureText: {
    fontSize: scale(14),
    fontFamily: POPPINS_REGULAR,
    color: Colors.white,
  },
});
