import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { useUsers } from '../../hooks/user';
import { SpaceScreenProps } from '../../views/space';
import { Chevron } from '../icons/chevron';
import { Description, Title } from '../item/item';
import { CardTitle } from '../shared/typography';

type Props = {
  spaceID?: string;
};

export const AllUsers: FC<Props> = () => {
  const { data } = useUsers();
  const navigation = useNavigation<SpaceScreenProps['navigation']>();

  return (
    <Container>
      <CardTitle>Users</CardTitle>
      {data?.items?.map(user => (
        <Row
          key={user.sys.id}
          onPress={() =>
            navigation.navigate('User', {
              userID: user.sys.id,
              name: `${user.firstName} ${user.lastName}`,
            })
          }>
          <Avatar resizeMode="cover" source={{ uri: user?.avatarUrl }} />
          <Column>
            <Title>{`${user?.firstName} ${user?.lastName}`}</Title>
            <Description>{user?.email}</Description>
          </Column>
          <Chevron />
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

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const Column = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;
