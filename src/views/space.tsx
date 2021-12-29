import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Locales } from '../components/locale/locales';
import { AllUsers } from '../components/user/all-users';
import { Me } from '../components/user/me';
import { Webhooks } from '../components/webhooks/webhooks';
import { SpaceStackParamList } from '../navigation/navigation';

export type SpaceScreenProps = NativeStackScreenProps<
  SpaceStackParamList,
  'Space'
>;

export const Space: FC<SpaceScreenProps> = () => {
  return (
    <ScrollView>
      <Me />
      <Locales />
      <AllUsers />
      <Webhooks />
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;
