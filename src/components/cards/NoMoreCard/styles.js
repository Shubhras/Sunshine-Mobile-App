import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { POPPINS_MEDIUM } from '../../../constants/Constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageWrapper: {
    height: scale(120),
    borderRadius: scale(60),
    marginBottom: scale(15),
    overflow: 'hidden',
  },
  user_pic_style: {
    flex: 1,
    width: null,
    height: null,
    aspectRatio: 1,
  },
  empty_state_text_style: {
    fontSize: scale(12),
    fontFamily: POPPINS_MEDIUM,
    color: '#777777',
    textAlign: 'center',
  },
});
