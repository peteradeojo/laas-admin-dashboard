import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptor } from '../queryInterceptors';

export const alertsApi = createApi({
	reducerPath: 'alerts',
	baseQuery: baseQueryWithInterceptor,
	refetchOnReconnect: true,
	endpoints: (builder) => ({
		getAlerts: builder.query({
			query: ({page, count = 10}) => ({
				url: `/alerts?page=${page}&count=${count}`,
			}),
		}),
	}),
});

export const { useGetAlertsQuery } = alertsApi;
