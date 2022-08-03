import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { favouritesAPI, FavRecord } from "./favouritesAPI";
import { logOut } from "./loginSlice";

export const getFavourites = createAsyncThunk(
	"favourites/get",
	async (param = undefined, thunkAPI: any) => {
		console.log("get favourites slice");
		const userName: string = thunkAPI.getState().login.userName;
		return await favouritesAPI.get(userName);
	}
);

export const putFavourite = createAsyncThunk(
	"favourites/put",
	async (record: FavRecord, thunkAPI: any) => {
		console.log("put favourite thunk");
		const userName: string = thunkAPI.getState().login.userName;
		return await favouritesAPI.put(userName, record);
	}
);

export const deleteFavourite = createAsyncThunk(
	"favourites/delete",
	async (id: string, thunkAPI: any) => {
		const login = thunkAPI.getState().login.userName;
		return await favouritesAPI.delete(login, id);
	}
);

interface InitialState {
	data: FavRecord[];
	error: string;
}

const initialState: InitialState = {
	data: [],
	error: "",
};

const favouritesSlice = createSlice({
	name: "favourites",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getFavourites.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(getFavourites.pending, (state, action) => {
			state.error = "";
		});
		builder.addCase(getFavourites.rejected, (state, action) => {
			state.error = action.error.message as string;
		});
		builder.addCase(putFavourite.fulfilled, (state, action) => {
			state.data = [action.payload, ...state.data];
		});
		builder.addCase(putFavourite.pending, (state, action) => {
			state.error = "";
		});
		builder.addCase(putFavourite.rejected, (state, action) => {
			state.error = action.error.message as string;
		});
		builder.addCase(deleteFavourite.fulfilled, (state, action) => {
			state.data = state.data.filter((el, i) => i !== action.payload);
		});
		builder.addCase(deleteFavourite.pending, (state, action) => {
			state.error = "";
		});
		builder.addCase(deleteFavourite.rejected, (state, action) => {
			state.error = action.error.message as string;
		});
		builder.addCase(logOut, (state, action) => {
			state = { ...initialState };
			return state;
		});
	},
});

export default favouritesSlice.reducer;
