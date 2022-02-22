import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Container } from '../components/shared/container';
import { useAsset } from '../hooks/media';
import { AssetStackParamList } from '../navigation/navigation';

type Props = NativeStackScreenProps<AssetStackParamList, 'Asset'>;

export const Asset: FC<Props> = ({ route }) => {
  const assetID = route.params.assetID;
  const { data: asset } = useAsset(assetID);

  return (
    <ScrollView>
      {asset?.fields.file['en-US'].contentType === 'image/jpeg' && (
        <Container>
          <Image source={{ uri: `https:${asset?.fields.file['en-US'].url}` }} />
        </Container>
      )}
      <Container>
        <Text>
          {JSON.stringify({ asset, assetID })} {`${assetID}`}
        </Text>
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Image = styled.Image`
  height: 300px;
  width: 100%;
`;
