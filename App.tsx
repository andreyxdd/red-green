import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as PaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import useBaseData from './hooks/useBaseData';
import useHistory from './hooks/useHistory';
import Navigation from './navigation/Navigation';
import Loader from './components/Loader';

export default function App() {
  const isCacheLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  useBaseData();
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
