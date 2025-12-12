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
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { ErrorCode } from '../../utils/ErrorCode';
import { Images } from '../../constants/images';

const usersRef = firestore().collection('users');
const timestamp = serverTimestamp();
const db = getFirestore(); // Modular DB instance
const auth = getAuth();

export const register = (userDetails, appIdentifier) => {
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
          appIdentifier,
          createdAt: timestamp, // Modular timestamp
        };

        setDoc(userDocRef, data) // Modular set
          .then(() => {
            resolve({ user: data });
          })
          .catch(error => {
            alert(error);
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

export const loginWithEmailAndPassword = async (email, password) => {
  return new Promise((resolve) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        const uid = response.user.uid;
        // const db = getFirestore();
        const userDocRef = doc(db, 'users', uid);  // Modular doc ref

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
          case 'auth/invalid-credential':  // Common in newer SDKs for wrong password
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
  return new Promise((resolve) => {

    const userDocRef = doc(db, 'users', userID);  // Modular doc ref

    updateDoc(userDocRef, { profilePictureURL })
      .then(() => {
        resolve({ success: true });
      })
      .catch(error => {
        console.error('Update error:', error);  // Optional: better logging
        resolve({ error });
      });
  });
};
