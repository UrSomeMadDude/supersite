import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    userEmail: null,
};

const axiosInstanse = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = createAsyncThunk("auth/login", async (obj) => {
    console.log(obj);

    const { data } = await axiosInstanse.get("/api/login", obj);
    return data;
});

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
                    error: "error",
                };
            });
    },
});

export default authSlice.reducer;
