import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ContentStackParamList } from '../../App';
import { Entry } from '../components/entry/entry';
import { Container } from '../components/shared/container';
import { CardTitle } from '../components/typography';
import { useEntries } from '../hooks/entry';

type Props = NativeStackScreenProps<ContentStackParamList, 'Entries'>;

export const Content: FC<Props> = ({ navigation }) => {
  const { data } = useEntries();

  console.log(data);
  return (
    <ScrollView>
      <Container>
        <CardTitle>Entries</CardTitle>
        {data?.items?.map(item => {
          return (
            <Entry
              onPress={() =>
                navigation.navigate('Entry', { entryID: item.sys.id })
              }
              entry={item}
              key={item.sys.id}
            />
          );
        })}
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

const Text = styled.Text``;
