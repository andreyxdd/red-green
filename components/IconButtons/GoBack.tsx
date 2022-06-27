import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface IGoBack{
  onPress: () => void;
}

function GoBack({ onPress }:IGoBack) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
      hitSlop={50}
    >
      <FontAwesome
        name="chevron-left"
        size={30}
        color="grey"
      />
    </Pressable>
  );
}

export default GoBack;
