import React, { FC } from 'react';
import styled from 'styled-components/native';
import { useModel } from '../../hooks/models';
import { Entry as EntryType } from '../../hooks/entry';
import { useDefaultLocale } from '../../hooks/locales';

type Props = {
  entry: EntryType;
};

export const Entry: FC<Props> = ({ entry }) => {
  const { data: locale } = useDefaultLocale();
  const { data: model } = useModel(entry.sys.contentType.sys.id);

  return (
    <Container>
      {model?.displayField && locale?.code && entry?.fields && (
        <Title>{entry?.fields[model?.displayField][locale?.code]}</Title>
      )}
    </Container>
  );
};

const Container = styled.View`
  padding: 8px 0px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  border-bottom-width: 1px;
`;

const Title = styled.Text``;
