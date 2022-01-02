import formatRelative from 'date-fns/formatRelative';
import React, { FC, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useModels } from '../hooks/models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ModelStackParamList } from '../navigation/navigation';
import { RefreshControl } from '../components/shared/refresh-control';

type Props = NativeStackScreenProps<ModelStackParamList, 'Model'>;

export const Models: FC<Props> = ({ navigation }) => {
  const { data, isRefetching, refetch } = useModels();
  const [search, setSearch] = useState<undefined | string>(undefined);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onSearchButtonPress: event => setSearch(event.nativeEvent.text),
        onCancelButtonPress: () => setSearch(undefined),
      },
    });
  }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={refetch} refreshing={isRefetching} />
      }>
      <Container>
        <TableHeader>
          <TableHeaderCell>
            <TableHeaderCellText>Name</TableHeaderCellText>
            <TableHeaderCellTextSmall>Description</TableHeaderCellTextSmall>
          </TableHeaderCell>
          <TableHeaderCell>
            <TableHeaderCellText>Created</TableHeaderCellText>
            <TableHeaderCellTextSmall>Updated</TableHeaderCellTextSmall>
          </TableHeaderCell>
        </TableHeader>
        {data?.items?.map(model => (
          <Model
            key={model.sys.id}
            onPress={() =>
              navigation.navigate('Model', { modelID: model.sys.id })
            }>
            <Row>
              <Name>{model.name}</Name>
              <Name>
                {formatRelative(new Date(model.sys.createdAt), new Date())}
              </Name>
            </Row>

            <Row>
              <Description>{model.description || '-'}</Description>
              <Description>
                {formatRelative(new Date(model.sys.updatedAt), new Date())}
              </Description>
            </Row>
          </Model>
        ))}
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  background-color: white;
  margin: 8px;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 1px;
`;

const Name = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Description = styled(Name)`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[600]};
  max-width: 50%;
`;

const Model = styled.TouchableOpacity`
  padding: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;

const TableHeader = styled.View`
  flex-direction: row;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;

const TableHeaderCell = styled.View``;

const TableHeaderCellText = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[600]};
  letter-spacing: 0.3px;
`;

const TableHeaderCellTextSmall = styled.Text`
  margin-top: 4px;
  text-transform: uppercase;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.gray[500]};
  letter-spacing: 0.3px;
`;

const Row = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;
