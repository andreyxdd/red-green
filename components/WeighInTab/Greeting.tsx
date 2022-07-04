import { View, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  text: { width: '100%', marginVertical: 20, textAlign: 'center' },
});

function Greeting({ name }:{ name: string }) {
  return (
    <View style={[styles.container, { width: '80%', alignSelf: 'center' }]}>
      <Headline style={styles.text}>
        Hi,
        {' '}
        {name}
        !
      </Headline>
    </View>
  );
}

export default Greeting;
