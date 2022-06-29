import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface IProfile{
  onPress: () => void;
}

function Profile({ onPress }:IProfile) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
      hitSlop={50}
    >
      <FontAwesome
        name="user-circle-o"
        size={35}
        color="grey"
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
}

export default Profile;
