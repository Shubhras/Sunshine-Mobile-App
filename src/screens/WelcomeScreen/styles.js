import { Platform, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import {
  FONT_SIZE_LG,
  FONT_SIZE_SM,
  FONT_SIZE_XL,
  FONT_SIZE_XS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  STANDARD_SPACING,
} from '../../constants/Constants';
import { scale } from 'react-native-size-matters';

// Exporting style
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainThemeBackgroundColor,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: scale(150),
    height: scale(150),
    alignSelf: 'center',
    marginBottom: scale(20),
    marginTop: scale(100),
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: FONT_SIZE_XL,
    fontFamily: POPPINS_BOLD,
    color: Colors.white,
    marginTop: scale(20),
    marginBottom: scale(15),
    textAlign: 'center',
  },
  caption: {
    fontSize: FONT_SIZE_XS,
    fontFamily: POPPINS_REGULAR,
    paddingHorizontal: STANDARD_SPACING * 10,
    marginBottom: scale(80),
    textAlign: 'center',
    color: Colors.white,
  },
  dismissButton: {
    position: 'absolute',
    top: 36,
    right: 24,
  },
});
