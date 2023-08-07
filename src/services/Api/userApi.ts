import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../queryInterceptors";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: baseQueryWithInterceptor,
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
