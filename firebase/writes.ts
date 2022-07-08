import {
  Timestamp, setDoc, doc, collection, addDoc,
} from 'firebase/firestore';
import { eachDayOfInterval } from 'date-fns';
import { getDailyGoal } from '../utils/calculate';
import { db, batch } from './firebase';
import { IProfile } from '../types/data';
import { PLANS } from '../types/enums';

export const writeUserWeight = (uid: string, newWeight: number) => {
  const userRef = doc(db, 'users', uid);
  setDoc(
    userRef,
    { weight: newWeight },
    { merge: true },
  );
};

export const writeUserHistoryItem = (
  uid: string,
  planId: string,
  historyItemId: string,
  weighIn: number,
) => {
  const historyItemRef = doc(db, 'users', uid, 'plans', planId, 'history', historyItemId);
  setDoc(
    historyItemRef,
    { weighIn },
    { merge: true },
  );
};

export const writeProfileData = (
  uid: string,
  profile: IProfile,
) => {
  const userRef = doc(db, 'users', uid);
  const dob = new Date(new Date(profile.dob).setHours(0, 0, 0, 0));

  setDoc(
    userRef,
    {
      name: profile.name,
      dob: Timestamp.fromDate(dob),
      units: profile.units,
      height: profile.height,
      weight: profile.weight,
    },
    { merge: true },
  );
};

export const writeMaintenancePlan = async (
  uid: string,
  goalWeight: { kg: number; kgFraction: number; },
  goalDate: Date,
) => {
  const planRef = collection(db, 'users', uid, 'plans');
  const startDate = new Date(new Date().setHours(0, 0, 0, 0));
  const endDate = new Date(goalDate.setHours(0, 0, 0, 0));

  const planDates = eachDayOfInterval(
    { start: startDate, end: endDate },
  );

  const res = await addDoc(
    planRef,
    {
      active: true,
      type: PLANS.MAINTENANCE,
      startDate: Timestamp.fromDate(startDate),
      goalDate: Timestamp.fromDate(endDate),
      goalWeight: goalWeight.kg + goalWeight.kgFraction / 10,
    },
  );

  const historyRef = collection(db, 'users', uid, 'plans', res.id, 'history');

  planDates.forEach((date) => {
    const newDocRef = doc(historyRef);
    batch.set(newDocRef, {
      dailyGoal: goalWeight,
      date,
    });
  });

  await batch.commit();
};

export const writeLosingPlan = async (
  uid: string,
  goalWeight: { kg: number; kgFraction: number; },
  goalDate: Date,
  startWeight: { kg: number; kgFraction: number; },
) => {
  const planRef = collection(db, 'users', uid, 'plans');
  const startDate = new Date(new Date().setHours(0, 0, 0, 0));
  const endDate = new Date(goalDate.setHours(0, 0, 0, 0));

  const planDates = eachDayOfInterval(
    { start: startDate, end: endDate },
  );
  const duration = planDates.length;

  const res = await addDoc(
    planRef,
    {
      active: true,
      type: PLANS.LOSING,
      startDate: Timestamp.fromDate(startDate),
      goalDate: Timestamp.fromDate(endDate),
      goalWeight: goalWeight.kg + goalWeight.kgFraction / 10,
    },
  );

  const historyRef = collection(db, 'users', uid, 'plans', res.id, 'history');

  let prevDailyGoal = startWeight.kg + startWeight.kgFraction / 10;
  planDates.forEach((date) => {
    const newDocRef = doc(historyRef);
    const dailyGoal = getDailyGoal(
      Number(prevDailyGoal),
      Number(startWeight.kg + startWeight.kgFraction / 10),
      Number(goalWeight.kg + goalWeight.kgFraction / 10),
      duration,
    );
    batch.set(newDocRef, { dailyGoal, date });
    prevDailyGoal = dailyGoal;
  });

  await batch.commit();
};

export const writePlanStatus = (uid: string, planId: string) => {
  const planRef = doc(db, 'users', uid, 'plans', planId);
  setDoc(
    planRef,
    { active: false },
    { merge: true },
  );
};
