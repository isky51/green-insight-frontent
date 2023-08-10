import axios from "axios";
export const baseURL = process.env.REACT_APP_BASE_URL

const authLoginPost = async (userData: any) => {

    try {
        const response = await axios.post(
            baseURL + "login", userData
        );
        let data = await response.data
        if (data?.status === true && data?.message === "User Logged In Successfully.") {
            localStorage.setItem("loginDetails", JSON.stringify(data?.data))
            axios.defaults.headers.common['Authorization'] = `Bearer ${data?.data?.token}`;
        }
        return response?.data
    }
    catch (error:any) {
        throw (error)
    }
}

const authLoginBucketPost = async (userData: any) => {
    try {
        const response = await axios.post(
            process.env.REACT_APP_BASE_URL_BLOB + "login", userData
        );

        if (response.data?.message === "User Logged In Successfully.") {
            localStorage.setItem("loginDetails", JSON.stringify(response?.data?.data))
            axios.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.data?.token}`;
        }

        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const authPostOtp = async (userData: any) => {

    try {
        const response = await axios.post(
            baseURL + "verify-otp", userData
        );
        localStorage.setItem("loginDetails", JSON.stringify(response?.data?.data))
        return response?.data?.data
    }
    catch (error) {
        throw (error)
    }
}
const authLogoutPost = async () => {

    localStorage.removeItem("user");

}

const getFiltersDate = async () => {

    try {
        const response = await axios.get(
            baseURL + "graph/filters/dates"
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const authService = {
    authLoginPost,
    authLogoutPost,
    authPostOtp,
    getFiltersDate,
    authLoginBucketPost
}



export default authService;