import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, STANDARD_FLEX, STANDARD_SPACING } from '../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  flatlistScrollWrapper: {
    flexGrow: STANDARD_FLEX,
    paddingBottom: STANDARD_SPACING * 5,
  },
  blockUserComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    marginHorizontal: STANDARD_SPACING * 3,
  },
  blockUserComponentWrapperWithMarginTop: {
    marginTop: STANDARD_SPACING * 3,
  },
  emptyViewContainer: {
      marginTop: SCREEN_HEIGHT * 0.35,
    },
});
