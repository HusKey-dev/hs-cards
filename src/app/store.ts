import {
	configureStore,
	ThunkAction,
	Action,
	getDefaultMiddleware,
} from "@reduxjs/toolkit";

import { hsApi } from "./hsAPI";
import loginReducer from "./loginSlice";
import favouritesReducer from "./favouritesSlice";
import historyReducer from "./historySlice";

// Some sort of custom middleware. Do not really need it since rtk query has kind-of private actions
const dateMiddleware = (store: any) => (next: any) => (action: any) => {
	// console.log(action);
	return next(action);
};

export const store = configureStore({
	reducer: {
		login: loginReducer,
		favourites: favouritesReducer,
		history: historyReducer,
		[hsApi.reducerPath]: hsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(hsApi.middleware).concat(dateMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
