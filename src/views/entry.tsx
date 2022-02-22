import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatRelative } from 'date-fns';
import React, { FC } from 'react';
import styled, { css } from 'styled-components/native';
import {
  Container,
  TitleContainer,
  UnpaddedContainer,
} from '../components/shared/container';
import { ListButton, ListButtonText } from '../components/shared/text-button';
import { CardTitle } from '../components/shared/typography';
import { useEntry, useUnpublishEntry } from '../hooks/entry';
import { useDefaultLocale } from '../hooks/locales';
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

  const { mutate, error } = useUnpublishEntry();

  console.log(error);
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

        <BottomRow>
          <Column>
            <Value>{entry?.sys.publishedCounter}</Value>
            <Title>Publish counter</Title>
          </Column>

          <Column>
            <Value>{entry?.sys.publishedVersion}</Value>
            <Title>Updated</Title>
          </Column>

          <Column last>
            <Value>
              {entry?.sys.publishedAt &&
                formatRelative(new Date(entry?.sys.publishedAt), new Date())}
            </Value>
            <Title>Published</Title>
          </Column>
        </BottomRow>

        {entry &&
          Object.keys(entry?.fields).map(fieldKey => (
            <Field key={`${entry?.sys.id}_${fieldKey}`}>
              <FieldTitle>{fieldKey}</FieldTitle>
              <FieldContent>
                {locale?.code &&
                  fieldResolver(entry?.fields[fieldKey][locale?.code])}
              </FieldContent>
            </Field>
          ))}
      </Container>

      <TitleContainer>
        <CardTitle>Actions</CardTitle>
      </TitleContainer>
      <UnpaddedContainer>
        <ListButton
          onPress={() =>
            mutate({ entryID, unpublish: false, version: entry?.sys.version })
          }>
          <ListButtonText>Unpublish entry</ListButtonText>
        </ListButton>
        <ListButton noBorder>
          <ListButtonText>Archive entry</ListButtonText>
        </ListButton>
      </UnpaddedContainer>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

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
  padding-bottom: 8px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;

const BottomRow = styled.View`
  margin: 8px 0px 32px;
  padding-bottom: 8px;
  flex-direction: row;
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
