import {
  Menu, MenuOptions, MenuOption, MenuTrigger, withMenuContext, renderers,
} from 'react-native-popup-menu';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import ThreeDots from '../IconButtons/ThreeDots';

const { SlideInMenu } = renderers;

export default function PopupPlanMenu() {
  const navigation = useNavigation();

  return (
    <View>
      <Menu name="plan-menu" renderer={SlideInMenu}>
        <MenuTrigger />
        <MenuOptions>
          <MenuOption onSelect={() => { navigation.navigate('EditPlan'); }}>
            <Text>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={() => Alert.alert('Delete')}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}

export const MenuContextOpenner = withMenuContext(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any) => <ThreeDots onPress={() => props.ctx.menuActions.openMenu('plan-menu')} />,
);
