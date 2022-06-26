// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, onSnapshot, DocumentSnapshot,
  DocumentData, FirestoreError, Timestamp,
  setDoc, doc, getDoc, query, collection, QuerySnapshot, orderBy, addDoc,
} from 'firebase/firestore';
import Constants from 'expo-constants';
import { IProfileData, PLANS, UNITS } from './types';

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
    { weight: newWeight },
    { merge: true },
  );
};

export const updateUserLastHistoryItem = (
  uid: string,
  planId: string,
  historyItemId: string,
  newWeight: number,
) => {
  const historyItemRef = doc(db, 'users', uid, 'plans', planId, 'history', historyItemId);
  setDoc(
    historyItemRef,
    { weightIn: newWeight },
    { merge: true },
  );
};

export const updateUserPlan = (
  uid: string,
  planId: string,
  newEndDate: Date,
) => {
  const planRef = doc(db, 'users', uid, 'plans', planId);

  setDoc(
    planRef,
    { endDate: new Date(newEndDate.setHours(0, 0, 0, 0)) },
    { merge: true },
  );
};

export const getUserData = (uid: string) => {
  const userRef = doc(db, 'users', uid);
  return getDoc(userRef);
};

export const streamHistory = (
  uid: string,
  planId: string,
  snapshot: ((snapshot: QuerySnapshot<DocumentData>) => void),
  error?: ((error: FirestoreError) => void),
) => {
  const historyQuery = query(
    collection(db, 'users', uid, 'plans', planId, 'history'),
    orderBy('date', 'desc'),
    // where('date', '==', new Date(new Date().toDateString())),
  );
  return onSnapshot(
    historyQuery,
    {},
    snapshot,
    error,
  );
};

export const streamPlans = (
  uid: string,
  snapshot: ((snapshot: QuerySnapshot<DocumentData>) => void),
  error?: ((error: FirestoreError) => void),
) => {
  const plansQuery = query(
    collection(db, 'users', uid, 'plans'),
    orderBy('active', 'desc'),
    orderBy('startDate', 'desc'),
  );

  return onSnapshot(
    plansQuery,
    {},
    snapshot,
    error,
  );
};

export const writeUserLastHistoryItem = (
  uid: string,
  planId: string,
  newWeight: number,
) => {
  const historyRef = collection(db, 'users', uid, 'plans', planId, 'history');

  const todayDate = new Date(new Date().setHours(0, 0, 0, 0));

  console.log(newWeight);

  addDoc(
    historyRef,
    {
      weightIn: newWeight,
      date: Timestamp.fromDate(new Date(todayDate)),
    },
  );
};

export const streamProfileData = (
  uid: string,
  snapshot: ((snapshot: DocumentSnapshot<DocumentData>) => void),
  error?: ((error: FirestoreError) => void),
) => {
  const userRef = doc(db, 'users', uid);
  return onSnapshot(userRef, {}, snapshot, error);
};

export const writeProfileData = (
  uid: string,
  profileData: IProfileData,
) => {
  const userRef = doc(db, 'users', uid, 'plans');

  setDoc(
    userRef,
    {
      name: profileData.name,
      dob: new Date(new Date(profileData.dob).setHours(0, 0, 0, 0)),
      units: 'METRIC',
      height: profileData.height,
      weight: profileData.weight,
    },
    { merge: true },
  );
};

export const writeMaintenancePlan = (
  uid: string,
  endDate: Date,
  goalWeight: number,
) => {
  const planRef = collection(db, 'users', uid, 'plans');

  addDoc(
    planRef,
    {
      active: true,
      type: PLANS.MAINTENANCE,
      startDate: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate,
      goalWeight: Number(goalWeight),
    },
  );
};
