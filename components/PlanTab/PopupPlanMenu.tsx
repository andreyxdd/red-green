import {
  Menu, MenuOptions, MenuOption, MenuTrigger, withMenuContext, renderers,
} from 'react-native-popup-menu';
import { Alert, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import ThreeDots from '../IconButtons/ThreeDots';
import Divider from '../Divider';

const { SlideInMenu } = renderers;

const styles = StyleSheet.create({
  menuOption: { paddingVertical: 12, paddingLeft: 6 },
});

export default function PopupPlanMenu() {
  const navigation = useNavigation();

  return (
    <View>
      <Menu name="plan-menu" renderer={SlideInMenu}>
        <MenuTrigger />
        <MenuOptions>
          <MenuOption onSelect={() => { navigation.navigate('EditPlan'); }}>
            <Text style={styles.menuOption}>Edit</Text>
          </MenuOption>
          <Divider width={1} />
          <MenuOption onSelect={() => Alert.alert('Delete')}>
            <Text style={[styles.menuOption, { color: 'red' }]}>Delete</Text>
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
