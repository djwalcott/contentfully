import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Container } from '../components/shared/container';
import { useAssets } from '../hooks/media';

export const Media: FC = () => {
  const { data } = useAssets();

  return (
    <ScrollView>
      <Container>
        {data?.items?.map(item => (
          <Text>{item.sys.id}</Text>
        ))}
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

const Text = styled.Text``;
