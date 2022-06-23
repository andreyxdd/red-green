import { StyleSheet } from 'react-native';
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
  const plan = useStore((state: IStore) => state.plan);
  const history = useStore((state: IStore) => state.history);

  return (
    <View style={styles.container}>
      {plan && history
        ? (
          <>
            <Text style={styles.title}>{plan.type}</Text>
            <Text style={styles.title}>{plan.goalWeight}</Text>
            <View style={{ paddingVertical: 20 }}>
              {history.map((historyItem) => (
                <View key={historyItem.id}>
                  <Text>{historyItem.date.toDateString()}</Text>
                  <Text>{historyItem.weightIn}</Text>
                </View>
              ))}
            </View>
          </>
        )
        : null}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <PopupPlanMenu />
    </View>
  );
}
