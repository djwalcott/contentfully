import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React, { FC } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { useEnvironment } from '../../hooks/environment';
import { setEnvironment, setSpace } from '../../storage/reducers/space';
import { useAppDispatch } from '../../storage/store';

type Props = {
  name: string;
  id: string;
  navigation: DrawerNavigationHelpers;
};

export const SpaceCard: FC<Props> = ({ name, id, navigation }) => {
  const { data } = useEnvironment(id);
  const dispatch = useAppDispatch();

  const navigateToSpace = (environmentID: string) => {
    dispatch(setSpace(id));
    dispatch(setEnvironment(environmentID));

    navigation.navigate('Space', { id });
  };

  return (
    <Container>
      <SpaceName>{name}</SpaceName>
      {data?.items?.map(env => (
        <Environment
          key={env.sys.id}
          onPress={() => navigateToSpace(env.sys.id)}>
          <Text>{env.name}</Text>
        </Environment>
      ))}
    </Container>
  );
};

const Container = styled.View`
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.gray[50]};
  margin: 8px;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 1px;
`;

const SpaceName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Environment = styled.TouchableOpacity`
  padding: 8px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  border-bottom-width: 1px;
`;
