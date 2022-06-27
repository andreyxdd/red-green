import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface IClose{
  onPress: () => void;
}

function Close({ onPress }:IClose) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
      hitSlop={50}
    >
      <FontAwesome
        name="close"
        size={30}
        color="grey"
      />
    </Pressable>
  );
}

export default Close;
