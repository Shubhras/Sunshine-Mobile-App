// // firebase/auth.js
// // import { auth, db, storage } from './config';
// // import {
// //   createUserWithEmailAndPassword,
// //   updateProfile,
// //   signInWithEmailAndPassword,
// //   sendPasswordResetEmail as sendResetEmail,
// // } from 'firebase/auth';
// // import {
// //   collection,
// //   doc,
// //   setDoc,
// //   getDoc,
// //   serverTimestamp,
// // } from 'firebase/firestore';
// // import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { ErrorCode } from '../../utils/ErrorCode';
// import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';

// const usersRef = collection(db, 'users');

// // ------------------------------
// // Upload profile picture
// // ------------------------------
// const uploadProfilePicture = async (userId, photoFile) => {
//   if (!photoFile?.uri) return '';
//   const filename = `profile_pictures/${userId}_${Date.now()}.jpg`;
//   const storageRef = ref(storage, filename);
//   const blob = await (await fetch(photoFile.uri)).blob();

//   return uploadBytes(storageRef, blob)
//     .then(() => getDownloadURL(storageRef))
//     .catch(() => ({ error: ErrorCode.photoUploadFailed }));
// };

// // ------------------------------
// // Create Firestore user
// // ------------------------------
// const createUserInFirestore = async (
//   userId,
//   userDetails,
//   profilePictureURL,
//   appIdentifier,
// ) => {
//   const userData = {
//     id: userId,
//     userID: userId,
//     email: userDetails.email || '',
//     firstName: userDetails.firstName || '',
//     lastName: userDetails.lastName || '',
//     username: userDetails.username?.toLowerCase() || '',
//     phone: userDetails.phone || '',
//     age: userDetails.age || '',
//     profilePictureURL: profilePictureURL || '',
//     location: userDetails.location || '',
//     signUpLocation: userDetails.signUpLocation || '',
//     appIdentifier: appIdentifier || '',
//     createdAt: serverTimestamp(),
//   };

//   const userDocRef = doc(usersRef, userId);
//   return setDoc(userDocRef, userData)
//     .then(() => userData)
//     .catch(() => ({ error: ErrorCode.serverError }));
// };

// // ------------------------------
// // Register
// // ------------------------------
// export const register = async (userDetails, appIdentifier) => {
//   const { email, password, firstName, lastName, photoFile } = userDetails;

//   const userCredential = await createUserWithEmailAndPassword(
//    getAuth(),
//     email,
//     password,
//   ).catch(error => ({ error }));

//   if (userCredential?.error) {
//     let errorCode = ErrorCode.serverError;
//     switch (userCredential.error.code) {
//       case 'auth/email-already-in-use':
//         errorCode = ErrorCode.emailInUse;
//         break;
//       case 'auth/invalid-email':
//         errorCode = ErrorCode.badEmailFormat;
//         break;
//       case 'auth/weak-password':
//         errorCode = ErrorCode.invalidPassword;
//         break;
//       case 'auth/too-many-requests':
//         errorCode = ErrorCode.rateLimited;
//         break;
//     }
//     return { error: errorCode };
//   }

//   const userId = userCredential.user.uid;

//   const profilePictureURL = await uploadProfilePicture(userId, photoFile);
//   if (profilePictureURL?.error) return { error: profilePictureURL.error };

//   const userData = await createUserInFirestore(
//     userId,
//     userDetails,
//     profilePictureURL,
//     appIdentifier,
//   );
//   if (userData?.error) return { error: userData.error };

//   await updateProfile(auth.currentUser, {
//     displayName: `${firstName} ${lastName}`.trim(),
//     photoURL: profilePictureURL,
//   }).catch(() => null);

//   return { user: userData };
// };

// // ------------------------------
// // Login
// // ------------------------------
// export const login = async (email, password) => {
//   const userCredential = await signInWithEmailAndPassword(
//     auth,
//     email,
//     password,
//   ).catch(error => ({ error }));

//   if (userCredential?.error) {
//     let errorCode = ErrorCode.serverError;
//     switch (userCredential.error.code) {
//       case 'auth/wrong-password':
//         errorCode = ErrorCode.invalidPassword;
//         break;
//       case 'auth/user-not-found':
//         errorCode = ErrorCode.noUser;
//         break;
//       case 'auth/invalid-email':
//         errorCode = ErrorCode.badEmailFormat;
//         break;
//       case 'auth/too-many-requests':
//         errorCode = ErrorCode.rateLimited;
//         break;
//     }
//     return { error: errorCode };
//   }

//   const userDoc = await getDoc(doc(usersRef, userCredential.user.uid)).catch(
//     () => ({ error: ErrorCode.serverError }),
//   );

//   if (userDoc?.error) return { error: userDoc.error };
//   if (!userDoc.exists()) return { error: ErrorCode.noUser };

//   return { user: userDoc.data() };
// };

// // ------------------------------
// // Logout
// // ------------------------------
// export const logout = async () => {
//   return auth
//     .signOut()
//     .then(() => ({ success: true }))
//     .catch(() => ({ error: ErrorCode.serverError }));
// };

// // ------------------------------
// // Get current user
// // ------------------------------
// export const getCurrentUser = async () => {
//   const currentUser = auth.currentUser;
//   if (!currentUser) return null;

//   const docSnap = await getDoc(doc(usersRef, currentUser.uid)).catch(
//     () => null,
//   );
//   if (!docSnap?.exists()) return null;

//   return docSnap.data();
// };

// // ------------------------------
// // Send password reset
// // ------------------------------
// export const sendPasswordResetEmail = async email => {
//   return sendResetEmail(auth, email)
//     .then(() => ({ success: true }))
//     .catch(error => {
//       let errorCode = ErrorCode.serverError;
//       switch (error?.code) {
//         case 'auth/user-not-found':
//           errorCode = ErrorCode.noUser;
//           break;
//         case 'auth/invalid-email':
//           errorCode = ErrorCode.badEmailFormat;
//           break;
//         case 'auth/too-many-requests':
//           errorCode = ErrorCode.rateLimited;
//           break;
//       }
//       return { error: errorCode };
//     });
// };

import firestore, {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from '@react-native-firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import { ErrorCode } from '../../utils/ErrorCode';
import { Images } from '../../constants/images';
import DatingConfig from '../../data/DatingConfig';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging'

const timestamp = serverTimestamp();
const db = getFirestore(); // Modular DB instance
const auth = getAuth();

export const register = userDetails => {
  const {
    email,
    firstName,
    lastName,
    username,
    password,
    phone,
    profilePictureURL = Images.defaultProfilePhotoURL,
    location,
    signUpLocation,
    age,
  } = userDetails;

  return new Promise((resolve, _reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        const uid = response.user.uid;

        const userDocRef = doc(db, 'users', uid); // Modular doc ref

        const data = {
          id: uid,
          userID: uid, // legacy reasons
          email,
          firstName: firstName || '',
          lastName: lastName || '',
          username: username || '',
          phone: phone || '',
          age: age || '',
          profilePictureURL,
          location: location || '',
          signUpLocation: signUpLocation || '',
          appIdentifier: DatingConfig.appIdentifier,
          signUpPlatform: Platform.OS,
          settings: {
            show_me: true,
            min: age,
            max: 100,
            distance_radius: 'Unlimited',
          },
          createdAt: serverTimestamp(), // Modular timestamp
        };

        setDoc(userDocRef, data) // Modular set
          .then(val => {
            resolve({ user: data });
          })
          .catch(error => {
            resolve({ error: ErrorCode.serverError });
          });
      })
      .catch(error => {
        let errorCode = ErrorCode.serverError;
        if (error.code === 'auth/email-already-in-use') {
          errorCode = ErrorCode.emailInUse;
        }
        resolve({ error: errorCode });
      });
  });
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
  return new Promise(async resolve => {
    // const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        const uid = response.user.uid;
        // const db = getFirestore();
        const userDocRef = doc(db, 'users', uid); // Modular doc ref

        getDoc(userDocRef)
          .then(firestoreDocument => {
            if (!firestoreDocument.exists()) {
              resolve({ error: ErrorCode.noUser });
              return;
            }

            const user = firestoreDocument.data();
            const userData = {
              email,
              id: uid,
              ...user,
            };
            resolve({ user: userData });
          })
          .catch(() => {
            resolve({ error: ErrorCode.serverError });
          });
      })
      .catch(error => {
        let errorCode = ErrorCode.serverError;
        switch (error.code) {
          case 'auth/wrong-password':
          case 'auth/invalid-credential': // Common in newer SDKs for wrong password
            errorCode = ErrorCode.invalidPassword;
            break;
          case 'auth/user-not-found':
            errorCode = ErrorCode.noUser;
            break;
          case 'auth/network-request-failed':
            errorCode = ErrorCode.serverError;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }
        resolve({ error: errorCode });
      });
  });
};

export const updateProfilePhoto = (userID, profilePictureURL) => {
  return new Promise(resolve => {
    const userDocRef = doc(db, 'users', userID); // Modular doc ref

    updateDoc(userDocRef, { profilePictureURL })
      .then(() => {
        resolve({ success: true });
      })
      .catch(error => {
        console.error('Update error:', error); // Optional: better logging
        resolve({ error });
      });
  });
};

export const userLogout = async userID => {
  try {
    const userDocRef = doc(db, 'users', userID);

    await updateDoc(userDocRef, {
      pushToken: '',
      isOnline: false,
      lastOnlineTimestamp: firestore.FieldValue.serverTimestamp(),
    });

    await auth.signOut();

    console.log('User logged out successfully');

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { error };
  }
};

export const updateUserInfo = (userID, data) => {
  return new Promise((resolve, reject) => {
    const userDocRef = doc(db, 'users', userID); // Modular doc ref

    updateDoc(userDocRef, data)
      .then(() => {
        resolve({ success: true });
      })
      .catch(error => {
        console.error('Update error:', error); // Optional: better logging
        reject({ error });
      });
  });
};

export const removeUser = userID => {
  return new Promise(resolve => {
    // Step 1: Delete Firestore user document
    const userDocRef = doc(db, 'users', userID);

    deleteDoc(userDocRef)
      .then(() => {
        // Step 2: Delete the Firebase Auth user
        const currentUser = auth.currentUser;

        if (!currentUser) {
          resolve({ success: false, error: 'No authenticated user found' });
          return;
        }

        if (currentUser.uid !== userID) {
          resolve({
            success: false,
            error:
              'Trying to delete different user than current authenticated user',
          });
          return;
        }

        deleteUser(currentUser)
          .then(() => {
            resolve({ success: true });
          })
          .catch(error => {
            // ──────────────────────────────────────────────────────
            // Most common case: requires recent authentication
            // ──────────────────────────────────────────────────────
            if (error.code === 'auth/requires-recent-login') {
              // In most real apps you should:
              // 1. Sign out the user
              // 2. Show re-authentication screen (email+password or other provider)
              auth
                .signOut()
                .then(() => {
                  resolve({
                    success: false,
                    error: ErrorCode.requiresRecentLogin,
                    message:
                      'Requires recent authentication. Please sign in again.',
                  });
                })
                .catch(signOutErr => {
                  console.error(
                    'Sign out failed during account deletion:',
                    signOutErr,
                  );
                  resolve({
                    success: false,
                    error: ErrorCode.requiresRecentLogin,
                    message: 'Cannot sign out automatically',
                  });
                });
            } else {
              // Other errors (permission denied, network, etc.)
              console.error('Account deletion failed:', error);
              resolve({
                success: false,
                error: ErrorCode.serverError,
                message: error?.message || 'Failed to delete account',
              });
            }
          });
      })
      .catch(error => {
        console.error('Failed to delete user document:', error);
        resolve({
          success: false,
          error: ErrorCode.serverError,
          message: 'Could not delete user data from database',
        });
      });
  });
};

export const forgotPassword = async (email) => {
  try {
    if (!email?.trim()) {
      return { success: false, message: 'Email is required' };
    }

    await sendPasswordResetEmail(auth, email.trim());

    return {
      success: true,
      message: 'Password reset email sent. Check your inbox.',
    };
  } catch (e) {
    console.log('forgotPassword error:', e);

    if (e?.code === 'auth/user-not-found') {
      return { success: false, message: 'No user found with this email' };
    }

    if (e?.code === 'auth/invalid-email') {
      return { success: false, message: 'Invalid email format' };
    }

    return { success: false, message: e?.message || 'Something went wrong' };
  }
};

export const sendSMSToPhoneNumber = (phoneNumber) => {
  return new Promise(async function (resolve, _reject) {
    console.log('Sending SMS to phone number:', phoneNumber);
    
    await signInWithPhoneNumber(auth, phoneNumber)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        resolve({ confirmationResult })
      })
      .catch(function (_error) {
        console.warn(_error)
        resolve({ error: ErrorCode.smsNotSent })
      })
  })
}

export const fetchUserProfileViaUUID = async (uid) => {
  
  try {
    // Reference the specific user document
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log('User Profile Data:', userData);
      return {...userData,  success: true,};
    } else {
      console.log('No profile found for this UID. Redirecting to onboarding...');
       return  { success: false, message:  'No profile found for this UID. Redirecting to onboarding....' }
    }
  } catch (error) {
    console.error('Error fetching user info:', error.message);
      return  { success: false, message: error.message || 'No user found with this phone number.' }
   
  }
};

export const getUserDataByPhone = async (phoneNumber) => {
  const usersRef = collection(db, 'users');

  try {
    // Create a query for the document where the 'phone' field matches
    const q = query(usersRef, where('phone', '==', phoneNumber));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming phone numbers are unique, take the first result
      const userDoc = querySnapshot.docs[0];
      console.log('User found:', userDoc.id, userDoc.data());
      return { id: userDoc.id, ...userDoc.data(), success: true, };
    } else {
      console.log('No user found with this phone number.');
      return  { success: false, message:'No user found with this phone number.' }
    }
  } catch (error) {
    console.error('Error querying user by phone:', error?.message);
     return  { success: false, message:error?.message || 'No user found with this phone number.' }
  }
};

export const setUserInfo = async (userID, data) => {
  try {
    const userDocRef = doc(db, 'users', userID);
  const dataa = {
          id: userID,
          userID: userID, // legacy reasons
          email: '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          username: data.username.toLowerCase() || '',
          phone: data?.phoneNumber || '',
          age: data?.age || '',
          profilePictureURL : '',
          location:  '',
          signUpLocation:  '',
          appIdentifier: DatingConfig.appIdentifier,
          signUpPlatform: Platform.OS,
          settings: {
            show_me: true,
            min: age,
            max: 100,
            distance_radius: 'Unlimited',
          },
          createdAt: serverTimestamp(), // Modular timestamp
          updatedAt: serverTimestamp(), // Modular timestamp
        };
    await setDoc(
      userDocRef,
      dataa,
      { merge: true }, // ✅ create if not exist + update if exist
    );

    return { success: true, user: dataa };
  } catch (error) {
    console.log('Update error:', error);
    return { success: false, message: error?.message || 'Update failed', error };
  }
};

export const getUserByID = async (userID) => {
  try {
    if (!userID) return null;

    const userDocRef = doc(db, 'users', userID);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }

    return null;
  } catch (error) {
    console.log('getUserByID error:', error);
    return null;
  }
};


export const fetchAndStorePushTokenIfPossible = async (userID) => {
  try {
    if (!userID) return;

    // ✅ Request permission (iOS mainly, Android 13+ also)
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Push permission status:', authStatus);

    if (!enabled) {
      console.log('Push notifications permission not granted');
      return;
    }

    // ✅ Get FCM token
    const token = await messaging().getToken();
    console.log('FCM token:', token);

    if (!token) return;

    // ✅ Store token in user profile
    await updateUserInfo(userID, {
      pushToken: token,
      pushKitToken: '',
      badgeCount: 0,
    });

  } catch (error) {
    console.log('fetchAndStorePushTokenIfPossible error:', error);
  }
};
