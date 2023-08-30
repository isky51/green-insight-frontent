import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regionService from "./regionService";
import { getTokenHeader } from "../../constant";
import commonService from "../commonData/commonService";

// Define the state interface for the region overview
interface RegionOverviewState {
  isError: any;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  regionEmissionIntensityDetails: any;
  regionEmissionIntensityDetailsIsLoading: boolean;
  totalEmissionOverallDetails: any;
  regionFacilityEmissionDto: any;
  regionFacilityEmissionIsLoading: boolean;
}

// Define the initial state for the region overview
const initialState: RegionOverviewState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  regionEmissionIntensityDetails: "",
  regionEmissionIntensityDetailsIsLoading: true,
  totalEmissionOverallDetails: "",
  regionFacilityEmissionDto: null,
  regionFacilityEmissionIsLoading: true,
};

// Create async thunk for fetching region emission intensity overall data
export const regionEmissionIntensityOverall = createAsyncThunk(
  "get/region-overall/emission-intensity",
  async (userData: any, thunkApi) => {
    try {
      return await commonService.postRegionIntensity(userData, getTokenHeader());
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Create async thunk for fetching total emission overall data
export const totalEmissionOverall = createAsyncThunk(
  "get/region-overall/totalEmission",
  async (userData: any, thunkApi) => {
    try {
      return await regionService.regionQuartelyGet(
        userData,
        getTokenHeader()
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Create async thunk for fetching region facility emissions data
export const regionFacilityEmissions = createAsyncThunk(
  "get/region-facility/emissions",
  async (userData: any, thunkApi) => {
    try {
      return await regionService.regionFacilityEmissionApi(
        userData,
        getTokenHeader()
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Create the region overview reducer slice
export const regionOverviewReducer = createSlice({
  name: "region-Page",
  initialState,
  reducers: {
    // Reset the state to initial values
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.regionEmissionIntensityDetails = "";
      state.regionEmissionIntensityDetailsIsLoading = true;
      state.totalEmissionOverallDetails = "";
      state.regionFacilityEmissionDto = null;
      state.regionFacilityEmissionIsLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(totalEmissionOverall.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(totalEmissionOverall.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalEmissionOverallDetails = action.payload;
      })
      .addCase(totalEmissionOverall.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = action.payload;
        state.isSuccess = false;
      })
      .addCase(regionEmissionIntensityOverall.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.regionEmissionIntensityDetails = null;
        state.regionEmissionIntensityDetailsIsLoading = true;
      })
      .addCase(regionEmissionIntensityOverall.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.regionEmissionIntensityDetails = action.payload;
        state.regionEmissionIntensityDetailsIsLoading = false;
      })
      .addCase(regionEmissionIntensityOverall.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = action.payload;
        state.isSuccess = false;
        state.regionEmissionIntensityDetailsIsLoading = false;
      })
      .addCase(regionFacilityEmissions.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.regionFacilityEmissionDto = null;
        state.regionFacilityEmissionIsLoading = true;
      })
      .addCase(regionFacilityEmissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.regionFacilityEmissionDto = action.payload;
        state.regionFacilityEmissionIsLoading = false;
      })
      .addCase(regionFacilityEmissions.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = action.payload;
        state.isSuccess = false;
        state.regionFacilityEmissionIsLoading = false;
      });
  },
});

// Export reducer actions and reducer function
export const { reset } = regionOverviewReducer.actions;
export default regionOverviewReducer.reducer;
