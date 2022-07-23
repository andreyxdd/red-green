import {
  Timestamp, setDoc, doc, collection, addDoc, getDoc, writeBatch,
} from 'firebase/firestore';
import { eachDayOfInterval } from 'date-fns';
import { getDailyGoal, getRelativeChange } from '../utils/calculate';
import { db } from './firebase';
import { IProfile, IBodyMeasure, IHistoryItem } from '../types/data';
import { PLANS, SIGNS } from '../types/enums';

export const writeProfileData = (
  uid: string,
  profile: IProfile,
) => {
  const userDocRef = doc(db, 'users', uid);
  const dob = new Date(new Date(profile.dob).setHours(0, 0, 0, 0));

  setDoc(
    userDocRef,
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
  goalWeight: IBodyMeasure,
  goalDate: Date,
) => {
  try {
    // Initialize new batch write object
    const batch = writeBatch(db);

    const plansCollectionRef = collection(db, 'users', uid, 'plans');
    const startDate = new Date(new Date().setHours(0, 0, 0, 0));
    const endDate = new Date(goalDate.setHours(0, 0, 0, 0));

    const planDates = eachDayOfInterval(
      { start: startDate, end: endDate },
    );

    const res = await addDoc(
      plansCollectionRef,
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
        dailyGoal: {
          METRIC: goalWeight.METRIC.integer + goalWeight.METRIC.fraction / 10,
          IMPERIAL: goalWeight.IMPERIAL.integer + goalWeight.IMPERIAL.fraction / 10,
        },
        date,
      });
    });
    await batch.commit();
  } catch (e) {
    console.log('Error', 'New plan was not created, something went wrong', e);
  }
};

export const writeLosingWeightPlan = async (
  uid: string,
  goalWeight: IBodyMeasure,
  goalDate: Date,
  startWeight: IBodyMeasure,
) => {
  // Initialize new batch write object
  const batch = writeBatch(db);

  const plansCollectionRef = collection(db, 'users', uid, 'plans');
  const startDate = new Date(new Date().setHours(0, 0, 0, 0));
  const endDate = new Date(goalDate.setHours(0, 0, 0, 0));

  const planDates = eachDayOfInterval({ start: startDate, end: endDate });
  const duration = planDates.length;

  const res = await addDoc(
    plansCollectionRef,
    {
      active: true,
      type: PLANS.LOSING,
      startDate: Timestamp.fromDate(startDate),
      goalDate: Timestamp.fromDate(endDate),
      goalWeight,
    },
  );

  const historyRef = collection(db, 'users', uid, 'plans', res.id, 'history');

  let prevDailyGoal = {
    METRIC: startWeight.METRIC.integer + startWeight.METRIC.fraction / 10,
    IMPERIAL: startWeight.IMPERIAL.integer + startWeight.IMPERIAL.fraction / 10,
  };

  planDates.forEach((date) => {
    const newDocRef = doc(historyRef);

    const nextDailyGoalMetric = getDailyGoal(
      Number(prevDailyGoal.METRIC),
      Number(startWeight.METRIC.integer + startWeight.METRIC.fraction / 10),
      Number(goalWeight.METRIC.integer + goalWeight.METRIC.fraction / 10),
      duration,
    );

    const nextDailyGoalImperial = getDailyGoal(
      Number(prevDailyGoal.IMPERIAL),
      Number(startWeight.IMPERIAL.integer + startWeight.IMPERIAL.fraction / 10),
      Number(goalWeight.IMPERIAL.integer + goalWeight.IMPERIAL.fraction / 10),
      duration,
    );

    const dailyGoal = {
      METRIC: Math.round((nextDailyGoalMetric + Number.EPSILON) * 10) / 10,
      IMPERIAL: Math.round((nextDailyGoalImperial + Number.EPSILON) * 10) / 10,
    };

    batch.set(newDocRef, {
      dailyGoal,
      date,
    });

    prevDailyGoal = dailyGoal;
  });

  await batch.commit();
};

export const writeUserHistoryItem = async (
  uid: string,
  planId: string,
  historyItemId: string,
  weighIn: IBodyMeasure,
  isImperialUnits: boolean,
) => {
  const historyItemRef = doc(db, 'users', uid, 'plans', planId, 'history', historyItemId);
  const historyItemDocSnap = await getDoc(historyItemRef);

  let sign: SIGNS;
  if (historyItemDocSnap.exists()) {
    const { dailyGoal } = historyItemDocSnap.data() as IHistoryItem;

    let relativeChange: number;
    if (!dailyGoal) return;

    if (isImperialUnits) {
      relativeChange = getRelativeChange(
        dailyGoal.IMPERIAL,
        weighIn.IMPERIAL.integer + weighIn.IMPERIAL.fraction / 10,
      );
    } else {
      relativeChange = getRelativeChange(
        dailyGoal.METRIC,
        weighIn.METRIC.integer + weighIn.METRIC.fraction / 10,
      );
    }

    if (relativeChange > 2.0) {
      sign = SIGNS.RED;
    } else if (relativeChange < 0.0) {
      sign = SIGNS.GREEN;
    } else {
      sign = SIGNS.YELLOW;
    }

    setDoc(
      historyItemRef,
      { weighIn, sign },
      { merge: true },
    );
  } else {
    // doc.data() will be undefined in this case
    console.log('No history item found!');
  }
};

export const writeUserWeight = (uid: string, newWeight: IBodyMeasure) => {
  const userRef = doc(db, 'users', uid);
  setDoc(
    userRef,
    { weight: newWeight },
    { merge: true },
  );
};

// to be updated is below

export const writePlanStatus = (uid: string, planId: string) => {
  try {
    const planRef = doc(db, 'users', uid, 'plans', planId);
    setDoc(
      planRef,
      { active: false },
      { merge: true },
    );
  } catch (e) {
    console.log('Error', 'New plan was not created, something went wrong', e);
  }
};
