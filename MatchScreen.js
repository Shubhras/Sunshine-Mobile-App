import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import Colors from './src/constants/Colors';
import { POPPINS_MEDIUM, POPPINS_SEMIBOLD } from './src/constants/Constants';

const MatchScreen = ({ onSendMessage, onKeepSwiping }) => {
  return (
    <View style={styles.root}>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}

      <ImageBackground
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/test-5b20e.appspot.com/o/Can%20we%20add%20this%20picture%20and%20put%20a%20match%20on%20it.png?alt=media&token=0b5ae22f-cf2b-42a2-8b8a-8350e408a0a1', // replace with real image
        }}
        style={styles.image}
        resizeMode="cover"
      >
        {/* Overlay */}
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.matchText}>IT’S A MATCH!</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onSendMessage}
          >
            <Text style={styles.primaryText}>SEND A MESSAGE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onKeepSwiping}>
            <Text style={styles.secondaryText}>KEEP SWIPING</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MatchScreen;


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
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
   fontFamily:POPPINS_SEMIBOLD,
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
    fontFamily:POPPINS_SEMIBOLD,
    letterSpacing: 0.5,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily:POPPINS_SEMIBOLD,
    opacity: 0.85,
    textTransform: 'uppercase',
  },
});
