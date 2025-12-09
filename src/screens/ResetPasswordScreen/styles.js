import { StyleSheet } from 'react-native';
import { STANDARD_FLEX, STANDARD_SPACING } from '../../constants/Constants';


// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    paddingHorizontal: STANDARD_SPACING * 3.5,
  },
  largeHeadingComponentWrapper: {
    marginBottom: STANDARD_SPACING * 15
  },
  textInputComponentWrapper: {
    marginBottom: STANDARD_SPACING * 4,
  },
  buttonWrapper: {
    marginHorizontal: STANDARD_SPACING * 3,
  },
  loginMobileLinkWrapper: {
    marginTop: STANDARD_SPACING * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
