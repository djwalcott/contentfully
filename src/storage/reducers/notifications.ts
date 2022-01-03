import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Token = {
  name: string;
  content: string;
};

/* Essentially the notifications state is just a list of the webhooks from Contentful that have been configured through Contentfully app */

export type NotificationState = {
  deviceToken?: string; // Which device to push to
  environment?: string; // Current environment
};

const initialState: NotificationState = {};

export const notificationsSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setDeviceToken: (state, action: PayloadAction<string>) => {
      state.deviceToken = action.payload;
    },
    setEnvironment: (state, action: PayloadAction<string>) => {
      state.environment = action.payload;
    },
  },
});

export const notificationsReducer = notificationsSlice.reducer;
export const { setEnvironment, setDeviceToken } = notificationsSlice.actions;
