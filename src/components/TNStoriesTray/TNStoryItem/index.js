// // import React, { useRef, useState } from 'react'
// // import PropTypes from 'prop-types'
// // import { Text, TouchableOpacity, View } from 'react-native'
// // import dynamicStyles from './styles'
// // import { useColorScheme } from 'react-native-appearance'
// // import FastImage from 'react-native-fast-image'

// // const Image = FastImage

// // const defaultAvatar =
// //   'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

// // function StoryItem(props) {
// //   const {
// //     item,
// //     index,
// //     onPress,
// //     containerStyle,
// //     imageStyle,
// //     imageContainerStyle,
// //     textStyle,
// //     activeOpacity,
// //     title,
// //     appStyles,
// //     showOnlineIndicator,
// //     converLongPress,
// //   } = props
// //   console.log('skjdflksdjflsdkjhfslkjfskl', item.profilePictureURL)
// //   const [profileImage, setProfileImage] = useState('')
// //   if (
// //     item.profilePictureURL ==
// //     'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pic2.jpg?alt=media&token=0afb6fe0-16c4-4600-8b81-5dbd618c71d5'
// //   ) {
// //     setProfileImage(
// //       // 'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pic2.jpg?alt=media&token=0afb6fe0-16c4-4600-8b81-5dbd618c71d5',

// //       'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pics.png?alt=media&token=c387f3dc-00bc-4535-be43-0d46f3b44bc0',
// //     )
// //   } else {
// //     setProfileImage(item.profilePictureURL)
// //   }
// //   const refs = useRef()
// //   const colorScheme = useColorScheme()
// //   const styles = dynamicStyles(appStyles, colorScheme)
// //   const lastName = item.lastName || ''

// //   // console.log('lastName', lastName)
// //   return (
// //     <TouchableOpacity
// //       key={index}
// //       ref={refs}
// //       onLongPress={converLongPress}
// //       activeOpacity={activeOpacity}
// //       onPress={() => onPress(item, index, refs)}
// //       style={[styles.container, containerStyle]}>
// //       <View style={[styles.imageContainer, imageContainerStyle]}>
// //         <Image
// //           style={[styles.image, imageStyle]}
// //           source={{ uri: profileImage || defaultAvatar }}
// //         />
// //         {showOnlineIndicator && <View style={styles.isOnlineIndicator} />}
// //       </View>
// //       {title && (
// //         <Text style={[styles.text, textStyle]}>
// //           {' '}
// //           {`${item.firstName} ${lastName}`}
// //         </Text>
// //       )}
// //     </TouchableOpacity>
// //   )
// // }

// // StoryItem.propTypes = {
// //   onPress: PropTypes.func,
// //   imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
// //   containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
// //   textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
// //   item: PropTypes.object,
// //   index: PropTypes.number,
// //   activeOpacity: PropTypes.number,
// //   title: PropTypes.bool,
// // }

// // export default StoryItem

// import React, { useRef, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Text, TouchableOpacity, View } from 'react-native';
// import FastImage from '@d11/react-native-fast-image';
// import styles from './styles';

// const Image = FastImage;

// const defaultAvatar =
//   'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

// function TNStoryItem(props) {
//   const {
//     item,
//     index,
//     onPress,
//     containerStyle,
//     imageStyle,
//     imageContainerStyle,
//     textStyle,
//     activeOpacity,
//     title,
//     showOnlineIndicator,
//     converLongPress,
//   } = props;

//   const [profileImage, setProfileImage] = useState('');

//   useEffect(() => {
//     if (
//       item.profilePictureURL ===
//       'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pic2.jpg?alt=media&token=0afb6fe0-16c4-4600-8b81-5dbd618c71d5'
//     ) {
//       setProfileImage(
//         'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pics.png?alt=media&token=c387f3dc-00bc-4535-be43-0d46f3b44bc0',
//       );
//     } else {
//       setProfileImage(item.profilePictureURL);
//     }
//   }, [item.profilePictureURL]);

//   const refs = useRef();
//   const lastName = item.lastName || '';

//   return (
//     <TouchableOpacity
//       key={index}
//       ref={refs}
//       onLongPress={converLongPress}
//       activeOpacity={activeOpacity}
//       onPress={() => onPress(item, index, refs)}
//       style={[styles.container, containerStyle]}
//     >
//       <View style={[styles.imageContainer, imageContainerStyle]}>
//         <Image
//           style={[styles.image, imageStyle]}
//           source={{ uri: profileImage || defaultAvatar }}
//         />
//         {showOnlineIndicator && <View style={styles.isOnlineIndicator} />}
//       </View>
//       {title && (
//         <Text style={[styles.text, textStyle]}>
//           {' '}
//           {`${item.firstName} ${lastName}`}
//         </Text>
//       )}
//     </TouchableOpacity>
//   );
// }

// StoryItem.propTypes = {
//   onPress: PropTypes.func,
//   imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//   containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//   textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//   item: PropTypes.object,
//   index: PropTypes.number,
//   activeOpacity: PropTypes.number,
//   title: PropTypes.bool,
// };

// export default TNStoryItem;

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import styles from './styles';
import { CustomText } from '../../global/CustomText';

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

function TNStoryItem(props) {
  const {
    item,
    index,
    onPress,
    activeOpacity,
    title,
    showOnlineIndicator,
    converLongPress,
  } = props;

  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (
      item.profilePictureURL ===
      'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pic2.jpg?alt=media&token=0afb6fe0-16c4-4600-8b81-5dbd618c71d5'
    ) {
      setProfileImage(
        'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pics.png?alt=media&token=c387f3dc-00bc-4535-be43-0d46f3b44bc0',
      );
    } else {
      setProfileImage(item.profilePictureURL);
    }
  }, [item.profilePictureURL]);

  const refs = useRef();
  const lastName = item.lastName || '';

  return (
    <TouchableOpacity
      key={index}
      ref={refs}
      onLongPress={converLongPress}
      activeOpacity={activeOpacity}
      onPress={() => onPress(item, index, refs)}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: profileImage || defaultAvatar,
            priority: FastImage.priority.high,
          }}
        />
        {showOnlineIndicator && <View style={styles.isOnlineIndicator} />}
      </View>
      {title && (
        <CustomText style={styles.text}>
          {`${item.firstName} ${lastName}`}
        </CustomText>
      )}
    </TouchableOpacity>
  );
}

// Fixed: Changed StoryItem to TNStoryItem
TNStoryItem.propTypes = {
  onPress: PropTypes.func,
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  item: PropTypes.object,
  index: PropTypes.number,
  activeOpacity: PropTypes.number,
  title: PropTypes.bool,
  showOnlineIndicator: PropTypes.bool,
  converLongPress: PropTypes.func,
};

TNStoryItem.defaultProps = {
  activeOpacity: 0.7,
  title: false,
  showOnlineIndicator: false,
};

export default TNStoryItem;
