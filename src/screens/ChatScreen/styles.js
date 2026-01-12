import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import {
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_TEXT_INPUT_HEIGHT,
  STANDARD_USER_AVATAR_BADGE_WRAPPER_SIZE,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
} from '../../constants/Constants';
import Colors from '../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  chatItemWrapper: {
    marginHorizontal: STANDARD_SPACING * 3,
  },
  chatItemWrapperWithMarginTop: {
    marginTop: STANDARD_SPACING * 3,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  avatarBadgeContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: -(STANDARD_SPACING * 0.6),
    width: STANDARD_USER_AVATAR_BADGE_WRAPPER_SIZE,
    aspectRatio: 1,
    borderWidth: scale(1),
    borderColor: '#FFFFFF',
    zIndex: 1,
    borderRadius: STANDARD_USER_AVATAR_BADGE_WRAPPER_SIZE * 0.5,
  },
  avatarImageContainer: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
    overflow: 'hidden',
    marginBottom: STANDARD_SPACING,
  },
  avatarImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
  },
  messageWrapper: {
    padding: STANDARD_SPACING * 3,
    marginBottom: STANDARD_SPACING * 3,
    borderRadius: STANDARD_BORDER_RADIUS * 5,
  },
  message: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  messageAge: {
    alignSelf: 'flex-start',
    fontFamily: POPPINS_BOLD,
    fontSize: FONT_SIZE_XXS,
    marginBottom: STANDARD_SPACING * 3,
  },
  seenLabel: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_XXS,
    marginRight: STANDARD_SPACING * 1.5,
  },
  footerWrapper: {
    padding: STANDARD_SPACING * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatTextInputContainer: {
    height: STANDARD_TEXT_INPUT_HEIGHT,
    flex: STANDARD_FLEX,
    borderRadius: STANDARD_BORDER_RADIUS * 5,
    position: 'relative',
    justifyContent: 'center',
    // alignItems:'center'
  },
  chatTextInput: {
    // flex: STANDARD_FLEX,
    borderRadius: STANDARD_BORDER_RADIUS * 10,
    paddingLeft: STANDARD_SPACING * 3,
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    color: Colors.textHighContrast,
    width:SCREEN_WIDTH * 0.63,

  },
  emojiIconContainer: {
    width: STANDARD_TEXT_INPUT_HEIGHT - scale(15),
    aspectRatio: 1,
    borderRadius: STANDARD_TEXT_INPUT_HEIGHT - scale(15) * 0.5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: STANDARD_SPACING * 1.5,
    top: STANDARD_SPACING * 1.5,
  },
  sendButton: {
    width: STANDARD_BUTTON_HEIGHT,
    aspectRatio: 1,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: STANDARD_SPACING * 3,
  },

  actionSheetContainer: {
      backgroundColor: 'white',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    actionSheetIndicator: {
      width: 100,
      height: 4,
      backgroundColor: '#D1D1D6',
    },
    actionSheetContent: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      minHeight: 200,
    },
    actionSheetHeader: {
      alignItems: 'center',
      paddingBottom: STANDARD_SPACING * 2,
      borderBottomWidth: scale(0.5),
      borderBottomColor: Colors.hairlineColor,
      marginBottom: STANDARD_SPACING * 1.5,
    },
    actionSheetTitle: {
      fontSize: scale(14),
      color: Colors.mainSubtextColor,
      fontFamily: POPPINS_SEMIBOLD,
    },
    actionSheetOption: {
      paddingVertical: STANDARD_SPACING * 2,
      alignItems: 'center',
    },
    actionSheetOptionText: {
      fontSize: scale(14),
      color: Colors.error,
      fontFamily: POPPINS_SEMIBOLD,
    },
    actionSheetOptionTextDanger: {
      fontSize: scale(14),
      color: Colors.main,
      fontFamily: POPPINS_SEMIBOLD,
    },
    actionSheetDivider: {
      height: scale(0.5),
      backgroundColor: Colors.hairlineColor,
      marginVertical: STANDARD_SPACING,
    },
     progressBar: {
      backgroundColor: 'red',
      height: 3,
      shadowColor: '#000',
      width: 0,
    },
});
