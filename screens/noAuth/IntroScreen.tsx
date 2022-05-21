import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 18,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

function IntroScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Welcome to Red-Green</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => { navigation.navigate('SignIn'); }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigation.navigate('SignUp'); }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Don&apos;t have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default IntroScreen;
