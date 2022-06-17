import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, Pressable, View } from 'react-native';
import { buttons, containers, typography } from '../../styles';

function IntroScreen() {
  const navigation = useNavigation();

  return (
    <View style={[containers.default, containers.main]}>
      <Text style={typography.heading}>Welcome to Red-Green</Text>
      <View style={[containers.default, containers.button]}>
        <Pressable
          onPress={() => { navigation.navigate('SignIn'); }}
          style={[buttons.default, buttons.contained]}
        >
          <Text style={typography.containedButton}>Have an account?</Text>
        </Pressable>
        <Pressable
          onPress={() => { navigation.navigate('SignUp'); }}
          style={[buttons.default, buttons.outlined]}
        >
          <Text style={typography.outlinedButton}>Don&apos;t have an account?</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default IntroScreen;
