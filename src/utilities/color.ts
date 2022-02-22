import { DefaultTheme } from 'styled-components/native';

export const resolveColor = (
  theme: DefaultTheme,
  type: 'text' | 'background',
): string => {
  if (type === 'background') {
    return theme.colors[theme[theme.theme].background][
      theme[theme.theme].backgroundColorScale
    ];
  } else {
    return theme.colors[theme[theme.theme].text][
      theme[theme.theme].textColorScale
    ];
  }
};
