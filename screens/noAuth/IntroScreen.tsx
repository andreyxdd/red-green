import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { buttons, containers, typography } from '../../styles';

function IntroScreen() {
  const navigation = useNavigation();

  return (
    <View style={containers.default}>
      <Text style={typography.heading}>Welcome to Red-Green</Text>
      <View style={containers.button}>
        <TouchableOpacity
          onPress={() => { navigation.navigate('SignIn'); }}
          style={buttons.contained}
        >
          <Text style={typography.buttonContained}>Have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigation.navigate('SignUp'); }}
          style={buttons.contained}
        >
          <Text style={typography.buttonContained}>Don&apos;t have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default IntroScreen;
