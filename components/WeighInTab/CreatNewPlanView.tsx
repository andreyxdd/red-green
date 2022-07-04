import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import Greeting from './Greeting';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  button: { width: '80%', paddingVertical: 4, marginVertical: 4 },
  text: { width: '100%', marginVertical: 20, textAlign: 'center' },
});

function CreateNewPlanView({ name }:{name: string}) {
  const { navigate } = useNavigation();
  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Greeting name={name} />
      <View style={[styles.container, { width: '80%', alignSelf: 'center' }]}>
        <Subheading style={styles.text}>
          No Active plans
        </Subheading>
        <Button
          mode="contained"
          style={{ width: '100%', marginVertical: 12 }}
          onPress={() => { navigate('CreatePlan'); }}
        >
          Create new plan
        </Button>
      </View>
    </View>
  );
}

export default CreateNewPlanView;
