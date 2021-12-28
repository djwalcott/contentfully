import React, { FC } from 'react';
import styled from 'styled-components/native';
import { useLocales } from '../../hooks/locales';
import { CardTitle } from '../shared/typography';

type Props = {};

export const Locales: FC<Props> = () => {
  const { data } = useLocales();
  return (
    <Container>
      <CardTitle>Locales</CardTitle>
      {data?.items?.map(item => (
        <Column key={item.sys?.id}>
          <Row>
            <Name>{`${item.name}`}</Name>
            {item.default && <Default>Default</Default>}
          </Row>
          <Row>
            <Locale>{`${item.code}`}</Locale>
          </Row>
        </Column>
      ))}
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  padding: 16px;
  margin: 8px;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 1px;
`;

const Name = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Locale = styled(Name)`
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  margin-bottom: 8px;
`;

const Default = styled.Text`
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  padding: 2px 4px;
  color: ${({ theme }) => theme.colors.gray[600]};
  border-radius: 8px;
`;
