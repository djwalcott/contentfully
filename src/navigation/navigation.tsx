import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider, useTheme } from 'styled-components/native';
import { DrawerContent } from '../components/drawer/drawer';
import {
  Block,
  Content,
  Home,
  Media as MediaICon,
  NavigationMenu,
} from '../components/icons/icons';
import { TabBar } from '../components/tab-bar/tab-bar';
import { useAppSelector } from '../storage/store';
import { font } from '../styles';
import { theme } from '../styles/theme';
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
  MediaEntry: { id: string };
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
  Asset: { assetID: string };
};

const AssetStack = createNativeStackNavigator<AssetStackParamList>();

export type SpaceStackParamList = {
  Space: undefined;
  Webhook: { webhookID: string };
  User: { userID: string };
};

const SpaceStack = createNativeStackNavigator<SpaceStackParamList>();

const Tab = createBottomTabNavigator<SpaceTabParamList>();

const MainStack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigation = () => {
  const { tokens } = useAppSelector(state => state.tokens);
  const { accentColor } = useAppSelector(state => state.theme);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={{ ...theme, accent: accentColor }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerIcon: ({ color }) => {
          return <NavigationMenu color={color} />;
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Space"
        options={{ title: 'Contentfully' }}
        component={TabNavigator}
      />
      <Drawer.Screen name="Settings" component={Settings} />
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
  const { colors, accent } = useTheme();

  return (
    <ContentStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
        headerTintColor: colors[accent][500],
        headerStyle: {
          backgroundColor: colors.gray[100],
        },
        headerLargeTitleStyle: {
          fontFamily: font.bold,
          color: colors.gray[700],
        },
      }}>
      <ContentStack.Screen name="Entries" component={ContentEntries} />
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
  const { colors, accent } = useTheme();

  return (
    <ModelStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
        headerTintColor: colors[accent][500],
        headerStyle: {
          backgroundColor: colors.gray[100],
        },
        headerLargeTitleStyle: {
          fontFamily: font.bold,
          color: colors.gray[700],
        },
      }}>
      <ModelStack.Screen name="Models" component={Models} />
      <ModelStack.Screen name="Model" component={Model} />
    </ModelStack.Navigator>
  );
};

const AssetNavigator = () => {
  const { colors, accent } = useTheme();

  return (
    <AssetStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
        headerTintColor: colors[accent][500],
        headerStyle: {
          backgroundColor: colors.gray[100],
        },
        headerLargeTitleStyle: {
          fontFamily: font.bold,
          color: colors.gray[700],
        },
      }}>
      <AssetStack.Screen name="Assets" component={Assets} />
      <AssetStack.Screen name="Asset" component={Asset} />
    </AssetStack.Navigator>
  );
};

const SpaceNavigator = () => {
  const { colors, accent } = useTheme();
  return (
    <SpaceStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
        headerTintColor: colors[accent][500],
        headerStyle: {
          backgroundColor: colors.gray[100],
        },
        headerLargeTitleStyle: {
          fontFamily: font.bold,
          color: colors.gray[700],
        },
      }}>
      <SpaceStack.Screen
        name="Space"
        options={{
          headerLeft: () => <NavigationMenu color={'red'} />,
        }}
        component={Space}
      />
      <SpaceStack.Screen name="User" component={User} />
      <SpaceStack.Screen name="Webhook" component={Webhook} />
    </SpaceStack.Navigator>
  );
};
