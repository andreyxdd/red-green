import {
  doc, collection, deleteDoc, CollectionReference, DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';
import { IHistoryItem } from '../types/data';

export const deleteHistoryByRef = async (
  historyRef: CollectionReference<DocumentData>,
  history: Array<IHistoryItem>,
) => {
  history.forEach(async (item: IHistoryItem) => {
    await deleteDoc(doc(historyRef, item.id));
  });
};

export const deleteHistoryByIds = async (
  uid: string,
  planId: string,
  history: Array<IHistoryItem>,
) => {
  const historyRef = collection(db, 'users', uid, 'plans', planId, 'history');

  await deleteHistoryByRef(historyRef, history);
};

export const deletePlan = async (
  uid: string,
  planId: string,
) => {
  const planRef = doc(db, 'users', uid, 'plans', planId);

  await deleteDoc(planRef);
};
