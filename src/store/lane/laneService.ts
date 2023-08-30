import axios from "axios";

// Fetch base URLs from environment variables
export const baseURL = process.env.REACT_APP_BASE_URL1;

// Function to fetch high-intensity lane table data
const laneTableDataGet = async (userData: any, tokenDetails: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL + "get-lane-table-data-high-intensity", userData, tokenDetails);
        return response?.data;
    }
    catch (error: any) {
        throw (error);
    }
}

// Function to fetch lane graph data
const laneGraphData = async (userData: any, tokenDetails: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL + `get-lane-emission/pagination`, userData, tokenDetails);
        return response?.data;
    } catch (error: any) {
        throw (error);
    }
}

// Function to fetch region-carrier comparison data
const regionCarrierComparison = async (userData: any, tokenDetails: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL + `get-region-carrier-comparison-data`, userData, tokenDetails);
        return response?.data;
    } catch (error) {
        throw (error);
    }
}

// Function to fetch region overview detail
const getRegionOverviewDetail = async (userData: any, tokenDetails: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL + `get-region-overview-detail`, userData, tokenDetails);
        return response?.data;
    } catch (error) {
        throw (error);
    }
}

// Function to fetch lane reduction detail graph
const getLaneReductionDetailGraph = async (userData: any, tokenDetails: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL + `get-lane-reduction-graph`, userData, tokenDetails);
        return response?.data;
    } catch (error: any) {
        throw (error);
    }
}

// Function to fetch low-intensity lane table data
const lowLaneTableData = async (userData: any, tokenDetails: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL + "get-lane-table-data-low-intensity", userData, tokenDetails);
        return response?.data;
    } catch (error: any) {
        throw (error);
    }
}

// Function to fetch lane carrier emission data
const getLaneCarrierEmission = async (userData: any, token: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL + "get-lane-carrier-graph", userData, token);
        return response?.data;
    }
    catch (error: any) {
        throw (error);
    }
}

// Function to fetch lane overview details emission data
const getLaneOverDetailsEmissionApi = async (userData: any, token: { headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL + "get-lane-overview-details", userData, token);
        return response?.data;
    }
    catch (error: any) {
        throw (error);
    }
}

// Object containing all lane-related services
const laneService = {
    laneTableDataGet,
    laneGraphData,
    lowLaneTableData,
    regionCarrierComparison,
    getRegionOverviewDetail,
    getLaneCarrierEmission,
    getLaneReductionDetailGraph,
    getLaneOverDetailsEmissionApi
};

// Export the lane service object
export default laneService;
