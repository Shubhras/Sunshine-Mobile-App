import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {
  FONT_SIZE_LG,
  FONT_SIZE_XS,
  POPPINS_BOLD,
  POPPINS_REGULAR,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  imageBackground: {
    position: 'relative',
    flex: STANDARD_FLEX,
    backgroundColor: '#D61313',
  },
  imageBackgroundOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoWrapper: {
    width: scale(150),
    aspectRatio: 1,
    borderRadius: scale(75),
    marginBottom: STANDARD_SPACING * 4,
    backgroundColor: 'transparent',
  },
  logo: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: POPPINS_BOLD,
    fontSize: FONT_SIZE_LG,
    textTransform: 'uppercase',
    color: Colors.primary,
  },
  titleHighlighted: {
    color: Colors.white,
  },
  message: {
    fontFamily: POPPINS_REGULAR,
    fontSize: FONT_SIZE_XS,
    color: Colors.grayBgColor,
  },
});
