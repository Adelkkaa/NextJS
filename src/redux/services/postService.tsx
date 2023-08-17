import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPhoto } from "../features/imagesData";

export const postApi = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    fetchAllPhotos: build.query<IPhoto[], number>({
      query: (limit = 5) => ({
        url: "photos",
        params: {
          _limit: limit,
        },
      }),
      providesTags: ["Posts"],
    }),
  }),
});
