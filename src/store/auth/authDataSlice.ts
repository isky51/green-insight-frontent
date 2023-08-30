import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { setLoading } from "../home/homeSlice";
import { resetDashboard } from "../dashboard/dashboardDataSlice";
import authService from "./authService";

/**
 * Authentication State Interface
 */
interface AuthState {
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    isAuthLoginLoading: boolean;
    isOtpVerifyLoading: boolean;
    message: string;
    loginDetails: null;
    isOtp: boolean;
    otpSuccess: boolean;
    otpError: boolean;
}

/**
 * Initial state for the authentication
 */
const initialState: AuthState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    isAuthLoginLoading: false,
    isOtpVerifyLoading: false,
    message: "",
    loginDetails: null,
    isOtp: false,
    otpSuccess: false,
    otpError: false
}

// Async Thunks

// Login slice
export const loginPost = createAsyncThunk("post/login", async (userData: any, thunkApi: any) => {
    thunkApi.dispatch(setLoading(true));
    try {
        const res = await authService.authLoginPost(userData);
        thunkApi.dispatch(setLoading(false));
        thunkApi.dispatch(resetDashboard());
        return res;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        toast.error("Invalid email or password");
        thunkApi.dispatch(setLoading(false));
        return thunkApi.rejectWithValue(message);
    }
});

// Verify OTP slice
export const otpPost = createAsyncThunk("post/otp", async (useData: any, thunkApi: any) => {
    thunkApi.dispatch(setLoading(true));
    try {
        const res = await authService.authPostOtp(useData);
        thunkApi.dispatch(setLoading(false));
        return res;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        toast.error("Invalid authentication code");
        thunkApi.dispatch(setLoading(false));
        return thunkApi.rejectWithValue(message);
    }
});

// Resend OTP slice
export const resendOtpPost = createAsyncThunk("resendPost/otp", async (useData: any, thunkApi: any) => {
    thunkApi.dispatch(setLoading(true));
    try {
        const res = await authService.resendPostOtp(useData);
        thunkApi.dispatch(setLoading(false));
        return res;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        toast.error("Invalid authentication code");
        thunkApi.dispatch(setLoading(false));
        return thunkApi.rejectWithValue(message);
    }
});

// Logout slice
export const logoutPost = createAsyncThunk("post/logout", async (_, thunkApi) => {
    try {
        return await authService.authLogoutPost();
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        return thunkApi.rejectWithValue(message);
    }
});

// Authentication Reducer
export const authDataReducer = createSlice({
    name: "auth-login",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isAuthLoginLoading = false;
            state.isOtpVerifyLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.loginDetails = null;
            state.isOtp = false;
            state.otpSuccess = false;
            state.otpError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPost.pending, (state: any, action: any) => {
                state.isAuthLoginLoading = true;
                state.isSuccess = false;
            })
            .addCase(loginPost.fulfilled, (state: any, action: any) => {
                state.isAuthLoginLoading = false;
                state.isSuccess = true;
                state.isOtp = action.payload.data.otp || false;
                state.loginDetails = action.payload;
            })
            .addCase(loginPost.rejected, (state: any) => {
                state.isAuthLoginLoading = false;
                state.isSuccess = false;
            })
            .addCase(logoutPost.fulfilled, (state) => {
                state.loginDetails = null;
                reset();
            })
            .addCase(otpPost.pending, (state) => {
                state.isOtpVerifyLoading = true;
                state.otpSuccess = false;
            })
            .addCase(otpPost.fulfilled, (state: any, action: any) => {
                state.isOtpVerifyLoading = false;
                state.otpSuccess = true;
                state.isOtp = false;
                state.loginDetails = action.payload;
            })
            .addCase(otpPost.rejected, (state: any) => {
                state.isOtpVerifyLoading = false;
                state.otpSuccess = false;
            })
            .addCase(resendOtpPost.pending, (state) => {
                state.isOtpVerifyLoading = true;
                state.otpSuccess = false;
            })
            .addCase(resendOtpPost.fulfilled, (state: any) => {
                state.isOtpVerifyLoading = false;
            })
            .addCase(resendOtpPost.rejected, (state: any) => {
                state.isOtpVerifyLoading = false;
            });
    }
});

export const { reset } = authDataReducer.actions;
export default authDataReducer.reducer;
