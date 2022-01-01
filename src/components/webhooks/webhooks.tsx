import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { useWebhooks } from '../../hooks/webhooks';
import { font } from '../../styles';
import { formatTimestamp } from '../../utilities/time';
import { SpaceScreenProps } from '../../views/space';
import { Chevron } from '../icons/chevron';
import { Description, ItemContainer, Title } from '../item/item';
import { TitleContainer, UnpaddedContainer } from '../shared/container';
import { CardTitle } from '../shared/typography';

type Props = {
  spaceID?: string;
};

export const Webhooks: FC<Props> = () => {
  const { data: webhooks } = useWebhooks();
  const navigation = useNavigation<SpaceScreenProps['navigation']>();
  return (
    <>
      <TitleContainer>
        <CardTitle>Webhooks</CardTitle>
      </TitleContainer>
      <UnpaddedContainer>
        {webhooks?.items?.map(hook => (
          <ItemContainer
            onPress={() =>
              navigation.navigate('Webhook', { webhookID: hook.sys.id })
            }
            key={hook.sys.id}>
            <Column>
              <Title>{`${hook.name}`}</Title>
              <Description>{formatTimestamp(hook?.sys.updatedAt)}</Description>
            </Column>
            <Chevron />
          </ItemContainer>
        ))}
      </UnpaddedContainer>
    </>
  );
};

const Column = styled.View`
  flex: 1;
  padding-bottom: 8px;
`;
