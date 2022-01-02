import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  background-color: white;
  margin: 8px;
  border-radius: 6px;
  overflow: hidden;
  /* border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 1px; */
`;

export const UnpaddedContainer = styled.View`
  background-color: white;
  margin: 8px;
  border-radius: 6px;
  overflow: hidden;
`;

export const TitleContainer = styled.View`
  padding: 32px 16px 0px;
`;
