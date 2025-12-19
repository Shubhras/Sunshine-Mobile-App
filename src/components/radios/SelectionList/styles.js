import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  OPEN_SANS_MEDIUM,
  POPPINS_MEDIUM,
  STANDARD_BORDER_WIDTH,
  STANDARD_LANGUAGE_RADIO_CHECKBOX_SIZE,
  STANDARD_LANGUAGE_RADIO_WRAPPER_HEIGHT,
} from '../../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    height: STANDARD_LANGUAGE_RADIO_WRAPPER_HEIGHT * 0.75,
    borderRadius: STANDARD_LANGUAGE_RADIO_WRAPPER_HEIGHT * 0.1,
    borderWidth: STANDARD_BORDER_WIDTH,
  },
  flagImageAndLanguageLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageLabel: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  radioCheckBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: STANDARD_LANGUAGE_RADIO_CHECKBOX_SIZE * 1.5,
    aspectRatio: 1,
    borderRadius: STANDARD_LANGUAGE_RADIO_CHECKBOX_SIZE * 2.5,
  },
});
