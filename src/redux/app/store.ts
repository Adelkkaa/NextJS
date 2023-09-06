import { configureStore } from '@reduxjs/toolkit';
import activeSong from 'redux/features/activeSong';
import searchPage from 'redux/features/searchPage';
import { shazamApi } from 'redux/services/shazamService';

export const store = configureStore({
  reducer: {
    activeSong: activeSong,
    searchPage: searchPage,
    [shazamApi.reducerPath]: shazamApi.reducer,
  },
  middleware: (gDM) => gDM().concat(shazamApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
