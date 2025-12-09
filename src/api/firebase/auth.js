import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { ErrorCode } from '../../utils/ErrorCode';

const usersRef = firestore().collection('users');

/**
 * Upload profile picture to Firebase Storage
 */
const uploadProfilePicture = (userId, photoFile) => {
  return new Promise((resolve, reject) => {
    if (!photoFile || !photoFile.uri) {
      resolve('');
      return;
    }

    const filename = `profile_pictures/${userId}_${Date.now()}.jpg`;
    const reference = storage().ref(filename);

    reference
      .putFile(photoFile.uri)
      .then(() => reference.getDownloadURL())
      .then(url => resolve(url))
      .catch(error => {
        console.error('Profile upload error:', error);
        reject({ code: ErrorCode.photoUploadFailed });
      });
  });
};

/**
 * Create user document in Firestore
 */
const createUserInFirestore = (userId, userDetails, profilePictureURL, appIdentifier) => {
  return new Promise((resolve, reject) => {
    const timestamp = firestore.FieldValue.serverTimestamp();

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
      createdAt: timestamp,
    };

    usersRef
      .doc(userId)
      .set(userData)
      .then(() => resolve(userData))
      .catch(error => {
        console.error('Firestore error:', error);
        reject({ code: ErrorCode.serverError });
      });
  });
};

/**
 * Register new user
 */
export const register = (userDetails, appIdentifier) => {
  const { email, password, firstName, lastName, photoFile } = userDetails;

  return new Promise((resolve) => {
    let userId = null;

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        userId = response.user.uid;
        return uploadProfilePicture(userId, photoFile);
      })
      .then(profilePictureURL => {
        return createUserInFirestore(userId, userDetails, profilePictureURL, appIdentifier);
      })
      .then(userData => {
        const displayName = `${firstName} ${lastName}`.trim();
        return auth()
          .currentUser
          .updateProfile({
            displayName: displayName,
            photoURL: userData.profilePictureURL,
          })
          .then(() => userData);
      })
      .then(userData => {
        resolve({ user: userData });
      })
      .catch(error => {
        console.error('Registration error:', error);

        let errorCode = ErrorCode.serverError;

        switch (error.code) {
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
          case ErrorCode.photoUploadFailed:
            errorCode = ErrorCode.photoUploadFailed;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }

        resolve({ error: errorCode });
      });
  });
};

/**
 * Login with email and password
 */
export const login = (email, password) => {
  return new Promise((resolve) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        return usersRef.doc(uid).get();
      })
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          resolve({ error: ErrorCode.noUser });
          return;
        }

        const user = firestoreDocument.data();
        resolve({ user });
      })
      .catch(error => {
        console.error('Login error:', error);

        let errorCode = ErrorCode.serverError;

        switch (error.code) {
          case 'auth/wrong-password':
            errorCode = ErrorCode.invalidPassword;
            break;
          case 'auth/user-not-found':
            errorCode = ErrorCode.noUser;
            break;
          case 'auth/invalid-email':
            errorCode = ErrorCode.badEmailFormat;
            break;
          case 'auth/user-disabled':
            errorCode = ErrorCode.noUser;
            break;
          case 'auth/too-many-requests':
            errorCode = ErrorCode.rateLimited;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }

        resolve({ error: errorCode });
      });
  });
};

/**
 * Logout current user
 */
export const logout = () => {
  return auth()
    .signOut()
    .catch(error => {
      console.error('Logout error:', error);
      throw error;
    });
};

/**
 * Get current user data from Firestore
 */
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      resolve(null);
      return;
    }

    usersRef
      .doc(currentUser.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          resolve(null);
          return;
        }
        resolve(doc.data());
      })
      .catch(error => {
        console.error('Get user error:', error);
        reject(error);
      });
  });
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = (email) => {
  return new Promise((resolve) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve({ success: true });
      })
      .catch(error => {
        console.error('Password reset error:', error);

        let errorCode = ErrorCode.serverError;

        switch (error.code) {
          case 'auth/user-not-found':
            errorCode = ErrorCode.noUser;
            break;
          case 'auth/invalid-email':
            errorCode = ErrorCode.badEmailFormat;
            break;
          case 'auth/too-many-requests':
            errorCode = ErrorCode.rateLimited;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }

        resolve({ error: errorCode });
      });
  });
};

/**
 * Update user password
 */
export const updateUserPassword = (newPassword) => {
  return new Promise((resolve) => {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      resolve({ error: ErrorCode.noUser });
      return;
    }

    currentUser
      .updatePassword(newPassword)
      .then(() => {
        resolve({ success: true });
      })
      .catch(error => {
        console.error('Update password error:', error);

        let errorCode = ErrorCode.serverError;

        switch (error.code) {
          case 'auth/weak-password':
            errorCode = ErrorCode.invalidPassword;
            break;
          case 'auth/requires-recent-login':
            errorCode = ErrorCode.requiresRecentLogin;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }

        resolve({ error: errorCode });
      });
  });
};

/**
 * Re-authenticate user
 */
export const reauthenticate = (password) => {
  return new Promise((resolve) => {
    const currentUser = auth().currentUser;

    if (!currentUser || !currentUser.email) {
      resolve({ error: ErrorCode.noUser });
      return;
    }

    const credential = auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        resolve({ success: true });
      })
      .catch(error => {
        console.error('Re-authentication error:', error);

        let errorCode = ErrorCode.serverError;

        switch (error.code) {
          case 'auth/wrong-password':
            errorCode = ErrorCode.invalidPassword;
            break;
          case 'auth/user-not-found':
            errorCode = ErrorCode.noUser;
            break;
          case 'auth/too-many-requests':
            errorCode = ErrorCode.rateLimited;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }

        resolve({ error: errorCode });
      });
  });
};