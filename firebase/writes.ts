import {
  Timestamp, setDoc, doc, collection, addDoc, getDoc,
} from 'firebase/firestore';
import { eachDayOfInterval } from 'date-fns';
import { getDailyGoal, getRelativeChange } from '../utils/calculate';
import { db, batch } from './firebase';
import { IProfile, IWeight } from '../types/data';
import { PLANS, SIGNS } from '../types/enums';
import { getWeightInterface } from '../utils/conversions';

export const writeUserWeight = (uid: string, newWeight: IWeight) => {
  const userRef = doc(db, 'users', uid);
  setDoc(
    userRef,
    { weight: newWeight },
    { merge: true },
  );
};

export const writeUserHistoryItem = async (
  uid: string,
  planId: string,
  historyItemId: string,
  weighIn: IWeight,
) => {
  const historyItemRef = doc(db, 'users', uid, 'plans', planId, 'history', historyItemId);

  const docSnap = await getDoc(historyItemRef);

  let sign;
  if (docSnap.exists()) {
    const { dailyGoal } = docSnap.data();

    const relativeChange = getRelativeChange(
      dailyGoal.kg + dailyGoal.kgFraction / 10,
      weighIn.kg + weighIn.kgFraction / 10,
    );

    if (relativeChange > 2.0) {
      sign = SIGNS.RED;
    } else if (relativeChange < 0.0) {
      sign = SIGNS.GREEN;
    } else {
      sign = SIGNS.YELLOW;
    }
  } else {
    // doc.data() will be undefined in this case
    console.log('No history item found!');
  }

  setDoc(
    historyItemRef,
    { weighIn, sign },
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
      goalWeight,
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
      goalWeight,
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
    const [kg, kgFraction] = getWeightInterface(dailyGoal);
    batch.set(newDocRef, { dailyGoal: { kg, kgFraction }, date });
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
