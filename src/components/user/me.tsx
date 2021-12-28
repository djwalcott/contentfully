import React from 'react';
import styled from 'styled-components/native';
import { useUser } from '../../hooks/user';
import { CardTitle } from '../shared/typography';

export const Me = () => {
  const { data } = useUser();
  return (
    <Container>
      <CardTitle>You</CardTitle>
      <Row>
        <Avatar resizeMode="cover" source={{ uri: data?.avatarUrl }} />
        <Column>
          <Name>{`${data?.firstName} ${data?.lastName}`}</Name>
          <Email>{data?.email}</Email>
        </Column>
      </Row>
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

const Avatar = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 15px;
`;

const Name = styled.Text`
  font-size: 13px;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Email = styled(Name)`
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Column = styled.View``;
