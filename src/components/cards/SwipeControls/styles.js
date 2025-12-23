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
    padding: scale(15),
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  small_icon: {
    width: scale(23),
    height: scale(23),
    resizeMode: 'contain',
    tintColor: '#3c94dc',
  },
  large_icon: {
    width: scale(33),
    height: scale(33),
    resizeMode: 'contain',
  },
});
