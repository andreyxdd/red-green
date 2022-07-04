import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, writeBatch } from 'firebase/firestore';
import Constants from 'expo-constants';

// App's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize firebase firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize firebase firestore and get a reference to the service
export const batch = writeBatch(db);

// auth functionality
export const auth = getAuth();
getAuth().useDeviceLanguage();
