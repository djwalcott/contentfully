import React, { FC } from 'react';
import styled from 'styled-components/native';
import { CardTitle } from '../components/typography';
import { useModel } from '../hooks/models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ModelStackParamList } from '../../App';
import { Container } from '../components/shared/container';
import { FieldIcon } from '../components/icons/field-icon';

type Props = NativeStackScreenProps<ModelStackParamList, 'Model'>;

export const Model: FC<Props> = ({
  route: {
    params: { modelID },
  },
}) => {
  const { data } = useModel(modelID);

  console.log(data);

  return (
    <ScrollView>
      <Container>
        <CardTitle>{data?.name}</CardTitle>
        <Description>{data?.description}</Description>

        <CardTitle>Fields</CardTitle>

        {data?.fields.map(field => (
          <Field key={field.id}>
            <FieldIcon fieldType={field.type} />
            <FieldTitle>
              {field.name} {field.type}
            </FieldTitle>
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
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 16px;
`;

const Field = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  padding: 8px 0px;
`;

const FieldTitle = styled.Text`
  margin-left: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;
