import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL1;

/**
 * Retrieves vendor table data using a POST request.
 * @param userData - The user data for the request.
 * @param userToken - The user token for the request.
 * @returns The response data from the API call.
 */
const vendorTableDataGet = async (userData: any, userToken: any) => {
    try {
        const response = await axios.post(
            baseURL + "get-Vendor-table-data", userData, userToken
        );
        return response?.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves vendor graph data using a POST request.
 * @param userData - The user data for the request.
 * @param userToken - The user token for the request.
 * @returns The response data from the API call.
 */
const vendorGraphPost = async (userData: any, userToken: any) => {
    try {
        const response = await axios.post(
            baseURL + "get-vendor-emission-data", userData, userToken
        );
        return response?.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves carrier overview data using a GET request.
 * @param userData - The user data for the request.
 * @param userToken - The user token for the request.
 * @returns The response data from the API call.
 */
const getCarrierOverview = async (userData: any, userToken: any) => {
    try {
        const response = await axios.get(`${baseURL}get-carrier-overview/${userData}`,
            userToken
        );
        return response?.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves lane breakdown data using a POST request.
 * @param userData - The user data for the request.
 * @param userToken - The user token for the request.
 * @returns The response data from the API call.
 */
const getLaneBreakdown = async (userData: any, userToken: any) => {
    try {
        const response = await axios.post(
            baseURL + "get-lane-breakdown", userData, userToken
        );
        return response?.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves lane carrier list data using a GET request.
 * @param userData - The user data for the request.
 * @param userToken - The user token for the request.
 * @returns The response data from the API call.
 */
const getLaneCarrierList = async (userData: any, userToken: any) => {
    try {
        const response = await axios.get(`${baseURL}get-lane-carrier`,
            userToken
        );
        return response?.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves lane carrier comparison data using a POST request.
 * @param userData - The user data for the request.
 * @param userToken - The user token for the request.
 * @returns The response data from the API call.
 */
const getLaneCarrierCompaire = async (userData: any, userToken: any) => {
    try {
        const response = await axios.post(
            baseURL + "get-vendor-comparison", userData, userToken
        );
        return response?.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves lane carrier table data using a POST request.
 * @param userData - The user data for the request.
 * @param userToken - The user token for the request.
 * @returns The response data from the API call.
 */
const laneCarrierTableDataApi = async (userData: any, userToken: any) => {
    try {
        const response = await axios.post(
            baseURL + "get-lane-carrier-table-data", userData, userToken
        );
        return response?.data;
    } catch (error) {
        throw error;
    }
}

/**
 * A collection of functions related to vendor-related API calls.
 */
const vendorService = {
    vendorTableDataGet,
    vendorGraphPost,
    getCarrierOverview,
    getLaneBreakdown,
    getLaneCarrierList,
    getLaneCarrierCompaire,
    laneCarrierTableDataApi
};

// Export the vendorService object for use in other parts of the application
export default vendorService;
