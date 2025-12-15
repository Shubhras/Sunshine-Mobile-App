import { StyleSheet } from 'react-native';
import { FONT_SIZE_XXS, POPPINS_SEMIBOLD } from '../../../constants/Constants';
import { scale } from 'react-native-size-matters';

// Exporting style
export default StyleSheet.create({
  tabBarBadgeStyle: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_XXS,
    // backgroundColor: IndependentColors.orange,
    // color: IndependentColors.white,
  },
  icons: {
    width: scale(24),
    height: scale(24),
  },
});
