import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { FONT_SIZE_SM, POPPINS_BOLD } from '../../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  style: {
    fontFamily: POPPINS_BOLD,
    fontSize: FONT_SIZE_SM,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.primary
  },
});
