import { StyleSheet } from 'react-native';

import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import useStore, { IStore } from '../../../hooks/useStore';
import PopupPlanMenu from '../../../components/PopupPlanMenu';
import { Text, View } from '../../../components/Themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function PlanScreen() {
  const uid = useStore((state: IStore) => state.uid);
  const [value, loading, error] = useCollection(
    collection(db, 'users', uid!, 'plans'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <View style={styles.container}>
      {value && !loading && !error
        ? <Text style={styles.title}>{value.docs[0].data()?.type}</Text>
        : null}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <PopupPlanMenu />
    </View>
  );
}
