import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { DrawerNavigatorProps } from '../../App';
import { Locales } from '../components/locale/locales';
import { AllUsers } from '../components/user/all-users';
import { Me } from '../components/user/me';

type Props = NativeStackScreenProps<DrawerNavigatorProps, 'Space'>;

export const Space: FC<Props> = ({ route }) => {
  console.log('route', route);
  return (
    <ScrollView>
      <Me />
      <Locales />
      <AllUsers />
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;
