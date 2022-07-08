import { AntDesign } from '@expo/vector-icons';
import { Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import TodayScreen from '../screens/auth/TodayTab/TodayScreen';
import WeighInScreen from '../screens/auth/WeighinTab/WeighInScreen';
import PlanScreen from '../screens/auth/PlanTab/PlanScreen';
import { AuthBottomTabList, AuthBottomTabProps } from '../types/navigation';
import { MenuContextOpenner } from '../components/PlanTab/PopupPlanMenu';
import useDataStore, { IDataStore } from '../hooks/useDataStore';
import colors from '../styles/colors';
import Profile from '../components/IconButtons/Profile';

const BottomTab = createBottomTabNavigator<AuthBottomTabList>();

function BottomTabStack() {
  const sign = useDataStore((state:IDataStore) => state.todayHistoryItem?.sign);
  const { colors: paperColors } = useTheme();

  return (
    <BottomTab.Navigator initialRouteName="WeighInTab">
      <BottomTab.Screen
        name="TodayTab"
        component={TodayScreen}
        options={() => ({
          title: 'Today',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: sign && colors[sign].secondary },
          tabBarIcon: () => (
            <AntDesign
              name="calendar"
              size={24}
              color={sign ? colors[sign].primary : paperColors.primary}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{
              // eslint-disable-next-line no-nested-ternary
              color: focused
                ? (sign ? colors[sign].primary : paperColors.primary)
                : color,
              fontSize: Platform.OS !== 'web' ? 10 : undefined,
              marginLeft: Platform.OS === 'web' ? 20 : undefined,
            }}
            >
              Today
            </Text>
          ),
        })}
      />
      <BottomTab.Screen
        name="WeighInTab"
        component={WeighInScreen}
        options={({ navigation }: AuthBottomTabProps<'WeighInTab'>) => ({
          title: 'Weigh In',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: sign && colors[sign].secondary },
          tabBarIcon: () => (
            <AntDesign
              name="pluscircleo"
              size={24}
              color={sign ? colors[sign].primary : paperColors.primary}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{
              // eslint-disable-next-line no-nested-ternary
              color: focused
                ? (sign ? colors[sign].primary : paperColors.primary)
                : color,
              fontSize: Platform.OS !== 'web' ? 10 : undefined,
              marginLeft: Platform.OS === 'web' ? 20 : undefined,
            }}
            >
              Weigh In
            </Text>
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
          headerStyle: { backgroundColor: sign && colors[sign].secondary },
          headerRight: () => <MenuContextOpenner />,
          tabBarIcon: () => (
            <AntDesign
              name="barschart"
              size={24}
              color={sign ? colors[sign].primary : paperColors.primary}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{
              // eslint-disable-next-line no-nested-ternary
              color: focused
                ? (sign ? colors[sign].primary : paperColors.primary)
                : color,
              fontSize: Platform.OS !== 'web' ? 10 : undefined,
              marginLeft: Platform.OS === 'web' ? 20 : undefined,
            }}
            >
              Plan
            </Text>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabStack;
