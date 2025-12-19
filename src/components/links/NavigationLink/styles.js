import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import {
  POPPINS_MEDIUM,
  FONT_SIZE_SM,
  STANDARD_NAVIGATION_LINK_HEIGHT,
  STANDARD_NAVIGATION_LINK_LEFT_ICON_WRAPPER_SIZE,
  POPPINS_REGULAR,
  POPPINS_BOLD,
  FONT_SIZE_XS,
} from '../../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  link: {
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: STANDARD_NAVIGATION_LINK_HEIGHT * 0.2,
  },
  leftIconLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
    width: STANDARD_NAVIGATION_LINK_LEFT_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_NAVIGATION_LINK_LEFT_ICON_WRAPPER_SIZE * 0.5,
  },
  images: {
    flex: 1,
    height: scale(22),
    width: scale(22),
  },
  label: {
    fontFamily: POPPINS_REGULAR,
    fontSize: FONT_SIZE_XS,
  },
});
