import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Media } from '../../hooks/media';
import { font } from '../../styles';
import { LocaleCode } from '../../typings/locale';
import { AllMediaScreenProp } from '../../views/assets';
import { Chevron } from '../icons/chevron';

type Props = {
  locale: LocaleCode | undefined;
  media: Media;
  navigation: AllMediaScreenProp['navigation'];
};

export const MediaItem: FC<Props> = ({ locale, media, navigation }) => {
  const open = () => {
    navigation.navigate('Asset', {
      assetID: media.sys.id,
      title: locale ? media?.fields?.file?.[locale]?.fileName : 'Media',
    });
  };

  return (
    <Container onPress={open}>
      {locale && (
        <Image
          source={{ uri: `https:${media?.fields?.file?.[locale]?.url}` }}
        />
      )}
      <Column>
        {locale && (
          <Title>
            {media?.fields?.title?.[locale] ??
              media?.fields?.file?.[locale]?.fileName}
          </Title>
        )}
        {locale && (
          <Description>
            {media?.fields?.file?.[locale]?.contentType}
          </Description>
        )}
      </Column>
      <Chevron />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 4px 0px;
  align-items: center;
`;

const Column = styled.View`
  margin-left: 8px;
  border-bottom-width: 1px;
  flex: 1;
  padding-bottom: 8px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;

const Image = styled.Image`
  height: 36px;
  width: 36px;
  margin-right: 8px;
`;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  padding-right: 16px;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-family: ${font.regular};
`;

const Description = styled.Text`
  margin-top: 4px;
  font-size: 12px;
  font-family: ${font.regular};
  color: ${({ theme }) => theme.colors.gray[400]};
`;
