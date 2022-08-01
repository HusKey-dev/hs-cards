import {
	configureStore,
	ThunkAction,
	Action,
	getDefaultMiddleware,
} from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import { hsApi } from "./hsAPI";
import loginReducer from "./loginSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		login: loginReducer,
		[hsApi.reducerPath]: hsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(hsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
