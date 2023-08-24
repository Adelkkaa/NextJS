import { createSlice } from '@reduxjs/toolkit';

type Song = {
  title: string;
  subtitle: string;
  url: string;
  image: string;
  isPlaying: boolean;
};

const initialState = {
  title: '',
  subtitle: '',
  url: '',
  image: '',
  isPlaying: false,
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
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, setIsPlaying } = activeSongSlice.actions;

export default activeSongSlice.reducer;
