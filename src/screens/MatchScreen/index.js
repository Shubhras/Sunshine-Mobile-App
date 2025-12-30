import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../components/global/CustomText';
import styles from './styles';

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
          <CustomText style={styles.matchText}>IT’S A MATCH!</CustomText>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onSendMessage}
          >
            <CustomText style={styles.primaryText}>SEND A MESSAGE</CustomText>
          </TouchableOpacity>

          <TouchableOpacity onPress={onKeepSwiping}>
            <CustomText style={styles.secondaryText}>KEEP SWIPING</CustomText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MatchScreen;
