import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { callsApi } from "../services/CallsService";
import callsReducer from "./reducers/CallsSlice";
const rootReducer = combineReducers({
    callsReducer,
    [callsApi.reducerPath]: callsApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(callsApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
