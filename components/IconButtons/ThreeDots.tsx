import { Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface IThreeDots{
  onPress: () => void;
}

function ThreeDots({ onPress }:IThreeDots) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
      hitSlop={50}
    >
      <Entypo
        name="dots-three-vertical"
        size={30}
        color="grey"
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
}

export default ThreeDots;
