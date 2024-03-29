import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commonService from "./commonService";
import { getTokenHeader } from "../../constant";

/**
 * Redux Slice for common functions
 */

// Define the shape of the state
interface commonState {
    isSuccess:boolean
    isLoading: boolean;
    message: string;
    emissionDates: any;
    regions:any;
    emissionIntensityDetails:any
    emissionIntensityDetailsIsLoading:boolean;
    isLoadingRegionLevelGlidePath:boolean;
    regionLevelGlideData:any;
}

// Initial state
const initialState: commonState = {
    isSuccess:false,
    isLoading: false,
    message: "",
    emissionDates: null,
    regions:"",
    emissionIntensityDetails: "",
    emissionIntensityDetailsIsLoading:true,
    isLoadingRegionLevelGlidePath:true,
    regionLevelGlideData: ""
}

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

export const graphEmissionIntensity = createAsyncThunk("post/emissionIntensity", async (userData, thunkApi) => {
    try {
        return await commonService.postRegionIntensity(userData, getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const regionShow = createAsyncThunk("get/region", async (_, thunkApi) => {
    try {
      
        return await commonService.getRegions(getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const regionLevelGlidePath = createAsyncThunk("post/glideRegionPath/Details", async (userData, thunkApi) => {
    try {

        return await commonService.postRegionLevelGlidePath(userData, getTokenHeader());
    }
    catch (error:any) {
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
            state.emissionIntensityDetailsIsLoading = true
            state.isSuccess=false;
            state.isLoading= false;
            state.emissionIntensityDetails = "";
            state.isLoadingRegionLevelGlidePath=true;
            state.regionLevelGlideData="";
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
    }
})

// Export actions and reducer
export const { reset } = commonDataReducer.actions;
export default commonDataReducer.reducer;
