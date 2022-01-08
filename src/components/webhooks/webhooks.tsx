import React, { FC } from 'react';
import { Button } from 'react-native';
import { useCreateNotifications } from '../../hooks/notification';
import { useDeleteWebhook, useWebhooks } from '../../hooks/webhooks';
import { useAppSelector } from '../../storage/store';
import { Container, TitleContainer } from '../shared/container';
import { CardTitle } from '../shared/typography';
import { WebhookItem } from './webhook-item';

type Props = {
  spaceID?: string;
};

export const Webhooks: FC<Props> = () => {
  const { data: webhooks } = useWebhooks();
  const { mutate: removeHook } = useDeleteWebhook();
  const { mutate: createH } = useCreateNotifications();
  const { deviceToken } = useAppSelector(state => state.notifications);

  const debug = () => {
    createH({
      name: 'Contentfully notificationssdfsd',
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
      <TitleContainer>
        <CardTitle>Webhooks</CardTitle>
      </TitleContainer>

      <Container>
        <Button title="Test" onPress={debug} />
        {webhooks?.map(hook => (
          <WebhookItem
            removeHook={removeHook}
            key={hook?.sys?.id}
            hook={hook}
          />
        ))}
      </Container>
    </>
  );
};
