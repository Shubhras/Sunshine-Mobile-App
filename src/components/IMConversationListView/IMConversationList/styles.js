import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import { STANDARD_SPACING } from '../../../constants/Constants';

const { height } = Dimensions.get('window');

// Exporting style
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: STANDARD_SPACING * 2, // Sirf sides mein padding
    paddingTop: 10,
  },
  userImageContainer: {
    borderWidth: 0,
  },
  chatsChannelContainer: {
    flex: 1,
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
    fontSize: 17,
  },
  content: {
    flexDirection: 'row',
  },
  message: {
    flex: 2,
    color: Colors.mainSubtextColor,
  },
  emptyViewContainer: {
    marginTop: height / 5,
  },
});
