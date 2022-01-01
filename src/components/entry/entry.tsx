import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Entry as EntryType } from '../../hooks/entry';
import { useModel } from '../../hooks/models';
import { font } from '../../styles';
import { LocaleCode } from '../../typings/locale';
import { formatTimestamp } from '../../utilities/time';
import { ContentViewNavigationProp } from '../../views/entries';
import { Chevron } from '../icons/chevron';
import { Published } from '../shared/published';

type Props = {
  locale: LocaleCode | undefined;
  entry: EntryType;
};

export const Entry: FC<Props> = ({ entry, locale }) => {
  const { data: model } = useModel(entry?.sys?.contentType?.sys?.id);
  const navigation = useNavigation<ContentViewNavigationProp['navigation']>();

  return (
    <Container
      onPress={() => navigation.navigate('Entry', { entryID: entry.sys.id })}>
      <Column>
        {model?.displayField && locale && (
          <Title>{entry?.fields?.[model?.displayField]?.[locale]}</Title>
        )}
        <Updated>{formatTimestamp(entry.sys.updatedAt)}</Updated>
        {entry.sys.updatedAt === entry.sys.publishedAt && <Published />}
      </Column>
      <Chevron />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  padding: 8px 0px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 13px;
  font-family: ${font.medium};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const Updated = styled.Text`
  font-size: 13px;
  font-family: ${font.medium};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const Column = styled.View`
  flex: 1;
`;
