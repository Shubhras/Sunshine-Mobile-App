import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import { POPPINS_MEDIUM, POPPINS_SEMIBOLD, STANDARD_FLEX, STANDARD_SPACING } from '../../constants/Constants';
import Colors from '../../constants/Colors';
import invert from 'invert-color';
import { scale } from 'react-native-size-matters';

const width = Dimensions.get('window').width;
const codeInptCellWidth = width * 0.13;

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    paddingHorizontal: STANDARD_SPACING * 3.5,
  },
  largeHeadingComponentWrapper: {
    marginTop: STANDARD_SPACING * 5,
  },
  InputContainer: {
    height: scale(42),
    borderWidth: 1,
    borderColor: Colors.white,
    // backgroundColor: invert('#e0e0e0'),
    paddingLeft: scale(10),
    color: Colors.mainTextColor,
    width: '100%',
    alignSelf: 'center',
    marginTop: STANDARD_SPACING * 2.5,
    alignItems: 'center',
    borderRadius: scale(25),
  },
  flagStyle: {
    width: scale(35),
    height: scale(25),
    borderColor: Colors.mainTextColor,
    borderBottomLeftRadius: scale(25),
    borderTopLeftRadius: scale(25),
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  phoneInputTextStyle: {
    borderLeftWidth: I18nManager.isRTL ? 0 : 1,
    borderRightWidth: I18nManager.isRTL ? 1 : 0,
    borderLeftWidth: 1,
    borderColor: Colors.grey3,
    height: scale(42),
    fontSize: scale(14),
    color: Colors.mainTextColor,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    borderBottomRightRadius: I18nManager.isRTL ? 0 : 25,
    borderTopRightRadius: 25,
    borderTopRightRadius: I18nManager.isRTL ? 0 : 25,
    borderBottomLeftRadius: I18nManager.isRTL ? 25 : 0,
    borderTopLeftRadius: I18nManager.isRTL ? 25 : 0,
    paddingLeft: 10,
  },
  textInputComponentWrapper: {
    marginBottom: STANDARD_SPACING * 4,
  },
  buttonWrapper: {
    marginHorizontal: STANDARD_SPACING * 3,
  },
  loginMobileLinkWrapper: {
    marginTop: STANDARD_SPACING * 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: scale(18),
    fontFamily: POPPINS_SEMIBOLD,
    color: Colors.white,
    textAlign: 'left',
  },
  sendContainer: {
    width: '70%',
    backgroundColor: Colors.mainThemeForegroundColor,
    borderRadius: 25,
    padding: 10,
    marginTop: 30,
    alignSelf: 'center',
  },
  sendText: {
    color: '#ffffff',
  },
  input: {
    flex: 1,
    borderLeftWidth: 1,
    borderRadius: 3,
    borderColor: Colors.grey3,
    color: Colors.mainTextColor,
    fontSize: 17,
    fontWeight: '700',
    backgroundColor: Colors.mainThemeBackgroundColor,
  },
  root: {
    padding: 20,
    minHeight: 300,
    alignItems: 'center',
  },
  codeFieldContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  codeInputCell: {
    width: codeInptCellWidth,
    height: codeInptCellWidth,
    lineHeight: 55,
    fontSize: 26,
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: 8,
    borderRadius: 6,
    backgroundColor: Colors.grey3,
  },
  focusCell: {
    borderColor: '#000',
  },
  orTextStyle: {
     fontSize: scale(12),
     fontFamily: POPPINS_MEDIUM,
     marginTop: scale(25),
     alignSelf: 'center',
     color: Colors.mainSubtextColor,
   },
  facebookContainer: {
    width: '70%',
    backgroundColor: '#4267b2',
    borderRadius: 25,
    marginTop: 30,
    alignSelf: 'center',
    padding: 10,
  },
  googleButtonStyle: {
    alignSelf: 'center',
    marginTop: 15,
    padding: 5,
    elevation: 0,
  },
  appleButtonContainer: {
    width: '70%',
    height: 40,
    marginTop: 16,
    alignSelf: 'center',
  },
  facebookText: {
    color: '#ffffff',
    fontSize: 14,
  },
  signWithEmailContainer: {
    color: Colors.mainThemeForegroundColor,
    fontWeight: 'bold',
  },
  signWithEmailContainer1: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signWithEmail: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mainThemeForegroundColor,
  },
  tos: {
    marginVertical: STANDARD_SPACING * 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(30),
  },
});
