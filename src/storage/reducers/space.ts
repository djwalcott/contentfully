import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Token = {
  name: string;
  content: string;
};

export type SpaceState = {
  space?: string; // Current space
  environment?: string; // Current environment
};

const initialState: SpaceState = {};

export const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setSpace: (state, action: PayloadAction<string>) => {
      state.space = action.payload;
    },
    setEnvironment: (state, action: PayloadAction<string>) => {
      state.environment = action.payload;
    },
  },
});

export const spaceReducer = spaceSlice.reducer;
export const { setEnvironment, setSpace } = spaceSlice.actions;
