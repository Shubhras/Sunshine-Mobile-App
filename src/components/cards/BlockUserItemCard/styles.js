import { PixelRatio, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XXS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  STANDARD_SPACING,
} from '../../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  itemListWrapper: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    height: scale(80),
    borderRadius: scale(80) * 0.2,
    borderWidth: scale(0.4),
    borderColor: Colors.hairlineColor,
  },
  blockUserImageAndLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockUserImageWrapper: {
    height: scale(60),
    borderRadius: scale(30),
    overflow: 'hidden',
  },
  blockUserImage: {
    flex: 1,
    height: null,
    width: null,
    aspectRatio: 1,
  },
  blockUserDetails: {
    flexDirection: 'column',
    marginLeft: scale(10),
  },
  blockUserName: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_SM,
    marginBottom: STANDARD_SPACING,
  },
  blockUserEmail: {
    fontFamily: POPPINS_REGULAR,
    fontSize: FONT_SIZE_XXS,
  },
  unblockWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(25),
    borderRadius: scale(25) * 0.4,
    paddingHorizontal: scale(10),
    borderWidth: scale(0.75),
    borderColor: Colors.primary,
  },
  unblock: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_XXS,
  },
});
