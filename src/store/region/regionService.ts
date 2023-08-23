import axios from "axios";

// Fetch base URLs from environment variables
export const baseURL = process.env.REACT_APP_BASE_URL;
export const baseURL1 = process.env.REACT_APP_BASE_URL1;

/**
 * Regional Services
 */

// Function to fetch region table data
const regionTableDataGet = async (userData: any, userToken: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL1 + "get-region-table-data", userData, userToken
        );

        return response?.data;
    }
    catch (error) {
        throw (error);
    }
};

// Function to fetch region graph data
const regionGraphPost = async (userData: any, userToken: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL1 + "get-region-emission-data", userData, userToken
        );

        return response?.data;
    }
    catch (error) {
        throw (error);
    }
};

// Function to fetch region quarterly data
const regionQuartelyGet = async (userData: any, userToken: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL1 + "get-region-intensity-quarterly", userData, userToken
        );

        return response?.data;
    }
    catch (error) {
        throw (error);
    }
};

// Function to fetch facility emission data
const regionFacilityEmissionApi = async (userData: any, userToken: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL1 + "get-facilities-emission-data", userData, userToken
        );

        return response?.data;
    }
    catch (error) {
        throw (error);
    }
};

// Object containing all regional services
const regionService = {
    regionTableDataGet,
    regionGraphPost,
    regionQuartelyGet,
    regionFacilityEmissionApi
};

// Export the regional service object
export default regionService;
