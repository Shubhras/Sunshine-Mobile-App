import { StyleSheet } from 'react-native';
import { STANDARD_FLEX, STANDARD_SPACING } from '../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    paddingHorizontal: STANDARD_SPACING * 3.5,
  },
  largeHeadingComponentWrapper: {
    marginTop: STANDARD_SPACING * 5,
    marginBottom: STANDARD_SPACING * 5,
  },
  textInputComponentWrapper: {
    marginBottom: STANDARD_SPACING * 4,
  },
  linkWrapper: {
    marginBottom: STANDARD_SPACING * 6,
    paddingRight: STANDARD_SPACING,
    alignItems: 'flex-end',
  },
  buttonWrapper: {
    marginHorizontal: STANDARD_SPACING * 3,
  },
  loginMobileLinkWrapper: {
    marginTop: STANDARD_SPACING * 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
