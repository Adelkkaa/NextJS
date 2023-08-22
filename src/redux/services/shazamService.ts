import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react';
import { url } from 'inspector';
import { RootObject } from './types';

export const shazamApi = createApi({
  reducerPath: 'shazamAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders(headers) {
      headers.set('X-RapidAPI-Key', process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllCharts: builder.query<RootObject, void>({
      query: () => ({
        url: '/songs/list-recommendations',
        params: {
          key: '484129036',
        },
      }),
    }),
  }),
});
