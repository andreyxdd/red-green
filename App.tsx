import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/Navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
