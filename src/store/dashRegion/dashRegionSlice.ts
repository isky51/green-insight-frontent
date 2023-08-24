import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface dashRegionState {
    isRegion:any,
    isLane:any,
    isFacility:any,
    isCarrier:any
}

const initialState:dashRegionState = {
    isRegion:false,
    isLane:false,
    isFacility:false,
    isCarrier:false
};

export const changeRegion = createAsyncThunk(
    "get/dash/region",
     (data:boolean) => {
        return data
    }
);

export const changeLane = createAsyncThunk(
    "get/dash/lane",
     (data:boolean) => {
        return data
    }
);export const changeFacility = createAsyncThunk(
    "get/dash/facility",
     (data:boolean) => {
        return data
    }
);export const changeCarrier = createAsyncThunk(
    "get/dash/carrier",
     (data:boolean) => {
        return data
    }
);

export const dashRegionReducer = createSlice({
    name: "dashboard-Page",
    initialState,
    reducers: {
        
        clearData: (state) => {
            state.isRegion = false;
            state.isLane = false;
            state.isFacility = false;
            state.isCarrier = false;     
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(changeRegion.fulfilled, (state,action) => {
                state.isRegion = action.payload;
            })
            .addCase(changeLane.fulfilled, (state,action) => {
                state.isLane = action.payload;
            })  
            .addCase(changeFacility.fulfilled, (state,action) => {
                state.isFacility = action.payload;
            })  
            .addCase(changeCarrier.fulfilled, (state,action) => {
                state.isCarrier = action.payload;
            })
    },
});

export const { clearData } = dashRegionReducer.actions;
export default dashRegionReducer.reducer;
