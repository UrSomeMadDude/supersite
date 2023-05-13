import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

interface linkState {
    loading: boolean;
    error: null | string;
    siteLinks: string[];
    currentLinks: string[];
}

const initialState: linkState = {
    loading: false,
    error: null,
    siteLinks: [],
    currentLinks: [],
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

export const getLinks = createAsyncThunk(
    "links/get",
    async (obj, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/links");

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
                    currentLinks: action.payload.links,
                };
            })
            .addCase(getLinks.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getLinks.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    siteLinks: action.payload.links,
                };
            });
    },
});

export const selectSiteLinks = (state: RootState): string[] =>
    state.links.siteLinks;
export const selectCurrentLinks = (state: RootState): string[] =>
    state.links.currentLinks;

export default linkSlice.reducer;
