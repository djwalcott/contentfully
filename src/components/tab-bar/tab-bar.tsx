import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { resolveColor } from '../../utilities/color';
import { TabBarIcon } from './tab-bar-icon';
import { TabBarLabel } from './tab-label';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
  route: {
    name: string;
  };
};

export const TabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <Container>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true,
              params: route.params,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <TabItem>
              <TabBarIcon
                focused={isFocused}
                route={route}
                size={20}
                color={
                  isFocused
                    ? options.tabBarActiveTintColor ?? 'black'
                    : options.tabBarInactiveTintColor ?? 'grey'
                }
              />
              <TabBarLabel
                focused={isFocused}
                tabBarLabel={label}
                color={
                  isFocused
                    ? options.tabBarActiveTintColor ?? 'black'
                    : options.tabBarInactiveTintColor ?? 'grey'
                }
              />
            </TabItem>
          </TouchableOpacity>
        );
      })}
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => resolveColor(theme, 'background')};
  flex-direction: row;
  justify-content: space-between;
  padding: 26px;
`;

const TabItem = styled.View`
  padding: 16px;
  align-items: center; ;
`;
