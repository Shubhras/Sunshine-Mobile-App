import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  POPPINS_MEDIUM,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH
} from '../../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 10,
    width: SCREEN_WIDTH * 0.92,
    padding: scale(10),
    borderRadius: scale(15),
    borderWidth: scale(1),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  messageWrapper:{
    marginLeft: scale(5),
    maxWidth: SCREEN_WIDTH * 0.7,
  },
  ToastTitle:{
    fontSize: FONT_SIZE_XS,
    fontFamily: POPPINS_SEMIBOLD,
    flex: 1,
  },
  ToastText: {
    fontSize: FONT_SIZE_XXS,
    fontFamily: POPPINS_MEDIUM,
    flexWrap: 'wrap',
    flex: 1,
  },
  toastIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
  successToastConatiner: {
    backgroundColor: '#def1d7',
    borderColor: '#1f8722',
  },
  warningToastConatiner: {
    backgroundColor: '#fef7ec',
    borderColor: '#f08135',
  },
  errorToastConatiner: {
    backgroundColor: '#fae1db',
    borderColor: '#d9100a',
  },
  successToastText: {
    color: '#1f8722',
  },
  warningToastText: {
    color: '#f08135',
  },
  errorToastText: {
    color: '#d9100a',
  },
  progress_bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: scale(3),
    borderRadius: scale(30),
    marginHorizontal: scale(8),
  },
  closeButton: {
    position: 'absolute',
    right: scale(5),
    padding: scale(5),
    backgroundColor: '#aaa',
    borderRadius: scale(30),
  },
  successProgressBar: {
    backgroundColor: '#1f8722',
  },
  warningProgressbar: {
    backgroundColor: '#f08135',
  },
  errorProgressbar: {
    backgroundColor: '#d9100a',
  },
});
