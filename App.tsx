import React from 'react';
import {
  LogBox, View, Text,
} from 'react-native';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import usePlans from './hooks/usePlans';
import useHistory from './hooks/useHistory';
import useProfileData from './hooks/useProfileData';

import useCachedResources from './hooks/useCachedResources';
import useAuth from './hooks/useAuth';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/Navigation';

import theme from './styles/theme';
import useLog from './hooks/useLog';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const isCacheLoaded = useCachedResources();
  const isAuthLoaded = useAuth();
  const isProfileDataLoaded = useProfileData();
  const isPlansLoaded = usePlans();
  const isHistoryLoafed = useHistory();

  const colorScheme = useColorScheme();

  useLog(!isCacheLoaded
    && !isAuthLoaded
    && !isProfileDataLoaded
    && !isPlansLoaded
    && !isHistoryLoafed);

  if (!isCacheLoaded
    && !isAuthLoaded
    && !isProfileDataLoaded
    && !isPlansLoaded
    && !isHistoryLoafed
  ) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <MenuProvider customStyles={{
          backdrop: {
            backgroundColor: 'grey',
            opacity: 0.5,
          },
        }}
        >
          <StatusBar />
          {
            !isCacheLoaded
    && !isAuthLoaded
    && !isProfileDataLoaded
    && !isPlansLoaded
    && !isHistoryLoafed ? (
      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}
      >
        <Text>Hellow</Text>
        <ActivityIndicator animating />
      </View>
              ) : <Navigation colorScheme={colorScheme} />
        }
        </MenuProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
