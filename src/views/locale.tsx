import React, { FC } from 'react';
import { Text } from 'react-native';
import { Container } from '../components/shared/container';
import { ScrollView } from '../components/shared/scroll-view';
import { useLocales } from '../hooks/locales';

export const Locale = () => {
  const { data } = useLocales;

  return (
    <ScrollView>
      <Container>
        <Text>{JSON.stringify(data, undefined, 2)}</Text>
      </Container>
    </ScrollView>
  );
};
