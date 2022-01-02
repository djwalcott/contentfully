import styled from 'styled-components/native';

export const RefreshControl = styled.RefreshControl.attrs(({ theme }) => ({
  tintColor: theme.colors[theme.accent][600],
  colors: [
    theme.colors[theme.accent][600],
    theme.colors[theme.accent][500],
    theme.colors[theme.accent][400],
  ],
}))``;
