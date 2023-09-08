import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Track } from 'redux/services/types';

type PostMoreLiked = {
  id: string;
  tracks: Track[];
};

export const fetchLikedSongs = createAsyncThunk(
  'favorites/fetchAll',
  async (params: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/likedSongs/${params}`);
      return response.data.tracks;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось найти список избранных треков');
    }
  },
);

export const setLikedSong = createAsyncThunk(
  'favorites/addMore',
  async ({ id, tracks }: PostMoreLiked, thunkAPI) => {
    try {
      await axios.put(`http://localhost:4000/likedSongs/${id}`, {
        id,
        tracks: tracks,
      });
      return tracks;
    } catch (e) {
      return thunkAPI.rejectWithValue('Произошла ошибка при добавлении трека в избранное');
    }
  },
);
