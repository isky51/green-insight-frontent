import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sustainServie from "./sustainServie";

// Define the shape of the state
interface sustainState {
    isError: any,
    isSuccess: boolean,
    isLoading: boolean,
    message: string,
    graphRegionChart: any,
    regions: any,
    emissionIntensityData: any,
    emissionIntensityDetails: any,
    regionEmission: any,
    regionLevelGlideData: any,
    isLoadingRegionLevelGlidePath: boolean,
    projectCountData: any,
    isLoadingGraphRegionEmission: boolean,
    substainbilityData:any,
    regionEmissionIsloading:any,
    emissionIntensityDetailsIsLoading:any

}

const initialState: sustainState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    graphRegionChart: "",
    regions: "",
    emissionIntensityData: "",
    emissionIntensityDetails: "",
    regionEmission: "",
    regionLevelGlideData: "",
    substainbilityData:"",
    isLoadingRegionLevelGlidePath: true,
    projectCountData: null,
    isLoadingGraphRegionEmission: false,
    regionEmissionIsloading:"",
    emissionIntensityDetailsIsLoading:""

}

// Helper function to get token header
const getTokenHeader = () => {
    const userdata: any = localStorage.getItem("loginDetails") && JSON.parse(localStorage.getItem("loginDetails") || '');

    let token: string = process.env.REACT_APP_IS_DEV ? process.env.REACT_APP_TEST_TOKEN : userdata?.token

    let tokenDetails = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return tokenDetails
}

export const graphRegionEmission = createAsyncThunk("get/region-emission-graph", async (userData:any, thunkApi) => {
    try {
        

        return await sustainServie.getGraphRegionEmission(userData, getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const regionShow = createAsyncThunk("get/region", async (_, thunkApi) => {
    try {

        return await sustainServie.getRegions(getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const companyData = createAsyncThunk("post/companyData", async (userData, thunkApi) => {
    try {
        

        return await sustainServie.postCompanyData(userData, getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const graphIntensityData = createAsyncThunk("post/graphIntensityData", async (userData, thunkApi) => {
    try {
        
        return await sustainServie.postEmissionIntenisty(userData, getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const graphEmissionIntensity = createAsyncThunk("post/emissionIntensity", async (userData:any, thunkApi) => {
    try {
        return await sustainServie.postRegionIntensity(userData, getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})


export const emissionRegionDetails = createAsyncThunk("post/emissionRegion/Details", async (userData:any, thunkApi) => {
    try {
       
        return await sustainServie.getRegionEmission(userData, getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const getProjectCount = createAsyncThunk("get/project/count", async (userData:any, thunkApi) => {
    try {
       
        return await sustainServie.getProjectCountApi(userData, getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const regionLevelGlidePath = createAsyncThunk("post/glideRegionPath/Details", async (userData, thunkApi) => {
    try {

        return await sustainServie.postRegionLevelGlidePath(userData, getTokenHeader());
    }
    catch (error:any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})
export const graphDetailsReducer = createSlice({
    name: "chart-details",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.graphRegionChart = ""
            state.regions = ""
            state.substainbilityData = ""
            state.emissionIntensityData = ""
            state.emissionIntensityDetails = ""
            state.regionEmission = ""
            state.regionEmissionIsloading = true

            state.regionLevelGlideData = ""
            state.isLoadingRegionLevelGlidePath = true
            state.regionLevelGlideData = "";
            state.projectCountData = null
            state.isLoadingGraphRegionEmission = true
            state.emissionIntensityDetailsIsLoading= true
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(graphRegionEmission.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isLoadingGraphRegionEmission = true
            })
            .addCase(graphRegionEmission.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.graphRegionChart = action.payload
                state.isLoadingGraphRegionEmission = false;
            })
            .addCase(graphRegionEmission.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.isLoadingGraphRegionEmission = false;

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


            .addCase(regionShow.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(regionShow.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.regions = action.payload;
            })
            .addCase(regionShow.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(companyData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(companyData.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.substainbilityData = action.payload;
            })
            .addCase(companyData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
            })
            .addCase(graphIntensityData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(graphIntensityData.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.emissionIntensityData = action.payload;
            })
            .addCase(graphIntensityData.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
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
            .addCase(graphEmissionIntensity.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.emissionIntensityDetailsIsLoading =false
            })
            .addCase(emissionRegionDetails.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.regionEmissionIsloading = true
            })
            .addCase(emissionRegionDetails.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.regionEmission = action.payload;
                state.regionEmissionIsloading = false

            })
            .addCase(emissionRegionDetails.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.regionEmissionIsloading = false

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
            .addCase(regionLevelGlidePath.rejected, (state, action) => {
                state.isLoadingRegionLevelGlidePath = false;
                state.isError = action.payload;
                state.isSuccess = false;
            })
    }
})


export const { reset } = graphDetailsReducer.actions;
export default graphDetailsReducer.reducer;