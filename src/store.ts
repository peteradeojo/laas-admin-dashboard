import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './services/api';
import { userApi } from './services/userApi';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware),
});

setupListeners(store.dispatch);
