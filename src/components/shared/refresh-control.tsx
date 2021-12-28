import styled from 'styled-components/native';

export const RefreshControl = styled.RefreshControl.attrs(({ theme }) => ({
  tintColor: theme.colors.indigo[600],
  colors: [
    theme.colors.indigo[600],
    theme.colors.indigo[500],
    theme.colors.indigo[400],
  ],
}))``;
