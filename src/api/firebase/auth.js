// firebase/auth.js
import { auth, db, storage } from './config';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail as sendResetEmail,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ErrorCode } from '../../utils/ErrorCode';

const usersRef = collection(db, 'users');

// ------------------------------
// Upload profile picture
// ------------------------------
const uploadProfilePicture = async (userId, photoFile) => {
  if (!photoFile?.uri) return '';
  const filename = `profile_pictures/${userId}_${Date.now()}.jpg`;
  const storageRef = ref(storage, filename);
  const blob = await (await fetch(photoFile.uri)).blob();

  return uploadBytes(storageRef, blob)
    .then(() => getDownloadURL(storageRef))
    .catch(() => ({ error: ErrorCode.photoUploadFailed }));
};

// ------------------------------
// Create Firestore user
// ------------------------------
const createUserInFirestore = async (
  userId,
  userDetails,
  profilePictureURL,
  appIdentifier,
) => {
  const userData = {
    id: userId,
    userID: userId,
    email: userDetails.email || '',
    firstName: userDetails.firstName || '',
    lastName: userDetails.lastName || '',
    username: userDetails.username?.toLowerCase() || '',
    phone: userDetails.phone || '',
    age: userDetails.age || '',
    profilePictureURL: profilePictureURL || '',
    location: userDetails.location || '',
    signUpLocation: userDetails.signUpLocation || '',
    appIdentifier: appIdentifier || '',
    createdAt: serverTimestamp(),
  };

  const userDocRef = doc(usersRef, userId);
  return setDoc(userDocRef, userData)
    .then(() => userData)
    .catch(() => ({ error: ErrorCode.serverError }));
};

// ------------------------------
// Register
// ------------------------------
export const register = async (userDetails, appIdentifier) => {
  const { email, password, firstName, lastName, photoFile } = userDetails;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  ).catch(error => ({ error }));

  if (userCredential?.error) {
    let errorCode = ErrorCode.serverError;
    switch (userCredential.error.code) {
      case 'auth/email-already-in-use':
        errorCode = ErrorCode.emailInUse;
        break;
      case 'auth/invalid-email':
        errorCode = ErrorCode.badEmailFormat;
        break;
      case 'auth/weak-password':
        errorCode = ErrorCode.invalidPassword;
        break;
      case 'auth/too-many-requests':
        errorCode = ErrorCode.rateLimited;
        break;
    }
    return { error: errorCode };
  }

  const userId = userCredential.user.uid;

  const profilePictureURL = await uploadProfilePicture(userId, photoFile);
  if (profilePictureURL?.error) return { error: profilePictureURL.error };

  const userData = await createUserInFirestore(
    userId,
    userDetails,
    profilePictureURL,
    appIdentifier,
  );
  if (userData?.error) return { error: userData.error };

  await updateProfile(auth.currentUser, {
    displayName: `${firstName} ${lastName}`.trim(),
    photoURL: profilePictureURL,
  }).catch(() => null);

  return { user: userData };
};

// ------------------------------
// Login
// ------------------------------
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  ).catch(error => ({ error }));

  if (userCredential?.error) {
    let errorCode = ErrorCode.serverError;
    switch (userCredential.error.code) {
      case 'auth/wrong-password':
        errorCode = ErrorCode.invalidPassword;
        break;
      case 'auth/user-not-found':
        errorCode = ErrorCode.noUser;
        break;
      case 'auth/invalid-email':
        errorCode = ErrorCode.badEmailFormat;
        break;
      case 'auth/too-many-requests':
        errorCode = ErrorCode.rateLimited;
        break;
    }
    return { error: errorCode };
  }

  const userDoc = await getDoc(doc(usersRef, userCredential.user.uid)).catch(
    () => ({ error: ErrorCode.serverError }),
  );

  if (userDoc?.error) return { error: userDoc.error };
  if (!userDoc.exists()) return { error: ErrorCode.noUser };

  return { user: userDoc.data() };
};

// ------------------------------
// Logout
// ------------------------------
export const logout = async () => {
  return auth
    .signOut()
    .then(() => ({ success: true }))
    .catch(() => ({ error: ErrorCode.serverError }));
};

// ------------------------------
// Get current user
// ------------------------------
export const getCurrentUser = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;

  const docSnap = await getDoc(doc(usersRef, currentUser.uid)).catch(
    () => null,
  );
  if (!docSnap?.exists()) return null;

  return docSnap.data();
};

// ------------------------------
// Send password reset
// ------------------------------
export const sendPasswordResetEmail = async email => {
  return sendResetEmail(auth, email)
    .then(() => ({ success: true }))
    .catch(error => {
      let errorCode = ErrorCode.serverError;
      switch (error?.code) {
        case 'auth/user-not-found':
          errorCode = ErrorCode.noUser;
          break;
        case 'auth/invalid-email':
          errorCode = ErrorCode.badEmailFormat;
          break;
        case 'auth/too-many-requests':
          errorCode = ErrorCode.rateLimited;
          break;
      }
      return { error: errorCode };
    });
};
