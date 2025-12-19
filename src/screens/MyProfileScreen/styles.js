import { StyleSheet } from 'react-native';
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
  },
  photosSectionWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    paddingVertical: STANDARD_SPACING * 3,
  },
  sectionTitle: {
    marginBottom: STANDARD_SPACING * 3,
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
});
