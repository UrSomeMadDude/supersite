import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

interface linkState {
    loading: boolean;
    error: null | string;
    photoLlinks: string[];
}

const initialState: linkState = {
    loading: false,
    error: null,
    photoLlinks: [],
};

export const sendLinks = createAsyncThunk(
    "links/send",
    async (obj: string[], { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/links", obj);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const linkSlice = createSlice({
    name: "links",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendLinks.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(sendLinks.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    photoLlinks: action.payload,
                };
            });
    },
});

export default linkSlice.reducer;
