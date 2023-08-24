import axios from "axios";

// Fetch base URLs from environment variables
const baseURL = process.env.REACT_APP_BASE_URL;
const baseURL1 = process.env.REACT_APP_BASE_URL1;

/**
 * Common Services
 */

// Function to fetch emission filter dates
const getFiltersDate = async (token: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.get(
            baseURL1 + "graph/filters/dates", token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

const postRegionIntensity = async (userData: any, token: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL1 + "get-region-intensity-yearly", userData, token
        );
        return response?.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

const getRegions = async (token: { headers: { Authorization: string; }; }) => {
    try {
        const response = await axios.get(
            baseURL1 + "get-regions", token
        );
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const postRegionLevelGlidePath = async (userData: any, token: { headers: { Authorization: string; }; }) => {
    try {
        const response = await axios.post(
            baseURL1 + "get-region-reduction", userData, token
        );
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getProjectCountApi = async (userData:any,  token: { headers: { Authorization: string }}) => {
    try {
        const response = await axios.post(
            baseURL1 + "get-project-count", userData, token
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
