import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { historyAPI, HistRecord } from "./historyAPI";
import { logOut } from "./loginSlice";

export const getHistory = createAsyncThunk(
	"history/get",
	async (param = undefined, thunkAPI: any) => {
		const userName: string = thunkAPI.getState().login.userName;
		return await historyAPI.get(userName);
	}
);

export const postHistory = createAsyncThunk(
	"history/post",
	async (record: HistRecord, thunkAPI: any) => {
		// console.log("post history thunk");
		const userName: string = thunkAPI.getState().login.userName;
		return await historyAPI.post(userName, record);
	},
	// will cancel creating a record if user is not logged in
	{
		condition: (record, { getState }: any) => {
			const isLoggedIn: boolean = getState().login.isLoggedIn;

			if (!isLoggedIn) {
				// console.log("cancelled");
				return false;
			}
		},
	}
);

export const clearHistory = createAsyncThunk(
	"history/clear",
	async (param = undefined, thunkAPI: any) => {
		const login = thunkAPI.getState().login.userName;
		return await historyAPI.delete(login);
	}
);

interface InitialState {
	data: HistRecord[];
	error: string;
}

const initialState: InitialState = {
	data: [],
	error: "",
};

const historySlice = createSlice({
	name: "favourites",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getHistory.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(getHistory.pending, (state, action) => {
			state.error = "";
		});
		builder.addCase(getHistory.rejected, (state, action) => {
			state.error = action.error.message as string;
		});
		builder.addCase(postHistory.fulfilled, (state, action) => {
			state.data = [...state.data, action.payload];
		});
		builder.addCase(postHistory.pending, (state, action) => {
			state.error = "";
		});
		builder.addCase(postHistory.rejected, (state, action) => {
			state.error = action.error.message as string;
		});
		builder.addCase(clearHistory.fulfilled, (state, action) => {
			state.data = [];
		});
		builder.addCase(clearHistory.pending, (state, action) => {
			state.error = "";
		});
		builder.addCase(clearHistory.rejected, (state, action) => {
			state.error = action.error.message as string;
		});
		builder.addCase(logOut, (state, action) => {
			state = { ...initialState };
			return state;
		});
	},
});

export default historySlice.reducer;
