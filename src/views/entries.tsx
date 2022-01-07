import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Entry } from '../components/entry/entry';
import { Container } from '../components/shared/container';
import { RefreshControl } from '../components/shared/refresh-control';
import { CardTitle } from '../components/shared/typography';
import { useEntries } from '../hooks/entry';
import { useDefaultLocale } from '../hooks/locales';
import { useModels } from '../hooks/models';
import { ContentStackParamList } from '../navigation/navigation';
import { font } from '../styles';

export type ContentViewNavigationProp = NativeStackScreenProps<
  ContentStackParamList,
  'Entries'
>;

type Props = {
  navigation: ContentViewNavigationProp['navigation'];
};

export const Content: FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState<string | undefined>(undefined);

  const { data, isRefetching, refetch } = useEntries([
    { type: 'query', parameter: search },
    { type: 'limit', parameter: '25' },
  ]);
  const { data: locale } = useDefaultLocale();
  const { data: models } = useModels();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onSearchButtonPress: event => setSearch(event.nativeEvent.text),
        onCancelButtonPress: () => setSearch(undefined),
      },
    });
  }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }>
      <HContainer horizontal>
        {models?.items?.map(model => (
          <ModelButton key={model.sys.id}>
            <ButtonText>{model.name}</ButtonText>
          </ModelButton>
        ))}
      </HContainer>

      <Container>
        {data?.items?.map(item => {
          return <Entry locale={locale?.code} entry={item} key={item.sys.id} />;
        })}
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

const HContainer = styled.ScrollView`
  flex-direction: row;
  background-color: white;
  margin: 8px;
  border-radius: 8px;
  padding: 8px 16px;
`;

const ModelButton = styled.TouchableOpacity`
  flex: 1;
  padding: 8px 8px;
`;

const ButtonText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: ${font.regular};
`;
