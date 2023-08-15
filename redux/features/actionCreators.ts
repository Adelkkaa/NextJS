import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchImages = createAsyncThunk(
  "images/fetchall",
  async (params: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_limit=${params}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось найти фотографии");
    }
  }
);
