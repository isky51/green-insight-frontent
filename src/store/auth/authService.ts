import axios from "axios";
export const baseURL = process.env.REACT_APP_BASE_URL
/**
 *  
 * @returns Authentication Services
 */

// Login Api Call
const authLoginPost = async (userData: any) => {

    try {
        const response = await axios.post(
            baseURL + "login", userData
        );
        let data = await response?.data
        if (data?.status === true && data?.message === "User Logged In Successfully.") {
            localStorage.setItem("loginDetails", JSON.stringify(data?.data))
            axios.defaults.headers.common['Authorization'] = `Bearer ${data?.data?.token}`;
        }
        return data
    }
    catch (error: any) {
        throw (error)
    }
}

// Otp verify api call
const authPostOtp = async (userData: any) => {

    try {
        const response = await axios.post(
            baseURL + "verifyOTP", userData
        );
        localStorage.setItem("loginDetails", JSON.stringify(response?.data?.data))
        return response?.data?.data
    }
    catch (error: any) {
        throw (error)
    }
}

const resendPostOtp = async (userData: any) => {

    try {
        const response = await axios.post(
            baseURL + "resendOtp", userData
        );
        return response?.data?.data
    }
    catch (error: any) {
        throw (error)
    }
}

// Logout Service
const authLogoutPost = async () => {

    localStorage.removeItem("loginDetails");

}

// All the auth servces
const authService = {
    authLoginPost,
    authPostOtp,
    authLogoutPost,
    resendPostOtp
}



export default authService;