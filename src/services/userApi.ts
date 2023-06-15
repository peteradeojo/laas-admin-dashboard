import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from './api';

const baseUrl = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl + 'admin' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query: { count: number, page: number }) => ({
        url: `users?page=${query.page}&count=${query.count}`,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      })
    }),
    getRecentUsers: builder.query({
      query: () => ({
        url: 'users?recent=true',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      })
    })
  }),
})

export const { useGetUsersQuery, useGetRecentUsersQuery } = userApi;