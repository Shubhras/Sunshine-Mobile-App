import moment from 'moment';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import {
 
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';

const formatMessage = message => {
  const mime = message?.url?.mime || message?.mime;
  if (mime) {
    if (mime.startsWith('video')) {
      return 'Someone sent a video.';
    } else if (mime.startsWith('audio')) {
      return 'Someone sent an audio.';
    } else if (mime.startsWith('image')) {
      return 'Someone sent a photo.';
    }
  }
  if (message?.content && message.content.length > 0) {
    return message?.content;
  } else if (message && message.length > 0) {
    return message;
  } else if (message) {
    return JSON.stringify(message);
  }
  return '';
};

const getMessageTime = createdAt => {
  const messageDate = moment(createdAt?.seconds * 1000 || new Date());

  if (moment().isSame(messageDate, 'day')) {
    return messageDate.format('hh:mm A');
  }

  if (moment().subtract(1, 'day').isSame(messageDate, 'day')) {
    return `Yesterday, ${messageDate.format('hh:mm A')}`;
  }

  return messageDate.format('DD MMM, hh:mm A');
};

const timeFormat = timeStamp => {
  if (timeStamp) {
    if (moment(timeStamp).isValid()) {
      return moment.unix(timeStamp).fromNow();
    }
    if (moment().diff(moment.unix(timeStamp.seconds), 'days') == 0) {
      return moment.unix(timeStamp.seconds).format('H:mm');
    }
    return moment.unix(timeStamp.seconds).fromNow();
  }
  return ' ';
};

//   const normalizeTimestamp = ts => {
//   if (!ts) return null

//   if (ts.seconds) {
//     return ts.seconds * 1000
//   }

//   if (ts._seconds) {
//     return ts._seconds * 1000
//   }

//   return null
// }

const normalizeTimestamp = value => {
  if (!value) return null;

  if (typeof value === 'number') return value;

  if (value?.seconds != null) return value.seconds * 1000;
  if (value?._seconds != null) return value._seconds * 1000;

  return value;
};


const deepNormalize = data => {
  if (Array.isArray(data)) {
    return data.map(deepNormalize);
  }

  if (data && typeof data === 'object') {
    const normalized = {};
    for (const key in data) {
      normalized[key] = deepNormalize(normalizeTimestamp(data[key]));
    }
    return normalized;
  }

  return data;
};


const normalizeObjectTimestamps = obj => {
  if (!obj || typeof obj !== 'object') return obj;

  const normalized = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach(key => {
    const val = obj[key];

    if (
      val &&
      typeof val === 'object' &&
      ('seconds' in val || '_seconds' in val)
    ) {
      normalized[key] = normalizeTimestamp(val);
    } else if (typeof val === 'object' && !Array.isArray(val)) {
      normalized[key] = normalizeObjectTimestamps(val);
    } else if (Array.isArray(val)) {
      normalized[key] = val.map(item => normalizeObjectTimestamps(item));
    } else {
      normalized[key] = val;
    }
  });

  return normalized;
};

// filter users based on my profile settings start
const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};
const isMatch = (myValue, userValue) => {
  if (!myValue || !userValue) return false;

  if (Array.isArray(myValue) && Array.isArray(userValue)) {
    return myValue.some(v => userValue.includes(v));
  }

  if (Array.isArray(myValue)) {
    return myValue.includes(userValue);
  }

  if (Array.isArray(userValue)) {
    return userValue.includes(myValue);
  }

  return String(myValue).toLowerCase() === String(userValue).toLowerCase();
};

const filterUsersByMyProfile = (users, my) => {
  return users.filter(user => {
    // 1️⃣ Remove myself
    if (user.userID === my.userID) return false;

    const userSettings = user.settings || {};
    const mySettings = my.settings || {};

    // 2️⃣ show_me
    if (userSettings.show_me === false) return false;

    // 3️⃣ Age
    const age = Number(user.age);
    if (age < Number(my.min) || age > Number(my.max)) return false;

    // 4️⃣ Distance
    if (my.distance_radius !== 'Unlimited') {
      const distance = getDistanceKm(
        my.location.latitude,
        my.location.longitude,
        user.location.latitude,
        user.location.longitude,
      );

      if (distance > Number(my.distance_radius)) return false;
    }

    // 5️⃣ SEEKING MATCH (ANY match passes)
    const match =
      isMatch(mySettings.dietary_seeking, userSettings.dietary_you) ||
      isMatch(
        mySettings.love_language_seeking,
        userSettings.love_language_you,
      ) ||
      isMatch(mySettings.religion_seeking, userSettings.religion_you) ||
      isMatch(mySettings.pets_seeking, userSettings.pets_you) ||
      isMatch(mySettings.lifestyle_seeking, userSettings.lifestyle_you) ||
      isMatch(mySettings.education_seeking, userSettings.education_you) ||
      isMatch(mySettings.sports_seeking, userSettings.sports_you) ||
      isMatch(mySettings.exercise_seeking, userSettings.exercise_you) ||
      isMatch(
        mySettings.personality_traits_seeking,
        userSettings.personality_traits_you,
      ) ||
      isMatch(mySettings.movie_seeking, userSettings.movie_you) ||
      isMatch(
        mySettings.spiritual_scripture_seeking,
        userSettings.spiritual_scripture_you,
      ) ||
      isMatch(mySettings.states_us_seeking, userSettings.states_us_you);

    return match;
  });
};




// function isEmptyValue(val) {
//   return (
//     val === undefined ||
//     val === null ||
//     val === "" ||
//     (Array.isArray(val) && val.length === 0)
//   );
// }

// function matchValue(myVal, userVal) {
//   // array ↔ array
//   if (Array.isArray(myVal) && Array.isArray(userVal)) {
//     return myVal.some(v => userVal.includes(v));
//   }

//   // string / number
//   return myVal === userVal;
// }

// function filterUsers(users, myProfile) {
//   const mySettings = myProfile.settings || {};

//   let hasAnyFilterValue = false;

//   const filtered = users.filter(user => {
//     const userSettings = user.settings || {};
//     let matched = false;

//     for (const key in mySettings) {
//       const myVal = mySettings[key];
//       const userVal = userSettings[key];

//       // skip empty or missing values
//       if (isEmptyValue(myVal) || isEmptyValue(userVal)) {
//         continue;
//       }

//       hasAnyFilterValue = true;

//       // age range logic
//       if (key === "min" || key === "max") {
//         const age = Number(user.age);
//         if (!isNaN(age)) {
//           if (key === "min" && age >= Number(myVal)) matched = true;
//           if (key === "max" && age <= Number(myVal)) matched = true;
//         }
//       }
//       // normal matching
//       else if (matchValue(myVal, userVal)) {
//         matched = true;
//       }

//       if (matched) break; // ANY ONE condition is enough
//     }

//     return matched;
//   });

//   // If no valid filter values → return all users
//   return hasAnyFilterValue ? filtered : users;
// }

function toRad(value) {
  return (value * Math.PI) / 180;
}

function getDistanceInMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

const DISTANCE_MAP = {
  '5 miles': 5,
  '10 miles': 10,
  '15 miles': 15,
  '25 miles': 25,
  '50 miles': 50,
  '100 miles': 100,
  Unlimited: Infinity,
  unlimited: Infinity,
};

function isEmptyValue(val) {
  return (
    val === undefined ||
    val === null ||
    val === '' ||
    (Array.isArray(val) && val.length === 0)
  );
}

function matchValue(myVal, userVal) {
  if (Array.isArray(myVal) && Array.isArray(userVal)) {
    return myVal.some(v => userVal.includes(v));
  }
  return myVal === userVal;
}

// function filterUsers(users, myProfile) {
//   const mySettings = myProfile.settings || {};
//   const myLocation = myProfile.location;

//   let hasAnyFilterValue = false;

//   const filtered = users.filter(user => {
//     const userSettings = user.settings || {};

//     /** 🔴 show_me check (MANDATORY) */
//     if (userSettings.show_me === false) {
//       return false;
//     }

//     let matched = false;

//     /** 📍 Distance filter */
//     if (
//       myLocation &&
//       user.location &&
//       mySettings.distance_radius &&
//       DISTANCE_MAP[mySettings.distance_radius]
//     ) {
//       hasAnyFilterValue = true;

//       const maxDistance = DISTANCE_MAP[mySettings.distance_radius];

//       if (maxDistance !== Infinity) {
//         const distance = getDistanceInMiles(
//           myLocation.latitude,
//           myLocation.longitude,
//           user.location.latitude,
//           user.location.longitude
//         );

//         if (distance <= maxDistance) {
//           matched = true;
//         }
//       } else {
//         matched = true; // Unlimited distance
//       }
//     }

//     /** 🔎 Settings-based matching (ANY ONE) */
//     for (const key in mySettings) {
//       const myVal = mySettings[key];
//       const userVal = userSettings[key];

//       if (key === 'distance_radius') continue;

//       if (isEmptyValue(myVal) || isEmptyValue(userVal)) continue;

//       hasAnyFilterValue = true;

//       // age range
//       if (key === 'min' || key === 'max') {
//         const age = Number(user.age);
//         if (!isNaN(age)) {
//           if (key === 'min' && age >= Number(myVal)) matched = true;
//           if (key === 'max' && age <= Number(myVal)) matched = true;
//         }
//       } else if (matchValue(myVal, userVal)) {
//         matched = true;
//       }

//       if (matched) break;
//     }

//     return matched;
//   });

//   /** 🧠 If nothing valid to filter → return all */
//   return hasAnyFilterValue ? filtered : users;
// }
const isBlockedUser = (user, blockedUserIDs = []) => {
  if (!blockedUserIDs.length) return false;
  const id = user?.userID || user?.id;
  return blockedUserIDs.includes(id);
};

function filterUsers(users, myProfile, blockedUserIDs = []) {
  const mySettings = myProfile.settings || {};
  const myLocation = myProfile.location;

  let hasAnyFilterValue = false;

  const filtered = users.filter(user => {
    const userSettings = user.settings || {};

    /** 🚫 Blocked users (HARD STOP) */
    if (isBlockedUser(user, blockedUserIDs)) {
      return false;
    }

    /** 🔴 show_me check (MANDATORY) */
    if (userSettings.show_me === false) {
      return false;
    }

    let matched = false;

    /** 📍 Distance filter */
    if (
      myLocation &&
      user.location &&
      mySettings.distance_radius &&
      DISTANCE_MAP[mySettings.distance_radius]
    ) {
      hasAnyFilterValue = true;

      const maxDistance = DISTANCE_MAP[mySettings.distance_radius];

      if (maxDistance !== Infinity) {
        const distance = getDistanceInMiles(
          myLocation.latitude,
          myLocation.longitude,
          user.location.latitude,
          user.location.longitude
        );

        if (distance <= maxDistance) {
          matched = true;
        }
      } else {
        matched = true; // Unlimited distance
      }
    }

    /** 🔎 Settings-based matching (ANY ONE) */
    for (const key in mySettings) {
      const myVal = mySettings[key];
      const userVal = userSettings[key];

      if (key === 'distance_radius') continue;
      if (isEmptyValue(myVal) || isEmptyValue(userVal)) continue;

      hasAnyFilterValue = true;

      // age range
      if (key === 'min' || key === 'max') {
        const age = Number(user.age);
        if (!isNaN(age)) {
          if (key === 'min' && age >= Number(myVal)) matched = true;
          if (key === 'max' && age <= Number(myVal)) matched = true;
        }
      } else if (matchValue(myVal, userVal)) {
        matched = true;
      }

      if (matched) break;
    }

    return matched;
  });

  /** 🧠 If nothing valid to filter → return all (still excluding blocked) */
  return hasAnyFilterValue
    ? filtered
    : users.filter(user => !isBlockedUser(user, blockedUserIDs));
}



// filter users based on my profile settings end


export const getImagesForUsers = async type => {
  if (type === 'camera') {
    return await onPressTakePhoto();
  } else if (type === 'gallery') {
    return await onPressAddPhotoBtn();
  }
  return null;
};

export const onPressAddPhotoBtn = () => {
  const options = {
    mediaType: 'photo',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.8,
  };

  return new Promise(resolve => {
    launchImageLibrary(options, response => {
      if (response?.didCancel) return resolve(null);

      if (response?.errorCode) {
        Alert.alert('Error', response?.errorMessage || 'Something went wrong');
        return resolve(null);
      }

      const asset = response?.assets?.[0];
      resolve(asset || null);
    });
  });
};

export const onPressTakePhoto = async () => {
  if (Platform.OS === 'android') {
    const checkPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (!checkPermission) {
      const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (grantedCamera === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Required',
          'Camera permission is permanently denied. Please enable it from Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ],
        );
        return null;
      }

      if (grantedCamera !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Camera permission is required.');
        return null;
      }
    }
  }

  return await launchCameraWithOptions();
};

export const launchCameraWithOptions = () => {
  const options = {
    mediaType: 'photo',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.5,
    saveToPhotos: true,
    cameraType: 'front',
  };

  return new Promise(resolve => {
    launchCamera(options, response => {
      if (response?.didCancel) return resolve(null);

      if (response?.errorCode) {
        Alert.alert('Error', response?.errorMessage || 'Something went wrong');
        return resolve(null);
      }

      const asset = response?.assets?.[0];
      resolve(asset || null);
    });
  });
};

export const isValidUrl = (text) => {
  if (!text) return false;

  const str = text.trim();

  // must start with http/https OR www
  const urlRegex = /^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i;

  return urlRegex.test(str);
};
export {
  formatMessage,
  getMessageTime,
  timeFormat,
  normalizeTimestamp,
  normalizeObjectTimestamps,
  filterUsersByMyProfile,
  deepNormalize,
  filterUsers,
};
