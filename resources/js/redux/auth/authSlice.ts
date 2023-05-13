import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

interface authState {
    loading: boolean;
    error: null | string;
    userEmail: null | string;
}

const initialState: authState = {
    loading: false,
    error: null,
    userEmail: null,
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
            return {
                ...initialState,
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

export const selectError = (state: RootState): string | null =>
    state.auth.error;

export const selectEmail = (state: RootState): string | null =>
    state.auth.userEmail;

export default authSlice.reducer;
