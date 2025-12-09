import { StyleSheet } from 'react-native';
import { POPPINS_MEDIUM, POPPINS_REGULAR, STANDARD_FLEX, STANDARD_SPACING } from '../../constants/Constants';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    paddingHorizontal: STANDARD_SPACING * 3.5,
  },
  mainScrollView: {
    paddingBottom: STANDARD_SPACING * 2,
  },
  largeHeadingComponentWrapper: {
    marginTop: STANDARD_SPACING * 3,
  },
  textInputComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3.5,
  },
  buttonWrapper: {
    marginHorizontal: STANDARD_SPACING * 3,
  },
  loginMobileLinkWrapper: {
    marginTop: STANDARD_SPACING * 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tos: {
    marginVertical: STANDARD_SPACING * 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(30),
  },
  orTextStyle: {
    fontSize: scale(12),
    fontFamily: POPPINS_MEDIUM,
    marginTop: scale(20),
    marginBottom: scale(10),
    alignSelf: 'center',
    color: Colors.mainSubtextColor,
  },
  signWithEmailContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
   errorText: {
    left: STANDARD_SPACING * 2.5,
    color: Colors.error,
    fontSize: scale(10),
    fontFamily: POPPINS_REGULAR,
    top: scale(2),
  },
});
