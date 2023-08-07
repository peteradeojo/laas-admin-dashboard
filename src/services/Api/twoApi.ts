/* eslint-disable no-mixed-spaces-and-tabs */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutAdminWithInterceptor } from "../queryInterceptors";

export const twoApi = createApi({
  reducerPath: "twoFA",
  baseQuery: baseQueryWithoutAdminWithInterceptor,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    enable2FA: builder.mutation({
      query: ({ ...body }) => ({
        url: "auth/2fa/enable",
        method: "POST",
        body: body,
      }),
    }),
    setup2FA: builder.query({
      query: () => "auth/2fa/setup",
    }),
    verify2FA: builder.mutation({
      query: ({ ...body }) => ({
        url: "auth/2fa/verify",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useEnable2FAMutation, useSetup2FAQuery, useVerify2FAMutation } =
  twoApi;
