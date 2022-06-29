import { StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import useInterfaceStore, { IInterfaceStore } from '../../../hooks/useInterfaceStore';
import TodaysRecommendations from '../../../components/TodayTab/TodaysRecommendations';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
});

function TodayScreen() {
  const sign = useInterfaceStore((state:IInterfaceStore) => state.sign);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {sign
        ? <TodaysRecommendations sign={sign} />
        : (
          <View style={[styles.container, { width: '80%', alignSelf: 'center' }]}>
            <Subheading style={{ width: '100%', marginVertical: 12, textAlign: 'center' }}>
              No Active plans
            </Subheading>
          </View>
        )}
    </View>
  );
}

export default TodayScreen;
