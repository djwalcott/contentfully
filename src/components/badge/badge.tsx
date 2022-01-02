import React from 'react';
import styled from 'styled-components/native';
import { font } from '../../styles';

export const Badge = () => {
  return (
    <Container>
      <BadgeText>Published</BadgeText>
    </Container>
  );
};

const Container = styled.View``;

const BadgeText = styled.Text`
  font-family: ${font.regular};
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green[500]};
`;
