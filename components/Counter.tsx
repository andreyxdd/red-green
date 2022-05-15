import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ref, set, onValue } from 'firebase/database';
import { Text, View } from './Themed';
import { db } from '../firebase';
import useAuthentication from '../hooks/useAuthentification';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default function Counter() {
  const { user } = useAuthentication();
  const userRef = ref(db, `users/${user?.uid}`);
  const [count, setCount] = React.useState(0);

  const onPress = () => {
    if (user) set(userRef, { count: count + 1 });
  };

  React.useEffect(() => {
    const listener = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCount(data.count);
      } else {
        set(userRef, { count: 0 });
      }
    });

    return () => listener();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, userRef]);

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text>
          Count:
          {' '}
          {count}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
}
