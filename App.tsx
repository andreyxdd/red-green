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
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/Navigation';
import Loader from './components/Loader';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const isCacheLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useProfileData();
  usePlans();
  useHistory();

  if (!isCacheLoadingComplete) {
    return <Loader />;
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
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </MenuProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
