import React, { FC } from 'react';
import styled from 'styled-components/native';
import { CardTitle } from '../components/shared/typography';
import { useModel } from '../hooks/models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from '../components/shared/container';
import { FieldIcon, FieldTypeText } from '../components/icons/field-icon';
import { Error } from '../components/error/error';
import { RefreshControl } from '../components/shared/refresh-control';
import { ModelStackParamList } from '../navigation/navigation';
import { useContentfulUser } from '../hooks/user';

type Props = NativeStackScreenProps<ModelStackParamList, 'Model'>;

export const Model: FC<Props> = ({
  route: {
    params: { modelID },
  },
}) => {
  const { data, isRefetching, refetch, isError, error } = useModel(modelID);
  const { data: user } = useContentfulUser(data?.sys.publishedBy.sys.id);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }>
      {isError && <Error error={error} />}

      <Container>
        <CardTitle>{data?.name}</CardTitle>
        <Description>{data?.description}</Description>

        <CardTitle>Fields</CardTitle>
        <Name>{user?.email}</Name>

        {data?.fields?.map(field => (
          <Field key={field.id}>
            <FieldIcon fieldType={field.type} />
            <Column>
              <FieldTitle>{field.name}</FieldTitle>
              <FieldTypeText fieldType={field.type} />
            </Column>
          </Field>
        ))}
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

const Name = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Description = styled(Name)`
  margin-top: 4px;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 16px;
`;

const Field = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 0px 0px;
`;

const FieldTitle = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Column = styled.View`
  margin-left: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  padding: 8px 0px;
  width: 100%;
`;
