import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import useAuthentification from './useAuthentification';
import useLog from './useLog';

const usePlan: any = () => {
  const { user } = useAuthentification();
  const [value, loading, error] = useCollection(
    query(
      collection(db, 'users', `${user?.uid}`, 'plans'),
      where('active', '==', true),
    ),
  );

  useLog(value?.docs[0].id);

  return {
    plan: value ? {
      id: value.docs[0].id,
      data: value.docs[0].data(),
    } : {
      activePlanId: null,
      plan: null,
    },
    loading,
    error,
  };
};

export default usePlan;
