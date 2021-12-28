import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Entry } from '../components/entry/entry';
import { Container } from '../components/shared/container';
import { RefreshControl } from '../components/shared/refresh-control';
import { CardTitle } from '../components/shared/typography';
import { useEntries } from '../hooks/entry';
import { useDefaultLocale } from '../hooks/locales';
import { ContentStackParamList } from '../navigation/navigation';

export type ContentViewNavigationProp = NativeStackScreenProps<
  ContentStackParamList,
  'Entries'
>;

type Props = {
  navigation: ContentViewNavigationProp;
};

export const Content: FC<Props> = () => {
  const { data, isRefetching, refetch } = useEntries();
  const { data: locale } = useDefaultLocale();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }>
      <Container>
        <CardTitle>Entries</CardTitle>
        {data?.items?.map(item => {
          return <Entry locale={locale?.code} entry={item} key={item.sys.id} />;
        })}
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;
