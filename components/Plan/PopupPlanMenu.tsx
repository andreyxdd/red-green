import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  withMenuContext,
  renderers,
} from 'react-native-popup-menu';
import { Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../Themed';

const { SlideInMenu } = renderers;

export default function PopupPlanMenu() {
  // const navigation = useNavigation();

  return (
    <View>
      <Menu name="plan-menu" renderer={SlideInMenu}>
        <MenuTrigger />
        <MenuOptions>
          <MenuOption onSelect={() => { /* navigation.navigate('EditPlan'); */ }} text="Edit" />
          <MenuOption onSelect={() => alert('Delete')}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </MenuOption>
          <MenuOption onSelect={() => alert('Not called')} disabled text="Disabled" />
        </MenuOptions>
      </Menu>
    </View>
  );
}

function MenuOpenner(props: any) {
  return (
    <Pressable
      onPress={() => props.ctx.menuActions.openMenu('plan-menu')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Entypo
        name="dots-three-vertical"
        size={24}
        color="grey"
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
}

export const MenuContextOpenner = withMenuContext(MenuOpenner);
