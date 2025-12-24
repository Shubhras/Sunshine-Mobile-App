import { PixelRatio, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  SCREEN_HEIGHT,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../constants/Constants';

const HAIRLINE = 1 / PixelRatio.get();

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  scrollViewWrapper: {
    flexWrap: STANDARD_FLEX,
  },
  settingsTitleContainer: {
    width: '100%',
    height: scale(45),
    justifyContent: 'flex-end',
  },
  settingsTitle: {
    color: Colors.mainSubtextColor,
    paddingLeft: 10,
    fontSize: FONT_SIZE_SM,
    fontFamily: POPPINS_MEDIUM,
    paddingBottom: 6,
  },
  settingsTypeContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    marginLeft: STANDARD_SPACING * 3,
    paddingRight: STANDARD_SPACING * 3,
    paddingVertical: STANDARD_SPACING * 2.5,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: Colors.hairlineColor,
  },
  contentContainer: {
    width: '100%',
    borderTopWidth: HAIRLINE,
    borderTopColor: Colors.hairlineColor,
    backgroundColor: Colors.black,
  },
  divider: {
    height: scale(0.3),
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: Colors.hairlineColor,
  },
  inputTitle: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    fontSize: scale(13),
    fontFamily: POPPINS_MEDIUM,
    width: '30%',
    paddingVertical: 0,
    color: Colors.mainTextColor,
  },
  textinputWrapper: {
    overflow: 'hidden',
    height: scale(32),
    width: '70%',
    gap: STANDARD_SPACING,
  },
  textInput: {
    flex: 1,
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    textAlign: 'right',
    color: Colors.mainTextColor,
  },
  errorText: {
    color: Colors.error,
    fontSize: scale(8),
    fontFamily: POPPINS_REGULAR,
    alignSelf: 'flex-end',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    width: '100%',
    bottom: SCREEN_HEIGHT * 0.12,
  },
});
