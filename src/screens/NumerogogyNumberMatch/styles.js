import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  ScrollViewWrapper: {
    flex: STANDARD_FLEX,
  },
  numerologyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: STANDARD_SPACING * 2,
  },
  myNumerologyWrapper: {
    flexDirection: 'column',
    width: SCREEN_WIDTH * 0.45,
  },
  horizontalDivider: {
    height: '100%',
    width: scale(1),
    backgroundColor: Colors.white,
  },
  searchNumerogogyWrapper: {
    flexDirection: 'column',
    width: SCREEN_WIDTH * 0.45,
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: FONT_SIZE_SM,
    fontFamily: POPPINS_SEMIBOLD,
    marginBottom: STANDARD_SPACING * 2,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: STANDARD_SPACING * 2,
  },
  switchLabel: {
    fontSize: FONT_SIZE_MD,
    fontFamily: POPPINS_SEMIBOLD,
    color: Colors.white,
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: STANDARD_BUTTON_HEIGHT,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.2,
    marginHorizontal: STANDARD_SPACING * 2,
    backgroundColor: Colors.primary,
    marginVertical: STANDARD_SPACING * 2,
  },
  buttonLabel: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    color: Colors.white,
  },
});
