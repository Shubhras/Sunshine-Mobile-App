import { Platform, StyleSheet } from 'react-native';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XL,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../constants/Constants';
import { s, scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';

const height = SCREEN_HEIGHT;
const tickContainerSize = scale(20);
const containerPaddingHorizontal = scale(18);

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  carouselWrapper: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  flatlist: {
    flex: STANDARD_FLEX,
  },
  carouselItemWrapper: {
    // flex: STANDARD_FLEX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItemImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftNavigationControlWrapper: {
    position: 'absolute',
    left: 0,
    top: '50%',
  },
  rightNavigationControlWrapper: {
    position: 'absolute',
    right: 0,
    top: '50%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: STANDARD_SPACING * 4,
  },
  textContainer: {
    marginTop: STANDARD_SPACING * 3,
    paddingHorizontal: STANDARD_SPACING * 3,
    alignItems: 'center',
  },
  titleText: {
    fontSize: FONT_SIZE_MD,
    fontFamily: POPPINS_MEDIUM,
    color: Colors.mainTextColor,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: FONT_SIZE_XXS,
    fontFamily: POPPINS_REGULAR,
    color: Colors.mainTextColor,
    textAlign: 'center',
    marginTop: STANDARD_SPACING,
  },
  indicator: {
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: Colors.primary,
    marginHorizontal: scale(4),
  },

  featureTextStyle: {
    color: Colors.textHighContrast,
    marginHorizontal: scale(10),
    fontSize: FONT_SIZE_XS,
    fontFamily: POPPINS_REGULAR,
  },

  subscriptionPlansContainer: {
    // flex: 1,
    width: SCREEN_WIDTH,
    paddingHorizontal: scale(10),
    
  },
  subscriptionsContainer: {
    // flex: 2.5,
    alignItems: 'center',
  },

 

  titleDescription: {
     color: Colors.textHighContrast,
    fontSize: FONT_SIZE_XXS,
    textAlign: 'center',
    fontFamily: POPPINS_REGULAR,   
    paddingHorizontal: containerPaddingHorizontal,
  },
  subscriptionContainer: {
    flexDirection: 'column',
    // flex: 0.3,
    // height:
    //   Platform.OS === 'ios'
    //     ? Math.floor(height * 0.15)
    //     : Math.floor(height * 0.16),
    backgroundColor: '#131313',
    borderRadius: Math.floor(height * 0.02),
    paddingVertical: scale(20),
    paddingHorizontal: scale(15),
    marginVertical: scale(6),
  },

  selectContainer: {
    // flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: scale(10),
  },

  tickIconContainer: {
    width: tickContainerSize,
    height: tickContainerSize,
    borderRadius: Math.floor(tickContainerSize / 2),
    backgroundColor: Colors.hairlineColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedSubscription: {
    backgroundColor: Colors.primary,
  },

  tick: {
    width: tickContainerSize - 10,
    height: tickContainerSize - 10,
    tintColor: Colors.white,
  },

  rateContainer: {
    // flex: 2,
    justifyContent: 'center',
  },

  rateText: {
    fontSize: FONT_SIZE_XS,
    color: Colors.white,
    fontFamily: POPPINS_MEDIUM,
  },

  monthText: {
     fontSize: FONT_SIZE_XXS,
    color: Colors.white,
    fontFamily: POPPINS_MEDIUM,
  },

  trialOptionContainer: {
    // flex: 2,
    justifyContent: 'center',
  },

  trialContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Math.floor(height * 0.92),
    // marginHorizontal: scale(10),
    // height: '55%',
    // width: '65%',
    backgroundColor: Colors.primary,
  },

  trialText: {
    fontSize: FONT_SIZE_XXS,
    color: Colors.white,
    fontFamily: POPPINS_MEDIUM,
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
  },

  bottomContainer: {
    // flex: Platform.OS === 'ios' ? 1.4 : 1.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(9),
    // paddingBottom: 20,
  },

  bottomHeaderTitle: {
    color: Colors.textHighContrast,
    fontSize: FONT_SIZE_XXS,
    textAlign: 'center',
    fontFamily: POPPINS_REGULAR,
  },

  bottomButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    width: SCREEN_WIDTH*0.8,
    height: scale(46),
    borderRadius: Math.floor(height * 0.92),
    marginTop: scale(7),
    // marginBottom: Platform.OS === 'ios' ? 25 : 0,
  },

  buttonTitle: {
    color: Colors.white,
    fontSize: FONT_SIZE_XS,
    textAlign: 'center',
    fontFamily: POPPINS_MEDIUM,
  },

  cancelTitle: {
     color: Colors.primary,
    fontSize: FONT_SIZE_XS,
    textAlign: 'center',
    fontFamily: POPPINS_MEDIUM,
  },
});
