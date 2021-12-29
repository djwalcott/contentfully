import React, { FC } from 'react';
import styled from 'styled-components/native';
import { useWebhooks } from '../../hooks/webhooks';
import { font } from '../../styles';
import { Chevron } from '../icons/chevron';
import { CardTitle } from '../shared/typography';

type Props = {
  spaceID?: string;
};

export const Webhooks: FC<Props> = () => {
  const { data: webhooks } = useWebhooks();

  return (
    <Container>
      <CardTitle>Webhooks</CardTitle>
      {webhooks?.items?.map(hook => (
        <Row key={hook.sys.id}>
          <Column>
            <Name>{`${hook.name}`}</Name>
            <Updated>{hook?.sys.updatedAt}</Updated>
          </Column>
          <Chevron />
        </Row>
      ))}
    </Container>
  );
};

const Container = styled.View`
  padding: 16px 0px 0px 16px;
  background-color: white;
  margin: 8px;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 1px;
`;

const Name = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[800]};
  font-family: ${font.regular};
`;

const Updated = styled(Name)`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: 12px;
  font-family: ${font.regular};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  padding-right: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;

const Column = styled.View`
  flex: 1;
  padding-bottom: 8px;
`;
