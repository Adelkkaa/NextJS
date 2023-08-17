import { configureStore } from "@reduxjs/toolkit";
import imagesDataSliceReducer from "../features/imagesData";
import { postApi } from "../services/postService";

export const store = configureStore({
  reducer: {
    imagesDataSliceReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (gDM) => gDM().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
