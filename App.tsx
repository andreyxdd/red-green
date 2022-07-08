import React from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import { enableES5 } from 'immer';
import usePlans from './hooks/usePlans';
import useHistory from './hooks/useHistory';

import useCachedResources from './hooks/useCachedResources';
import useAuth from './hooks/useAuth';
import Navigation from './navigation/Navigation';

import theme from './styles/theme';
import useProfile from './hooks/useProfile';

enableES5();

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const isCacheLoading = useCachedResources();
  const { loading: isAuthLoading, error: authError } = useAuth();
  const { loading: isProfileLoading, error: profileError } = useProfile();
  const { loading: isPlanLoading, error: planError } = usePlans();
  const { loading: isHistoryLoading, error: historyError } = useHistory();

  if (isCacheLoading || isAuthLoading || isProfileLoading || isPlanLoading || isHistoryLoading) {
    return (
      <GestureHandlerRootView style={{
        flex: 1,
        justifyContent: 'center',
      }}
      >
        <ActivityIndicator animating />
      </GestureHandlerRootView>
    );
  }

  if (authError || profileError || planError || historyError) {
    return (
      <GestureHandlerRootView style={{
        flex: 1,
        justifyContent: 'center',
      }}
      >
        <ActivityIndicator animating color="danger" />
      </GestureHandlerRootView>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>
          <MenuProvider customStyles={{ backdrop: { backgroundColor: 'grey', opacity: 0.5 } }}>
            <StatusBar />
            <Navigation />
          </MenuProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
