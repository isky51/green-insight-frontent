import axios from "axios";

// Fetch base URLs from environment variables
const baseURL = process.env.REACT_APP_BASE_URL1;

/**
 * Common Services
 */

// Function to fetch emission filter dates
const getFiltersDate = async (token: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.get(
             baseURL + "graph/filters/dates", token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

// Function to post region intensity data
const postRegionIntensity = async (userData: any, token: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
             baseURL + "get-region-intensity-yearly", userData, token
        );
        return response?.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

// Function to fetch regions
const getRegions = async (token: { headers: { Authorization: string; }; }) => {
    try {
        const response = await axios.get(
             baseURL + "get-regions",token
        );
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to post region level glide path data
const postRegionLevelGlidePath = async (userData: any, token: { headers: { Authorization: string; }; }) => {
    try {
        const response = await axios.post(
             baseURL + "get-region-reduction", userData, token
        );
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to fetch project count using API
const getProjectCountApi = async (userData:any,  token: { headers: { Authorization: string }}) => {
    try {
        const response = await axios.post(
             baseURL + "get-project-count", userData, token
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

// Object containing all common services
const commonService = {
    getFiltersDate,
    getProjectCountApi,
    postRegionIntensity,
    getRegions,
    postRegionLevelGlidePath
};

// Export the common service object
export default commonService;
