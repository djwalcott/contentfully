import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Color =
  | 'indigo'
  | 'stone'
  | 'red'
  | 'emerald'
  | 'green'
  | 'gray'
  | 'fuchsia';

export type ThemeState = {
  useSystemTheme: boolean;
  accentColor: Color;
};

const initialState: ThemeState = {
  accentColor: 'indigo',
  useSystemTheme: true,
};

export const themeSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    toggleUseSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.useSystemTheme = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<Color>) => {
      state.accentColor = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const { toggleUseSystemTheme, setAccentColor } = themeSlice.actions;
