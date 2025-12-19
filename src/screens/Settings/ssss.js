// import PropTypes from 'prop-types'
// import React, { useState, useCallback, useEffect } from 'react'
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Switch,
//   Alert,
//   Image,
//   ImageBackground,
// } from 'react-native'
// import ActionSheet from 'react-native-actionsheet'
// import { useSelector } from 'react-redux'

// import dynamicStyles from './styles'
// import { useColorScheme } from 'react-native-appearance'
// import { IMLocalized } from '../../../localization/IMLocalization'
// import { ScrollView } from 'react-native-gesture-handler'
// import RangeSlider from 'rn-range-slider'
// import Thumb from '../../../Slider/Thumb'
// import Rail from '../../../Slider/Rail'
// import RailSelected from '../../../Slider/RailSelected'
// import Notch from '../../../Slider/Notch'
// import Label from '../../../Slider/Label'
// import { useIap } from '../../../../Core/inAppPurchase/context'

// function IMFormComponent(props) {
//   const {
//     form,
//     initialValuesDict,
//     onFormChange,
//     onFormButtonPress,
//     appStyles,
//     contactUsPage,
//   } = props
//   const colorScheme = useColorScheme()
//   const styles = dynamicStyles(appStyles, colorScheme)
//   const myPurchaseTypeId = useSelector(
//     state => state.inAppPurchase.subsCribedData[0],
//   )
//   const [alteredFormDict, setAlteredFormDict] = useState({})
//   const [low, setLow] = useState(17)
//   const [high, setHigh] = useState(100)
//   const { setSubscriptionVisible } = useIap()
//   const renderThumb = useCallback(() => <Thumb />, [])
//   const renderRail = useCallback(() => <Rail />, [])
//   const renderRailSelected = useCallback(() => <RailSelected />, [])
//   const renderLabel = useCallback(value => <Label text={value} />, [])
//   const renderNotch = useCallback(() => <Notch />, [])
//   useEffect(() => {
//     if (initialValuesDict?.min) {
//       setLow(initialValuesDict.min)
//     }
//     if (initialValuesDict?.max) {
//       setHigh(initialValuesDict.max)
//     }
//   }, [])
//   const handleValueChange = useCallback((low, high) => {
//     setLow(low)
//     setHigh(high)
//   }, [])
//   const onFormFieldValueChange = (formField, value) => {
//     var newFieldsDict = { ...alteredFormDict }
//     newFieldsDict[formField.key] = value
//     setAlteredFormDict(newFieldsDict)
//     if (!contactUsPage) {
//       onFormChange(newFieldsDict)
//     }
//   }
//   useEffect(() => {
//     setTimeout(() => {
//       const formFieldmin = { key: 'min' }
//       onFormFieldValueChange(formFieldmin, low)
//     }, 300)
//   }, [low])
//   useEffect(() => {
//     setTimeout(() => {
//       const formFieldmax = { key: 'max' }
//       onFormFieldValueChange(formFieldmax, high)
//     }, 300)
//   }, [high])
//   const renderSwitchField = (switchField, index) => {
//     return (
//       <View
//         key={index}
//         style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}>
//         <Text style={styles.text}>{switchField.displayName}</Text>
//         <Switch
//           value={computeValue(switchField)}
//           onValueChange={value => onFormFieldValueChange(switchField, value)}
//           style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
//         />
//       </View>
//     )
//   }
//   const requestUpgrade = displayName => {
//     Alert.alert(
//       IMLocalized('Upgrade account'),
//       IMLocalized(`Upgrade your account now to use ${displayName} filter.`),
//       [
//         {
//           text: IMLocalized('Upgrade Now'),
//           onPress: () => setSubscriptionVisible(true),
//         },
//         {
//           text: IMLocalized('Cancel'),
//         },
//       ],
//       { cancelable: true },
//     )
//   }
//   const renderTextField = (formTextField, index, totalLen) => {
//     return (
//       <View key={index}>
//         <View
//           style={[
//             styles.settingsTypeContainer,
//             styles.appSettingsTypeContainer,
//           ]}>
//           <Text style={styles.text}>{formTextField.displayName}</Text>
//           <TextInput
//             underlineColorAndroid="transparent"
//             style={[styles.text1, { textAlign: 'right' }]}
//             editable={formTextField.editable}
//             onChangeText={text => {
//               onFormFieldValueChange(formTextField, text)
//             }}
//             numberOfLines={1}
//             multiline={true}
//             placeholderTextColor={styles.placeholderTextColor}
//             placeholder={formTextField.placeholder}
//             value={computeValue(formTextField)}
//           />
//         </View>
//         {index < totalLen - 1 && <View style={styles.divider} />}
//       </View>
//     )
//   }

//   const renderButtonField = (buttonField, index) => {
//     return (
//       <TouchableOpacity
//         key={index}
//         onPress={() => onFormButtonPress(buttonField)}
//         style={[styles.settingsTypeContainer, styles.appSettingsSaveContainer]}>
//         <Text style={styles.settingsType}>{buttonField.displayName}</Text>
//       </TouchableOpacity>
//     )
//   }

//   const renderButtonFieldType = (buttonField, index) => {
//     return (
//       <View
//         key={index}
//         // onPress={() => onFormButtonPress(buttonField)}
//         style={[styles.settingsTypeContainer, styles.appSettingsSaveContainer]}>
//         <Text style={styles.settingsType1}>{buttonField.displayName}</Text>
//       </View>
//     )
//   }

//   const onSelectFieldPress = (selectField, ref) => {
//     ref.current.show()
//   }

//   const onActionSheetValueSelected = (selectField, selectedIndex) => {
//     if (
//       (myPurchaseTypeId?.sun_sign == false && selectField.key == 'sun_sign') ||
//       (myPurchaseTypeId == undefined && selectField.key == 'sun_sign') ||
//       (myPurchaseTypeId?.venus_sign == false &&
//         selectField.key == 'venus_sign') ||
//       (myPurchaseTypeId == undefined && selectField.key == 'venus_sign') ||
//       (myPurchaseTypeId?.moon_sign == false &&
//         selectField.key == 'moon_sign') ||
//       (myPurchaseTypeId == undefined && selectField.key == 'moon_sign')
//     ) {
//       requestUpgrade(selectField.displayName)
//     } else if (selectedIndex < selectField.options.length) {
//       const newValue = selectField.options[selectedIndex]
//       onFormFieldValueChange(selectField, newValue)
//     }
//   }

//   const renderSelectField = (selectField, index) => {
//     const actionSheetRef = React.createRef()
//     return (
//       <TouchableOpacity
//         key={index}
//         onPress={() => onSelectFieldPress(selectField, actionSheetRef)}
//         style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}>
//         <Text style={styles.text}>{selectField.displayName}</Text>
//         <Text style={[styles.text1, { textAlign: 'right' }]}>
//           {computeValue(selectField)}
//         </Text>
//         <ActionSheet
//           ref={actionSheetRef}
//           title={selectField.displayName}
//           options={[...selectField.displayOptions, IMLocalized('Cancel')]}
//           cancelButtonIndex={selectField.displayOptions.length}
//           onPress={selectedIndex =>
//             onActionSheetValueSelected(selectField, selectedIndex)
//           }
//         />
//       </TouchableOpacity>
//     )
//   }
//   const renderSelectSignField = (selectField, index) => {
//     const actionSheetRef = React.createRef()
//     // if (
//     //   selectField.key === 'sun_sign' &&
//     //   myPurchaseTypeId === 'vip_access_099_1m'
//     // ) {
//     return (
//       <TouchableOpacity
//         key={index}
//         onPress={() => onSelectFieldPress(selectField, actionSheetRef)}
//         style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}>
//         <Text style={styles.text}>{selectField.displayName}</Text>
//         <Text style={[styles.text1, { textAlign: 'right' }]}>
//           {computeValue(selectField)}
//         </Text>
//         <ActionSheet
//           ref={actionSheetRef}
//           title={selectField.displayName}
//           options={[...selectField.displayOptions, IMLocalized('Cancel')]}
//           cancelButtonIndex={selectField.displayOptions.length}
//           onPress={selectedIndex =>
//             onActionSheetValueSelected(selectField, selectedIndex)
//           }
//         />
//       </TouchableOpacity>
//     )
//     // }
//     // else if (myPurchaseTypeId === 'vip_access_0999_1m') {
//     //   return (
//     //     <TouchableOpacity
//     //       key={index}
//     //       onPress={() => onSelectFieldPress(selectField, actionSheetRef)}
//     //       style={[
//     //         styles.settingsTypeContainer,
//     //         styles.appSettingsTypeContainer,
//     //       ]}>
//     //       <Text style={styles.text}>{selectField.displayName}</Text>
//     //       <Text style={[styles.text1, { textAlign: 'right' }]}>
//     //         {computeValue(selectField)}
//     //       </Text>
//     //       <ActionSheet
//     //         ref={actionSheetRef}
//     //         title={selectField.displayName}
//     //         options={[...selectField.displayOptions, IMLocalized('Cancel')]}
//     //         cancelButtonIndex={selectField.displayOptions.length}
//     //         onPress={selectedIndex =>
//     //           onActionSheetValueSelected(selectField, selectedIndex)
//     //         }
//     //       />
//     //     </TouchableOpacity>
//     //   )
//     // }
//   }
//   const renderAgeSlider = (selectField, index) => {
//     if (selectField.key == 'min') {
//       return (
//         <View>
//           <Text style={styles.text}>{selectField.displayName}</Text>
//           <View style={{ marginHorizontal: 40, justifyContent: 'center' }}>
//             <RangeSlider
//               style={styles.slider}
//               min={17}
//               high={high}
//               low={low}
//               max={100}
//               step={1}
//               floatingLabel
//               renderThumb={renderThumb}
//               renderRail={renderRail}
//               renderRailSelected={renderRailSelected}
//               renderLabel={renderLabel}
//               renderNotch={renderNotch}
//               onValueChanged={handleValueChange}
//             />
//             <View style={styles.sliderboxContainer}>
//               <View style={styles.sliderbox}>
//                 <Text style={styles.text2}>{low}</Text>
//               </View>
//               <View style={styles.sliderbox}>
//                 <Text style={styles.text2}>{high}</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       )
//     }
//   }
//   const myImageFunc = (formfield, index) => {
//     return (
//       <View
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           overflow: 'hidden',
//         }}>
//         <Image source={formfield.source} resizeMode="contain" />
//       </View>
//     )
//   }
//   const renderField = (formField, index, totalLen) => {
//     const type = formField.type
//     if (type == 'text') {
//       return renderTextField(formField, index, totalLen)
//     }
//     if (type == 'buttonType') {
//       return renderButtonFieldType(formField, index, totalLen)
//     }
//     if (type == 'switch') {
//       return renderSwitchField(formField, index)
//     }
//     if (type == 'button') {
//       return renderButtonField(formField, index)
//     }
//     if (type == 'select') {
//       return renderSelectField(formField, index)
//     }
//     if (type == 'signSelect') {
//       return renderSelectSignField(formField, index)
//     }
//     if (type == 'slider') {
//       return renderAgeSlider(formField, index)
//     }
//     if (type == 'image') {
//       return myImageFunc(formField, index)
//     }
//     return null
//   }

//   const renderSection = section => {
//     return (
//       // <ImageBackground source={colorScheme == 'dark' ? require('../../../../../assets/images/bg.png') : require('../../../../../assets/test/12.jpg')} resizeMode="cover" style={{
//       //   flex: 1,
//       //   // justifyContent: "center"
//       // }}>
//       <View key={section.title}>
//         <View style={styles.settingsTitleContainer}>
//           <Text style={styles.settingsTitle}>{section.title}</Text>
//         </View>
//         <View style={styles.contentContainer}>
//           {section.fields.map((field, index) =>
//             renderField(field, index, section.fields.length),
//           )}
//         </View>
//       </View>
//       // </ImageBackground>
//     )
//   }

//   const displayValue = (field, value) => {
//     if (!field.displayOptions || !field.options) {
//       return value
//     }
//     for (var i = 0; i < field.options.length; ++i) {
//       if (i < field.displayOptions.length && field.options[i] == value) {
//         return field.displayOptions[i]
//       }
//     }
//     return value
//   }

//   const computeValue = field => {
//     if (alteredFormDict[field.key] != null) {
//       return displayValue(field, alteredFormDict[field.key])
//     }
//     if (initialValuesDict[field.key] != null) {
//       return displayValue(field, initialValuesDict[field.key])
//     }
//     return displayValue(field, field.value)
//   }

//   return (
//     <ScrollView style={{ marginBottom: 40 }}>
//       <View style={styles.container}>
//         {form.sections.map(section => renderSection(section))}
//       </View>
//     </ScrollView>
//   )
// }

// IMFormComponent.propTypes = {
//   onFormChange: PropTypes.func,
// }

// export default IMFormComponent

import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { useSelector } from 'react-redux';

import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../../localization/IMLocalization';
import { ScrollView } from 'react-native-gesture-handler';
import RangeSlider from 'rn-range-slider';
import Thumb from '../../../Slider/Thumb';
import Rail from '../../../Slider/Rail';
import RailSelected from '../../../Slider/RailSelected';
import Notch from '../../../Slider/Notch';
import Label from '../../../Slider/Label';
import { useIap } from '../../../../Core/inAppPurchase/context';

function IMFormComponent(props) {
  const {
    form,
    initialValuesDict,
    onFormChange,
    onFormButtonPress,
    appStyles,
    contactUsPage,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const myPurchaseTypeId = useSelector(
    state => state.inAppPurchase.subsCribedData[0],
  );
  const [alteredFormDict, setAlteredFormDict] = useState({});
  const [low, setLow] = useState(17);
  const [high, setHigh] = useState(100);
  const { setSubscriptionVisible } = useIap();
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  useEffect(() => {
    if (initialValuesDict?.min) {
      setLow(initialValuesDict.min);
    }
    if (initialValuesDict?.max) {
      setHigh(initialValuesDict.max);
    }
  }, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const onFormFieldValueChange = (formField, value) => {
    console.log('alteredFormDict', alteredFormDict);
    console.log(formField, 'raamm', value);

    var newFieldsDict = { ...alteredFormDict };
    newFieldsDict[formField.key] = value;
    setAlteredFormDict(newFieldsDict);
    console.log('alteredFormDict...', alteredFormDict);
    if (!contactUsPage) {
      onFormChange(newFieldsDict);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const formFieldmin = { key: 'min' };
      onFormFieldValueChange(formFieldmin, low);
    }, 300);
  }, [low]);
  useEffect(() => {
    setTimeout(() => {
      const formFieldmax = { key: 'max' };
      onFormFieldValueChange(formFieldmax, high);
    }, 300);
  }, [high]);

  const renderSwitchField = (switchField, index) => {
    //console.log(index,"aaa",switchField)
    return (
      <View
        key={index}
        style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}
      >
        <Text style={styles.text}>{switchField.displayName}</Text>
        <Switch
          value={computeValue(switchField)}
          onValueChange={value => onFormFieldValueChange(switchField, value)}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
    );
  };

  // gender select

  const switchFields = [
    { displayName: 'Male' },
    { displayName: 'Female' },
    { displayName: 'Bisexual' },
    { displayName: 'Non-Binary' },
    { displayName: 'Transgender' },
  ];

  const getInitialActiveSwitch = genderField => {
    const initialDisplayName =
      genderField === 'gender_new'
        ? initialValuesDict.gender_new
        : initialValuesDict.gender_preference_new;

    return switchFields.findIndex(
      field => field.displayName === initialDisplayName,
    );
  };

  const handleSwitchChange = (
    index,
    activeSwitch,
    setActiveSwitch,
    genderField,
  ) => {
    if (activeSwitch === index) {
      setActiveSwitch(null);
    } else {
      setActiveSwitch(index);
    }

    console.log('Active switch:', switchFields[index].displayName);

    onFormFieldValueChange(genderField, switchFields[index].displayName);
  };

  const renderSwitchGender = (
    switchField,
    index,
    activeSwitch,
    setActiveSwitch,
    genderField,
  ) => {
    return (
      <View
        key={index}
        style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}
      >
        <Text style={styles.text}>{switchField.displayName}</Text>
        <Switch
          value={activeSwitch === index}
          onValueChange={() =>
            handleSwitchChange(
              index,
              activeSwitch,
              setActiveSwitch,
              genderField,
            )
          }
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
    );
  };

  const ParentComponent = genderField => {
    const [activeSwitch, setActiveSwitch] = useState(null);

    useEffect(() => {
      const initialActive = getInitialActiveSwitch(genderField.key);
      setActiveSwitch(initialActive);
    }, [genderField]);

    return (
      <View style={{ flexDirection: 'column' }}>
        {switchFields.map((switchField, index) =>
          renderSwitchGender(
            switchField,
            index,
            activeSwitch,
            setActiveSwitch,
            genderField,
          ),
        )}
      </View>
    );
  };

  // gender select

  const requestUpgrade = displayName => {
    Alert.alert(
      IMLocalized('Upgrade account'),
      IMLocalized(`Upgrade your account now to use ${displayName} filter.`),
      [
        {
          text: IMLocalized('Upgrade Now'),
          onPress: () => setSubscriptionVisible(true),
        },
        {
          text: IMLocalized('Cancel'),
        },
      ],
      { cancelable: true },
    );
  };
  const renderTextField = (formTextField, index, totalLen) => {
    return (
      <View key={index}>
        <View
          style={[
            styles.settingsTypeContainer,
            styles.appSettingsTypeContainer,
          ]}
        >
          <Text style={styles.text}>{formTextField.displayName}</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[styles.text1, { textAlign: 'right' }]}
            editable={formTextField.editable}
            onChangeText={text => {
              onFormFieldValueChange(formTextField, text);
            }}
            numberOfLines={1}
            multiline={true}
            placeholderTextColor={styles.placeholderTextColor}
            placeholder={formTextField.placeholder}
            value={computeValue(formTextField)}
          />
        </View>
        {index < totalLen - 1 && <View style={styles.divider} />}
      </View>
    );
  };

  const renderButtonField = (buttonField, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onFormButtonPress(buttonField)}
        style={[styles.settingsTypeContainer, styles.appSettingsSaveContainer]}
      >
        <Text style={styles.settingsType}>{buttonField.displayName}</Text>
      </TouchableOpacity>
    );
  };

  const renderButtonFieldType = (buttonField, index) => {
    return (
      <View
        key={index}
        // onPress={() => onFormButtonPress(buttonField)}
        style={[styles.settingsTypeContainer, styles.appSettingsSaveContainer]}
      >
        <Text style={styles.settingsType1}>{buttonField.displayName}</Text>
      </View>
    );
  };

  const onSelectFieldPress = (selectField, ref) => {
    ref.current.show();
  };

  const onActionSheetValueSelected = (selectField, selectedIndex) => {
    if (
      (myPurchaseTypeId?.sun_sign == false && selectField.key == 'sun_sign') ||
      (myPurchaseTypeId == undefined && selectField.key == 'sun_sign') ||
      (myPurchaseTypeId?.venus_sign == false &&
        selectField.key == 'venus_sign') ||
      (myPurchaseTypeId == undefined && selectField.key == 'venus_sign') ||
      (myPurchaseTypeId?.moon_sign == false &&
        selectField.key == 'moon_sign') ||
      (myPurchaseTypeId == undefined && selectField.key == 'moon_sign')
    ) {
      requestUpgrade(selectField.displayName);
    } else if (selectedIndex < selectField.options.length) {
      const newValue = selectField.options[selectedIndex];
      onFormFieldValueChange(selectField, newValue);
    }
  };

  const renderSelectField = (selectField, index) => {
    const actionSheetRef = React.createRef();
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onSelectFieldPress(selectField, actionSheetRef)}
        style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}
      >
        <Text style={styles.text}>{selectField.displayName}</Text>
        <Text style={[styles.text1, { textAlign: 'right' }]}>
          {computeValue(selectField)}
        </Text>
        <ActionSheet
          ref={actionSheetRef}
          title={selectField.displayName}
          options={[...selectField.displayOptions, IMLocalized('Cancel')]}
          cancelButtonIndex={selectField.displayOptions.length}
          onPress={selectedIndex =>
            onActionSheetValueSelected(selectField, selectedIndex)
          }
        />
      </TouchableOpacity>
    );
  };
  const renderSelectSignField = (selectField, index) => {
    const actionSheetRef = React.createRef();
    // if (
    //   selectField.key === 'sun_sign' &&
    //   myPurchaseTypeId === 'vip_access_099_1m'
    // ) {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onSelectFieldPress(selectField, actionSheetRef)}
        style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}
      >
        <Text style={styles.text}>{selectField.displayName}</Text>
        <Text style={[styles.text1, { textAlign: 'right' }]}>
          {computeValue(selectField)}
        </Text>
        <ActionSheet
          ref={actionSheetRef}
          title={selectField.displayName}
          options={[...selectField.displayOptions, IMLocalized('Cancel')]}
          cancelButtonIndex={selectField.displayOptions.length}
          onPress={selectedIndex =>
            onActionSheetValueSelected(selectField, selectedIndex)
          }
        />
      </TouchableOpacity>
    );
    // }
    // else if (myPurchaseTypeId === 'vip_access_0999_1m') {
    //   return (
    //     <TouchableOpacity
    //       key={index}
    //       onPress={() => onSelectFieldPress(selectField, actionSheetRef)}
    //       style={[
    //         styles.settingsTypeContainer,
    //         styles.appSettingsTypeContainer,
    //       ]}>
    //       <Text style={styles.text}>{selectField.displayName}</Text>
    //       <Text style={[styles.text1, { textAlign: 'right' }]}>
    //         {computeValue(selectField)}
    //       </Text>
    //       <ActionSheet
    //         ref={actionSheetRef}
    //         title={selectField.displayName}
    //         options={[...selectField.displayOptions, IMLocalized('Cancel')]}
    //         cancelButtonIndex={selectField.displayOptions.length}
    //         onPress={selectedIndex =>
    //           onActionSheetValueSelected(selectField, selectedIndex)
    //         }
    //       />
    //     </TouchableOpacity>
    //   )
    // }
  };
  const renderAgeSlider = (selectField, index) => {
    if (selectField.key == 'min') {
      return (
        <View>
          <Text style={styles.text}>{selectField.displayName}</Text>
          <View style={{ marginHorizontal: 40, justifyContent: 'center' }}>
            <RangeSlider
              style={styles.slider}
              min={17}
              high={high}
              low={low}
              max={100}
              step={1}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleValueChange}
            />
            <View style={styles.sliderboxContainer}>
              <View style={styles.sliderbox}>
                <Text style={styles.text2}>{low}</Text>
              </View>
              <View style={styles.sliderbox}>
                <Text style={styles.text2}>{high}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };
  const myImageFunc = (formfield, index) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Image source={formfield.source} resizeMode="contain" />
      </View>
    );
  };
  const renderField = (formField, index, totalLen) => {
    const type = formField.type;
    if (type == 'text') {
      return renderTextField(formField, index, totalLen);
    }
    if (type == 'buttonType') {
      return renderButtonFieldType(formField, index, totalLen);
    }
    if (type == 'switch') {
      return renderSwitchField(formField, index);
    }
    if (type == 'switchGender') {
      return ParentComponent(formField, index);
    }
    if (type == 'button') {
      return renderButtonField(formField, index);
    }
    if (type == 'select') {
      return renderSelectField(formField, index);
    }
    if (type == 'signSelect') {
      return renderSelectSignField(formField, index);
    }
    if (type == 'slider') {
      return renderAgeSlider(formField, index);
    }
    if (type == 'image') {
      return myImageFunc(formField, index);
    }
    return null;
  };

  const renderSection = section => {
    return (
      // <ImageBackground source={colorScheme == 'dark' ? require('../../../../../assets/images/bg.png') : require('../../../../../assets/test/12.jpg')} resizeMode="cover" style={{
      //   flex: 1,
      //   // justifyContent: "center"
      // }}>
      <View key={section.title}>
        <View style={styles.settingsTitleContainer}>
          <Text style={styles.settingsTitle}>{section.title}</Text>
        </View>
        <View style={styles.contentContainer}>
          {section.fields.map((field, index) =>
            renderField(field, index, section.fields.length),
          )}
        </View>
      </View>
      // </ImageBackground>
    );
  };

  const displayValue = (field, value) => {
    if (!field.displayOptions || !field.options) {
      return value;
    }
    for (var i = 0; i < field.options.length; ++i) {
      if (i < field.displayOptions.length && field.options[i] == value) {
        return field.displayOptions[i];
      }
    }
    return value;
  };

  const computeValue = field => {
    if (alteredFormDict[field.key] != null) {
      return displayValue(field, alteredFormDict[field.key]);
    }
    if (initialValuesDict[field.key] != null) {
      return displayValue(field, initialValuesDict[field.key]);
    }
    return displayValue(field, field.value);
  };

  return (
    <ScrollView style={{ marginBottom: 40 }}>
      <View style={styles.container}>
        {form.sections.map(section => renderSection(section))}
      </View>
    </ScrollView>
  );
}

IMFormComponent.propTypes = {
  onFormChange: PropTypes.func,
};

export default IMFormComponent;

// import { StyleSheet } from 'react-native'

// const dynamicStyles = (appStyles, colorScheme) => {
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke,
//     },
//     //Profile Settings
//     settingsTitleContainer: {
//       width: '100%',
//       height: 55,
//       justifyContent: 'flex-end',
//     },
//     settingsTitle: {
//       color: appStyles.colorSet[colorScheme].mainSubtextColor,
//       paddingLeft: 10,
//       fontSize: 14,
//       paddingBottom: 6,
//       fontWeight: '500',
//     },
//     settingsTypesContainer: {
//       backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
//     },
//     settingsTypeContainer: {
//       borderBottomColor: appStyles.colorSet[colorScheme].whiteSmoke,
//       borderBottomWidth: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: 50,
//     },
//     settingsType: {
//       color: appStyles.colorSet[colorScheme].mainTextColor,
//       fontSize: 14,
//       fontWeight: '500',
//     },
//     settingsType1: {
//       color: appStyles.colorSet[colorScheme].mainTextColor,
//       fontSize: 14,
//       fontWeight: '500',
//     },
//     //Edit Profile
//     contentContainer: {
//       width: '100%',
//       borderTopWidth: 1,
//       borderBottomWidth: 1,
//       borderColor: appStyles.colorSet[colorScheme].hairlineColor,
//       // backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
//     },
//     divider: {
//       height: 0.5,
//       width: '96%',
//       alignSelf: 'flex-end',
//       backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
//     },
//     text: {
//       fontSize: 14, width: '30%',
//       paddingVertical: 0,
//       color: appStyles.colorSet[colorScheme].mainTextColor,
//     },
//     sliderboxContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: 10
//     },
//     sliderbox: {
//       padding: 5,
//       borderWidth: 1,
//       borderColor: '#d6d6d6'
//     },
//     text1: {
//       fontSize: 14, width: '70%',
//       paddingVertical: 0,
//       color: appStyles.colorSet[colorScheme].mainTextColor,
//     }, text2: {
//       // fontSize: 14, width: '70%',
//       // paddingVertical: 0,
//       color: appStyles.colorSet[colorScheme].mainTextColor,
//     },
//     //app Settings
//     appSettingsTypeContainer: {
//       flexDirection: 'row',
//       borderBottomWidth: 0,
//       justifyContent: 'space-between',
//       paddingHorizontal: 15,
//     },
//     appSettingsSaveContainer: {
//       marginTop: 4,
//       height: 45,
//       backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
//     },
//     placeholderTextColor: {
//       color: appStyles.colorSet[colorScheme].hairlineColor,
//     },
//   })
// }

// export default dynamicStyles
