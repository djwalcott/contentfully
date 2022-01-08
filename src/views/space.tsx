import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled, { DefaultTheme } from 'styled-components/native';
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

const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => resolveColor(theme, 'background')};
`;

export const resolveColor = (
  theme: DefaultTheme,
  type: 'text' | 'background',
): string => {
  if (type === 'text') {
    return theme.colors[theme[theme.theme].background][
      theme[theme.theme].backgroundColorScale
    ];
  } else {
    return theme.colors[theme[theme.theme].text][
      theme[theme.theme].textColorScale
    ];
  }
};
