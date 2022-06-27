import React from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as PaperProvider } from 'react-native-paper';
import usePlans from './hooks/usePlans';
import useHistory from './hooks/useHistory';
import useProfileData from './hooks/useProfileData';

import useCachedResources from './hooks/useCachedResources';
import useAuth from './hooks/useAuth';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/Navigation';
import { View } from './components/Themed';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const { isLoaded: isCacheLoaded, onLayoutRootView } = useCachedResources();
  const isAuthLoaded = useAuth();
  const isProfileDataLoaded = useProfileData();
  const isPlansLoaded = usePlans();
  const isHistoryLoafed = useHistory();

  const colorScheme = useColorScheme();

  if (!isCacheLoaded
    && !isAuthLoaded
    && !isProfileDataLoaded
    && !isPlansLoaded
    && !isHistoryLoafed
  ) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <MenuProvider customStyles={{
          backdrop: {
            backgroundColor: 'grey',
            opacity: 0.5,
          },
        }}
        >
          <View onLayout={onLayoutRootView}>
            <StatusBar />
            <Navigation colorScheme={colorScheme} />
          </View>
        </MenuProvider>
      </PaperProvider>

    </SafeAreaProvider>
  );
}
