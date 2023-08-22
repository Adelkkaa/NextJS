import { createSlice } from '@reduxjs/toolkit';

type Song = {
  title: string;
  subtitle: string;
  url: string;
  image: string;
};

const initialState = {
  title: '',
  subtitle: '',
  url: '',
  image: '',
};

const activeSongSlice = createSlice({
  name: 'active song',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
      state.url = action.payload.url;
      state.image = action.payload.image;
    },
  },
});

export const { setActiveSong } = activeSongSlice.actions;

export default activeSongSlice.reducer;
