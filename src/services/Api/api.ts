/* eslint-disable no-mixed-spaces-and-tabs */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryForAuth } from "../queryInterceptors";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryForAuth,
  refetchOnReconnect: true,
  tagTypes: ["Profile", "Analytics"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),
    profile: builder.query({
      query: () => "auth",
      providesTags: ["Profile"],
    }),
    analytics: builder.query({
      query: () => "analytics",
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useLoginMutation, useProfileQuery, useAnalyticsQuery } = authApi;
