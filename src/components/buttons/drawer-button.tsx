import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { NavigationMenu } from '../icons/icons';
import { useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerNavigatorProps } from '../../navigation/navigation';

type Navigation = DrawerNavigationProp<DrawerNavigatorProps>;

export const DrawerButton = () => {
  const { accent, colors } = useTheme();
  const navigation = useNavigation<Navigation>();

  const openDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <Button onPress={openDrawer}>
      <NavigationMenu color={colors[accent][500]} />
    </Button>
  );
};

const Button = styled.TouchableOpacity``;
