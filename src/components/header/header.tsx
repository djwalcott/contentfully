import React, { FC } from 'react';
import styled from 'styled-components/native';

export const Header: FC = () => {
  return (
    <Container>
      <Organization>Adidas</Organization>
      <Space>Running</Space>
      <Environment>master</Environment>
    </Container>
  );
};

const Container = styled.View`
  background-color: #3b82f6;
  width: 100%;
  height: 80px;
  padding: 16px;
`;

const Organization = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
`;

const Space = styled.Text`
  color: white;
  font-size: 13px;
`;

const Environment = styled.Text`
  color: white;
  font-size: 12px;
`;
