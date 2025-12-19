import { PixelRatio, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  POPPINS_MEDIUM,
  POPPINS_SEMIBOLD,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../constants/Constants';

const HAIRLINE = 1 / PixelRatio.get();

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  settingsTitleContainer: {
    width: '100%',
    height: scale(45),
    justifyContent: 'flex-end',
  },
  settingsTitle: {
    color: Colors.mainSubtextColor,
    paddingLeft: STANDARD_SPACING * 1.8,
    fontSize: FONT_SIZE_SM,
    fontFamily: POPPINS_MEDIUM,
    paddingBottom: STANDARD_SPACING,
  },
  contentContainer: {
    width: '100%',
    borderTopWidth: HAIRLINE,
    borderTopColor: Colors.hairlineColor,
    backgroundColor: Colors.black,
  },
  settingsTypeContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    paddingHorizontal: STANDARD_SPACING * 2,
    paddingVertical: STANDARD_SPACING,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: Colors.hairlineColor,
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
  titleWrapper: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: STANDARD_SPACING * 3.5,
  },
  title: {
    color: Colors.mainTextColor,
    fontSize: FONT_SIZE_XXS,
    fontFamily: POPPINS_SEMIBOLD,
  },
  imageWrapper: {
    height: scale(250),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: scale(25),
    marginBottom: STANDARD_SPACING * 25,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    aspectRatio: 1,
  },
});
