import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const getAuthToken = () => localStorage.getItem('authToken')
export const setAuthToken = (token: string) => localStorage.setItem('authToken', token)

export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl + 'admin' }),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		profile: builder.query({
			query: () => ({
				url: 'auth',
				headers: {
					Authorization: `Bearer ${getAuthToken()}`,
				}
			}),
		}),
		analytics: builder.query({
			query: () => ({
				url: 'analytics',
				headers: {
					Authorization: `Bearer ${getAuthToken()}`,
				}
			}),
		})
	}),
});

export const { useLoginMutation, useProfileQuery, useAnalyticsQuery } = authApi;
