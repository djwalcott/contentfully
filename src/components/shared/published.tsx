import React from 'react';
import styled from 'styled-components/native';
import { font } from '../../styles';

export const Published = () => (
  <PublishedContainer>
    <PublishedText>Published</PublishedText>
  </PublishedContainer>
);

const PublishedContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.green[200]};
  padding: 2px 4px;
  border-radius: 4px;
`;

const PublishedText = styled.Text`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.green[700]};
  font-family: ${font.bold};
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

export const Draft = () => (
  <DraftContainer>
    <DraftText>Draft</DraftText>
  </DraftContainer>
);

const DraftContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.orange[200]};
  padding: 2px 4px;
  border-radius: 4px;
`;

const DraftText = styled.Text`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.orange[700]};
  font-family: ${font.bold};
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;
