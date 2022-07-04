import {
  Timestamp, setDoc, doc, collection,
} from 'firebase/firestore';
import { eachDayOfInterval } from 'date-fns';
import { getDailyGoal } from '../utils/calculate';
import { db, batch } from './firebase';
import { IHistoryItem } from '../types/data';
import { PLANS } from '../types/enums';
// import { deleteHistoryByRef } from './deletes';

export const updateMaintenancePlan = async (
  uid: string,
  planId: string,
  history: Array<IHistoryItem>,
  goalWeight: number,
  goalDate: Date,
) => {
  const planRef = doc(db, 'users', uid, 'plans', planId);

  await setDoc(
    planRef,
    {
      active: true,
      type: PLANS.MAINTENANCE,
      goalDate: Timestamp.fromDate(goalDate),
      goalWeight: Number(goalWeight),
    },
    { merge: true },
  );

  const historyRef = collection(db, 'users', uid, 'plans', planId, 'history');

  history.forEach((item) => {
    const historyItemRef = doc(historyRef, item.id);
    batch.set(
      historyItemRef,
      { dailyGoal: goalWeight },
      { merge: true },
    );
  });

  /* planDates.forEach((date) => {
    const historyItem = history.find(
      (item) => new Date(item.date).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0),
    );

    const newDocRef = doc(historyRef);
    set(newDocRef, {
      dailyGoal: goalWeight,
      date: Timestamp.fromDate(new Date(new Date(date).setHours(0, 0, 0, 0))),
      weighIn: historyItem?.weighIn,
    });
  });

  console.log('here');
  await deleteHistoryByRef(historyRef, history);
  */

  await batch.commit();
};

export const updateLosingPlan = async (
  uid: string,
  planId: string,
  history: Array<IHistoryItem>,
  startDate: Date,
  goalWeight: number,
  goalDate: Date,
  startWeight: number,
) => {
  const planRef = doc(db, 'users', uid, 'plans', planId);

  const planDates = eachDayOfInterval(
    { start: startDate, end: goalDate },
  );
  const duration = planDates.length;

  await setDoc(
    planRef,
    {
      active: true,
      type: PLANS.LOSING,
      startDate: Timestamp.fromDate(startDate),
      goalDate: Timestamp.fromDate(goalDate),
      goalWeight: Number(goalWeight),
    },
    { merge: true },
  );

  const historyRef = collection(db, 'users', uid, 'plans', planId, 'history');

  const prevDailyGoal = startWeight;
  planDates.forEach((date) => {
    const historyItem = history.find(
      (item) => new Date(item.date).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0),
    );

    if (historyItem) {
      const historyItemRef = doc(historyRef, historyItem.id);
      const dailyGoal = getDailyGoal(
        Number(prevDailyGoal),
        Number(startWeight),
        Number(goalWeight),
        duration,
      );

      batch.set(
        historyItemRef,
        { dailyGoal },
        { merge: true },
      );
    }
  });

  /*
  let prevDailyGoal = startWeight;
  planDates.forEach((date) => {
    const historyItem = history.find(
      (item) => new Date(item.date).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0),
    );

    const newDocRef = doc(historyRef);
    const dailyGoal = getDailyGoal(
      Number(prevDailyGoal),
      Number(startWeight),
      Number(goalWeight),
      duration,
    );
    batch.set(newDocRef, {
      dailyGoal,
      date: Timestamp.fromDate(new Date(new Date(date).setHours(0, 0, 0, 0))),
      weighIn: historyItem?.weighIn,
    });
    prevDailyGoal = dailyGoal;
  });

  await deleteHistoryByRef(historyRef, history);
  */

  await batch.commit();
};
