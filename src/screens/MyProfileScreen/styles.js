import { Dimensions, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_SEMIBOLD,
  STANDARD_BORDER_RADIUS,
  STANDARD_BORDER_WIDTH,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../constants/Constants';

const width = Dimensions.get('window').width;
// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  scrollViewWrapper: {
    flexGrow: STANDARD_FLEX,
    paddingBottom: STANDARD_SPACING * 8,
  },
  profilePictureContainer: {
    marginTop: scale(10),
  },
  profileNameWrapper: {
    alignItems: 'center',
  },
  profileName: {
    fontFamily: POPPINS_BOLD,
    fontSize: FONT_SIZE_MD,
    textTransform: 'capitalize',
  },
  photosSectionWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    paddingVertical: STANDARD_SPACING * 3,
  },
  sectionTitle: {
    // marginBottom: STANDARD_SPACING * 3,
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  photosListWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(80),
    width: scale(80),
    borderRadius: STANDARD_BORDER_RADIUS * 3,
    backgroundColor: Colors.primary,
  },
  navigationLinkWrapper: {
    marginHorizontal: STANDARD_SPACING,
    marginBottom: STANDARD_SPACING,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: STANDARD_BUTTON_HEIGHT * 0.95,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.2,
    marginHorizontal: scale(10),
    borderWidth: STANDARD_BORDER_WIDTH,
    borderColor: Colors.mainTextColor,
  },
  label: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_SM,
  },
  text: {
    color: 'white',
  },

  inactiveDot: {
    backgroundColor: Colors.grey6,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideActivity: {
    height: '100%',
    width: '100%',
  },
  myphotosItemView: {
    width: Math.floor(width * 0.27),
    height: Math.floor(width * 0.27),
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  myphotosView: {
    width: '100%',
    // paddingHorizontal: 12,
    marginTop: scale(10),
    // marginBottom: 15,
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'white',
  },
});
