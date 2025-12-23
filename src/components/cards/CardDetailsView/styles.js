import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors';
import { SCREEN_HEIGHT } from '../../../constants/Constants';

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  photoView: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: 'skyblue',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
  },
  backView: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.467,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#db6470',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  titleView: {
    width: '100%',
    paddingHorizontal: 12,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 10,
    color: Colors.mainTextColor,
  },
  ageText: {
    bottom: 1,
    fontSize: 25,
    color: Colors.mainTextColor,
  },
  captionView: {
    width: '100%',
    paddingHorizontal: 12,
  },
  itemView: {
    width: '100%',
    paddingVertical: 2,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  icon: {
    width: scale(20),
    height: scale(20),
    tintColor: 'grey',
  },
  text: {
    paddingLeft: scale(10),
    fontSize: scale(16),
    color: Colors.mainTextColor,
    backgroundColor: 'transparent',
  },
  lineView: {
    marginTop: 4,
    width: '100%',
    height: 1,
    backgroundColor: Colors.hairlineColor,
  },
  bioView: {
    width: '100%',
    paddingHorizontal: 12,
    marginVertical: 15,
  },
  label: {
    fontSize: scale(20),
  },
  bioText: {
    fontSize: scale(16),
    color: Colors.mainTextColor,
  },
  instagramView: {
    width: '100%',
    height: 270,
    paddingHorizontal: 12,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
  myphotosItemView: {
    width: 100,
    height: 100,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  inlineActionsContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.inlineActionsColor,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  closeButton: {
    alignSelf: 'flex-end',
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginRight: 15,
  },
  closeButton__text: {
    backgroundColor: 'transparent',
    fontSize: 35,
    lineHeight: 35,
    color: '#FFF',
    textAlign: 'center',
  },
});
