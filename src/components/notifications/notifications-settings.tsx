import React, { FC } from 'react';

import { Notifications } from 'react-native-notifications';
import styled from 'styled-components/native';
import { setDeviceToken } from '../../storage/reducers/notifications';
import { useAppDispatch, useAppSelector } from '../../storage/store';
import { Container } from '../shared/container';
import { CardTitle } from '../shared/typography';

export const NotificationsSettings: FC = () => {
  const dispatch = useAppDispatch();
  const { deviceToken } = useAppSelector(({ notifications }) => notifications);

  const registerNotifications = () => {
    Notifications.registerRemoteNotifications();
  };

  return (
    <>
      <CardTitle>Notifications</CardTitle>
      <Container>
        <Debug>
          <DebugText selectable>{`Device token is ${deviceToken}`} </DebugText>
        </Debug>
      </Container>
    </>
  );
};

const Debug = styled.View``;

const DebugText = styled.Text``;
