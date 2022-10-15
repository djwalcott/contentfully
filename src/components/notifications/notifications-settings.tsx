import React, { FC, useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { useCreateNotifications } from '../../hooks/notification';
import { useAppSelector } from '../../storage/store';
import { font } from '../../styles';
import { Container } from '../shared/container';
import { FloatingTitle } from '../shared/typography';

export const NotificationsSettings: FC = () => {
  const { deviceToken } = useAppSelector(({ notifications }) => notifications);
  const [isRegistered, setIsRegistered] = useState(false);

  const { mutate } = useCreateNotifications();

  const test = () => {
    mutate({
      name: 'Contentfully notifications',
      url: 'https://netli.fyi/functions/contentfully',
      topics: ['Entry.create', 'ContentType.create', '*.publish', 'Asset.*'],
      filters: [],
      headers: [
        {
          key: 'deviceToken',
          value: `${deviceToken}`,
        },
      ],
    });
  };

  return (
    <>
      <FloatingTitle>Notifications</FloatingTitle>
      <Container>
        <Switch value={isRegistered} />
        <Debug>
          <DebugText selectable>{`Device token is ${deviceToken}`} </DebugText>
        </Debug>
        <Button title="Test" onPress={test} />
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
