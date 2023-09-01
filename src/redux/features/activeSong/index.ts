import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootObject } from 'redux/services/types';

// todo: fix repeat functionality
type Song = {
  title: string;
  subtitle: string;
  url: string;
  image: string;
  activeIndex: number;
  isPlaying: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
};

type State = Song & RootObject;

const initialState: State = {
  tracks: [],
  title: '',
  subtitle: '',
  url: '',
  image: '',
  activeIndex: 0,
  isPlaying: false,
  isShuffle: false,
  isRepeat: false,
};

const activeSongSlice = createSlice({
  name: 'active song',
  initialState,
  reducers: {
    setActiveSong: (state: State, action: PayloadAction<Partial<Song>>) => {
      Object.assign(state, { ...state, ...action.payload });
    },
    setIsPlaying: (state: State, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsRepeat: (state: State) => {
      state.isRepeat = !state.isRepeat;
    },
    setIsShuffle: (state: State) => {
      state.isShuffle = !state.isShuffle;
    },
    setSongsList: (state: State, action: PayloadAction<RootObject>) => {
      state.tracks = action.payload.tracks;
    },
    setNextSong: (state: State, action: PayloadAction<number>) => {
      if (state.tracks.length > 0) {
        if ((state.activeIndex < state.tracks.length - 1 || state.isRepeat) && action.payload) {
          state.title = state.tracks[action.payload].title;
          state.subtitle = state.tracks[action.payload].subtitle;
          state.url = state.tracks[action.payload].hub.actions[1].uri as string;
          state.image = state.tracks[action.payload].images.coverart;
          state.activeIndex = action.payload;
        } else {
          state.title = state.tracks[0].title;
          state.subtitle = state.tracks[0].subtitle;
          state.url = state.tracks[0].hub.actions[1].uri as string;
          state.image = state.tracks[0].images.coverart;
          state.activeIndex = 0;
        }
      }
    },
    setPreviousSong: (state: State) => {
      if (state.tracks.length > 0) {
        if (state.activeIndex > 0) {
          state.title = state.tracks[state.activeIndex - 1].title;
          state.subtitle = state.tracks[state.activeIndex - 1].subtitle;
          state.url = state.tracks[state.activeIndex - 1].hub.actions[1].uri as string;
          state.image = state.tracks[state.activeIndex - 1].images.coverart;
          state.activeIndex -= 1;
        } else {
          state.title = state.tracks[state.tracks.length - 1].title;
          state.subtitle = state.tracks[state.tracks.length - 1].subtitle;
          state.url = state.tracks[state.tracks.length - 1].hub.actions[1].uri as string;
          state.image = state.tracks[state.tracks.length - 1].images.coverart;
          state.activeIndex = state.tracks.length - 1;
        }
      }
    },
  },
});

export const {
  setActiveSong,
  setIsPlaying,
  setSongsList,
  setNextSong,
  setPreviousSong,
  setIsRepeat,
  setIsShuffle,
} = activeSongSlice.actions;

export default activeSongSlice.reducer;
