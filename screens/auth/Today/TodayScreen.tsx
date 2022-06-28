import { StyleSheet } from 'react-native';

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

export default function TodayScreen() {
  return (
    <View style={styles.container}>
      {true && !false && !true
        ? <Text style={styles.title}>helov</Text>
        : null}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
