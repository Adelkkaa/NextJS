import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchImages } from "../actionCreators";

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
export type PhotoArr = {
  photos: IPhoto[];
  isLoading: boolean;
  error: string;
};

const initialState: PhotoArr = {
  photos: [],
  isLoading: false,
  error: "",
};

export const imagesDataSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchImages.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchImages.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchImages.fulfilled.type]: (state, action: PayloadAction<IPhoto[]>) => {
      state.isLoading = false;
      state.error = "";
      state.photos = action.payload;
    },
  },
});

export default imagesDataSlice.reducer;
