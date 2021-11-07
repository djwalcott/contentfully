import React, { FC } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useOrganizations } from '../../hooks/organization';
import { SpaceCard } from '../space/space-card';

export const DrawerContent: FC<DrawerContentComponentProps> = props => {
  const { data } = useOrganizations();

  return (
    <DrawerContentScrollView {...props}>
      {data?.items.map(item => (
        <SpaceCard
          navigation={props.navigation}
          key={item.sys.id}
          id={item.sys.id}
          name={`${item.name} - ${item.sys.id}`}
        />
      ))}

      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />
    </DrawerContentScrollView>
  );
};
