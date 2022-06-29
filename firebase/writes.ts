import {
  Timestamp, setDoc, doc, collection, addDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { IProfileData } from '../types/data';
import { PLANS } from '../types/enums';

export const writeUserLastHistoryItem = (
  uid: string,
  planId: string,
  newWeight: number,
) => {
  const historyCollectionRef = collection(db, 'users', uid, 'plans', planId, 'history');

  const todayDate = new Date(new Date().setHours(0, 0, 0, 0));

  addDoc(
    historyCollectionRef,
    {
      weightIn: newWeight,
      date: Timestamp.fromDate(new Date(todayDate)),
    },
  );
};

export const writeProfileData = (
  uid: string,
  profileData: IProfileData,
) => {
  const userRef = doc(db, 'users', uid);

  const dob = new Date(new Date(profileData.dob).setHours(0, 0, 0, 0));

  setDoc(
    userRef,
    {
      name: profileData.name,
      dob: Timestamp.fromDate(dob),
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

  const startDate = new Date(new Date().setHours(0, 0, 0, 0));

  addDoc(
    planRef,
    {
      active: true,
      type: PLANS.MAINTENANCE,
      startDate: Timestamp.fromDate(startDate),
      endDate,
      goalWeight: Number(goalWeight),
    },
  );
};
