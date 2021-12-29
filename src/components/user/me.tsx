import React from 'react';
import styled from 'styled-components/native';
import { useUser } from '../../hooks/user';
import { font } from '../../styles';
import { Skeleton } from '../shared/skeleton';
import { CardTitle } from '../shared/typography';

export const Me = () => {
  const { data: user, isLoading } = useUser();

  return (
    <Container>
      <CardTitle>You</CardTitle>
      <Row>
        <Skeleton
          isLoading={isLoading}
          borderRadius={15}
          width={30}
          height={30}>
          <Avatar resizeMode="cover" source={{ uri: user?.avatarUrl }} />
        </Skeleton>
        <Column>
          <NameSkeleton
            isLoading={isLoading}
            borderRadius={8}
            width={150}
            height={10}>
            <Name>{`${user?.firstName} ${user?.lastName}`}</Name>
          </NameSkeleton>
          <Skeleton
            isLoading={isLoading}
            borderRadius={8}
            width={120}
            height={10}>
            <Email>{user?.email}</Email>
          </Skeleton>
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
  font-family: ${font.regular};
  margin: 0;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Email = styled(Name)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Column = styled.View`
  margin-left: 8px;
`;

const NameSkeleton = styled(Skeleton)`
  margin-bottom: 4px;
`;
