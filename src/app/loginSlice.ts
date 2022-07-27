import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, userApi } from "./userAPI";

export const logIn = createAsyncThunk("user/login", async (user: User) => {
	return (await userApi.get(user)) as string;
});

export const createUser = createAsyncThunk(
	"user/create",
	async (user: User) => {
		return (await userApi.post(user)) as string;
	}
);

export interface LoginState {
	isLoggedIn: boolean;
	userName: string;
	err: {
		loginErr: boolean;
		passwordErr: boolean;
		networkErr: boolean;
	};
}

const initialState: LoginState = {
	isLoggedIn: false,
	userName: "",
	err: {
		loginErr: false,
		passwordErr: false,
		networkErr: false,
	},
};

const loginSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logOut: (state) => {
			state = { ...initialState };
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logIn.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.userName = action.payload;
		});
		builder.addCase(logIn.pending, (state) => {
			state.err = { ...initialState.err };
		});
		builder.addCase(logIn.rejected, (state, action) => {
			state.isLoggedIn = false;
			state.userName = "";
			if (action.error.message === "Неверный логин") {
				state.err.loginErr = true;
			} else if (action.error.message === "Неверный пароль") {
				state.err.passwordErr = true;
			} else {
				state.err.networkErr = true;
			}
		});
		builder.addCase(createUser.pending, (state) => {
			state.err = { ...initialState.err };
		});
		builder.addCase(createUser.fulfilled, (state, action) => {
			state.userName = action.payload;
		});
		builder.addCase(createUser.rejected, (state, action) => {
			if (action.error.message === "Такой пользователь уже существует") {
				state.err.loginErr = true;
			} else {
				state.err.networkErr = true;
			}
		});
	},
});

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;
