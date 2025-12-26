import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  container: {
    flex: 0.85,
    position: 'relative',
    overflow:'hidden',
    // backgroundColor:'red'
  },
  overlayLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  overlayLabelText: {
    fontSize: 32,
    fontWeight: '800',
    padding: 10,
  },
  swiperContainer: {
    marginLeft: -20,
    marginTop: -Math.floor(SCREEN_HEIGHT * 0.06),
    backgroundColor: 'transparent',
  },
  overlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: Math.floor(SCREEN_HEIGHT * 0.04),
  },
  cardDetailContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.black,
  },
  cardDetailL: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.95,
    backgroundColor: Colors.white,
  },
  bottomTabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
  noMoreCards: {
    position: 'absolute',
    top: 0,
    bottom: 50,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
  },
  newMatch: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: Colors.white,
  },
  controlsWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 40,
    zIndex: 999, // ensure it's above everything visually
  },
});
