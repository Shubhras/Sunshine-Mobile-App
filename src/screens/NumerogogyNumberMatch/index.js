import React, { useState } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import ProfileHeader from '../../components/ProfileHeader';
import Colors from '../../constants/Colors';
import { Switch } from 'react-native-switch';
import styles from './styles';
import { scale } from 'react-native-size-matters';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../components/global/CustomText';
import Button from '../../components/buttons/Button';

const generateSwitchArray = () => {
  const baseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
  return [baseArray, baseArray];
};

const sectionHeadings = ['My Numerology', 'Search Numerology']; // Headings for the two lines
const switchArrays = generateSwitchArray();

const NumerogogyNumberMatch = ({ route }) => {
  const { title } = route.params;
  const [switchStates, setSwitchStates] = useState(
    switchArrays.map(array => array.map(() => false)),
  );

  const toggleSwitch = (lineIndex, switchIndex) => {
    const newSwitchStates = [...switchStates];
    const switchStatus = !newSwitchStates[lineIndex][switchIndex];

    if (lineIndex === 0) {
      newSwitchStates[lineIndex] = newSwitchStates[lineIndex].map(
        (state, index) => (index === switchIndex ? switchStatus : false),
      );

      if (switchStatus) {
        const numerologyNumber = switchArrays[0][switchIndex];
        handleSwitch(numerologyNumber);
      }
    } else {
      newSwitchStates[lineIndex] = newSwitchStates[lineIndex].map(
        (state, index) => (index === switchIndex ? switchStatus : false),
      );
    }

    setSwitchStates(newSwitchStates);
  };

  const handleSwitch = numerologyNumber => {
    // Implement your logic here
    console.log('Selected numerology number:', numerologyNumber);
  };

  const saveData = () => {
    // Implement your save logic here
    console.log('Saving data...');
  };

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <ProfileHeader
        back={true}
        iconColor={Colors.white}
        title={title}
        titleAlight={'center'}
        titleFontSize={scale(16)}
        headerBg={Colors.black}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={styles.ScrollViewWrapper}
      >
        <View style={styles.numerologyWrapper}>
          <View style={styles.myNumerologyWrapper}>
            <CustomText style={styles.title}>{sectionHeadings[0]}</CustomText>
            {switchArrays[0].map((value, switchIndex) => (
              <View key={switchIndex} style={styles.switchContainer}>
                <CustomText style={styles.switchLabel}>{value}</CustomText>
                <Switch
                  value={switchStates[0][switchIndex]}
                  onValueChange={() => toggleSwitch(0, switchIndex)}
                  circleSize={scale(18)}
                  barHeight={scale(23)}
                  circleBorderWidth={0}
                  backgroundActive={'#77cc5c'}
                  backgroundInactive={'#3e3e3e'}
                  circleActiveColor={'#f5dd4b'}
                  circleInActiveColor={'#f4f3f4'}
                  changeValueImmediately={true}
                  innerCircleStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  outerCircleStyle={{}}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={2.2}
                  switchRightPx={2.2}
                  switchWidthMultiplier={2.15}
                  switchBorderRadius={scale(20)}
                />
              </View>
            ))}
          </View>
          <View style={styles.horizontalDivider} />
          <View style={styles.searchNumerogogyWrapper}>
            <CustomText style={styles.title}>{sectionHeadings[1]}</CustomText>
            {switchArrays[1].map((value, switchIndex) => (
              <View key={switchIndex} style={styles.switchContainer}>
                <CustomText style={styles.switchLabel}>{value}</CustomText>
                <Switch
                  value={switchStates[1][switchIndex]}
                  onValueChange={() => toggleSwitch(1, switchIndex)}
                  circleSize={scale(18)}
                  barHeight={scale(23)}
                  circleBorderWidth={0}
                  backgroundActive={'#77cc5c'}
                  backgroundInactive={'#3e3e3e'}
                  circleActiveColor={'#f5dd4b'}
                  circleInActiveColor={'#f4f3f4'}
                  changeValueImmediately={true}
                  innerCircleStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  outerCircleStyle={{}}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={2.2}
                  switchRightPx={2.2}
                  switchWidthMultiplier={2.15}
                  switchBorderRadius={scale(20)}
                />
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.buttonWrapper} onPress={saveData}>
          <CustomText style={styles.buttonLabel}>Search</CustomText>
        </TouchableOpacity>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default NumerogogyNumberMatch;
