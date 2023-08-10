import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { setLoading } from "../home/homeSlice"
// import { userDetailsApi } from "../auth/graph/graphDetailsSlice"

import authService from "./authService";
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    loginDetails: null,
    OtpDetails: "",
    otpSuccess: false,
    otpError: false,
    sideBarStatus: true,
    headerName: null,
    emissionDates: null
}

export const loginPost = createAsyncThunk("post/login", async (userData: any, thunkApi: any) => {
    try {
        const res = await authService.authLoginPost(userData);
        // if (res) {
        //     // thunkApi.dispatch(userDetailsApi())
        // }
        return res
    }
    catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        toast.error("Invalid Email or Password");
        return thunkApi.rejectWithValue(message)
    }
})

export const bucketLoginPost = createAsyncThunk("bucket/post/login", async (userData, thunkApi) => {
    try {
        const res = await authService.authLoginBucketPost(userData);
        if (res?.data?.role !== 2) {
            toast.error("Please login detail")
        }

        return res
    }
    catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        toast.error("Invalid Email or Password")
        return thunkApi.rejectWithValue(message)
    }
})

export const logoutPost = createAsyncThunk("post/logout", async (_, thunkApi) => {
    try {

        return await authService.authLogoutPost();
    }
    catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const otpPost = createAsyncThunk("post/otp", async (useData: any, thunkApi: any) => {
    try {

        const res = await authService.authPostOtp(useData);
        // if (res) {
        //     thunkApi.dispatch(getFiltersDate())
        //     // thunkApi.dispatch(userDetailsApi())
        // }
        return res
    }
    catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})

export const sideBarToggleStatus = createAsyncThunk("Toggle", async (status) => {
    return status
})

export const setHeaderName = createAsyncThunk("HeaderName", async (name) => {
    return name
})

export const getFiltersDate = createAsyncThunk("graph/filters/dates", async (_, thunkApi) => {
    try {
        return await authService.getFiltersDate();
    }
    catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        return thunkApi.rejectWithValue(message)
    }
})



export const authDataReducer = createSlice({
    name: "auth-login",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.loginDetails = null
            state.OtpDetails = ""
            state.otpError = false
            state.otpSuccess = false;
            state.sideBarStatus = true;
            state.emissionDates = null
            state.headerName = null

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPost.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                setLoading(true)
            })
            .addCase(loginPost.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loginDetails = action.payload;
                setLoading(false)
            })
            .addCase(loginPost.rejected, (state: any, action: any) => {
                state.isLoading = true;
                state.isSuccess = false;
                setLoading(false)
            })
            .addCase(bucketLoginPost.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(bucketLoginPost.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loginDetails = action.payload;
            })
            .addCase(bucketLoginPost.rejected, (state: any, action: any) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(logoutPost.fulfilled, (state) => {
                state.loginDetails = null;
                reset()
            })
            .addCase(otpPost.pending, (state) => {
                state.isLoading = true;
                state.otpSuccess = false;
            })
            .addCase(otpPost.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.otpSuccess = true;
                state.OtpDetails = action.payload;
            })
            .addCase(otpPost.rejected, (state: any, action: any) => {
                state.isLoading = true;
                state.otpSuccess = false;
            })
            .addCase(sideBarToggleStatus.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.sideBarStatus = action.payload || false;
            })
            .addCase(getFiltersDate.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.emissionDates = action.payload;
            })
            .addCase(getFiltersDate.rejected, (state: any, action: any) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.emissionDates = null
            })
            .addCase(setHeaderName.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.headerName = action.payload || null;
            })



    }
})


export const { reset } = authDataReducer.actions;
export default authDataReducer.reducer;