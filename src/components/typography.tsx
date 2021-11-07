import styled from 'styled-components/native';

export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray[500]};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
`;

export const CardDescription = styled.Text`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 13px;
  margin-bottom: 8px;
`;
