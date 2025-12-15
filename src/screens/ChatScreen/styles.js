import { StyleSheet } from 'react-native';
import { STANDARD_FLEX, STANDARD_SPACING } from '../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    paddingHorizontal: STANDARD_SPACING * 3.5,
  },
  text: {
    color: 'white',
  },
});
