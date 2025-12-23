import { StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { scale } from 'react-native-size-matters';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Constants';

const undoIconSize = scale(20);
const undoIconContainerSize = undoIconSize + 8;

// Exporting style
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  cardStyle: {
    position: 'absolute',
    top: 0,
    ...ifIphoneX(
      {
        bottom: 0,
      },
      {
        bottom: 65,
      },
    ),
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
  },
  news_image_style: {
    width: SCREEN_WIDTH - scale(25),
    height: SCREEN_HEIGHT * 0.68, // FIX ME ITS BAD
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginHorizontal: scale(10),
    ...ifIphoneX(
      {
        marginTop: scale(28),
      },
      {
        marginTop: 0,
      },
    ),
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  name_info_container: {
    padding: scale(20),
    flexDirection: 'row',
  },
  userDetailContainer: {
    flex: 4,
  },
  undoIconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 7,
  },
  roundUndoIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: undoIconContainerSize + 7,
    width: undoIconContainerSize + 7,
    borderRadius: Math.floor(undoIconContainerSize + 7 / 2),
    backgroundColor: '#e95c6f',
    zIndex: 2,
  },
  name_style: {
    fontSize: scale(24),
    fontWeight: '700',
    color: 'white',
    marginBottom: scale(5),
    backgroundColor: 'transparent',
  },
  txtBox: {
    marginTop: scale(3),
    flexDirection: 'row',
  },
  icon: {
    width: scale(20),
    height: scale(20),
    tintColor: 'white',
  },
  label: {
    paddingLeft: scale(10),
    fontSize: scale(16),
    fontWeight: '400',
    color: 'white',
    backgroundColor: 'transparent',
  },
  detailBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // zIndex: 3000
  },
});
