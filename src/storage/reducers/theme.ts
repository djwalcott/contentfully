import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Color =
  | 'indigo'
  | 'stone'
  | 'red'
  | 'emerald'
  | 'green'
  | 'gray'
  | 'orange'
  | 'fuchsia';

export type ThemeState = {
  useSystemTheme: boolean;
  accentColor: Color;
  theme: 'light' | 'dark';
  dark: {
    text: Color;
    background: Color;
  };
  light: {
    text: Color;
    background: Color;
  };
};

const initialState: ThemeState = {
  accentColor: 'indigo',
  useSystemTheme: true,
  theme: 'light',
  dark: {
    text: 'gray',
    background: 'stone',
  },
  light: {
    text: 'stone',
    background: 'gray',
  },
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleUseSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.useSystemTheme = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<Color>) => {
      state.accentColor = action.payload;
    },
    setDarkColorScheme: (
      state,
      action: PayloadAction<{ text: Color; background: Color }>,
    ) => {
      state.dark = action.payload;
    },
    setLightColorScheme: (
      state,
      action: PayloadAction<{ text: Color; background: Color }>,
    ) => {
      state.light = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const { toggleUseSystemTheme, setAccentColor } = themeSlice.actions;
