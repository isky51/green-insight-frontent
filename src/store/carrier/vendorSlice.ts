import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import vendorService from "./vendorService";
import { getTokenHeader } from "../../constant";

interface Intialstate {
    isError: any,
    isSuccess: Boolean,
    isLoading: Boolean,
    isLoadingVendorTableDetails: Boolean,
    message: String,
    vendorTableDetails: any,
    vendorGraphDetails: any,
    carrierOverviewDetail: any,
    laneBreakdownDetail: any,
    laneBreakdownDetailLoading: Boolean,
    laneCarrierListName: any,
    laneCarrierListNameLoading: Boolean,
    getLaneCarrierCompaireDto: any,
    getLaneCarrierCompaireDtoLoading: Boolean,
    laneCarrierTableDtoLoading: any,
    laneCarrierTableDto: any
}

const initialState: Intialstate = {
    isError: "",
    isSuccess: false,
    isLoading: false,
    isLoadingVendorTableDetails: true,
    message: "",
    vendorTableDetails: null,
    vendorGraphDetails: "",
    carrierOverviewDetail: null,
    laneBreakdownDetail: null,
    laneBreakdownDetailLoading: true,
    laneCarrierListName: null,
    laneCarrierListNameLoading: true,
    getLaneCarrierCompaireDto: null,
    getLaneCarrierCompaireDtoLoading: true,
    laneCarrierTableDtoLoading: false,
    laneCarrierTableDto: null
}

export const vendorTableData = createAsyncThunk("get/vendor/table-Data", async (userData: Object, thunkApi) => {
    try {
        return await vendorService.vendorTableDataGet(userData, getTokenHeader());
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const vendorGraphData = createAsyncThunk("get/vendor/Graph", async (userData: Object, thunkApi) => {
    try {

        return await vendorService.vendorGraphPost(userData, getTokenHeader());
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const getCarrierOverviewData = createAsyncThunk("get/vendor/Graph/Overview", async (userData, thunkApi) => {
    try {

        return await vendorService.getCarrierOverview(userData, getTokenHeader());
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const getLaneBreakdown = createAsyncThunk("get/vendor/Graph/detail", async (userData: any, thunkApi) => {
    try {

        // let tokenDetails = { headers: { Authorization: `Bearer ${tokenDetails1}` }, cancelToken: userData.source.token }
        return await vendorService.getLaneBreakdown({ id: userData.id }, getTokenHeader());
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const getLaneCarrierList = createAsyncThunk("get/carrier/name/detail", async (userData, thunkApi) => {
    try {

        return await vendorService.getLaneCarrierList(userData, getTokenHeader());
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const getLaneCarrierCompaire = createAsyncThunk("get/carrier/compaire/detail", async (userData, thunkApi) => {
    try {
        return await vendorService.getLaneCarrierCompaire(userData, getTokenHeader());
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const laneCarrierTableData = createAsyncThunk("get/lane/carrier/table-Data", async (userData, thunkApi) => {
    try {

        return await vendorService.laneCarrierTableDataApi(userData, getTokenHeader());
    }
    catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})




export const carrierDetailsReducer = createSlice({
    name: "vendor-Page",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isLoadingVendorTableDetails = true;
            state.isError = "";
            state.isSuccess = false;
            state.message = "";
            state.vendorTableDetails = null;
            state.vendorGraphDetails = "";
            state.carrierOverviewDetail = null;
            state.laneBreakdownDetail = null
            state.laneBreakdownDetailLoading = true
            state.laneCarrierListName = null
            state.laneCarrierListNameLoading = true
            state.getLaneCarrierCompaireDto = null
            state.getLaneCarrierCompaireDtoLoading = true
            state.laneCarrierTableDto = null
            state.laneCarrierTableDtoLoading = false

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(vendorTableData.pending, (state) => {
                state.isLoadingVendorTableDetails = true;
                state.isSuccess = false;
                state.vendorTableDetails = null
            })
            .addCase(vendorTableData.fulfilled, (state, action) => {
                state.isLoadingVendorTableDetails = false;
                state.isSuccess = true;
                state.vendorTableDetails = action.payload;
            })
            .addCase(vendorTableData.rejected, (state, action) => {
                state.isLoadingVendorTableDetails = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(vendorGraphData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(vendorGraphData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vendorGraphDetails = action.payload;
            })
            .addCase(vendorGraphData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(getCarrierOverviewData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(getCarrierOverviewData.fulfilled, (state, action) => {
                state.isLoading = true;
                state.carrierOverviewDetail = action.payload;
                state.isSuccess = false;
            })
            .addCase(getCarrierOverviewData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(getLaneBreakdown.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.laneBreakdownDetail = null
                state.laneBreakdownDetailLoading = true
            })
            .addCase(getLaneBreakdown.fulfilled, (state, action) => {
                state.isLoading = true;
                state.laneBreakdownDetail = action.payload;
                state.isSuccess = false;
                state.laneBreakdownDetailLoading = false
            })
            .addCase(getLaneBreakdown.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.laneBreakdownDetailLoading = false

            })

            .addCase(getLaneCarrierList.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.laneCarrierListName = null
                state.getLaneCarrierCompaireDto = null
                state.laneCarrierListNameLoading = true
            })
            .addCase(getLaneCarrierList.fulfilled, (state, action) => {
                state.isLoading = true;
                state.laneCarrierListName = action.payload;
                state.isSuccess = false;
                state.laneCarrierListNameLoading = false
            })
            .addCase(getLaneCarrierList.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.laneCarrierListNameLoading = false

            })

            .addCase(getLaneCarrierCompaire.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.getLaneCarrierCompaireDto = null
                state.getLaneCarrierCompaireDtoLoading = true
            })
            .addCase(getLaneCarrierCompaire.fulfilled, (state, action) => {
                state.isLoading = true;
                state.getLaneCarrierCompaireDto = action.payload;
                state.isSuccess = false;
                state.getLaneCarrierCompaireDtoLoading = false
            })
            .addCase(getLaneCarrierCompaire.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.getLaneCarrierCompaireDtoLoading = false

            })
            .addCase(laneCarrierTableData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.laneCarrierTableDtoLoading = true
                state.getLaneCarrierCompaireDtoLoading = true
            })
            .addCase(laneCarrierTableData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laneCarrierTableDto = action.payload;
                state.laneCarrierTableDtoLoading = false

            })
            .addCase(laneCarrierTableData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.laneCarrierTableDtoLoading = false

            })


    }
})


export const { reset } = carrierDetailsReducer.actions;
export default carrierDetailsReducer.reducer;