import axios from "axios";
// Fetch base URLs from environment variables
export const baseURL = process.env.REACT_APP_BASE_URL1;

// Fetch graph region emission data
const getGraphRegionEmission = async (userData:any, token:any) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-emission-monthly", userData, token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

// Fetch regions data
const getRegions = async (token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.get(
            baseURL + "get-regions", token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

// Post company data
const postCompanyData = async (userData:any, token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL + "get-company-data", userData, token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

// Post emission intensity data
const postEmissionIntenisty = async (userData:any, token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-intensity", userData, token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

// Post region intensity data
const postRegionIntensity = async (userData:any, token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-intensity-yearly", userData, token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

// Get region emission data
const getRegionEmission = async (userData:any, token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-emission-reduction", userData, token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

// Post region level glide path data
const postRegionLevelGlidePath = async (userData:any, token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-reduction", userData, token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

// Get project count data
const getProjectCountApi = async (userData:any, token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL + "get-project-count", userData, token
        );
        return response?.data;
    }
    catch (error) {
        throw (error);
    }
}

// Service object that exposes functions
const chartService = {
    getGraphRegionEmission,
    getRegions,
    postCompanyData,
    postEmissionIntenisty,
    postRegionIntensity,
    getRegionEmission,
    postRegionLevelGlidePath,
    getProjectCountApi
}

// Export the service object
export default chartService;
