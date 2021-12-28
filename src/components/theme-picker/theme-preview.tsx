import React from 'react';
import styled from 'styled-components/native';
import { font } from '../../styles';

export const ThemePreview = () => {
  return (
    <Container>
      <PreviewTag>
        <PreviewText>Preview</PreviewText>
      </PreviewTag>
      <Text>
        This is how text will look with these theme settings.{' '}
        <Link>A link will look like this.</Link>
      </Text>
      <Button>
        <ButtonText>Example Button</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  margin: 16px 0px;
  padding: 8px;
  overflow: hidden;
`;

const Button = styled.View`
  transform: scale(0.5);
  background-color: ${({ theme }) => theme.colors[theme.accent][500]};
  padding: 16px;
  border-radius: 8px;
  margin-top: 32px;
`;

const PreviewTag = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  padding: 4px 8px;
  z-index: 10;
  border-radius: 2px;
`;

const PreviewText = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  font-family: ${font.medium};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: ${font.regular};
  width: 80%;
`;

const Link = styled.Text`
  color: ${({ theme }) => theme.colors[theme.accent][500]};
  font-family: ${font.regular};
`;
