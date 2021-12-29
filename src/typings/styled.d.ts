import 'styled-components';
import { Color } from '../storage/reducers/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    accent: Color;

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
