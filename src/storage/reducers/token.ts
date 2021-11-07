import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Token = {
  name: string;
  content: string;
};

export type TokenState = {
  tokens: Token[];
  selected?: Token | undefined;
};

const initialState: TokenState = {
  tokens: [],
  selected: undefined,
};

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<Token>) => {
      state.tokens.push(action.payload);
    },
    removeToken: (state, action: PayloadAction<Token>) => {
      state.tokens = state.tokens.filter(
        token => token.name !== action.payload.name,
      );
    },
    setSelectedToken: (state, action: PayloadAction<Token>) => {
      state.selected = action.payload;
    },
    reset: () => initialState,
  },
});

export const tokensReducer = tokensSlice.reducer;
export const { addToken, removeToken, setSelectedToken, reset } =
  tokensSlice.actions;
