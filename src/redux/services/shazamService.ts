import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react';
import { HintObject, RootObject, SearchObject } from './types';

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
    fetchAutoComplete: builder.query<HintObject, { term: string }>({
      query: ({ term }) => ({
        url: '/auto-complete',
        params: {
          term: term,
        },
      }),
    }),
    fetchTracks: builder.query<SearchObject, { term: string }>({
      query: ({ term }) => ({
        url: '/search',
        params: {
          term: term,
          limit: 10,
        },
      }),
    }),
  }),
});

export const { useFetchAllChartsQuery, useFetchAutoCompleteQuery, useFetchTracksQuery } = shazamApi;
