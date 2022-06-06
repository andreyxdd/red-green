import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FirestoreError } from 'firebase/firestore';
import { Text, View } from './Themed';
import { streamUser, updateUserCounter } from '../firebase';
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
  const [count, setCount] = React.useState(0);

  const onPress = () => {
    if (user) updateUserCounter(user.uid, count + 1);
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribe = () => { };
    if (user && user.uid) {
      unsubscribe = streamUser(
        user.uid,
        (docSnapshot) => {
          const updatedUserCounter = docSnapshot?.data()?.counter;
          if (updatedUserCounter) setCount(updatedUserCounter);
        },
        (error: FirestoreError) => console.log(error),
      );
    }
    return unsubscribe;
  }, [user, setCount]);

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
