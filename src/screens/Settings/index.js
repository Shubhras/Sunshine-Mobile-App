import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { CustomText } from '../../components/global/CustomText';
import ProfileHeader from '../../components/ProfileHeader';
import Colors from '../../constants/Colors';
import DatingConfig from '../../data/DatingConfig';
import RangeSlider from 'rn-range-slider';
import { Switch } from 'react-native-switch';
import styles from './styles';
import ActionSheet from 'react-native-actions-sheet';
import SelectionList from '../../components/radios/SelectionList';

const settingField = DatingConfig.userSettingsFields.sections;

const Settings = ({ route }) => {
  const { title } = route.params;
  const actionSheetRefs = useRef({});
  const [switchStates, setSwitchStates] = useState({});
  const [selectStates, setSelectStates] = useState({});
  const [genderStates, setGenderStates] = useState({});
  const [low, setLow] = useState(18);
  const [high, setHigh] = useState(40);

  const switchFields = [
    { displayName: 'Male' },
    { displayName: 'Female' },
    { displayName: 'Bisexual' },
    { displayName: 'Non-Binary' },
    { displayName: 'Transgender' },
  ];

  const handleSwitchChange = (key, value) => {
    setSwitchStates(prev => ({
      ...prev,
      [key]: value,
    }));
    console.log(`${key} changed to:`, value);
  };

  const handleGenderSwitchChange = (genderKey, index) => {
    setGenderStates(prev => ({
      ...prev,
      [genderKey]: index,
    }));
    console.log(`${genderKey} changed to:`, switchFields[index].displayName);
  };

  const onSelectOption = (field, value) => {
    setSelectStates(prev => ({
      ...prev,
      [field.key]: value,
    }));

    const ref = actionSheetRefs.current[field.key];
    ref?.current?.hide();
  };

  const displayValue = (field, value) => {
    if (!field.displayOptions || !field.options) {
      return value;
    }
    for (let i = 0; i < field.options.length; i++) {
      if (i < field.displayOptions.length && field.options[i] === value) {
        return field.displayOptions[i];
      }
    }
    return value;
  };

  const computeValue = field => {
    if (selectStates[field.key] != null) {
      return displayValue(field, selectStates[field.key]);
    }
    return displayValue(field, field.value);
  };

  const handleValueChange = useCallback((newLow, newHigh) => {
    setLow(newLow);
    setHigh(newHigh);
    console.log('Age range changed:', newLow, '-', newHigh);
  }, []);

  const getAllFormData = () => {
    const formData = {
      switches: { ...switchStates },
      selects: { ...selectStates },
      genders: {},
      ageRange: { min: low, max: high },
    };

    // Convert gender indices to display names
    Object.keys(genderStates).forEach(key => {
      const index = genderStates[key];
      formData.genders[key] = switchFields[index]?.displayName || null;
    });

    return formData;
  };

  const onFormButtonPress = () => {
    const allData = getAllFormData();
    console.log('=== ALL FORM DATA ===');
    console.log('Switches:', allData.switches);
    console.log('Selects:', allData.selects);
    console.log('Genders:', allData.genders);
    console.log('Age Range:', allData.ageRange);
    console.log('===================');

    // You can now use this data to save or submit to API
    // Example: saveSettings(allData);
  };

  const renderSwitchField = (switchField, index) => {
    const currentValue = switchStates[switchField.key] ?? switchField.value;
    return (
      <View
        key={`switch-${switchField.key}-${index}`}
        style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}
      >
        <CustomText style={styles.inputTitle}>
          {switchField.displayName}
        </CustomText>
        <View style={styles.textinputWrapper}>
          <Switch
            value={currentValue}
            onValueChange={val => handleSwitchChange(switchField.key, val)}
            disabled={!switchField.editable}
            activeText={''}
            inActiveText={''}
            circleSize={scale(18)}
            barHeight={scale(23)}
            circleBorderWidth={0}
            backgroundActive={Colors.onlineMarkColor}
            backgroundInactive={'#3e3e3e'}
            circleActiveColor={Colors.white}
            circleInActiveColor={Colors.white}
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
      </View>
    );
  };

  const renderSelectField = (field, index) => {
    if (!actionSheetRefs.current[field.key]) {
      actionSheetRefs.current[field.key] = React.createRef();
    }
    const ref = actionSheetRefs.current[field.key];

    return (
      <View key={`select-${field.key}-${index}`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => ref.current?.show()}
          style={[
            styles.settingsTypeContainer,
            styles.appSettingsTypeContainer,
          ]}
        >
          <CustomText style={styles.inputTitle}>{field.displayName}</CustomText>
          <View style={styles.textinputWrapper}>
            <CustomText style={styles.selectValueText}>
              {computeValue(field)}
            </CustomText>
          </View>
        </TouchableOpacity>

        <ActionSheet
          ref={ref}
          gestureEnabled
          headerAlwaysVisible
          containerStyle={styles.sheetContainer}
          indicatorStyle={styles.indicator}
          closeOnTouchBackdrop
        >
          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <CustomText style={styles.sheetTitle}>
                {field.displayName}
              </CustomText>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.optionsList}
            >
              {field.displayOptions.map((item, idx) => {
                const value = field.options[idx];
                const isSelected =
                  (selectStates[field.key] ?? field.value) === value;

                return (
                  <View
                    key={`${field.key}-option-${idx}`}
                    style={[
                      idx === 0 && styles.languageComponentWrapperWithMarginTop,
                      styles.languageComponentWrapper,
                    ]}
                  >
                    <SelectionList
                      backgroundColor={Colors.secondary}
                      label={item}
                      labelColor={Colors.black}
                      uncheckedRadioBackgroundColor={Colors.white}
                      checkedRadioBackgroundColor={Colors.onlineMarkColor}
                      checkIconColor={Colors.white}
                      isSelected={isSelected}
                      onPress={() => onSelectOption(field, value)}
                    />
                  </View>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => ref.current?.hide()}
              style={styles.cancelButton}
            >
              <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
            </TouchableOpacity>
          </View>
        </ActionSheet>
      </View>
    );
  };

  const renderSelectSignField = (field, index) => {
    if (!actionSheetRefs.current[field.key]) {
      actionSheetRefs.current[field.key] = React.createRef();
    }
    const ref = actionSheetRefs.current[field.key];

    return (
      <View key={`sign-select-${field.key}-${index}`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => ref.current?.show()}
          style={[
            styles.settingsTypeContainer,
            styles.appSettingsTypeContainer,
          ]}
        >
          <CustomText style={styles.inputTitle}>{field.displayName}</CustomText>
          <View style={styles.textinputWrapper}>
            <CustomText style={styles.selectValueText}>
              {computeValue(field)}
            </CustomText>
          </View>
        </TouchableOpacity>

        <ActionSheet
          ref={ref}
          gestureEnabled
          headerAlwaysVisible
          containerStyle={styles.sheetContainer}
          indicatorStyle={styles.indicator}
          closeOnTouchBackdrop
        >
          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <CustomText style={styles.sheetTitle}>
                {field.displayName}
              </CustomText>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.optionsList}
            >
              {field.displayOptions.map((item, idx) => {
                const value = field.options[idx];
                const isSelected =
                  (selectStates[field.key] ?? field.value) === value;

                return (
                  <View
                    key={`${field.key}-sign-option-${idx}`}
                    style={[
                      idx === 0 && styles.languageComponentWrapperWithMarginTop,
                      styles.languageComponentWrapper,
                    ]}
                  >
                    <SelectionList
                      backgroundColor={Colors.secondary}
                      label={item}
                      labelColor={Colors.black}
                      uncheckedRadioBackgroundColor={Colors.white}
                      checkedRadioBackgroundColor={Colors.onlineMarkColor}
                      checkIconColor={Colors.white}
                      isSelected={isSelected}
                      onPress={() => onSelectOption(field, value)}
                    />
                  </View>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => ref.current?.hide()}
              style={styles.cancelButton}
            >
              <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
            </TouchableOpacity>
          </View>
        </ActionSheet>
      </View>
    );
  };

  const renderGenderSwitches = (genderField, fieldIndex) => {
    const activeIndex = genderStates[genderField.key] ?? 0;

    return (
      <View key={`gender-group-${genderField.key}-${fieldIndex}`}>
        {switchFields.map((switchField, idx) => (
          <View
            key={`gender-switch-${genderField.key}-${idx}`}
            style={[
              styles.settingsTypeContainer,
              styles.appSettingsTypeContainer,
            ]}
          >
            <CustomText style={styles.inputTitle}>
              {switchField.displayName}
            </CustomText>
            <View style={styles.textinputWrapper}>
              <Switch
                value={activeIndex === idx}
                onValueChange={() => {
                  handleGenderSwitchChange(genderField.key, idx);
                }}
                disabled={!genderField.editable}
                activeText={''}
                inActiveText={''}
                circleSize={scale(18)}
                barHeight={scale(23)}
                circleBorderWidth={0}
                backgroundActive={Colors.onlineMarkColor}
                backgroundInactive={'#2C2D2D'}
                circleActiveColor={Colors.white}
                circleInActiveColor={Colors.white}
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
          </View>
        ))}
      </View>
    );
  };

  const renderAgeSlider = (selectField, index) => {
    // Only render the slider once when we hit the 'min' field
    if (selectField.key !== 'min') {
      return null;
    }

    return (
      <View key={`age-slide-${index}`}>
        <View style={styles.rangeSliderWrapper}>
          <RangeSlider
            style={styles.slider}
            min={17}
            max={100}
            step={1}
            initialLowValue={low}
            initialHighValue={high}
            thumbRadius={scale(10)}
            thumbBorderWidth={scale(2)}
            thumbColor={Colors.white}
            thumbBorderColor={Colors.primary}
            lineWidth={4}
            selectionColor={Colors.primary}
            blankColor="#e0e0e0"
            labelStyle="bubble"
            labelBackgroundColor={Colors.primary}
            labelBorderColor={Colors.primary}
            labelTextColor={Colors.white}
            textSize={14}
            labelBorderRadius={4}
            labelPadding={4}
            floatingLabel
            onValueChanged={handleValueChange}
          />
          <View style={styles.sliderboxContainer}>
            <View style={styles.sliderbox}>
              <CustomText style={styles.boxLable}>{low}</CustomText>
            </View>
            <View style={styles.sliderbox}>
              <CustomText style={styles.boxLable}>{high}</CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderButtonField = (buttonField, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={`button-${buttonField.key}-${index}`}
        onPress={onFormButtonPress}
        style={styles.saveButtonWrapper}
      >
        <CustomText style={styles.saveBtnLable}>
          {buttonField.displayName}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const renderField = (formField, index) => {
    const type = formField.type;

    if (type === 'switch') {
      return renderSwitchField(formField, index);
    }
    if (type === 'select') {
      return renderSelectField(formField, index);
    }
    if (type === 'signSelect') {
      return renderSelectSignField(formField, index);
    }
    if (type === 'switchGender') {
      return renderGenderSwitches(formField, index);
    }
    if (type === 'slider') {
      return renderAgeSlider(formField, index);
    }
    if (type === 'button') {
      return renderButtonField(formField, index);
    }
    return null;
  };

  const renderSection = (section, sectionIndex) => {
    return (
      <View key={`section-${sectionIndex}`}>
        {section.title ? (
          <View style={styles.settingsTitleContainer}>
            <CustomText style={styles.settingsTitle}>
              {section.title}
            </CustomText>
          </View>
        ) : null}
        <View style={styles.contentContainer}>
          {section.fields.map((field, fieldIndex) =>
            renderField(field, fieldIndex),
          )}
        </View>
      </View>
    );
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
        {settingField.map((section, index) => renderSection(section, index))}
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default Settings;
