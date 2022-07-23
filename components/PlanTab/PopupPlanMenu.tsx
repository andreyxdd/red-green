import {
  Menu, MenuOptions, MenuOption, MenuTrigger, withMenuContext, renderers,
} from 'react-native-popup-menu';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import shallow from 'zustand/shallow';
import ThreeDots from '../IconButtons/ThreeDots';
import Divider from '../Divider';
import useDataStore, { IDataStore } from '../../hooks/useDataStore';
import { writePlanStatus as deactivatePlan } from '../../firebase/writes';
// import { deleteHistoryByIds, deletePlan } from '../../firebase/deletes';

const { SlideInMenu } = renderers;

const styles = StyleSheet.create({
  menuOption: { paddingVertical: 12, paddingLeft: 6 },
});

export default function PopupPlanMenu() {
  const navigation = useNavigation();
  const [user, plan, setHistory, setTodayHistoryItem] = useDataStore(
    (state: IDataStore) => [state.user, state.plan, state.setHistory, state.setTodayHistoryItem],
    shallow,
  );

  return (
    <View>
      <Menu name="plan-menu" renderer={SlideInMenu}>
        <MenuTrigger />
        <MenuOptions>
          <MenuOption
            onSelect={() => {
              if (plan) navigation.navigate('EditPlan', { plan });
            }}
            disabled
          >
            <Text style={[styles.menuOption, { fontWeight: '200' }]}>Edit Plan</Text>
          </MenuOption>
          <Divider width={1} />
          <MenuOption
            onSelect={() => {
              if (user && plan) {
                setTodayHistoryItem(null);
                setHistory([]);
                deactivatePlan(user.uid, plan.id);
              }
            }}
          >
            <Text style={[styles.menuOption, { color: 'red' }]}>Deactivate Plan</Text>
          </MenuOption>
          {/*
          <Divider width={1} />
          <MenuOption
            onSelect={Platform.OS === 'web'
              ? async () => {
                if (user && plan) {
                  await deleteHistoryByIds(user.uid, plan.id, history);
                  await deletePlan(user.uid, plan.id);
                }
              }
              : () => {
                Alert.alert(
                  'Delete',
                  'Are you sure you want to delete current plan? Data will be lost',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      onPress: async () => {
                        if (user && plan) deleteHistoryByIds(user.uid, plan.id, history);
                      },
                    },
                  ],
                );
              }}
            disabled={!plan}
          >
            <Text style={[styles.menuOption, { color: 'red' }]}>Delete Plan</Text>
          </MenuOption>
          */}
        </MenuOptions>
      </Menu>
    </View>
  );
}

export const MenuContextOpenner = withMenuContext(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any) => <ThreeDots onPress={() => props.ctx.menuActions.openMenu('plan-menu')} />,
);
