import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const { height, width } = Dimensions.get('window');

const PADDING = 8;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const OPTION_CONTAINER_HEIGHT = 400;

export default StyleSheet.create({
  overlayStyle: {
    width,
    height,
    backgroundColor: Colors.black,
  },
  optionContainer: {
    borderRadius: BORDER_RADIUS,
    width: width * 0.8,
    height: OPTION_CONTAINER_HEIGHT,
    backgroundColor: Colors.grey0,
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2,
  },
  cancelContainer: {
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 10,
  },
  cancelStyle: {
    borderRadius: BORDER_RADIUS,
    width: width * 0.8,
    backgroundColor: Colors.grey0,
    padding: PADDING,
  },
  cancelTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE,
    color: Colors.grey9,
  },
  optionStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: PADDING,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey3,
  },
  optionTextStyle: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionStyle: {
    padding: PADDING * 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey9,
  },
  sectionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE,
  },
});