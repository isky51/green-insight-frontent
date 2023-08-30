import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the shape of the state
interface dashRegionState {
    isRegion: boolean;
    isLane: boolean;
    isFacility: boolean;
    isCarrier: boolean;
}

// Initial state
const initialState: dashRegionState = {
    isRegion: false,
    isLane: false,
    isFacility: false,
    isCarrier: false,
};

// Async Thunks for changing region, lane, facility, and carrier
export const changeRegion = createAsyncThunk(
    "get/dash/region",
    (data: boolean) => {
        return data;
    }
);

export const changeLane = createAsyncThunk(
    "get/dash/lane",
    (data: boolean) => {
        return data;
    }
);

export const changeFacility = createAsyncThunk(
    "get/dash/facility",
    (data: boolean) => {
        return data;
    }
);

export const changeCarrier = createAsyncThunk(
    "get/dash/carrier",
    (data: boolean) => {
        return data;
    }
);

// Define the dashboard region reducer
export const dashRegionReducer = createSlice({
    name: "dashboard-Page",
    initialState,
    reducers: {
        // Reducer to clear data
        clearData: (state) => {
            state.isRegion = false;
            state.isLane = false;
            state.isFacility = false;
            state.isCarrier = false;
        },
    },
    extraReducers: (builder) => {
        // Handle fulfilled actions for changing region, lane, facility, and carrier
        builder
            .addCase(changeRegion.fulfilled, (state, action) => {
                state.isRegion = action.payload;
            })
            .addCase(changeLane.fulfilled, (state, action) => {
                state.isLane = action.payload;
            })
            .addCase(changeFacility.fulfilled, (state, action) => {
                state.isFacility = action.payload;
            })
            .addCase(changeCarrier.fulfilled, (state, action) => {
                state.isCarrier = action.payload;
            });
    },
});

// Export the action and reducer
export const { clearData } = dashRegionReducer.actions;
export default dashRegionReducer.reducer;
