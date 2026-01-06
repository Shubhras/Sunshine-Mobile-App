import { PixelRatio, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {
  FONT_SIZE_MD,
  FONT_SIZE_XS,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
} from '../../constants/Constants';

const HAIRLINE = 1 / PixelRatio.get();

// Exporting style
export default StyleSheet.create({
  header: {
    height: scale(45),
    width: SCREEN_WIDTH,
    alignSelf: 'center',
    elevation: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: HAIRLINE,
    borderBottomColor: Colors.hairlineColor,
    paddingHorizontal: scale(8),
  },
  view: {
    // marginHorizontal: scale(15),
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleView: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE_MD,
    fontFamily: POPPINS_SEMIBOLD,
  },
  rightView: {
    justifyContent: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(10),
  },
  rightTitle: {
    fontSize: FONT_SIZE_XS,
    fontFamily: POPPINS_SEMIBOLD,
    color: Colors.primary,
  },
    avatarImageContainer: {
      width: STANDARD_USER_AVATAR_WRAPPER_SIZE*0.9,
      aspectRatio: 1,
      borderRadius: STANDARD_USER_AVATAR_WRAPPER_SIZE,
      overflow: 'hidden',
      margin: STANDARD_SPACING,
      // padding: scale(10),
    },
    avatarImage: {
      width: null,
      height: null,
      flex: STANDARD_FLEX,
      resizeMode: 'cover',
    },
});
