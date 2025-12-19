import { StyleSheet } from 'react-native';
import {
  FONT_SIZE_MD,
  FONT_SIZE_XXS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../constants/Constants';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  carouselWrapper: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  flatlist: {
    flex: STANDARD_FLEX,
  },
  carouselItemWrapper: {
    flex: STANDARD_FLEX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItemImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftNavigationControlWrapper: {
    position: 'absolute',
    left: 0,
    top: '50%',
  },
  rightNavigationControlWrapper: {
    position: 'absolute',
    right: 0,
    top: '50%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: STANDARD_SPACING * 4,
  },
  textContainer: {
    marginTop: STANDARD_SPACING * 3,
    paddingHorizontal: STANDARD_SPACING * 3,
    alignItems: 'center',
  },
  titleText: {
    fontSize: FONT_SIZE_MD,
    fontFamily: POPPINS_MEDIUM,
    color: Colors.mainTextColor,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: FONT_SIZE_XXS,
    fontFamily: POPPINS_REGULAR,
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginTop: STANDARD_SPACING,
  },
  indicator: {
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: Colors.primary,
    marginHorizontal: scale(4),
  },
});
