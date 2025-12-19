import { PixelRatio, StyleSheet } from 'react-native';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  POPPINS_MEDIUM,
  POPPINS_SEMIBOLD,
  SCREEN_HEIGHT,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../constants/Constants';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';

const HAIRLINE = 1 / PixelRatio.get();

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  ScrollViewWrapper: {
    flexGrow: STANDARD_FLEX,
    paddingBottom: STANDARD_SPACING * 25,
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
  settingsTypesContainer: {
    backgroundColor: Colors.mainThemeBackgroundColor,
  },
  settingsTypeContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: STANDARD_SPACING,
    alignItems: 'center',
    minHeight: scale(45),
    paddingVertical: STANDARD_SPACING,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: Colors.hairlineColor,
  },
  settingsType: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: Colors.mainTextColor,
    fontSize: 14,
    fontWeight: '500',
  },
  settingsType1: {
    color: Colors.mainTextColor,
    fontSize: 14,
    fontWeight: '500',
  },
  //Edit Profile
  contentContainer: {
    width: '100%',
    borderTopWidth: HAIRLINE,
    borderTopColor: Colors.hairlineColor,
    backgroundColor: Colors.black,
  },
  divider: {
    height: 0.5,
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
    height: 'auto',
    width: '70%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  slider: {
    height: scale(70),
    width: '100%',
  },
  sliderboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: STANDARD_SPACING * 4,
    // marginVertical: 10,
  },
  sliderbox: {
    height: scale(35),
    width: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_SPACING,
    borderWidth: 1,
    borderColor: '#d6d6d6',
  },
  boxLable: {
    fontSize: scale(14),
    fontFamily: POPPINS_SEMIBOLD,
    color: Colors.mainTextColor,
  },
  rangeSliderWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    justifyContent: 'center',
  },
  //app Settings
  appSettingsTypeContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  appSettingsSaveContainer: {
    marginTop: 4,
    height: 45,
    backgroundColor: Colors.mainThemeBackgroundColor,
  },
  placeholderTextColor: {
    color: Colors.hairlineColor,
  },
  selectValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    backgroundColor: 'red',
  },
  selectValueText: {
    fontSize: scale(13),
    fontFamily: POPPINS_MEDIUM,
    color: Colors.mainTextColor,
  },
  sheetContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  indicator: {
    height: scale(4),
    width: scale(40),
    borderRadius: scale(2),
    backgroundColor: Colors.black,
  },
  sheetContent: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(30),
  },
  sheetHeader: {
    paddingVertical: scale(18),
    borderBottomWidth: HAIRLINE,
    borderBottomColor: '#2C2D2D',
  },
  sheetTitle: {
    fontSize: scale(17),
    fontFamily: POPPINS_MEDIUM,
    color: Colors.black,
    textAlign: 'center',
  },
  optionsList: {
    maxHeight: scale(420),
  },
  cancelButton: {
    marginTop: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    height: STANDARD_BUTTON_HEIGHT,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.1,
    paddingHorizontal: scale(15),
    borderWidth: scale(1),
    borderColor: Colors.error,
  },
  cancelButtonText: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    color: Colors.error,
  },
  languageComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  languageComponentWrapperWithMarginTop: {
    marginTop: STANDARD_SPACING * 3,
  },
  saveButtonWrapper: {
    position: 'absolute',
    bottom: scale(10),
    top: STANDARD_SPACING * 5,
    width: '95%',
    alignSelf: 'center',
    borderColor: Colors.hairlineColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: STANDARD_BUTTON_HEIGHT,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.2,
  },
  saveBtnLable: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    alignSelf: 'center',
    justifyContent: 'center',
    color: Colors.mainTextColor,
  },
});
