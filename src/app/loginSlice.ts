import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {User, userApi} from './userAPI'

export const logIn = createAsyncThunk(
    'user/login',
    async (user: User) => {
        return await userApi.get(user) as string 
    }
)

export const createUser = createAsyncThunk(
    'user/create',
    async (user: User) => {
        return await userApi.post(user) as string 
    }
)

export interface LoginState {
    isLoggedIn: boolean,
    userName: string,
    err: {
        loginErr: boolean,
        passwordError: boolean,
        networkErr: boolean
    }
}

const initialState: LoginState = {
    isLoggedIn: false,
    userName: '',
    err: {
        loginErr: false,
        passwordError: false,
        networkErr: false
    }
}

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut:(state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.userName = action.payload
        });
        builder.addCase(logIn.pending, (state) => {
            state.err = initialState.err
        })
        builder.addCase(logIn.rejected, (state, action) => {
            state.isLoggedIn = false;
            if (action.payload === 'Неверный логин') {
                state = initialState;
                state.err.loginErr = true;
            } else if (action.payload === 'Неверный пароль') {
                state = initialState;
                state.err.passwordError = true;
            } else {
                state = initialState;
                state.err.networkErr = true
            }
        });
        builder.addCase(createUser.pending, (state) =>{
            state.err = initialState.err
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.userName = action.payload;
        })
        builder.addCase(createUser.rejected, (state, action) => {
            if (action.payload === 'Такой пользователь уже существует') {
                state.err.loginErr = true;
            } else {
                state.err.networkErr = true;
            }
        })
    }
})

export const {logOut} = loginSlice.actions
export default loginSlice.reducer