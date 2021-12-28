import React, { FC } from 'react';
import styled from 'styled-components/native';
import { useUsers } from '../../hooks/user';
import { CardTitle } from '../shared/typography';

type Props = {
  spaceID?: string;
};

export const AllUsers: FC<Props> = ({ spaceID }) => {
  const { data } = useUsers(spaceID);
  console.log('users', data);
  return (
    <Container>
      <CardTitle>Users</CardTitle>
      {data?.items?.map(user => (
        <Row key={user.sys.id}>
          <Avatar resizeMode="cover" source={{ uri: user?.avatarUrl }} />
          <Column>
            <Name>{`${user?.firstName} ${user?.lastName}`}</Name>
            <Email>{user?.email}</Email>
          </Column>
        </Row>
      ))}
    </Container>
  );
};

const Container = styled.View`
  padding: 16px;
  background-color: white;
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
  margin-bottom: 16px;
`;

const Column = styled.View``;
