// import React, { useState } from 'react';
// import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
// import ProfileHeader from '../../components/ProfileHeader';
// import Colors from '../../constants/Colors';
// import styles from './styles';
// import { scale } from 'react-native-size-matters';
// import { ScrollView, View } from 'react-native';
// import DatingConfig from '../../data/DatingConfig';
// import FastImage from '@d11/react-native-fast-image';
// import {
//   CustomText,
//   CustomTextInput,
// } from '../../components/global/CustomText';

// const ContactUsField = DatingConfig.contactUsFields.sections;

// const Contactus = ({ route }) => {
//   const { title } = route.params;

//   // Initialize state for form fields
//   const [selectStates, setSelectStates] = useState({});
//   const [alteredFormDict, setAlteredFormDict] = useState({});

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

//   const onFormFieldValueChange = (formField, value) => {
//     console.log('alteredFormDict', alteredFormDict);
//     console.log(formField, 'raamm', value);

//     // Update state
//     setSelectStates(prev => ({
//       ...prev,
//       [formField.key]: value,
//     }));

//     setAlteredFormDict(prev => ({
//       ...prev,
//       [formField.key]: value,
//     }));
//   };

//   const renderTextField = (formField, index) => {
//     return (
//       <View key={`textinput-${formField.key}-${index}`}>
//         <View style={styles.settingsTypeContainer}>
//           <CustomText style={styles.inputTitle}>
//             {formField.displayName}
//           </CustomText>
//           <View style={styles.textinputWrapper}>
//             <CustomTextInput
//               style={styles.textInput}
//               value={computeValue(formField)}
//               onChangeText={text => {
//                 onFormFieldValueChange(formField, text);
//               }}
//               placeholder={formField.placeholder}
//               placeholderTextColor={Colors.inputPlaceholder}
//               keyboardType={formField.keyboardType}
//               selectionColor={Colors.primary}
//               multiline={formField.multiline}
//               numberOfLines={formField.multiline ? 4 : 1}
//               editable={formField.editable}
//               autoCapitalize={formField.key === 'email' ? 'none' : 'words'}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const myImageFunc = (formfield, index) => {
//     return (
//       <View
//         key={`image-${formfield.key || index}-${index}`}
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           overflow: 'hidden',
//           paddingVertical: scale(20),
//         }}
//       >
//         <FastImage
//           source={formfield.source}
//           resizeMode="contain"
//           style={{
//             width: scale(150),
//             height: scale(150),
//           }}
//         />
//       </View>
//     );
//   };

//   const renderField = (formField, index) => {
//     const type = formField.type;

//     if (type === 'text') {
//       return renderTextField(formField, index);
//     }
//     if (type === 'image') {
//       return myImageFunc(formField, index);
//     }
//     if (type === 'buttonType') {
//       return (
//         <View
//           key={`button-${formField.key}-${index}`}
//           style={styles.settingsTypeContainer}
//         >
//           <CustomText
//             style={[styles.inputTitle, { width: '100%', textAlign: 'center' }]}
//           >
//             {formField.displayName}
//           </CustomText>
//         </View>
//       );
//     }
//     return null;
//   };

//   const renderSection = (section, sectionIndex) => {
//     return (
//       <View key={`section-${sectionIndex}`} style={styles.contentContainer}>
//         {section.fields.map((field, fieldIndex) =>
//           renderField(field, fieldIndex),
//         )}
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
//         {ContactUsField.map((section, index) => renderSection(section, index))}
//       </ScrollView>
//     </CustomSafeAreaView>
//   );
// };

// export default Contactus;

import React, { useState } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import ProfileHeader from '../../components/ProfileHeader';
import Colors from '../../constants/Colors';
import styles from './styles';
import { scale } from 'react-native-size-matters';
import { PixelRatio, ScrollView, View } from 'react-native';
import DatingConfig from '../../data/DatingConfig';
import FastImage from '@d11/react-native-fast-image';
import {
  CustomText,
  CustomTextInput,
} from '../../components/global/CustomText';

const ContactUsField = DatingConfig.contactUsFields.sections;
const HAIRLINE = 1 / PixelRatio.get();

const Contactus = ({ route }) => {
  const { title } = route.params;
  // Initialize state for form fields
  const [alteredFormDict, setAlteredFormDict] = useState({});

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
    return displayValue(field, field.value);
  };

  const onFormFieldValueChange = (formField, value) => {
    var newFieldsDict = { ...alteredFormDict };
    newFieldsDict[formField.key] = value;
    setAlteredFormDict(newFieldsDict);
    // console.log('alteredFormDict...', alteredFormDict);
  };

  const renderTextField = (formField, index, totalLen) => {
    return (
      <View key={`textinput-${formField.key}-${index}`}>
        <View
          style={[
            styles.settingsTypeContainer,
            { borderBottomWidth: index < totalLen - 1 ? HAIRLINE : 0 },
          ]}
        >
          <CustomText style={styles.inputTitle}>
            {formField.displayName}
          </CustomText>
          <View style={styles.textinputWrapper}>
            <CustomTextInput
              style={styles.textInput}
              value={computeValue(formField)}
              onChangeText={text => {
                onFormFieldValueChange(formField, text);
              }}
              placeholder={formField.placeholder}
              placeholderTextColor={Colors.inputPlaceholder}
              keyboardType={formField.keyboardType}
              selectionColor={Colors.primary}
              multiline={formField.multiline}
              numberOfLines={formField.multiline}
              editable={formField.editable}
              autoCapitalize={formField.key === 'email' ? 'none' : 'words'}
            />
          </View>
        </View>
      </View>
    );
  };

  const myImageFunc = (formfield, index) => {
    return (
      <View
        key={`image-${formfield.key || index}-${index}`}
        style={styles.imageWrapper}
      >
        <FastImage
          source={formfield.source}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    );
  };

  const renderButtonFieldType = (buttonField, index) => {
    return (
      <View
        key={`button-${buttonField.key}-${index}`}
        style={styles.titleWrapper}
      >
        <CustomText style={styles.title}>{buttonField.displayName}</CustomText>
      </View>
    );
  };

  const renderField = (formField, index, totalLen) => {
    const type = formField.type;

    if (type === 'text') {
      return renderTextField(formField, index, totalLen);
    }
    if (type === 'image') {
      return myImageFunc(formField, index);
    }
    if (type == 'buttonType') {
      return renderButtonFieldType(formField, index);
    }
    return null;
  };

  const renderSection = (section, sectionIndex) => {
    const totalLen = section.fields.length;
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
            renderField(field, fieldIndex, totalLen),
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
      >
        {ContactUsField.map((section, index) => renderSection(section, index))}
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default Contactus;
