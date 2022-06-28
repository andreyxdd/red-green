import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodayScreen from '../screens/withAuth/Today/TodayScreen';
import WeighInScreen from '../screens/withAuth/Weighin/WeighInScreen';
import PlanScreen from '../screens/withAuth/Plan/PlanScreen';
import { AuthTabList, AuthTabProps } from './WithAuthStack';
import { MenuContextOpenner } from '../components/Plan/PopupPlanMenu';
import useInterfaceStore, { IInterfaceStore } from '../hooks/useInterfaceStore';
import { colors } from '../styles/base';

import Profile from '../components/IconButtons/Profile';

const BottomTab = createBottomTabNavigator<AuthTabList>();

function BottomTabStack() {
  const sign = useInterfaceStore((state:IInterfaceStore) => state.sign);

  return (
    <BottomTab.Navigator
      initialRouteName="WeighInTab"
      screenOptions={{
        tabBarActiveTintColor: colors[sign],
        tabBarLabelStyle: { color: colors[sign] },
      }}
    >
      <BottomTab.Screen
        name="TodayTab"
        component={TodayScreen}
        options={() => ({
          title: 'Today',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'tomato', height: 80 },
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="WeighInTab"
        component={WeighInScreen}
        options={({ navigation }: AuthTabProps<'WeighInTab'>) => ({
          title: 'Weigh In',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'tomato', height: 80 },
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
          headerRight: () => (
            <Profile onPress={() => navigation.navigate('UserMenu')} />
          ),
        })}
      />
      <BottomTab.Screen
        name="PlanTab"
        component={PlanScreen}
        options={{
          title: 'Plan',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'tomato', height: 80 },
          headerRight: () => <MenuContextOpenner />,
          tabBarIcon: ({ color }) => <AntDesign name="barschart" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabStack;
