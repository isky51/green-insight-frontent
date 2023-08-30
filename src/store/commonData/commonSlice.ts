import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commonService from "./commonService";
import { getTokenHeader } from "../../constant";

/**
 * Redux Slice for common data and functionality
 */

// Define the shape of the state
interface commonState {
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
    emissionDates: any;
    regions: any;
    isError: any;
    projectCountData: any;
    emissionIntensityDetails: any;
    emissionIntensityDetailsIsLoading: boolean;
    isLoadingRegionLevelGlidePath: boolean;
    regionLevelGlideData: any;
    sideBarStatus: boolean;
}

// Initial state
const initialState: commonState = {
    isSuccess: false,
    isLoading: false,
    isError: "",
    message: "",
    emissionDates: null,
    regions: "",
    projectCountData: "",
    emissionIntensityDetails: "",
    emissionIntensityDetailsIsLoading: true,
    isLoadingRegionLevelGlidePath: true,
    regionLevelGlideData: "",
    sideBarStatus: true,
}

// Async Thunk to toggle sidebar status
export const sideBarToggleStatus = createAsyncThunk("toggle", async (status: boolean) => {
    return status;
})

// Async Thunk for fetching emission filter dates
export const getFiltersDate = createAsyncThunk("graph/filters/dates", async (token: string, thunkApi) => {
    try {
        // Create user token with authorization header
        const userToken = { headers: { Authorization: `Bearer ${token}` } };
        return await commonService.getFiltersDate(userToken);
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

// Async Thunk for posting emission intensity data
export const graphEmissionIntensity = createAsyncThunk("post/emissionIntensity", async (userData, thunkApi) => {
    try {
        // Call common service to post emission intensity data
        return await commonService.postRegionIntensity(userData, getTokenHeader());
    }
    catch (error: any) {
        // Handle errors and reject with error message
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

// Async Thunk for fetching regions
export const regionShow = createAsyncThunk("get/region", async (_, thunkApi) => {
    try {
        // Call common service to get regions
        return await commonService.getRegions(getTokenHeader());
    }
    catch (error: any) {
        // Handle errors and reject with error message
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

// Async Thunk for posting region level glide path details
export const regionLevelGlidePath = createAsyncThunk("post/glideRegionPath/Details", async (userData: any, thunkApi) => {
    try {
        // Call common service to post region level glide path details
        return await commonService.postRegionLevelGlidePath(userData, getTokenHeader());
    }
    catch (error: any) {
        // Handle errors and reject with error message
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

// Async Thunk for fetching project count
export const getProjectCount = createAsyncThunk("get/project/count", async (userData: any, thunkApi) => {
    try {
        // Call common service to get project count
        return await commonService.getProjectCountApi(userData, getTokenHeader());
    }
    catch (error: any) {
        // Handle errors and reject with error message
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


// Define the common data reducer
export const commonDataReducer = createSlice({
    name: "common-data",
    initialState,
    reducers: {
        reset: (state) => {
            // Reset state to initial values
            state.isLoading = false;
            state.message = "";
            state.emissionDates = null;
            state.regions=""
            state.isError= "";
            state.projectCountData= "";
            state.emissionIntensityDetailsIsLoading = true
            state.isSuccess=false;
            state.isLoading= false;
            state.emissionIntensityDetails = "";
            state.isLoadingRegionLevelGlidePath=true;
            state.regionLevelGlideData="";
            state.sideBarStatus= true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFiltersDate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFiltersDate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.emissionDates = action.payload;
            })
            .addCase(getFiltersDate.rejected, (state, action) => {
                state.isLoading = false;
                state.emissionDates = null;
            })
            .addCase(regionShow.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(regionShow.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.regions = action.payload;
            })
            .addCase(regionShow.rejected, (state, _) => {
                state.isLoading = true;
                state.regions = null;
                state.isSuccess = false;
            })
            .addCase(graphEmissionIntensity.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.emissionIntensityDetailsIsLoading = true
            })
            .addCase(graphEmissionIntensity.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.emissionIntensityDetails = action.payload;
                state.emissionIntensityDetailsIsLoading = false
            })
            .addCase(graphEmissionIntensity.rejected, (state, _) => {
                state.isLoading = true;
                state.emissionIntensityDetails =null;
                state.isSuccess = false;
                state.emissionIntensityDetailsIsLoading = false
            })
            .addCase(regionLevelGlidePath.pending, (state) => {
                state.isLoadingRegionLevelGlidePath = true;
                state.isSuccess = false;
                state.regionLevelGlideData = "";
            })
            .addCase(regionLevelGlidePath.fulfilled, (state, action) => {
                state.isLoadingRegionLevelGlidePath = false;
                state.isSuccess = true;
                state.regionLevelGlideData = action.payload;
            })
            .addCase(regionLevelGlidePath.rejected, (state, _) => {
                state.isLoadingRegionLevelGlidePath = false;
                state.regionLevelGlideData = null;
                state.isSuccess = false;
            })
            .addCase(getProjectCount.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.projectCountData = null
            })
            .addCase(getProjectCount.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.projectCountData = action.payload;
            })
            .addCase(getProjectCount.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(sideBarToggleStatus.fulfilled, (state,action) => {
                state.sideBarStatus = action.payload;
            })
    }
})

// Export actions and reducer
export const { reset } = commonDataReducer.actions;
export default commonDataReducer.reducer;
