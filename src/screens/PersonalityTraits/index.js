import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Alert } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import ProfileHeader from '../../components/ProfileHeader';
import { CustomText } from '../../components/global/CustomText';
import Colors from '../../constants/Colors';
import styles from './styles';
import { Switch } from 'react-native-switch';
import { updateUser } from '../../redux/slices/SessionUser';
import { updateUserInfo } from '../../api/firebase/auth';
import { showToast } from '../../components/alerts/Toast/ToastManager';
import TNActivityIndicator from '../../components/TNActivityIndicator';

const PERSONALITY_OPTIONS = [
  { label: 'Openness', type: 'openness', key: 'openness' },
  { label: 'Conscientiousness', type: 'conscientiousness', key: 'conscientiousness' },
  { label: 'Extraversion', type: 'extraversion', key: 'extraversion' },
  { label: 'Agreeableness', type: 'agreeableness', key: 'agreeableness' },
  { label: 'Neuroticism', type: 'neuroticism', key: 'neuroticism' },
  { label: 'Transparency', type: 'transparency', key: 'transparency' },
]
const MAX_SELECTION = 3;

const PersonalityTraits = ({ route, navigation }) => {
  const { title } = route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.users.users);
  const reduxSettings = userInfo?.settings || {};
  const [loading, setLoading] = useState(false);
  const [youSelected, setYouSelected] = useState([]);
  const [seekingSelected, setSeekingSelected] = useState([]);

  /* ---------- PREFILL FROM REDUX ---------- */
  useEffect(() => {
    if (reduxSettings?.personality_traits_you) {
      setYouSelected(reduxSettings.personality_traits_you);
    }
    if (reduxSettings?.personality_traits_seeking) {
      setSeekingSelected(reduxSettings.personality_traits_seeking);
    }
  }, [reduxSettings]);

  /* ---------- TOGGLE LOGIC ---------- */
  const toggleOption = (key, type) => {
    const state = type === 'you' ? youSelected : seekingSelected;
    const setState = type === 'you' ? setYouSelected : setSeekingSelected;

    if (state.includes(key)) {
      setState(state.filter(item => item !== key));
      return;
    }

    if (state.length >= MAX_SELECTION) {
      Alert.alert('Limit Reached', 'You can select maximum 3 options.');
      return;
    }

    setState([...state, key]);
  };

  /* ---------- SEARCH BUTTON ---------- */
  const saveData = () => {
    const payload = {
      personality_traits_you: youSelected,
      personality_traits_seeking: seekingSelected,
    };
    handleSubmit({ settings: { ...reduxSettings, ...payload } });
   
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
  console.log('Selected PersonalityTraits Preferences:', reduxSettings);
  /* ---------- RENDER SWITCH LIST ---------- */
  const renderSection = (title, type, selectedArray) => (
    <View style={styles.myNumerologyWrapper}>
      <CustomText style={styles.title}>{title}</CustomText>

      {PERSONALITY_OPTIONS.map(item => (
        <View key={item.key} style={styles.switchContainer}>
          <CustomText style={styles.switchLabel}>{item.label}</CustomText>

          <Switch
            value={selectedArray.includes(item.key)}
            onValueChange={() => toggleOption(item.key, type)}
            circleSize={scale(16)}
            barHeight={scale(20)}
            backgroundActive={'#77cc5c'}
            backgroundInactive={'#3e3e3e'}
            circleActiveColor={'#f5dd4b'}
            circleInActiveColor={'#f4f3f4'}
            renderActiveText={false}
            renderInActiveText={false}
            switchWidthMultiplier={2.15}
            switchBorderRadius={scale(20)}
          />
        </View>
      ))}
    </View>
  );

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
        contentContainerStyle={styles.ScrollViewWrapper}
      >
        <View style={styles.numerologyWrapper}>
          {renderSection('You', 'you', youSelected)}
          <View style={styles.horizontalDivider} />
          {renderSection('Seeking', 'seeking', seekingSelected)}
        </View>
        <TouchableOpacity style={styles.buttonWrapper} onPress={saveData}>
          <CustomText style={styles.buttonLabel}>Search</CustomText>
        </TouchableOpacity>
      </ScrollView>
         {loading && <TNActivityIndicator />}
    </CustomSafeAreaView>
  );
};

export default PersonalityTraits;
