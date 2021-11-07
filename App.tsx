import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import { DrawerContent } from './src/components/drawer/drawer';
import { Content as ContentEntries } from './src/views/content';
import { Models } from './src/views/models';
import { Media } from './src/views/media';
import { Model } from './src/views/model';
import { Settings } from './src/views/settings';
import { Space } from './src/views/space';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  Block,
  Content,
  Home,
  Media as MediaICon,
} from './src/components/icons/icons';
import { persistor, store } from './src/storage/store';

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

export type DrawerNavigatorProps = {
  Space: { spaceID: string };
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigatorProps>();
const queryClient = new QueryClient();

export type ContentStackParamList = {
  Entries: undefined;
  Entry: { entryID: string };
};

const ContentStack = createNativeStackNavigator<ContentStackParamList>();

const ContentNavigator = () => {
  return (
    <ContentStack.Navigator screenOptions={{ headerShown: false }}>
      <ContentStack.Screen name="Entries" component={ContentEntries} />
      <ContentStack.Screen name="Entry" component={Model} />
    </ContentStack.Navigator>
  );
};

export type ModelStackParamList = {
  Models: undefined;
  Model: { modelID: string };
};

const ModelStack = createNativeStackNavigator<ModelStackParamList>();

const ModelNavigator = () => {
  return (
    <ModelStack.Navigator screenOptions={{ headerShown: false }}>
      <ModelStack.Screen name="Models" component={Models} />
      <ModelStack.Screen name="Model" component={Model} />
    </ModelStack.Navigator>
  );
};

const theme: DefaultTheme = {
  colors: {
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
};

type SpaceTabParamList = {
  Home: undefined;
  Model: undefined;
  Content: undefined;
  Media: undefined;
};

const Tab = createBottomTabNavigator<SpaceTabParamList>();

const SpaceNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Home':
              return <Home color={color} size={size} focused={focused} />;
            case 'Model':
              return <Block color={color} size={size} focused={focused} />;
            case 'Content':
              return <Content color={color} size={size} focused={focused} />;
            case 'Media':
              return <MediaICon color={color} size={size} focused={focused} />;
            default:
              return <Home color={color} size={size} focused={focused} />;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Space} />
      <Tab.Screen name="Model" component={ModelNavigator} />
      <Tab.Screen name="Content" component={ContentNavigator} />
      <Tab.Screen name="Media" component={Media} />
    </Tab.Navigator>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <QueryClientProvider client={queryClient}>
              <SafeAreaProvider>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                />
                <Drawer.Navigator
                  drawerContent={props => <DrawerContent {...props} />}>
                  <Drawer.Screen name="Space" component={SpaceNavigator} />
                  <Drawer.Screen name="Settings" component={Settings} />
                </Drawer.Navigator>
              </SafeAreaProvider>
            </QueryClientProvider>
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
