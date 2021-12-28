import React, { FC } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { useEntries } from '../../hooks/entry';
import { CardTitle } from '../shared/typography';

type Props = {
  spaceID?: string;
};

export const Entries: FC<Props> = () => {
  const { data } = useEntries();

  return (
    <Container>
      <CardTitle>Entries</CardTitle>
      {data?.items?.map(item => {
        return (
          <Entry key={item.sys.id}>
            <Text>{item.sys.id}</Text>
          </Entry>
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  padding: 16px;
  background-color: white;
  margin: 8px;
  border-radius: 6px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 1px;
`;

const Entry = styled.View``;
