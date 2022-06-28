import React from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import usePlans from './hooks/usePlans';
import useHistory from './hooks/useHistory';
import useProfileData from './hooks/useProfileData';

import useCachedResources from './hooks/useCachedResources';
import useAuth from './hooks/useAuth';
import Navigation from './navigation/Navigation';

import theme from './styles/theme';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  useCachedResources();
  useAuth();
  useProfileData();
  usePlans();
  useHistory();

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
          <Navigation />
        </MenuProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
