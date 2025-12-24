import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

// Exporting style
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: scale(10),
    marginHorizontal: scale(100),
    marginBottom: scale(35),
  },
  button_container: {
    padding: scale(10),
    backgroundColor: 'white',
    borderRadius: scale(30),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  small_icon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    tintColor: '#3c94dc',
  },
  large_icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
});
