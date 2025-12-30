import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import {
  POPPINS_REGULAR,
  STANDARD_SPACING,
} from '../../../constants/Constants';
import { scale } from 'react-native-size-matters';

const imageContainerWidth = 66;
const imageWidth = imageContainerWidth - 6;

// Exporting style
export default StyleSheet.create({
  container: {
    margin: STANDARD_SPACING * 1.2,
    marginTop: STANDARD_SPACING * 2,
    overflow: 'hidden',
  },
  imageContainer: {
    width: imageContainerWidth,
    height: imageContainerWidth,
    borderRadius: Math.floor(imageContainerWidth / 2),
    borderColor: Colors.mainThemeForegroundColor,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: Math.floor(imageWidth / 2),
    borderColor: Colors.mainThemeBackgroundColor,
    borderWidth: 1,
    overflow: 'hidden',
    // marginTop: 10,
  },
  text: {
    fontSize: scale(10),
    fontFamily: POPPINS_REGULAR,
    textAlign: 'center',
    color: Colors.mainSubtextColor,
    paddingTop: scale(4),
    // transform: [{ rotate: '-90deg' }],
  },
  isOnlineIndicator: {
    position: 'absolute',
    backgroundColor: '#4acd1d',
    height: scale(12),
    width: scale(12),
    borderRadius: scale(12) / 2,
    borderWidth: scale(2),
    borderColor: Colors.white,
    right: scale(4),
    bottom: 0,
  },
});
