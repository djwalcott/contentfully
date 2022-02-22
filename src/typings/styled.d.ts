import 'styled-components';
import { Color } from '../storage/reducers/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    accent: Color;
    theme: 'dark' | 'light';
    dark: {
      text: Color;
      textColorScale: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
      background: Color;
      backgroundColorScale:
        | 50
        | 100
        | 200
        | 300
        | 400
        | 500
        | 600
        | 700
        | 800
        | 900;
    };
    light: {
      text: Color;
      textColorScale: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
      background: Color;
      backgroundColorScale:
        | 50
        | 100
        | 200
        | 300
        | 400
        | 500
        | 600
        | 700
        | 800
        | 900;
    };
    colors: {
      [key in Color]: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
    };
  }
}
