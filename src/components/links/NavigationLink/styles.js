import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_MEDIUM,
  FONT_SIZE_SM,
  STANDARD_NAVIGATION_LINK_HEIGHT,
  STANDARD_NAVIGATION_LINK_LEFT_ICON_WRAPPER_SIZE,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  link: {
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: STANDARD_NAVIGATION_LINK_HEIGHT,
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
  label: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
});
