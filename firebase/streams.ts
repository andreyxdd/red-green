import {
  onSnapshot, DocumentSnapshot, DocumentData, FirestoreError,
  doc, query, collection, QuerySnapshot, orderBy,
} from 'firebase/firestore';
import { db } from './firebase';

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

export const streamProfileData = (
  uid: string,
  snapshot: ((snapshot: DocumentSnapshot<DocumentData>) => void),
  error?: ((error: FirestoreError) => void),
) => {
  const userRef = doc(db, 'users', uid);
  return onSnapshot(userRef, {}, snapshot, error);
};
