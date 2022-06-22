import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Headline } from 'react-native-paper';
import Container from '../../components/Container';

const styles = StyleSheet.create({
  button: { width: '100%', paddingVertical: 4, marginVertical: 4 },
});

function IntroScreen() {
  const navigation = useNavigation();

  return (
    <Container style={{ flex: 1 }}>
      <Headline>Welcome to Red-Green</Headline>
      <Container style={{ width: '80%', marginVertical: 20 }}>
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
      </Container>
    </Container>
  );
}

export default IntroScreen;
