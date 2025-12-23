// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
// import { scale } from 'react-native-size-matters';
// import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
// import { CustomText } from '../../components/global/CustomText';
// import ProfileHeader from '../../components/ProfileHeader';
// import Colors from '../../constants/Colors';
// import DatingConfig from '../../data/DatingConfig';
// import RangeSlider from 'rn-range-slider';
// import { Switch } from 'react-native-switch';
// import styles from './styles';
// import ActionSheet from 'react-native-actions-sheet';
// import SelectionList from '../../components/radios/SelectionList';
// import Icons from '../../components/Icons/Icons';
// import { useDispatch, useSelector } from 'react-redux';

// const settingField = DatingConfig.userSettingsFields.sections;

// const Settings = ({ route, navigation }) => {
//   const { title } = route.params;
//     const userInfo = useSelector(state => state.users.users);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   console.log('userInfouserInfouserInfo', userInfo);

//   const actionSheetRefs = useRef({});
//   const [switchStates, setSwitchStates] = useState({});
//   const [selectStates, setSelectStates] = useState({});
//   const [genderStates, setGenderStates] = useState({});
//   const [low, setLow] = useState(userInfo?.min ?? 18);
//   const [high, setHigh] = useState(userInfo?.max ?? 100);

//   //   useEffect(() => {
//   //   if (settingField?.) {
//   //     setLow(initialValuesDict.min)
//   //   }
//   //   if (initialValuesDict?.max) {
//   //     setHigh(initialValuesDict.max)
//   //   }
//   // }, [])

//   const switchFields = [
//     { displayName: 'Male' },
//     { displayName: 'Female' },
//     { displayName: 'Bisexual' },
//     { displayName: 'Non-Binary' },
//     { displayName: 'Transgender' },
//   ];

//   const handleSwitchChange = (key, value) => {
//     setSwitchStates(prev => ({
//       ...prev,
//       [key]: value,
//     }));
//     console.log(`${key} changed to:`, value);
//   };

//   const handleGenderSwitchChange = (genderKey, index) => {
//     setGenderStates(prev => ({
//       ...prev,
//       [genderKey]: index,
//     }));
//     console.log(`${genderKey} changed to:`, switchFields[index].displayName);
//   };

//   const onSelectOption = (field, value) => {
//     setSelectStates(prev => ({
//       ...prev,
//       [field.key]: value,
//     }));

//     const ref = actionSheetRefs.current[field.key];
//     ref?.current?.hide();
//   };

//   const displayValue = (field, value) => {
//     if (!field.displayOptions || !field.options) {
//       return value;
//     }
//     for (let i = 0; i < field.options.length; i++) {
//       if (i < field.displayOptions.length && field.options[i] === value) {
//         return field.displayOptions[i];
//       }
//     }
//     return value;
//   };

//   const computeValue = field => {
//     if (selectStates[field.key] != null) {
//       return displayValue(field, selectStates[field.key]);
//     }
//     return displayValue(field, field.value);
//   };

//   const handleValueChange = useCallback((newLow, newHigh) => {
//     setLow(newLow);
//     setHigh(newHigh);
//     console.log('Age range changed:', newLow, '-', newHigh);
//   }, []);

//   const getAllFormData = () => {
//     const formData = {
//       switches: { ...switchStates },
//       selects: { ...selectStates },
//       genders: {},
//       ageRange: { min: low, max: high },
//     };

//     // Convert gender indices to display names
//     Object.keys(genderStates).forEach(key => {
//       const index = genderStates[key];
//       formData.genders[key] = switchFields[index]?.displayName || null;
//     });

//     return formData;
//   };

//   const onFormButtonPress = () => {
//     const allData = getAllFormData();
//     console.log('=== ALL FORM DATA ===');
//     console.log('Switches:', allData.switches);
//     console.log('Selects:', allData.selects);
//     console.log('Genders:', allData.genders);
//     console.log('Age Range:', allData.ageRange);
//     console.log('===================',allData);

//     // You can now use this data to save or submit to API
//     // Example: saveSettings(allData);
//   };

//   const renderSwitchField = (switchField, index) => {
//     const currentValue = switchStates[switchField.key] ?? switchField.value;
//     return (
//       <View
//         key={`switch-${switchField.key}-${index}`}
//         style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}
//       >
//         <CustomText style={styles.inputTitle}>
//           {switchField.displayName}
//         </CustomText>
//         <View style={styles.textinputWrapper}>
//           <Switch
//             value={currentValue}
//             onValueChange={val => handleSwitchChange(switchField.key, val)}
//             disabled={!switchField.editable}
//             activeText={''}
//             inActiveText={''}
//             circleSize={scale(18)}
//             barHeight={scale(23)}
//             circleBorderWidth={0}
//             backgroundActive={Colors.onlineMarkColor}
//             backgroundInactive={'#3e3e3e'}
//             circleActiveColor={Colors.white}
//             circleInActiveColor={Colors.white}
//             changeValueImmediately={true}
//             innerCircleStyle={{
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//             outerCircleStyle={{}}
//             renderActiveText={false}
//             renderInActiveText={false}
//             switchLeftPx={2.2}
//             switchRightPx={2.2}
//             switchWidthMultiplier={2.15}
//             switchBorderRadius={scale(20)}
//           />
//         </View>
//       </View>
//     );
//   };

//   const renderSelectField = (field, index) => {
//     if (!actionSheetRefs.current[field.key]) {
//       actionSheetRefs.current[field.key] = React.createRef();
//     }
//     const ref = actionSheetRefs.current[field.key];

//     return (
//       <View key={`select-${field.key}-${index}`}>
//         <TouchableOpacity
//           activeOpacity={0.7}
//           onPress={() => ref.current?.show()}
//           style={[
//             styles.settingsTypeContainer,
//             styles.appSettingsTypeContainer,
//           ]}
//         >
//           <CustomText style={styles.inputTitle}>{field.displayName}</CustomText>
//           <View style={styles.textinputWrapper}>
//             <CustomText style={styles.selectValueText}>
//               {computeValue(field)}
//             </CustomText>
//           </View>
//         </TouchableOpacity>

//         <ActionSheet
//           ref={ref}
//           gestureEnabled
//           headerAlwaysVisible
//           containerStyle={styles.sheetContainer}
//           indicatorStyle={styles.indicator}
//           closeOnTouchBackdrop
//         >
//           <View style={styles.sheetContent}>
//             <View style={styles.sheetHeader}>
//               <CustomText style={styles.sheetTitle}>
//                 {field.displayName}
//               </CustomText>
//             </View>

//             <ScrollView
//               showsVerticalScrollIndicator={false}
//               style={styles.optionsList}
//             >
//               {field.displayOptions.map((item, idx) => {
//                 const value = field.options[idx];
//                 const isSelected =
//                   (selectStates[field.key] ?? field.value) === value;

//                 return (
//                   <View
//                     key={`${field.key}-option-${idx}`}
//                     style={[
//                       idx === 0 && styles.languageComponentWrapperWithMarginTop,
//                       styles.languageComponentWrapper,
//                     ]}
//                   >
//                     <SelectionList
//                       backgroundColor={Colors.secondary}
//                       label={item}
//                       labelColor={Colors.black}
//                       uncheckedRadioBackgroundColor={Colors.white}
//                       checkedRadioBackgroundColor={Colors.onlineMarkColor}
//                       checkIconColor={Colors.white}
//                       isSelected={isSelected}
//                       onPress={() => onSelectOption(field, value)}
//                     />
//                   </View>
//                 );
//               })}
//             </ScrollView>

//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => ref.current?.hide()}
//               style={styles.cancelButton}
//             >
//               <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
//             </TouchableOpacity>
//           </View>
//         </ActionSheet>
//       </View>
//     );
//   };

//   const renderSelectSignField = (field, index) => {

//     if (!actionSheetRefs.current[field.key]) {
//       actionSheetRefs.current[field.key] = React.createRef();
//     }
//     const ref = actionSheetRefs.current[field.key];
//     return (
//       <View key={`sign-select-${field.key}-${index}`}>
//         <Pressable
//           style={styles.link}
//           onPress={() => {
//             if (field?.sheet) {
//               ref.current?.show();
//             } else {
//               navigation.navigate(field?.navigation, {
//                 title: field?.title,
//               });
//             }
//           }}
//         >
//           <CustomText style={[styles.label, { color: Colors.mainTextColor }]}>
//             {field.displayName}
//           </CustomText>
//           {field?.sheet ? (
//             <View style={styles.textinputWrapper}>
//               <CustomText style={styles.selectValueText}>
//                 {computeValue(field)}
//               </CustomText>
//             </View>
//           ) : (
//             <View style={styles.leftIconWrapper}>
//               <Icons
//                 iconType={'Feather'}
//                 name="chevron-right"
//                 size={scale(14)}
//                 color={Colors.white}
//               />
//             </View>
//           )}
//         </Pressable>
//         <ActionSheet
//           ref={ref}
//           gestureEnabled
//           headerAlwaysVisible
//           containerStyle={styles.sheetContainer}
//           indicatorStyle={styles.indicator}
//           closeOnTouchBackdrop
//         >
//           <View style={styles.sheetContent}>
//             <View style={styles.sheetHeader}>
//               <CustomText style={styles.sheetTitle}>
//                 {field.displayName}
//               </CustomText>
//             </View>

//             {Array.isArray(field.displayOptions) && (
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 style={styles.optionsList}
//               >
//                 {field.displayOptions.map((item, idx) => {
//                   const value = field.options?.[idx];
//                   const isSelected =
//                     (selectStates[field.key] ?? field.value) === value;

//                   return (
//                     <View
//                       key={`${field.key}-sign-option-${idx}`}
//                       style={[
//                         idx === 0 &&
//                           styles.languageComponentWrapperWithMarginTop,
//                         styles.languageComponentWrapper,
//                       ]}
//                     >
//                       <SelectionList
//                         backgroundColor={Colors.secondary}
//                         label={item}
//                         labelColor={Colors.black}
//                         uncheckedRadioBackgroundColor={Colors.white}
//                         checkedRadioBackgroundColor={Colors.onlineMarkColor}
//                         checkIconColor={Colors.white}
//                         isSelected={isSelected}
//                         onPress={() => onSelectOption(field, value)}
//                       />
//                     </View>
//                   );
//                 })}
//               </ScrollView>
//             )}

//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => ref.current?.hide()}
//               style={styles.cancelButton}
//             >
//               <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
//             </TouchableOpacity>
//           </View>
//         </ActionSheet>
//       </View>
//     );
//   };

//   // const renderSelectSignField = (field, index) => {
//   //   if (!actionSheetRefs.current[field.key]) {
//   //     actionSheetRefs.current[field.key] = React.createRef();
//   //   }
//   //   const ref = actionSheetRefs.current[field.key];

//   //   return (
//   //     <View key={`sign-select-${field.key}-${index}`}>
//   //       <TouchableOpacity
//   //         activeOpacity={0.7}
//   //         onPress={() => ref.current?.show()}
//   //         style={[
//   //           styles.settingsTypeContainer,
//   //           styles.appSettingsTypeContainer,
//   //         ]}
//   //       >
//   //         <CustomText style={styles.inputTitle}>{field.displayName}</CustomText>
//   //         <View style={styles.textinputWrapper}>
//   //           <CustomText style={styles.selectValueText}>
//   //             {computeValue(field)}
//   //           </CustomText>
//   //         </View>
//   //       </TouchableOpacity>

//   //       <ActionSheet
//   //         ref={ref}
//   //         gestureEnabled
//   //         headerAlwaysVisible
//   //         containerStyle={styles.sheetContainer}
//   //         indicatorStyle={styles.indicator}
//   //         closeOnTouchBackdrop
//   //       >
//   //         <View style={styles.sheetContent}>
//   //           <View style={styles.sheetHeader}>
//   //             <CustomText style={styles.sheetTitle}>
//   //               {field.displayName}
//   //             </CustomText>
//   //           </View>

//   //           <ScrollView
//   //             showsVerticalScrollIndicator={false}
//   //             style={styles.optionsList}
//   //           >
//   //             {field.displayOptions.map((item, idx) => {
//   //               const value = field.options[idx];
//   //               const isSelected =
//   //                 (selectStates[field.key] ?? field.value) === value;

//   //               return (
//   //                 <View
//   //                   key={`${field.key}-sign-option-${idx}`}
//   //                   style={[
//   //                     idx === 0 && styles.languageComponentWrapperWithMarginTop,
//   //                     styles.languageComponentWrapper,
//   //                   ]}
//   //                 >
//   //                   <SelectionList
//   //                     backgroundColor={Colors.secondary}
//   //                     label={item}
//   //                     labelColor={Colors.black}
//   //                     uncheckedRadioBackgroundColor={Colors.white}
//   //                     checkedRadioBackgroundColor={Colors.onlineMarkColor}
//   //                     checkIconColor={Colors.white}
//   //                     isSelected={isSelected}
//   //                     onPress={() => onSelectOption(field, value)}
//   //                   />
//   //                 </View>
//   //               );
//   //             })}
//   //           </ScrollView>

//   //           <TouchableOpacity
//   //             activeOpacity={0.8}
//   //             onPress={() => ref.current?.hide()}
//   //             style={styles.cancelButton}
//   //           >
//   //             <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
//   //           </TouchableOpacity>
//   //         </View>
//   //       </ActionSheet>
//   //     </View>
//   //   );
//   // };

//   const renderGenderSwitches = (genderField, fieldIndex) => {
//     const activeIndex = genderStates[genderField.key] ?? 0;

//     return (
//       <View key={`gender-group-${genderField.key}-${fieldIndex}`}>
//         {switchFields.map((switchField, idx) => (
//           <View
//             key={`gender-switch-${genderField.key}-${idx}`}
//             style={[
//               styles.settingsTypeContainer,
//               styles.appSettingsTypeContainer,
//             ]}
//           >
//             <CustomText style={styles.inputTitle}>
//               {switchField.displayName}
//             </CustomText>
//             <View style={styles.textinputWrapper}>
//               <Switch
//                 value={activeIndex === idx}
//                 onValueChange={() => {
//                   handleGenderSwitchChange(genderField.key, idx);
//                 }}
//                 disabled={!genderField.editable}
//                 activeText={''}
//                 inActiveText={''}
//                 circleSize={scale(18)}
//                 barHeight={scale(23)}
//                 circleBorderWidth={0}
//                 backgroundActive={Colors.onlineMarkColor}
//                 backgroundInactive={'#2C2D2D'}
//                 circleActiveColor={Colors.white}
//                 circleInActiveColor={Colors.white}
//                 changeValueImmediately={true}
//                 innerCircleStyle={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//                 outerCircleStyle={{}}
//                 renderActiveText={false}
//                 renderInActiveText={false}
//                 switchLeftPx={2.2}
//                 switchRightPx={2.2}
//                 switchWidthMultiplier={2.15}
//                 switchBorderRadius={scale(20)}
//               />
//             </View>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   const renderAgeSlider = (selectField, index) => {
//     // Only render the slider once when we hit the 'min' field
//     if (selectField.key !== 'min') {
//       return null;
//     }

//     return (
//       <View key={`age-slide-${index}`}>
//         <View style={styles.rangeSliderWrapper}>
//           <RangeSlider
//             style={styles.slider}
//             min={17}
//             max={100}
//             step={1}
//             initialLowValue={low}
//             initialHighValue={high}
//             thumbRadius={scale(10)}
//             thumbBorderWidth={scale(2)}
//             thumbColor={Colors.white}
//             thumbBorderColor={Colors.primary}
//             lineWidth={4}
//             selectionColor={Colors.primary}
//             blankColor="#e0e0e0"
//             labelStyle="bubble"
//             labelBackgroundColor={Colors.primary}
//             labelBorderColor={Colors.primary}
//             labelTextColor={Colors.white}
//             textSize={14}
//             labelBorderRadius={4}
//             labelPadding={4}
//             floatingLabel
//             onValueChanged={handleValueChange}
//           />
//           <View style={styles.sliderboxContainer}>
//             <View style={styles.sliderbox}>
//               <CustomText style={styles.boxLable}>{low}</CustomText>
//             </View>
//             <View style={styles.sliderbox}>
//               <CustomText style={styles.boxLable}>{high}</CustomText>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const renderButtonField = (buttonField, index) => {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.7}
//         key={`button-${buttonField.key}-${index}`}
//         onPress={onFormButtonPress}
//         style={styles.saveButtonWrapper}
//       >
//         <CustomText style={styles.saveBtnLable}>
//           {buttonField.displayName}
//         </CustomText>
//       </TouchableOpacity>
//     );
//   };

//   const renderField = (formField, index) => {
//     const type = formField.type;

//     if (type === 'switch') {
//       return renderSwitchField(formField, index);
//     }
//     if (type === 'select') {
//       return renderSelectField(formField, index);
//     }
//     if (type === 'signSelect') {
//       return renderSelectSignField(formField, index);
//     }
//     if (type === 'switchGender') {
//       return renderGenderSwitches(formField, index);
//     }
//     if (type === 'slider') {
//       return renderAgeSlider(formField, index);
//     }
//     if (type === 'button') {
//       return renderButtonField(formField, index);
//     }
//     return null;
//   };

//   const renderSection = (section, sectionIndex) => {
//     return (
//       <View key={`section-${sectionIndex}`}>
//         {section.title ? (
//           <View style={styles.settingsTitleContainer}>
//             <CustomText style={styles.settingsTitle}>
//               {section.title}
//             </CustomText>
//           </View>
//         ) : null}
//         <View style={styles.contentContainer}>
//           {section.fields.map((field, fieldIndex) =>
//             renderField(field, fieldIndex),
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <CustomSafeAreaView
//       style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
//     >
//       <ProfileHeader
//         back={true}
//         iconColor={Colors.white}
//         title={title}
//         titleAlight={'center'}
//         titleFontSize={scale(16)}
//         headerBg={Colors.black}
//       />
//       <ScrollView
//         bounces={false}
//         showsVerticalScrollIndicator={false}
//         overScrollMode="never"
//         contentContainerStyle={styles.ScrollViewWrapper}
//       >
//         {settingField.map((section, index) => renderSection(section, index))}
//       </ScrollView>
//     </CustomSafeAreaView>
//   );
// };

// export default Settings;

// // 2nd Attemp
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   Pressable,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { scale } from 'react-native-size-matters';
// import { useDispatch, useSelector } from 'react-redux';

// import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
// import { CustomText } from '../../components/global/CustomText';
// import ProfileHeader from '../../components/ProfileHeader';
// import Colors from '../../constants/Colors';
// import DatingConfig from '../../data/DatingConfig';
// import RangeSlider from 'rn-range-slider';
// import { Switch } from 'react-native-switch';
// import ActionSheet from 'react-native-actions-sheet';
// import SelectionList from '../../components/radios/SelectionList';
// import Icons from '../../components/Icons/Icons';
// import styles from './styles';

// const settingField = DatingConfig.userSettingsFields.sections;

// const switchFields = [
//   { displayName: 'Male' },
//   { displayName: 'Female' },
//   { displayName: 'Bisexual' },
//   { displayName: 'Non-Binary' },
//   { displayName: 'Transgender' },
// ];

// const Settings = ({ route, navigation }) => {
//   const { title } = route.params;

//   const dispatch = useDispatch();
//   const userInfo = useSelector(state => state.users.users);
//   const settingsFromRedux = userInfo?.settings || {};

//   const actionSheetRefs = useRef({});

//   const [switchStates, setSwitchStates] = useState({});
//   const [selectStates, setSelectStates] = useState({});
//   const [genderStates, setGenderStates] = useState({});
//   const [low, setLow] = useState(18);
//   const [high, setHigh] = useState(100);

//   /* ---------------- INIT FROM JSON + REDUX ---------------- */

//   useEffect(() => {
//     const switches = {};
//     const selects = {};
//     const genders = {};

//     settingField.forEach(section => {
//       section.fields.forEach(field => {
//         const reduxValue = settingsFromRedux[field.key];

//         if (field.type === 'switch') {
//           switches[field.key] =
//             reduxValue !== undefined ? reduxValue : false;
//         }

//         if (
//           (field.type === 'select' || field.type === 'signSelect') &&
//           field.key
//         ) {
//           selects[field.key] =
//             reduxValue !== undefined ? reduxValue : field.value ?? null;
//         }

//         if (field.type === 'switchGender') {
//           if (reduxValue) {
//             const index = switchFields.findIndex(
//               g => g.displayName === reduxValue,
//             );
//             genders[field.key] = index >= 0 ? index : 0;
//           } else {
//             genders[field.key] = 0;
//           }
//         }
//       });
//     });

//     setSwitchStates(switches);
//     setSelectStates(selects);
//     setGenderStates(genders);
//     setLow(settingsFromRedux.min ?? 18);
//     setHigh(settingsFromRedux.max ?? 100);
//   }, []);

//   /* ---------------- HANDLERS ---------------- */

//   const handleSwitchChange = (key, value) => {
//     setSwitchStates(prev => ({ ...prev, [key]: value }));
//   };

//   const handleGenderSwitchChange = (key, index) => {
//     setGenderStates(prev => ({ ...prev, [key]: index }));
//   };

//   const onSelectOption = (field, value) => {
//     setSelectStates(prev => ({ ...prev, [field.key]: value }));
//     actionSheetRefs.current[field.key]?.current?.hide();
//   };

//   const handleValueChange = useCallback((l, h) => {
//     setLow(l);
//     setHigh(h);
//   }, []);

//   /* ---------------- HELPERS ---------------- */

//   const displayValue = (field, value) => {
//     if (!field.displayOptions || !field.options) return value;
//     const idx = field.options.indexOf(value);
//     return field.displayOptions[idx] ?? value;
//   };

//   const computeValue = field => {
//     const val = selectStates[field.key] ?? field.value;
//     return displayValue(field, val);
//   };

//   /* ---------------- SAVE PAYLOAD ---------------- */

//   const getFinalPayload = () => {
//     const payload = {};

//     Object.keys(switchStates).forEach(key => {
//       payload[key] = switchStates[key] ?? false;
//     });

//     Object.keys(selectStates).forEach(key => {
//       payload[key] = selectStates[key];
//     });

//     Object.keys(genderStates).forEach(key => {
//       payload[key] =
//         switchFields[genderStates[key]]?.displayName ?? null;
//     });

//     payload.min = low;
//     payload.max = high;

//     return payload;
//   };

//   const onFormButtonPress = () => {
//     const finalData = getFinalPayload();
//     console.log('✅ FINAL SETTINGS DATA', finalData);

//     // dispatch(updateUserSettings(finalData))
//   };

//   /* ---------------- RENDERERS ---------------- */

//   const renderSwitchField = field => (
//     <View key={field.key} style={styles.settingsTypeContainer}>
//       <CustomText style={styles.inputTitle}>{field.displayName}</CustomText>
//       <Switch
//         value={switchStates[field.key]}
//         onValueChange={v => handleSwitchChange(field.key, v)}
//         backgroundActive={Colors.onlineMarkColor}
//         backgroundInactive="#3e3e3e"
//         circleActiveColor={Colors.white}
//         circleInActiveColor={Colors.white}
//       />
//     </View>
//   );

// const renderSelectField = field => {
//   // SAFETY: if no key, no options → navigation only
//   const isSheet =
//     field.sheet === true &&
//     Array.isArray(field.options) &&
//     Array.isArray(field.displayOptions) &&
//     field.key;

//   if (!isSheet) {
//     // Navigation-only signSelect
//     return (
//       <Pressable
//         key={field.displayName}
//         style={styles.link}
//         onPress={() =>
//           navigation.navigate(field.navigation, {
//             title: field.title,
//           })
//         }
//       >
//         <CustomText style={styles.label}>
//           {field.displayName}
//         </CustomText>
//         <Icons
//           iconType="Feather"
//           name="chevron-right"
//           size={scale(14)}
//           color={Colors.white}
//         />
//       </Pressable>
//     );
//   }

//   // Sheet-based signSelect
//   if (!actionSheetRefs.current[field.key]) {
//     actionSheetRefs.current[field.key] = React.createRef();
//   }

//   const ref = actionSheetRefs.current[field.key];

//   return (
//     <View key={field.key}>
//       <Pressable
//         style={styles.link}
//         onPress={() => ref.current?.show()}
//       >
//         <CustomText style={styles.label}>
//           {field.displayName}
//         </CustomText>
//         <CustomText style={styles.selectValueText}>
//           {computeValue(field)}
//         </CustomText>
//       </Pressable>

//       <ActionSheet ref={ref}>
//         <ScrollView>
//           {field.displayOptions.map((item, idx) => {
//             const value = field.options[idx];
//             const isSelected =
//               (selectStates[field.key] ?? field.value) === value;

//             return (
//               <SelectionList
//                 key={item}
//                 label={item}
//                 isSelected={isSelected}
//                 onPress={() => onSelectOption(field, value)}
//               />
//             );
//           })}
//         </ScrollView>
//       </ActionSheet>
//     </View>
//   );
// };

//   const renderGenderSwitches = field => (
//     <View key={field.key}>
//       {switchFields.map((item, idx) => (
//         <View key={item.displayName} style={styles.settingsTypeContainer}>
//           <CustomText>{item.displayName}</CustomText>
//           <Switch
//             value={genderStates[field.key] === idx}
//             onValueChange={() =>
//               handleGenderSwitchChange(field.key, idx)
//             }
//           />
//         </View>
//       ))}
//     </View>
//   );

//   const renderAgeSlider = field =>
//     field.key === 'min' && (
//       <RangeSlider
//         min={17}
//         max={100}
//         initialLowValue={low}
//         initialHighValue={high}
//         onValueChanged={handleValueChange}
//       />
//     );

//   const renderButton = field => (
//     <TouchableOpacity key={field.key} onPress={onFormButtonPress}>
//       <CustomText>{field.displayName}</CustomText>
//     </TouchableOpacity>
//   );

//   const renderField = field => {
//     if (field.type === 'switch') return renderSwitchField(field);
//     if (field.type === 'select' || field.type === 'signSelect')
//       return renderSelectField(field);
//     if (field.type === 'switchGender') return renderGenderSwitches(field);
//     if (field.type === 'slider') return renderAgeSlider(field);
//     if (field.type === 'button') return renderButton(field);
//     return null;
//   };

//   return (
//     <CustomSafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
//       <ProfileHeader title={title} back />
//       <ScrollView>
//         {settingField.map(section => (
//           <View key={section.title}>
//             {section.title && <CustomText>{section.title}</CustomText>}
//             {section.fields.map(renderField)}
//           </View>
//         ))}
//       </ScrollView>
//     </CustomSafeAreaView>
//   );
// };

// export default Settings;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
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
import Icons from '../../components/Icons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../api/firebase/auth';
import { updateUser } from '../../redux/slices/SessionUser';
import { showToast } from '../../components/alerts/Toast/ToastManager';
import TNActivityIndicator from '../../components/TNActivityIndicator';

const settingField = DatingConfig.userSettingsFields.sections;

const switchFields = [
  { displayName: 'Male' },
  { displayName: 'Female' },
  { displayName: 'Bisexual' },
  { displayName: 'Non-Binary' },
  { displayName: 'Transgender' },
];

const Settings = ({ route, navigation }) => {
  const { title } = route.params;

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.users.users);
  const reduxSettings = userInfo?.settings || {};
  //   const reduxSettings = {
  //     "show_me": true,
  //     "push_new_matches_enabled": false,
  //     "push_new_messages_enabled": false,
  //     "push_super_likes_enabled": false,
  //     "push_top_picks_enabled": false,
  //     "distance_radius": "Unlimited",
  //     "travel_option": "No",
  //     "children_option": "No",
  //     "gender_new": "Male",
  //     "gender_preference_new": "Male",
  //     "min": 18,
  //     "max": 25
  // }
  const actionSheetRefs = useRef({});

  const [switchStates, setSwitchStates] = useState({});
  const [selectStates, setSelectStates] = useState({});
  const [genderStates, setGenderStates] = useState({});
  const [low, setLow] = useState(18);
  const [high, setHigh] = useState(100);
  const [loading, setLoading] = useState(false);

  /* ---------------- INIT FROM JSON + REDUX ---------------- */

  useEffect(() => {
    const switches = {};
    const selects = {};
    const genders = {};

    settingField.forEach(section => {
      section.fields.forEach(field => {
        const reduxValue = reduxSettings[field.key];

        if (field.type === 'switch') {
          switches[field.key] = reduxValue !== undefined ? reduxValue : false;
        }

        if (
          (field.type === 'select' || field.type === 'signSelect') &&
          field.key
        ) {
          selects[field.key] =
            reduxValue !== undefined ? reduxValue : field.value ?? null;
        }

        if (field.type === 'switchGender') {
          if (reduxValue) {
            const index = switchFields.findIndex(
              g => g.displayName === reduxValue,
            );
            genders[field.key] = index >= 0 ? index : 0;
          } else {
            genders[field.key] = 0;
          }
        }
      });
    });

    setSwitchStates(switches);
    setSelectStates(selects);
    setGenderStates(genders);
    setLow(reduxSettings.min ?? 18);
    setHigh(reduxSettings.max ?? 100);
  }, []);

  /* ---------------- HANDLERS ---------------- */

  const handleSwitchChange = (key, value) => {
    setSwitchStates(prev => ({ ...prev, [key]: value }));
  };

  const handleGenderSwitchChange = (key, index) => {
    setGenderStates(prev => ({ ...prev, [key]: index }));
  };

  const onSelectOption = (field, value) => {
    setSelectStates(prev => ({ ...prev, [field.key]: value }));
    actionSheetRefs.current[field.key]?.current?.hide();
  };

  const handleValueChange = useCallback((l, h) => {
    setLow(l);
    setHigh(h);
  }, []);

  /* ---------------- HELPERS ---------------- */

  const displayValue = (field, value) => {
    if (!field.displayOptions || !field.options) return value;
    const idx = field.options.indexOf(value);
    return field.displayOptions[idx] ?? value;
  };

  const computeValue = field => {
    const val = selectStates[field.key] ?? field.value;
    return displayValue(field, val);
  };

  /* ---------------- SAVE PAYLOAD ---------------- */

  const getFinalPayload = () => {
    const payload = {};

    Object.keys(switchStates).forEach(key => {
      payload[key] = switchStates[key] ?? false;
    });

    Object.keys(selectStates).forEach(key => {
      payload[key] = selectStates[key];
    });

    Object.keys(genderStates).forEach(key => {
      payload[key] = switchFields[genderStates[key]]?.displayName ?? null;
    });

    payload.min = low;
    payload.max = high;

    return payload;
  };

  const onFormButtonPress = () => {
    const finalData = getFinalPayload();
    console.log('✅ FINAL SETTINGS PAYLOAD', finalData);

    // dispatch(updateUserSettings(finalData));
    const payload = {
      settings: finalData,
    };
    handleSubmit(payload);
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

  /* ---------------- RENDERERS ---------------- */

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
  // const renderSwitchField = (field, index) => {
  //   const value = switchStates[field.key] ?? false;

  //   return (
  //     <View
  //       key={`switch-${index}`}
  //       style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}
  //     >
  //       <CustomText style={styles.inputTitle}>
  //         {field.displayName}
  //       </CustomText>

  //       <View style={styles.textinputWrapper}>
  //         <Switch
  //           value={value}
  //           onValueChange={val =>
  //             handleSwitchChange(field.key, val)
  //           }
  //           backgroundActive={Colors.onlineMarkColor}
  //           backgroundInactive={'#3e3e3e'}
  //           circleActiveColor={Colors.white}
  //           circleInActiveColor={Colors.white}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  /* 🔴 FIXED: signSelect SAFE HANDLING (USES YOUR CSS) */
  const renderSelectSignField = (field, index) => {
    const isSheet =
      field.sheet === true &&
      Array.isArray(field.displayOptions) &&
      Array.isArray(field.options) &&
      field.key;

    if (!isSheet) {
      return (
        <Pressable
          key={`sign-nav-${index}`}
          style={styles.link}
          onPress={() =>
            navigation.navigate(field.navigation, {
              title: field.title,
            })
          }
        >
          <CustomText style={[styles.label, { color: Colors.mainTextColor }]}>
            {field.displayName}
          </CustomText>

          <View style={styles.leftIconWrapper}>
            <Icons
              iconType="Feather"
              name="chevron-right"
              size={scale(14)}
              color={Colors.white}
            />
          </View>
        </Pressable>
      );
    }

    if (!actionSheetRefs.current[field.key]) {
      actionSheetRefs.current[field.key] = React.createRef();
    }

    const ref = actionSheetRefs.current[field.key];

    return (
      <View key={`sign-sheet-${index}`}>
        <Pressable style={styles.link} onPress={() => ref.current?.show()}>
          <CustomText style={[styles.label, { color: Colors.mainTextColor }]}>
            {field.displayName}
          </CustomText>

          <View style={styles.textinputWrapper}>
            <CustomText style={styles.selectValueText}>
              {computeValue(field)}
            </CustomText>
          </View>
        </Pressable>

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
                    key={`${field.key}-${idx}`}
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
              style={styles.cancelButton}
              onPress={() => ref.current?.hide()}
            >
              <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
            </TouchableOpacity>
          </View>
        </ActionSheet>
      </View>
    );
  };

  // const renderGenderSwitches = (field, index) => {
  //   const activeIndex = genderStates[field.key] ?? 0;

  //   return (
  //     <View key={`gender-${index}`}>
  //       {switchFields.map((item, idx) => (
  //         <View
  //           key={`${item.displayName}-${idx}`}
  //           style={[
  //             styles.settingsTypeContainer,
  //             styles.appSettingsTypeContainer,
  //           ]}
  //         >
  //           <CustomText style={styles.inputTitle}>
  //             {item.displayName}
  //           </CustomText>

  //           <View style={styles.textinputWrapper}>
  //             <Switch
  //               value={activeIndex === idx}
  //               onValueChange={() =>
  //                 handleGenderSwitchChange(field.key, idx)
  //               }
  //               backgroundActive={Colors.onlineMarkColor}
  //               backgroundInactive={'#2C2D2D'}
  //               circleActiveColor={Colors.white}
  //               circleInActiveColor={Colors.white}
  //             />
  //           </View>
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };

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

  // const renderAgeSlider = (field, index) => {
  //   if (field.key !== 'min') return null;

  //   return (
  //     <View key={`slider-${index}`} style={styles.rangeSliderWrapper}>
  //       <RangeSlider
  //         min={17}
  //         max={100}
  //         initialLowValue={low}
  //         initialHighValue={high}
  //         onValueChanged={handleValueChange}
  //       />
  //     </View>
  //   );
  // };

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
            min={18}
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

  const renderButtonField = (field, index) => (
    <TouchableOpacity
      key={`btn-${index}`}
      style={styles.saveButtonWrapper}
      onPress={onFormButtonPress}
    >
      <CustomText style={styles.saveBtnLable}>{field.displayName}</CustomText>
    </TouchableOpacity>
  );

  const renderField = (field, index) => {
    if (field.type === 'switch') return renderSwitchField(field, index);
    if (field.type === 'signSelect') return renderSelectSignField(field, index);
    if (field.type === 'switchGender')
      return renderGenderSwitches(field, index);
    if (field.type === 'slider') return renderAgeSlider(field, index);
    if (field.type === 'button') return renderButtonField(field, index);
    return null;
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
        {settingField.map((section, idx) => (
          <View key={`section-${idx}`}>
            {section.title ? (
              <View style={styles.settingsTitleContainer}>
                <CustomText style={styles.settingsTitle}>
                  {section.title}
                </CustomText>
              </View>
            ) : null}

            <View style={styles.contentContainer}>
              {section.fields.map(renderField)}
            </View>
          </View>
        ))}
      </ScrollView>
      {loading && <TNActivityIndicator />}
    </CustomSafeAreaView>
  );
};

export default Settings;
