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

const RELIGION_OPTIONS = [
  { label: 'Christianity', type: 'christianity', key: 'christianity' },
  { label: 'Muslim', type: 'muslim', key: 'muslim' },
  { label: 'Hinduism', type: 'hinduism', key: 'hinduism' },
  { label: 'Buddhism', type: 'buddhism', key: 'buddhism' },
  { label: 'Judaism', type: 'judaism', key: 'judaism' },
  { label: "Jehovah's Witnesses", type: 'jehovahs_witnesses', key: 'jehovahs_witnesses' },
  { label: 'Catholicism', type: 'catholicism', key: 'catholicism' },
  { label: 'Methodist', type: 'methodist', key: 'methodist' },
  { label: 'Baptist', type: 'baptist', key: 'baptist' },
  { label: 'Pentecostal', type: 'pentecostal', key: 'pentecostal' },
  { label: 'Other', type: 'other', key: 'other' },
];


const Religion = ({ route, navigation }) => {
  const { title } = route.params;
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.users.users);
  const reduxSettings = userInfo?.settings || {};
  const [loading, setLoading] = useState(false);
  const [switchStates, setSwitchStates] = useState([
    RELIGION_OPTIONS.map(() => false),
    RELIGION_OPTIONS.map(() => false),
  ]);
  const mapReduxValueToSwitches = reduxValue =>
    RELIGION_OPTIONS.map(item => item.type === reduxValue);
  // ✅ PRESELECT FROM REDUX
  useEffect(() => {
    const you = reduxSettings?.religion_you || null;
    const seeking = reduxSettings?.religion_seeking || null;

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
      RELIGION_OPTIONS.find((_, i) => switchStates[0][i])?.type || null;
    const seeking =
      RELIGION_OPTIONS.find((_, i) => switchStates[1][i])?.type || null;

    const payload = {
      religion_you: you,
      religion_seeking: seeking,
    };

    console.log('Religion Payload 👉', payload);
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
            {RELIGION_OPTIONS.map((item, index) => (
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
            {RELIGION_OPTIONS.map((item, index) => (
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

        <TouchableOpacity style={styles.buttonWrapper} onPress={saveData}>
          <CustomText style={styles.buttonLabel}>Search</CustomText>
        </TouchableOpacity>
      </ScrollView>
      {loading && <TNActivityIndicator />}
    </CustomSafeAreaView>
  );
};

export default Religion;
