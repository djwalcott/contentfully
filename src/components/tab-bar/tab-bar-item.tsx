import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import styled from 'styled-components/native';

type Props = BottomTabBarButtonProps;

export const TabBarItem: FC<Props> = ({}) => {
  return <Container />;
};

const Container = styled.View``;
