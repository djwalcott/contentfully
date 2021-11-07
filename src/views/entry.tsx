import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ContentStackParamList } from '../../App';
import { Container } from '../components/shared/container';
import { CardTitle } from '../components/typography';
import { useModel } from '../hooks/models';

type Props = NativeStackScreenProps<ContentStackParamList, 'Entry'>;

export const Entry: FC<Props> = ({
  route: {
    params: { entryID },
  },
}) => {
  const { data } = useModel(entryID);

  return (
    <ScrollView>
      <Container>
        <CardTitle>{data?.name}</CardTitle>
        <Description>{data?.description}</Description>
        {/*
        {data?.fields.map(field => (
          <Field key={field.id}>
            <FieldTitle>{field.name}</FieldTitle>
          </Field>
        ))} */}
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
`;

const Field = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  padding: 8px 0px;
`;

const FieldTitle = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;
