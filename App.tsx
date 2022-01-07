import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MainNavigation } from './src/navigation/navigation';
import { persistor, store } from './src/storage/store';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

const App = () => {
  return (
    <ActionSheetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <QueryClientProvider client={queryClient}>
              <SafeAreaProvider>
                <MainNavigation />
              </SafeAreaProvider>
            </QueryClientProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ActionSheetProvider>
  );
};

export default App;
