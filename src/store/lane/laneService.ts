import axios from "axios";

// Fetch base URLs from environment variables
export const baseURL = process.env.REACT_APP_BASE_URL;
export const baseURL1 = process.env.REACT_APP_BASE_URL1;

const laneTableDataGet = async (userData:any,  tokenDetails:{headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL1 + "get-lane-table-data-hight-intensity", userData,  tokenDetails);
        return response?.data;
    }
    catch (error:any) {
        throw (error)
    }
}
const laneGraphData = async (userData:any,  tokenDetails:{headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL1 + `get-lane-emission/pagination`, userData,  tokenDetails);
        return response?.data;
    } catch (error:any) {
        throw (error)
    }

}

const regionCarrierComparison = async (userData:any,  tokenDetails:{headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL1 + `get-region-carrier-comparison-data`, userData,  tokenDetails);
        return response?.data;
    } catch (error) {
        throw (error)
    }

}

const getRegionOverviewDetail = async (userData:any,  tokenDetails:{headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL1 + `get-region-overview-detail`, userData,  tokenDetails);
        return response?.data;
    } catch (error) {
        throw (error)
    }

}

const getLaneReductionDetailGraph = async (userData:any,  tokenDetails:{headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL1 + `get-lane-reduction-graph`, userData,  tokenDetails);
        return response?.data;
    } catch (error:any) {
        throw (error)
    }

}





const lowLaneTableData = async (userData:any,  tokenDetails:{headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(baseURL1 + "get-lane-table-data-low-intensity", userData,  tokenDetails);
        return response?.data;
    } catch (error:any) {
        throw (error)
    }
}



const getLaneCarrierEmission = async (userData:any, token:{headers:{Authorization:string}}) => {
    try {
        const response = await axios.post(
            baseURL + "get-lane-carrier-graph", userData, token
        );
        return response?.data
    }
    catch (error:any) {

        throw (error)
    }
}

const getLaneOverDetailsEmissionApi = async (userData:any, token:{headers:{Authorization:string}}) => {
    try {
        const response = await axios.post(
            baseURL + "get-lane-overview-details", userData, token
        );
        return response?.data
    }
    catch (error:any) {
        throw (error)
    }
}

const laneService = {
    laneTableDataGet,
    laneGraphData,
    lowLaneTableData,
    regionCarrierComparison,
    getRegionOverviewDetail,
    getLaneCarrierEmission,
    getLaneReductionDetailGraph,
    getLaneOverDetailsEmissionApi
}

export default laneService;