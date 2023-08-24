import axios from "axios";
// Fetch base URLs from environment variables
export const baseURL = process.env.REACT_APP_BASE_URL1;

const getGraphRegionEmission = async (userData:any, token:any) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-emission-monthly", userData, token
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}
const getRegions = async (token:{ headers: { Authorization: string } }) => {

    try {
        const response = await axios.get(
            baseURL + "get-regions", token
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}
const postCompanyData = async (userData:any, token:{ headers: { Authorization: string } }) => {
    // console.log(process.env.REACT_API_BASE_URL,"process.env.REACT_API_BASE_URL")
    try {
        const response = await axios.post(
            baseURL + "get-company-data", userData, token
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}
const postEmissionIntenisty = async (userData:any, token:{ headers: { Authorization: string } }) => {

    try {
        const response = await axios.post(
            baseURL + "get-region-intensity", userData, token
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}
const postRegionIntensity = async (userData:any, token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-intensity-yearly", userData, token
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const getRegionEmission = async (userData:any, token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-emission-reduction", userData, token
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const postRegionLevelGlidePath = async (userData:any, token:{ headers: { Authorization: string } }) => {
    try {
        const response = await axios.post(
            baseURL + "get-region-reduction", userData, token
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const getProjectCountApi = async (userData:any, token:{ headers: { Authorization: string } }) => {
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



export default chartService;