import React, { FC } from 'react';
import { useDeleteWebhook, useWebhooks } from '../../hooks/webhooks';
import { Container, TitleContainer } from '../shared/container';
import { CardTitle } from '../shared/typography';
import { WebhookItem } from './webhook-item';

type Props = {
  spaceID?: string;
};

export const Webhooks: FC<Props> = () => {
  const { data: webhooks } = useWebhooks();
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
      </Container>
    </>
  );
};
