import axios from "axios";
export const baseURL = process.env.REACT_APP_BASE_URL

// Getting Database table 
const getDatabaseListPost = async (userData: any) => {

    try {
        const response = await axios.post(
            baseURL + "userDatabaseList", userData
        );
        return await response?.data
    }
    catch (error: any) {
        throw (error)
    }
}

// Getting tables of a database
const getTableListPost = async (userData: any) => {

    try {
        const response = await axios.post(
            baseURL + "databaseTable", userData
        );
        return await response?.data
    }
    catch (error: any) {
        throw (error)
    }
}

// Getting columns of a table
const getTableColumnPost = async (userData: any) => {
    try {
        const response = await axios.post(
            baseURL + "databaseTableColumn", userData
        );
        return await response?.data
    }
    catch (error: any) {
        throw (error)
    }
}

const dashboardService = {
    getDatabaseListPost,
    getTableListPost,
    getTableColumnPost
}



export default dashboardService;