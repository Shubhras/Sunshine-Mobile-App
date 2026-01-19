import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import ProfileHeader from '../../components/ProfileHeader';
import Colors from '../../constants/Colors';
import styles from './styles';
import { CustomText } from '../../components/global/CustomText';
import { Switch } from 'react-native-switch';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../api/firebase/auth';
import { updateUser } from '../../redux/slices/SessionUser';
import { showToast } from '../../components/alerts/Toast/ToastManager';
import TNActivityIndicator from '../../components/TNActivityIndicator';

const sectionHeadings = ['You', 'Seeking'];

const STATE_OPTIONS = [
  { label: 'Alabama', type: 'alabama', key: 'alabama' },
  { label: 'Alaska', type: 'alaska', key: 'alaska' },
  { label: 'Arizona', type: 'arizona', key: 'arizona' },
  { label: 'Arkansas', type: 'arkansas', key: 'arkansas' },
  { label: 'California', type: 'california', key: 'california' },
  { label: 'Colorado', type: 'colorado', key: 'colorado' },
  { label: 'Connecticut', type: 'connecticut', key: 'connecticut' },
  { label: 'Delaware', type: 'delaware', key: 'delaware' },
  { label: 'Florida', type: 'florida', key: 'florida' },
  { label: 'Georgia', type: 'georgia', key: 'georgia' },
  { label: 'Hawaii', type: 'hawaii', key: 'hawaii' },
  { label: 'Idaho', type: 'idaho', key: 'idaho' },
  { label: 'Illinois', type: 'illinois', key: 'illinois' },
  { label: 'Indiana', type: 'indiana', key: 'indiana' },
  { label: 'Iowa', type: 'iowa', key: 'iowa' },
  { label: 'Kansas', type: 'kansas', key: 'kansas' },
  { label: 'Kentucky', type: 'kentucky', key: 'kentucky' },
  { label: 'Louisiana', type: 'louisiana', key: 'louisiana' },
  { label: 'Maine', type: 'maine', key: 'maine' },
  { label: 'Maryland', type: 'maryland', key: 'maryland' },
  { label: 'Massachusetts', type: 'massachusetts', key: 'massachusetts' },
  { label: 'Michigan', type: 'michigan', key: 'michigan' },
  { label: 'Minnesota', type: 'minnesota', key: 'minnesota' },
  { label: 'Mississippi', type: 'mississippi', key: 'mississippi' },
  { label: 'Missouri', type: 'missouri', key: 'missouri' },
  { label: 'Montana', type: 'montana', key: 'montana' },
  { label: 'Nebraska', type: 'nebraska', key: 'nebraska' },
  { label: 'Nevada', type: 'nevada', key: 'nevada' },
  { label: 'New Hampshire', type: 'new_hampshire', key: 'new_hampshire' },
  { label: 'New Jersey', type: 'new_jersey', key: 'new_jersey' },
  { label: 'New Mexico', type: 'new_mexico', key: 'new_mexico' },
  { label: 'New York', type: 'new_york', key: 'new_york' },
  { label: 'North Carolina', type: 'north_carolina', key: 'north_carolina' },
  { label: 'North Dakota', type: 'north_dakota', key: 'north_dakota' },
  { label: 'Ohio', type: 'ohio', key: 'ohio' },
  { label: 'Oklahoma', type: 'oklahoma', key: 'oklahoma' },
  { label: 'Oregon', type: 'oregon', key: 'oregon' },
  { label: 'Pennsylvania', type: 'pennsylvania', key: 'pennsylvania' },
  { label: 'Rhode Island', type: 'rhode_island', key: 'rhode_island' },
  { label: 'South Carolina', type: 'south_carolina', key: 'south_carolina' },
  { label: 'South Dakota', type: 'south_dakota', key: 'south_dakota' },
  { label: 'Tennessee', type: 'tennessee', key: 'tennessee' },
  { label: 'Texas', type: 'texas', key: 'texas' },
  { label: 'Utah', type: 'utah', key: 'utah' },
  { label: 'Vermont', type: 'vermont', key: 'vermont' },
  { label: 'Virginia', type: 'virginia', key: 'virginia' },
  { label: 'Washington', type: 'washington', key: 'washington' },
  { label: 'West Virginia', type: 'west_virginia', key: 'west_virginia' },
  { label: 'Wisconsin', type: 'wisconsin', key: 'wisconsin' },
  { label: 'Wyoming', type: 'wyoming', key: 'wyoming' },
];




const StatesUS = ({ route, navigation }) => {
  const { title } = route.params;
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.users.users);
  const reduxSettings = userInfo?.settings || {};
  const [loading, setLoading] = useState(false);
  const [switchStates, setSwitchStates] = useState([
    STATE_OPTIONS.map(() => false),
    STATE_OPTIONS.map(() => false),
  ]);
  const mapReduxValueToSwitches = reduxValue =>
    STATE_OPTIONS.map(item => item.type === reduxValue);
  // ✅ PRESELECT FROM REDUX
  useEffect(() => {
    const you = reduxSettings?.states_us_you || null;
    const seeking = reduxSettings?.states_us_seeking || null;

    setSwitchStates([
      mapReduxValueToSwitches(you),
      mapReduxValueToSwitches(seeking),
    ]);
  }, [reduxSettings]);

  // const toggleSwitch = (lineIndex, switchIndex) => {
  //   const updated = [...switchStates];

  //   // only ONE selection allowed
  //   updated[lineIndex] = updated[lineIndex].map(
  //     (_, index) => index === switchIndex,
  //   );

  //   setSwitchStates(updated);
  // };
    const toggleSwitch = (lineIndex, switchIndex) => {
    setSwitchStates(prev => {
      const isCurrentlyOn = prev[lineIndex][switchIndex];

      // If already ON → turn everything OFF
      if (isCurrentlyOn) {
        return prev.map((row, i) =>
          i === lineIndex ? row.map(() => false) : row,
        );
      }

      // If OFF → turn this ON and others OFF
      return prev.map((row, i) =>
        i === lineIndex ? row.map((_, idx) => idx === switchIndex) : row,
      );
    });
  };

  const saveData = () => {
    const you =
      STATE_OPTIONS.find((_, i) => switchStates[0][i])?.type || null;
    const seeking =
      STATE_OPTIONS.find((_, i) => switchStates[1][i])?.type || null;

    const payload = {
      states_us_you: you,
      states_us_seeking: seeking,
    };

    console.log('StatesUS Payload 👉', payload);
    handleSubmit({ settings: { ...reduxSettings, ...payload } });
    // dispatch(updateSettings(payload))
  };

  const handleSubmit = values => {
    console.log('Submitted Form Data:', values);
    // Add your API call here
    setLoading(true);
    updateUserInfo(userInfo?.userID, values)
      .then(res => {
        dispatch(updateUser({ ...userInfo, ...values }));
        console.log('resrsrrrrrsrrsrsrsrsrsrrs', res);

        setLoading(false);
        navigation.goBack();
      })
      .catch(error => {
        // const { message } = error;
        setLoading(false);
        dispatch(updateUser({ ...userInfo }));
        showToast({
          title: 'Update Failed',
          text: 'Unable to update user information. Please try again.',
          duration: 2000,
          type: 'error',
        });
      });

    //
  };
  console.log('Selected LoveLanguage Preferences:', reduxSettings);

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <ProfileHeader
        back
        iconColor={Colors.white}
        title={title}
        titleAlight="center"
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
          {/* YOU */}
          <View style={styles.myNumerologyWrapper}>
            <CustomText style={styles.title}>{sectionHeadings[0]}</CustomText>
            {STATE_OPTIONS.map((item, index) => (
              <View key={item.key} style={styles.switchContainer}>
                <CustomText style={styles.switchLabel}>{item.label}</CustomText>
                <Switch
                  value={switchStates[0][index]}
                  onValueChange={() => toggleSwitch(0, index)}
                  circleSize={scale(16)}
                  barHeight={scale(20)}
                  backgroundActive="#77cc5c"
                  backgroundInactive="#3e3e3e"
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchBorderRadius={scale(20)}
                />
              </View>
            ))}
          </View>

          <View style={styles.horizontalDivider} />

          {/* SEEKING */}
          <View style={styles.searchNumerogogyWrapper}>
            <CustomText style={styles.title}>{sectionHeadings[1]}</CustomText>
            {STATE_OPTIONS.map((item, index) => (
              <View key={item.key} style={styles.switchContainer}>
                <CustomText style={styles.switchLabel}>{item.label}</CustomText>
                <Switch
                  value={switchStates[1][index]}
                  onValueChange={() => toggleSwitch(1, index)}
                  circleSize={scale(16)}
                  barHeight={scale(20)}
                  backgroundActive="#77cc5c"
                  backgroundInactive="#3e3e3e"
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchBorderRadius={scale(20)}
                />
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
        <TouchableOpacity style={styles.buttonWrapper} onPress={saveData}>
          <CustomText style={styles.buttonLabel}>Search</CustomText>
        </TouchableOpacity>
      {loading && <TNActivityIndicator />}
    </CustomSafeAreaView>
  );
};

export default StatesUS;
