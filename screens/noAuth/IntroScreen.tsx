import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Headline } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  button: { width: '100%', paddingVertical: 4, marginVertical: 4 },
});

function IntroScreen() {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Headline>Welcome to Red-Green</Headline>
      <View style={[styles.container, { width: '80%', marginVertical: 20 }]}>
        <Button
          mode="contained"
          onPress={() => { navigation.navigate('SignIn'); }}
          style={styles.button}
        >
          Have an account?
        </Button>
        <Button
          mode="outlined"
          onPress={() => { navigation.navigate('SignUp'); }}
          style={styles.button}
        >
          Don&apos;t have an account?
        </Button>
      </View>
    </View>
  );
}

export default IntroScreen;
