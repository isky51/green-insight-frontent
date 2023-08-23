import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regionService from "./regionService";
import { getTokenHeader } from "../../constant";

/**
 * Redux Slice for managing regional data
 */

// Define the shape of the state
interface regionState {
    isError: any,
    isSuccess: boolean,
    isLoading: boolean,
    message: string,
    regionTableDetails: any,
    regionGraphDetails: any,
    regionGraphDetailsLoading: boolean
}

// Initial state
const initialState: regionState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    regionTableDetails: "",
    regionGraphDetails: "",
    regionGraphDetailsLoading: true
}

// Async Thunk for fetching region table data
export const regionTableData = createAsyncThunk("get/region/table-Data", async (userData: any, thunkApi) => {
    try {
        return await regionService.regionTableDataGet(userData, getTokenHeader());
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

// Async Thunk for fetching region graph data
export const regionGraphData = createAsyncThunk("get/region/Graph", async (userData: any, thunkApi) => {
    try {
        return await regionService.regionGraphPost(userData, getTokenHeader());
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

// Define the regional data reducer
export const regionDataReducer = createSlice({
    name: "region-data",
    initialState,
    reducers: {
        reset: (state) => {
            // Reset state to initial values
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
            state.regionTableDetails = "";
            state.regionGraphDetails = "";
            state.regionGraphDetailsLoading = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(regionTableData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(regionTableData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.regionTableDetails = action.payload;
            })
            .addCase(regionTableData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(regionGraphData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.regionGraphDetailsLoading = true;
            })
            .addCase(regionGraphData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.regionGraphDetails = action.payload;
                state.regionGraphDetailsLoading = false;
            })
            .addCase(regionGraphData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.regionGraphDetailsLoading = false;
            });
    }
});

// Export actions and reducer
export const { reset } = regionDataReducer.actions;
export default regionDataReducer.reducer;
