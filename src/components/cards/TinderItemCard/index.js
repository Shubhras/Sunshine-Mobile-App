import FastImage from '@d11/react-native-fast-image';
import React, { memo, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Images } from '../../../constants/images';
import styles from './styles';
import { CustomText } from '../../global/CustomText';

const TinderItemCard = props => {
  const { url, name, age, school, distance, lastName } = props;

  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (
      url ===
      'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pic2.jpg?alt=media&token=0afb6fe0-16c4-4600-8b81-5dbd618c71d5'
    ) {
      setProfileImage(
        'https://firebasestorage.googleapis.com/v0/b/sun-sign-inc-1e12b.appspot.com/o/pics.png?alt=media&token=c387f3dc-00bc-4535-be43-0d46f3b44bc0',
      );
    } else {
      setProfileImage(url);
    }
  }, [url]);
  return (
    <View style={[styles.container, styles.cardStyle]}>
      <FastImage source={{ uri: profileImage }} style={styles.news_image_style}>
        <View style={styles.userDetailContainer}>
          <CustomText style={styles.name_style}>
            {name ? name : ' '} {lastName ? lastName : ' '}, {age ? age : ' '}
          </CustomText>
          <View style={styles.txtBox}>
            <Image style={styles.icon} source={Images.schoolIcon} />
            <CustomText style={styles.label}>
              {school ? school : ' '}
            </CustomText>
          </View>
          {distance && (
            <View style={styles.txtBox}>
              <Image style={styles.icon} source={Images.markerIcon} />
              <CustomText style={styles.label}>{distance}</CustomText>
            </View>
          )}
        </View>
        <View style={styles.undoIconContainer}>
          <TouchableOpacity
            onPress={props.undoSwipe}
            style={styles.roundUndoIconContainer}
          >
            <Image style={styles.icon} source={Images.undo} />
          </TouchableOpacity>
        </View>
      </FastImage>
    </View>
    // <View style={[styles.container, styles.cardStyle]}>
    //   <FastImage source={{ uri: profileImage }} style={styles.news_image_style}>
    //     <ImageBackground
    //       style={styles.name_info_container}
    //       source={Images.backgroundImage}
    //     >
    //       <View style={styles.userDetailContainer}>
    //         <CustomText style={styles.name_style}>
    //           {name ? name : ' '} {lastName ? lastName : ' '}, {age ? age : ' '}
    //         </CustomText>
    //         <View style={styles.txtBox}>
    //           <Image style={styles.icon} source={Images.schoolIcon} />
    //           <CustomText style={styles.label}>
    //             {school ? school : ' '}
    //           </CustomText>
    //         </View>
    //         {distance && (
    //           <View style={styles.txtBox}>
    //             <Image style={styles.icon} source={Images.markerIcon} />
    //             <CustomText style={styles.label}>{distance}</CustomText>
    //           </View>
    //         )}
    //       </View>
    //       <View style={styles.undoIconContainer}>
    //         <TouchableOpacity
    //           onPress={props.undoSwipe}
    //           style={styles.roundUndoIconContainer}
    //         >
    //           <Image style={styles.icon} source={Images.undo} />
    //         </TouchableOpacity>
    //       </View>
    //     </ImageBackground>
    //   </FastImage>
    // </View>
  );
};

// Exporting
export default memo(TinderItemCard);
