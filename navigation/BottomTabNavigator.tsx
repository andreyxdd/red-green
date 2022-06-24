import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import TabOneScreen from '../screens/withAuth/Today/TodayScreen';
import TabTwoScreen from '../screens/withAuth/Weighin/WeighInScreen';
import TabThreeScreen from '../screens/withAuth/Plan/PlanScreen';
import { RootTabParamList, RootTabScreenProps } from '../types';
import { MenuContextOpenner } from '../components/Plan/PopupPlanMenu';
import useInterfaceStore, { IInterfaceStore } from '../hooks/useInterfaceStore';
import { colors } from '../styles/base';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const sign = useInterfaceStore((state:IInterfaceStore) => state.sign);

  return (
    <BottomTab.Navigator
      initialRouteName="TabTwo"
      screenOptions={{
        tabBarActiveTintColor: colors[sign],
        tabBarLabelStyle: { color: colors[sign] },
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
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
        name="TabTwo"
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<'TabTwo'>) => ({
          title: 'Weigh In',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'tomato', height: 80 },
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('UserMenu')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="user-circle-o"
                size={50}
                color="grey"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
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

export default BottomTabNavigator;
