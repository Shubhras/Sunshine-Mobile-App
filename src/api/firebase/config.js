import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCtDwPCSkceMEATphGazIRErwv6i-9-kx8',
  authDomain: 'sun-sign-inc-1e12b.firebaseapp.com',
  databaseURL: 'https://sun-sign-inc-1e12b-default-rtdb.firebaseio.com',
  projectId: 'sun-sign-inc-1e12b',
  storageBucket: 'sun-sign-inc-1e12b.appspot.com',
  messagingSenderId: '131127142993',
  appId: '1:131127142993:web:0ca872d8d0df64ccd86670',
  measurementId: 'G-3K1MRBGXJY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (React Native persistence)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
const db = getFirestore(app);

// Storage
const storage = getStorage(app);

export { app, auth, db, storage };
