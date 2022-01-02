import React, { FC } from 'react';
import styled from 'styled-components/native';

type Props = {
  error: Error | null;
};

export const Error: FC<Props> = ({ error }) => {
  return (
    <ErrorContainer>
      <ErrorTitle>There was an error</ErrorTitle>
      <ErrorDescription>{error?.message}</ErrorDescription>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.red[50]};
  margin: 8px;
  border-radius: 6px;
  border-color: ${({ theme }) => theme.colors.red[200]};
  border-width: 1px;
`;

const ErrorTitle = styled.Text`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red[800]};
  font-size: 15px;
  margin-bottom: 4px;
`;

const ErrorDescription = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.red[700]};
`;
