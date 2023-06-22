import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getAuthToken } from './api';

const baseUrl = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: "users",
  // baseQuery: fetchBaseQuery({ baseUrl: baseUrl + 'admin' }),
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/admin`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  tagTypes: ["Profile", "Analytics"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query: { count?: number; page?: number }) => ({
        url: `users?page=${query.page}&count=${query.count}`,
      }),
    }),
    getRecentUsers: builder.query({
      query: () => ({
        url: "users?recent=true",
      }),
    }),
    getUser: builder.query({
      query: (query: { id: string }) => ({
        url: `users/${query.id}`,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `users/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetRecentUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
