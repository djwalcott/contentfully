import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from 'styled-components/native';
import { DrawerButton } from '../components/buttons/drawer-button';
import { DrawerContent } from '../components/drawer/drawer';
import {
  Block,
  Content,
  Home,
  Media as MediaICon,
} from '../components/icons/icons';
import { TabBar } from '../components/tab-bar/tab-bar';
import { useThemeScheme } from '../hooks/useThemeScheme';
import { useAppSelector } from '../storage/store';
import { font } from '../styles';
import { defaultTheme } from '../styles/theme';
import { resolveColor } from '../utilities/color';
import { Asset } from '../views/asset';
import { Assets } from '../views/assets';
import { Content as ContentEntries } from '../views/entries';
import { Entry } from '../views/entry';
import { Model } from '../views/model';
import { Models } from '../views/models';
import { Settings } from '../views/settings';
import { Space } from '../views/space';
import { User } from '../views/user';
import { Webhook } from '../views/webhook';
import { Welcome } from '../views/welcome';

type SpaceTabParamList = {
  Home: undefined;
  Content: undefined;
  'Content model': undefined;
  Media: undefined;
};

export type MainStackParamList = {
  Welcome: undefined;
  Drawer: undefined;
};

export type MediaNavigator = {
  Media: undefined;
  MediaEntry: { id: string; title: string };
};

export type DrawerNavigatorProps = {
  Space: { spaceID: string };
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigatorProps>();

export type ContentStackParamList = {
  Entries: undefined;
  Entry: { entryID: string };
};

const ContentStack = createNativeStackNavigator<ContentStackParamList>();

export type AssetStackParamList = {
  Assets: undefined;
  Asset: { assetID: string; title: string };
};

const AssetStack = createNativeStackNavigator<AssetStackParamList>();

export type SpaceStackParamList = {
  Space: undefined;
  Webhook: { webhookID: string; title: string };
  User: { userID: string; name: string };
};

const SpaceStack = createNativeStackNavigator<SpaceStackParamList>();

const Tab = createBottomTabNavigator<SpaceTabParamList>();

const MainStack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigation = () => {
  const { tokens } = useAppSelector(state => state.tokens);
  const { accentColor } = useAppSelector(state => state.theme);
  const { theme, dark, light } = useThemeScheme();

  return (
    <ThemeProvider
      theme={{
        ...defaultTheme,
        accent: accentColor,
        theme: theme ?? defaultTheme.theme,
        dark: dark ?? defaultTheme.dark,
        light: light ?? defaultTheme.light,
      }}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <MainStack.Navigator
        initialRouteName={tokens?.length > 0 ? 'Drawer' : 'Welcome'}>
        <MainStack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Drawer"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </ThemeProvider>
  );
};

export const DrawerNavigation = () => {
  const { colors, accent } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Space"
        options={{ title: 'Contentfully' }}
        component={TabNavigator}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          headerLeft: () => <DrawerButton />,
          headerShown: true,
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          headerShadowVisible: false,
          headerTintColor: colors[accent][500],
          headerStyle: {
            backgroundColor: colors.gray[100],
          },
        }}
        component={Settings}
      />
    </Drawer.Navigator>
  );
};

export const TabNavigator = () => {
  const { accent, colors } = useTheme();

  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Home':
              return <Home color={color} size={size} focused={focused} />;
            case 'Content model':
              return <Block color={color} size={size} focused={focused} />;
            case 'Content':
              return <Content color={color} size={size} focused={focused} />;
            case 'Media':
              return <MediaICon color={color} size={size} focused={focused} />;
            default:
              return <Home color={color} size={size} focused={focused} />;
          }
        },
        tabBarActiveTintColor: colors[accent][500],
        tabBarInactiveTintColor: colors.gray[500],
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={SpaceNavigator} />
      <Tab.Screen
        name="Content model"
        options={{ tabBarLabel: 'Models' }}
        component={ModelNavigator}
      />
      <Tab.Screen name="Content" component={ContentNavigator} />
      <Tab.Screen name="Media" component={AssetNavigator} />
    </Tab.Navigator>
  );
};

const ContentNavigator = () => {
  const theme = useTheme();

  return (
    <ContentStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
        headerTintColor: theme.colors[theme.accent][500],
        headerStyle: {
          backgroundColor: resolveColor(theme, 'background'),
        },
        headerLargeTitleStyle: {
          fontFamily: font.bold,
          color: resolveColor(theme, 'text'),
        },
      }}>
      <ContentStack.Screen
        name="Entries"
        options={{
          headerLeft: () => <DrawerButton />,
        }}
        component={ContentEntries}
      />
      <ContentStack.Screen name="Entry" component={Entry} />
    </ContentStack.Navigator>
  );
};

export type ModelStackParamList = {
  Models: undefined;
  Model: { modelID: string };
};

const ModelStack = createNativeStackNavigator<ModelStackParamList>();

const ModelNavigator = () => {
  const theme = useTheme();

  return (
    <ModelStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
        headerTintColor: theme.colors[theme.accent][500],
        headerStyle: {
          backgroundColor: resolveColor(theme, 'background'),
        },
        headerLargeTitleStyle: {
          fontFamily: font.bold,
          color: resolveColor(theme, 'text'),
        },
      }}>
      <ModelStack.Screen
        name="Models"
        options={{
          headerLeft: () => <DrawerButton />,
        }}
        component={Models}
      />
      <ModelStack.Screen name="Model" component={Model} />
    </ModelStack.Navigator>
  );
};

const AssetNavigator = () => {
  const theme = useTheme();
  return (
    <AssetStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
        headerTintColor: theme.colors[theme.accent][500],
        headerStyle: {
          backgroundColor: resolveColor(theme, 'background'),
        },
        headerLargeTitleStyle: {
          fontFamily: font.bold,
          color: resolveColor(theme, 'text'),
        },
      }}>
      <AssetStack.Screen
        name="Assets"
        options={{
          headerLeft: () => <DrawerButton />,
        }}
        component={Assets}
      />

      <AssetStack.Screen
        name="Asset"
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
        component={Asset}
      />
    </AssetStack.Navigator>
  );
};

const SpaceNavigator = () => {
  const theme = useTheme();
  return (
    <SpaceStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
        headerTintColor: theme.colors[theme.accent][500],
        headerStyle: {
          backgroundColor: resolveColor(theme, 'background'),
        },
        headerLargeTitleStyle: {
          fontFamily: font.bold,
          color: resolveColor(theme, 'text'),
        },
      }}>
      <SpaceStack.Screen
        name="Space"
        options={{
          headerLeft: () => <DrawerButton />,
        }}
        component={Space}
      />
      <SpaceStack.Screen
        name="User"
        component={User}
        options={({ route }) => ({
          headerTitle: route.params.name,
        })}
      />
      <SpaceStack.Screen
        name="Webhook"
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
        component={Webhook}
      />
    </SpaceStack.Navigator>
  );
};
