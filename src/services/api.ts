/* eslint-disable no-mixed-spaces-and-tabs */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

// export const getAuthToken = () => sessionStorage.getItem('authToken')
// export const setAuthToken = (token: string) => localStorage.setItem('authToken', token)

export const authApi = createApi({
  reducerPath: "auth",
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
