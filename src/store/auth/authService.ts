import axios from "axios";

// Base URL for API calls
export const baseURL = process.env.REACT_APP_BASE_URL;

/**
 * Authentication Services
 */

// Login API Call
const authLoginPost = async (userData: any) => {
    try {
        const response = await axios.post(
            baseURL + "login", userData
        );
        let data = await response?.data;

        // If login is successful, save login details and set token in axios headers
        if (data?.status === true && data?.message === "User Logged In Successfully.") {
            localStorage.setItem("loginDetails", JSON.stringify(data?.data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data?.data?.token}`;
        }
        return data;
    } catch (error: any) {
        throw (error);
    }
}

// OTP verify API call
const authPostOtp = async (userData: any) => {
    try {
        const response = await axios.post(
            baseURL + "verifyOTP", userData
        );
        localStorage.setItem("loginDetails", JSON.stringify(response?.data?.data));
        return response?.data?.data;
    } catch (error: any) {
        throw (error);
    }
}

// Resend OTP API call
const resendPostOtp = async (userData: any) => {
    try {
        const response = await axios.post(
            baseURL + "resendOtp", userData
        );
        return response?.data?.data;
    } catch (error: any) {
        throw (error);
    }
}

// Logout Service
const authLogoutPost = async () => {
    localStorage.removeItem("loginDetails");
    // Perform any other necessary logout actions
}

// All the authentication services
const authService = {
    authLoginPost,
    authPostOtp,
    authLogoutPost,
    resendPostOtp
}

export default authService;
