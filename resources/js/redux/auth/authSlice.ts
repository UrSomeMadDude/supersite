import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

interface authState {
    loading: boolean;
    error: null | string;
    userEmail: null | string;
    isInitialized: boolean;
}

const initialState: authState = {
    loading: false,
    error: null,
    userEmail: null,
    isInitialized: false,
};

export const login = createAsyncThunk(
    "auth/login",
    async (obj, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/login", obj);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (obj, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/registration", obj);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            localStorage.clear();
            return {
                ...initialState,
                isInitialized: true,
            };
        },
        getUserData: (state, action) => {
            return {
                ...state,
                userEmail: action.payload.email,
                isInitialized: true,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("userMail", action.payload.email);
                return {
                    ...state,
                    loading: false,
                    userEmail: action.payload.email,
                };
            })
            .addCase(login.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.error,
                };
            })
            .addCase(register.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(register.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    userEmail: action.payload.email,
                    error: action.payload.error ? action.payload.error : null,
                };
            })
            .addCase(register.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.error,
                };
            });
    },
});

export const { getUserData, logOut } = authSlice.actions;

export const selectError = (state: RootState): string | null =>
    state.auth.error;

export const selectEmail = (state: RootState): string | null =>
    state.auth.userEmail;

export const selectIsInitialized = (state: RootState): boolean =>
    state.auth.isInitialized;

export default authSlice.reducer;
