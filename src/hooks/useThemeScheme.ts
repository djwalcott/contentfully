import { useColorScheme } from 'react-native';
import { useAppSelector } from '../storage/store';

export const useThemeScheme = () => {
  const { useSystemTheme, theme, dark, light } = useAppSelector(
    state => state.theme,
  );
  const isDarkMode = useColorScheme() === 'dark';

  if (useSystemTheme) {
    return isDarkMode
      ? { theme: 'dark', dark, light }
      : { theme: 'light', dark, light };
  } else {
    return { theme: theme, dark, light };
  }
};
