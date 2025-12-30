import { StyleSheet } from 'react-native';
import { FONT_SIZE_XL, POPPINS_BOLD } from '../../../constants/Constants';
import Colors from '../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  storiesContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  seenStyle: {
    borderColor: Colors.grey0,
    borderWidth: 1,
  },
});
