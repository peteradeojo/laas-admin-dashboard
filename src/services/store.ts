import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./Api/api";
import { userApi } from "./Api/userApi";
import { twoApi } from "./Api/twoApi";
import { alertsApi } from "./Api/alerts";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [twoApi.reducerPath]: twoApi.reducer,
    [alertsApi.reducerPath]: alertsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      twoApi.middleware,
      alertsApi.middleware,
    ]),
});

setupListeners(store.dispatch);
