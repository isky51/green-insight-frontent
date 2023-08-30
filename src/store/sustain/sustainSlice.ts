import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sustainService from "./sustainService";
import { getTokenHeader } from "../../constant";

// Define the shape of the state
interface SustainState {
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
    sustainabilityData: any,
    regionEmissionIsLoading: any,
    emissionIntensityDetailsIsLoading: any
}

const initialState: SustainState = {
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
    sustainabilityData: "",
    isLoadingRegionLevelGlidePath: true,
    projectCountData: null,
    isLoadingGraphRegionEmission: false,
    regionEmissionIsLoading: "",
    emissionIntensityDetailsIsLoading: ""
}

// Async Thunks for fetching sustain service data
export const graphRegionEmission = createAsyncThunk(
    "get/region-emission-graph",
    async (userData: any, thunkApi) => {
        try {
            return await sustainService.getGraphRegionEmission(userData, getTokenHeader());
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
            return thunkApi.rejectWithValue(message);
        }
    }
);

// Define async thunk to fetch region data
export const regionShow = createAsyncThunk("get/region", async (_, thunkApi) => {
    try {
        // Fetch region data using sustainService and the token header
        return await sustainService.getRegions(getTokenHeader());
    } catch (error:any) {
      
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
});

// Define async thunk to post company data
export const companyData = createAsyncThunk("post/companyData", async (userData, thunkApi) => {
    try {
        // Post company data using sustainService and the token header
        return await sustainService.postCompanyData(userData, getTokenHeader());
    } catch (error:any) {
      
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
});

// Define async thunk to post graph intensity data
export const graphIntensityData = createAsyncThunk("post/graphIntensityData", async (userData, thunkApi) => {
    try {
        // Post graph intensity data using sustainService and the token header
        return await sustainService.postEmissionIntenisty(userData, getTokenHeader());
    } catch (error:any) {
      
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
});

// Define async thunk to post graph emission intensity data
export const graphEmissionIntensity = createAsyncThunk("post/emissionIntensity", async (userData:any, thunkApi) => {
    try {
        // Post graph emission intensity data using sustainService and the token header
        return await sustainService.postRegionIntensity(userData, getTokenHeader());
    } catch (error:any) {
      
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
});

// Define async thunk to fetch emission region details
export const emissionRegionDetails = createAsyncThunk("post/emissionRegion/Details", async (userData:any, thunkApi) => {
    try {
        // Fetch emission region details using sustainService and the token header
        return await sustainService.getRegionEmission(userData, getTokenHeader());
    } catch (error:any) {
      
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
});

// Define async thunk to fetch project count data
export const getProjectCount = createAsyncThunk("get/project/count", async (userData:any, thunkApi) => {
    try {
        // Fetch project count data using sustainService and the token header
        return await sustainService.getProjectCountApi(userData, getTokenHeader());
    } catch (error:any) {
      
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
});

// Define async thunk to post region level glide path data
export const regionLevelGlidePath = createAsyncThunk("post/glideRegionPath/Details", async (userData, thunkApi) => {
    try {
        // Post region level glide path data using sustainService and the token header
        return await sustainService.postRegionLevelGlidePath(userData, getTokenHeader());
    } catch (error:any) {
      
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
});


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
            state.sustainabilityData = ""
            state.emissionIntensityData = ""
            state.emissionIntensityDetails = ""
            state.regionEmission = ""
            state.regionEmissionIsLoading = true
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
                state.sustainabilityData = action.payload;
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
                state.regionEmissionIsLoading = true
            })
            .addCase(emissionRegionDetails.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.regionEmission = action.payload;
                state.regionEmissionIsLoading = false

            })
            .addCase(emissionRegionDetails.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = action.payload;
                state.isSuccess = false;
                state.regionEmissionIsLoading = false

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