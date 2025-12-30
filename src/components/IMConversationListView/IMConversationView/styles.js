import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
} from '../../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainThemeBackgroundColor,
  },
  userImageContainer: {
    borderWidth: 0,
  },
  chatsChannelContainer: {
    // flex: 1,
    padding: 10,
  },
  chatItemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  chatItemContent: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: 10,
  },
  chatFriendName: {
    color: Colors.mainTextColor,
    fontSize: FONT_SIZE_SM,
    fontFamily: POPPINS_SEMIBOLD,
  },
  content: {
    flexDirection: 'row',
    marginTop: 5,
  },
  message: {
    fontSize: FONT_SIZE_XS,
    color: Colors.mainSubtextColor,
    fontFamily: POPPINS_REGULAR,
    // fontWeight: '500',
  },
  unReadmessage: {
    fontSize: FONT_SIZE_XS,
    fontFamily: POPPINS_MEDIUM,
    color: Colors.mainTextColor,
  },
});
