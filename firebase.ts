// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, onSnapshot, DocumentSnapshot,
  DocumentData, FirestoreError, getDocs,
  setDoc, doc, getDoc, query, where, collection, QuerySnapshot, orderBy,
} from 'firebase/firestore';
import Constants from 'expo-constants';
import { UNITS } from './types';

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
export const streamUser = (
  uid: string,
  snapshot: ((snapshot: DocumentSnapshot<DocumentData>) => void),
  error?: ((error: FirestoreError) => void),
) => {
  const userCounterQuery = doc(db, 'users', uid);
  return onSnapshot(userCounterQuery, snapshot, error);
};

export const updateUserCounter = (uid: string, newCount: number) => {
  const userRef = doc(db, 'users', uid);
  setDoc(
    userRef,
    { counter: newCount },
    { merge: true },
  );
};

export const updateUserName = (uid: string, newName: string) => {
  const userRef = doc(db, 'users', uid);
  setDoc(
    userRef,
    { name: newName },
    { merge: true },
  );
};

export const updateUserDOB = (uid: string, newDOB: Date) => {
  const userRef = doc(db, 'users', uid);
  setDoc(
    userRef,
    { dob: newDOB },
    { merge: true },
  );
};

const heightConverter = 30.48;
function adjustHeight(currentUnits: UNITS, height: number) {
  if (currentUnits === UNITS.IMPERIAL) {
    return height / heightConverter;
  }
  return height * heightConverter;
}

const weightConverter = 2.20462;
function adjustWeight(currentUnits: UNITS, weight: number) {
  if (currentUnits === UNITS.IMPERIAL) {
    return weight * weightConverter;
  }
  return weight / weightConverter;
}

export const updateUserUnits = async (
  uid: string,
  newUnits: UNITS,
  height: number,
  weight: number,
) => {
  const userRef = doc(db, 'users', uid);

  setDoc(
    userRef,
    {
      units: newUnits,
      height: adjustHeight(newUnits, height),
      weight: adjustWeight(newUnits, weight),
    },
    { merge: true },
  );
};

export const updateUserHeight = (uid: string, newHeight: number) => {
  const userRef = doc(db, 'users', uid);
  setDoc(
    userRef,
    { height: newHeight },
    { merge: true },
  );
};

export const updateUserWeight = (uid: string, newWeight: number) => {
  const userRef = doc(db, 'users', uid);
  setDoc(
    userRef,
    { Weight: newWeight },
    { merge: true },
  );
};

export const getUserData = (uid: string) => {
  const userRef = doc(db, 'users', uid);
  return getDoc(userRef);
};

export const streamHistory = async (
  uid: string,
  snapshot: ((snapshot: QuerySnapshot<DocumentData>) => void),
  error?: ((error: FirestoreError) => void),
) => {
  const plansQuery = query(
    collection(db, 'users', uid, 'plans'),
    where('active', '==', true),
  );
  const querySnapshot = await getDocs(plansQuery);

  if (querySnapshot.docs[0]) {
    const activePlanId = querySnapshot.docs[0].id;

    const historyQuery = query(
      collection(db, 'users', uid, 'plans', activePlanId, 'history'),
      orderBy('date', 'desc'),
      // where('date', '==', new Date(new Date().toDateString())),
    );
    return onSnapshot(
      historyQuery,
      {},
      snapshot,
      error,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => { };
};
