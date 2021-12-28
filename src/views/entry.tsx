import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatRelative } from 'date-fns';
import React, { FC } from 'react';
import styled, { css } from 'styled-components/native';
import { Container } from '../components/shared/container';
import { CardTitle } from '../components/shared/typography';
import { useEntry } from '../hooks/entry';
import { useDefaultLocale } from '../hooks/locales';
import { useModel } from '../hooks/models';
import { ContentStackParamList } from '../navigation/navigation';
import { font } from '../styles';
import { fieldResolver } from '../utilities/field-resolver';

type Props = NativeStackScreenProps<ContentStackParamList, 'Entry'>;

export const Entry: FC<Props> = ({
  route: {
    params: { entryID },
  },
}) => {
  const { data: entry } = useEntry(entryID);
  const { data: locale } = useDefaultLocale();
  const { data: model } = useModel(entry?.sys.contentType.sys.id);
  return (
    <ScrollView>
      <Container>
        <Row>
          <Column>
            <Value>
              {entry?.sys.publishedAt &&
                formatRelative(new Date(entry?.sys.createdAt), new Date())}
            </Value>
            <Title>Created</Title>
          </Column>

          <Column>
            <Value>
              {entry?.sys.publishedAt &&
                formatRelative(new Date(entry?.sys.updatedAt), new Date())}
            </Value>
            <Title>Updated</Title>
          </Column>

          <Column last>
            <Value>
              {entry?.sys.publishedAt &&
                formatRelative(new Date(entry?.sys.publishedAt), new Date())}
            </Value>
            <Title>Published</Title>
          </Column>
        </Row>

        <CardTitle>{model?.name}</CardTitle>
        <Description>{entry?.sys.publishedAt}</Description>

        {entry &&
          Object.keys(entry?.fields).map(fieldKey => (
            <Field key={entry?.sys.id}>
              <FieldTitle>{fieldKey}</FieldTitle>
              <FieldContent>
                {locale?.code &&
                  fieldResolver(entry?.fields[fieldKey][locale?.code])}
              </FieldContent>
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
`;

const Field = styled.View``;

const FieldTitle = styled.Text`
  margin: 8px 0px 4px;
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${font.medium};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const FieldContent = styled.Text``;

const Row = styled.View`
  margin-bottom: 32px;
  padding-bottom: 8px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;

type ColumnProps = {
  last?: boolean;
};

const Column = styled.View<ColumnProps>`
  flex: 1;
  padding: 0px 8px;
  ${({ last }) =>
    !last &&
    css`
      border-right-width: 1px;
      border-right-color: ${({ theme }) => theme.colors.gray[200]};
    `}
`;

const Value = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[600]}
  font-family: ${font.medium};
  margin-bottom: 4px;
`;

const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[500]}
  font-family: ${font.regular};
`;
