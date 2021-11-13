import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  background-color: white;
  margin: 8px;
  border-radius: 6px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 1px;
`;
