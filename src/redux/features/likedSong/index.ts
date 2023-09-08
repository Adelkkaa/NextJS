import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Track } from 'redux/services/types';
import { fetchLikedSongs, setLikedSong } from '../actionCreators';

type State = {
  likedSongs: Track[];
  isLoading: boolean;
  error: string;
};

const initialState: State = {
  likedSongs: [],
  isLoading: false,
  error: '',
};

const likedSongsSlice = createSlice({
  name: 'liked songs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLikedSongs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchLikedSongs.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchLikedSongs.fulfilled.type]: (state, action: PayloadAction<Track[]>) => {
      state.isLoading = false;
      state.error = '';
      state.likedSongs = action.payload;
    },
    [setLikedSong.pending.type]: (state) => {
      state.isLoading = true;
    },
    [setLikedSong.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [setLikedSong.fulfilled.type]: (state, action: PayloadAction<Track[]>) => {
      state.isLoading = false;
      state.error = '';
      state.likedSongs = action.payload;
    },
  },
});

export default likedSongsSlice.reducer;
