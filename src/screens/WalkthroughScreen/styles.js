import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {
  FONT_SIZE_MD,
  FONT_SIZE_XL,
  FONT_SIZE_XS,
  POPPINS_BOLD,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  STANDARD_SPACING,
} from '../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  title: {
    fontSize: FONT_SIZE_XL,
    fontFamily: POPPINS_SEMIBOLD,
    textAlign: 'center',
    paddingBottom: scale(25),
    color: Colors.white,
  },
  text: {
    fontSize: FONT_SIZE_MD,
    fontFamily: POPPINS_REGULAR,
    textAlign: 'center',
    color: Colors.white,
    marginHorizontal: STANDARD_SPACING * 3,
  },
  image: {
    width: scale(100),
    height: scale(100),
    marginBottom: scale(60),
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  loginContainer: {
    width: '70%',
    backgroundColor: Colors.primary,
    borderRadius: scale(25),
    padding: scale(10),
    marginTop: scale(30),
    alignSelf: 'center',
    justifyContent: 'center',
    height: scale(48),
  },
  loginText: {
    textAlign: 'center',
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    color: Colors.white,
  },
  signupContainer: {
    justifyContent: 'center',
    width: '70%',
    backgroundColor: Colors.white,
    borderRadius: scale(25),
    borderWidth: Platform.OS === 'ios' ? scale(0.5) : scale(1.0),
    borderColor: Colors.primary,
    padding: scale(10),
    marginTop: scale(20),
    alignSelf: 'center',
    height: scale(45),
  },
  signupText: {
    textAlign: 'center',
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    color: Colors.primary,
  },
  title: {
    fontSize: FONT_SIZE_XL,
    fontFamily: POPPINS_BOLD,
    color: Colors.white,
    marginTop: scale(20),
    marginBottom: scale(20),
    textAlign: 'center',
  },
  caption: {
    fontSize: FONT_SIZE_XS,
    fontFamily: POPPINS_REGULAR,
    paddingHorizontal: STANDARD_SPACING * 10,
    marginBottom: scale(20),
    textAlign: 'center',
    color: Colors.white,
  },
  buttonContainer: {
    width: '70%',
    alignItems: 'center',
    marginTop: '10%',
  },
  doneButton: {
    fontSize: FONT_SIZE_MD,
    fontFamily: POPPINS_SEMIBOLD,
    color: Colors.white,
    marginTop: 10,
  },
});
