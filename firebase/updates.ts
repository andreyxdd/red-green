import { setDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export const updateUserWeight = (uid: string, newWeight: number) => {
  const userRef = doc(db, 'users', uid);
  setDoc(
    userRef,
    { weight: newWeight },
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
