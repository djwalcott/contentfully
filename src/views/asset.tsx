import React, { FC } from 'react';
import { Text } from 'react-native-svg';
import styled from 'styled-components/native';
import { useAsset } from '../hooks/media';

type Props = {
  assetID: string;
};

export const Asset: FC<Props> = ({ assetID }) => {
  const { data: asset } = useAsset(assetID);

  return (
    <ScrollView>
      <Text>{JSON.stringify(asset)}</Text>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;
