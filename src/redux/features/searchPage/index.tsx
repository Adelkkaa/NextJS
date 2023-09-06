import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Search = {
  isActive: boolean;
  searchValue: string;
};

const initialState = {
  isActive: false,
  searchValue: '',
};

const searchPageSlice = createSlice({
  name: 'search request',
  initialState,
  reducers: {
    setSearchValue: (state: Search, action: PayloadAction<string>) => {
      state.isActive = true;
      state.searchValue = action.payload;
    },
    setClosePage: (state: Search) => {
      state.isActive = false;
      state.searchValue = '';
    },
  },
});

export const { setSearchValue, setClosePage } = searchPageSlice.actions;
export default searchPageSlice.reducer;
