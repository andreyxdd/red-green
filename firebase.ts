// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, onSnapshot, DocumentSnapshot,
  DocumentData, FirestoreError,
  setDoc, doc,
} from 'firebase/firestore';
import Constants from 'expo-constants';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// auth functionality
export const auth = getAuth();
getAuth().useDeviceLanguage();

// ---
export const streamUserCounter = (
  uid: string,
  snapshot: ((snapshot: DocumentSnapshot<DocumentData>) => void),
  error?: ((error: FirestoreError) => void),
) => {
  const userCounterQuery = doc(db, 'users', uid);
  return onSnapshot(userCounterQuery, snapshot, error);
};

export const updateUserCounter = (uid: string, newCount: number) => {
  const userRef = doc(db, 'users', uid);
  setDoc(userRef, {
    counter: newCount,
  });
};
