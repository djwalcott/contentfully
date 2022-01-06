import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Button, Text } from 'react-native';
import { Easing } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useCreateHook } from '../../hooks/notification';
import { useDeleteWebhook, useWebhooks } from '../../hooks/webhooks';
import { formatTimestamp } from '../../utilities/time';
import { SpaceScreenProps } from '../../views/space';
import { Chevron } from '../icons/chevron';
import { Description, ItemContainer, Title } from '../item/item';
import { Container, TitleContainer } from '../shared/container';
import { CardTitle } from '../shared/typography';
import { WebhookItem } from './webhook-item';

type Props = {
  spaceID?: string;
};

export const Webhooks: FC<Props> = () => {
  const { data: webhooks } = useWebhooks();
  const { mutate, error, data, status } = useCreateHook();
  const { mutate: removeHook } = useDeleteWebhook();

  return (
    <>
      <TitleContainer>
        <CardTitle>Webhooks</CardTitle>
      </TitleContainer>
      <Container>
        {webhooks?.items?.map(hook => (
          <WebhookItem removeHook={removeHook} key={hook.sys.id} hook={hook} />
        ))}

        <Button title="Create webhook" onPress={() => mutate()} />
        <Text>{JSON.stringify({ error, data, status })}</Text>
      </Container>
    </>
  );
};
