import { StyleSheet } from 'react-native';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import PopupPlanMenu from '../../../components/Plan/PopupPlanMenu';
import HistoryPlot from '../../../components/Plan/HistoryPlot';
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
  const [plan, history] = useDataStore((state: IDataStore) => [state.plan, state.history], shallow);

  return (
    <View style={styles.container}>
      {plan && history
        ? (
          <>
            <Text style={styles.title}>{plan.type}</Text>
            <Text style={styles.title}>{plan.goalWeight}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <HistoryPlot />
          </>
        )
        : null}
      <PopupPlanMenu />
    </View>
  );
}
