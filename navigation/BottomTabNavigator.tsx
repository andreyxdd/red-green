import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/withAuth/Tabs/TodayScreen';
import TabTwoScreen from '../screens/withAuth/Tabs/WeighInScreen';
import TabThreeScreen from '../screens/withAuth/Tabs/PlanScreen';
import { RootTabParamList, RootTabScreenProps } from '../types';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabTwo"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={() => ({
          title: 'Today',
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
          headerStyle: { backgroundColor: 'tomato', height: 80 },
          tabBarIcon: ({ color }) => <AntDesign name="barschart" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
