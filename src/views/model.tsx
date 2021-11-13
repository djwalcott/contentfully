import React, { FC } from 'react';
import styled from 'styled-components/native';
import { CardTitle } from '../components/typography';
import { useModel } from '../hooks/models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ModelStackParamList } from '../../App';
import { Container } from '../components/shared/container';
import { FieldIcon, FieldType } from '../components/icons/field-icon';

type Props = NativeStackScreenProps<ModelStackParamList, 'Model'>;

export const Model: FC<Props> = ({
  route: {
    params: { modelID },
  },
}) => {
  const { data, isRefetching, refetch, isError, error } = useModel(modelID);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }>
      {isError && (
        <ErrorContainer>
          <ErrorTitle>There was an error</ErrorTitle>
          <ErrorDescription>{error?.message}</ErrorDescription>
        </ErrorContainer>
      )}

      <Container>
        <CardTitle>{data?.name}</CardTitle>
        <Description>{data?.description}</Description>

        <CardTitle>Updated</CardTitle>
        <Description>By me</Description>

        <CardTitle>Fields</CardTitle>

        {data?.fields?.map(field => (
          <Field key={field.id}>
            <FieldIcon fieldType={field.type} />
            <Column>
              <FieldTitle>{field.name}</FieldTitle>
              <FieldType fieldType={field.type} />
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

const RefreshControl = styled.RefreshControl.attrs(({ theme }) => ({
  tintColor: theme.colors.indigo[600],
  colors: [
    theme.colors.indigo[600],
    theme.colors.indigo[500],
    theme.colors.indigo[400],
  ],
}))``;

const ErrorContainer = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.red[50]};
  margin: 8px;
  border-radius: 6px;
  border-color: ${({ theme }) => theme.colors.red[200]};
  border-width: 1px;
`;

const ErrorTitle = styled.Text`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red[800]};
  font-size: 15px;
  margin-bottom: 4px;
`;

const ErrorDescription = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.red[700]};
`;
