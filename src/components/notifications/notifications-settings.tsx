import React, { FC, useEffect, useState } from 'react';
import { Notifications } from 'react-native-notifications';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../storage/store';
import { font } from '../../styles';
import { Container } from '../shared/container';
import { FloatingTitle } from '../shared/typography';

export const NotificationsSettings: FC = () => {
  const dispatch = useAppDispatch();
  const { deviceToken } = useAppSelector(({ notifications }) => notifications);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const check = async () => {
      const registered =
        await Notifications.isRegisteredForRemoteNotifications();
      setIsRegistered(registered);
    };
    check();
  }, []);

  const registerNotifications = () => {
    Notifications.registerRemoteNotifications();
  };

  return (
    <>
      <FloatingTitle>Notifications</FloatingTitle>
      <Container>
        <Switch value={isRegistered} />
        <Debug>
          <DebugText selectable>{`Device token is ${deviceToken}`} </DebugText>
        </Debug>

        <Description>
          In order to receive notifications Contentfully needs to create a
          custom webhook
        </Description>
      </Container>
    </>
  );
};

const Debug = styled.View``;

const DebugText = styled.Text``;

const Switch = styled.Switch``;

const Description = styled.Text`
  font-family: ${font.regular};
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 14px;
`;
