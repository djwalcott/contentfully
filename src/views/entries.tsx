import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Entry } from '../components/entry/entry';
import { Container } from '../components/shared/container';
import { RefreshControl } from '../components/shared/refresh-control';
import { CardTitle } from '../components/shared/typography';
import { useEntries } from '../hooks/entry';
import { useDefaultLocale } from '../hooks/locales';
import { useModels } from '../hooks/models';
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
  const { data: models } = useModels();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }>
      <HContainer>
        {models?.items?.map(model => (
          <ModelButton key={model.sys.id}>
            <ButtonText>{model.name}</ButtonText>
          </ModelButton>
        ))}
      </HContainer>

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

const HContainer = styled.View`
  flex-direction: row;
  background-color: white;
  margin: 8px;
  border-radius: 8px;
  padding: 16px;
`;

const ModelButton = styled.TouchableOpacity`
  flex: 1;
`;

const ButtonText = styled.Text``;
