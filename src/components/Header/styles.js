import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {
  FONT_SIZE_LG,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH
} from '../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  header: {
    height: scale(50),
    width: SCREEN_WIDTH,
    alignSelf: 'center',
    elevation: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  view: {
    marginHorizontal: scale(15),
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleView: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE_LG,
    fontFamily: POPPINS_SEMIBOLD,
  },
  rightView: {
    justifyContent: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(10),
  },
});
