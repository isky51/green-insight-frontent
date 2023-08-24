import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL1

const vendorTableDataGet = async (userData: any, userToken: any) => {

    try {
        const response = await axios.post(
            baseURL + "get-Vendor-table-data", userData, userToken
        );

        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const vendorGraphPost = async (userData: any, userToken: any) => {

    try {
        const response = await axios.post(
            baseURL + "get-vendor-emission-data", userData, userToken
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const getCarrierOverview = async (userData: any, userToken: any) => {
    try {
        const response = await axios.get(`${baseURL}get-carrier-overview/${userData}`,
            userToken
        );

        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const getLaneBreakdown = async (userData: any, userToken: any) => {

    try {
        const response = await axios.post(
            baseURL + "get-lane-breakdown", userData, userToken
        );

        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const getLaneCarrierList = async (userData: any, userToken: any) => {
    try {
        const response = await axios.get(`${baseURL}get-lane-carrier`,
            userToken
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}

const getLaneCarrierCompaire = async (userData: any, userToken: any) => {

    try {
        const response = await axios.post(
            baseURL + "get-vendor-comparison", userData, userToken
        );

        return response?.data
    }
    catch (error) {
        throw (error)
    }
}


const laneCarrierTableDataApi = async (userData: any, userToken: any) => {
    try {
        const response = await axios.post(
            baseURL + "get-lane-carrier-table-data", userData, userToken
        );
        return response?.data
    }
    catch (error) {
        throw (error)
    }
}


const vendorService = {
    vendorTableDataGet,
    vendorGraphPost,
    getCarrierOverview,
    getLaneBreakdown,
    getLaneCarrierList,
    getLaneCarrierCompaire,
    laneCarrierTableDataApi
}



export default vendorService;