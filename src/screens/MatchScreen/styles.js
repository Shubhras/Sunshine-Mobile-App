import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { POPPINS_SEMIBOLD } from '../../constants/Constants';

// Exporting style
export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 80,
    alignItems: 'center',
  },
  matchText: {
    color: Colors.onlineMarkColor,
    fontSize: 26,
    fontFamily: POPPINS_SEMIBOLD,
    letterSpacing: 1,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryText: {
    color: '#111',
    fontSize: 15,
    fontFamily: POPPINS_SEMIBOLD,
    letterSpacing: 0.5,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: POPPINS_SEMIBOLD,
    opacity: 0.85,
    textTransform: 'uppercase',
  },
});
