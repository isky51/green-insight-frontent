import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { setLoading } from "../home/homeSlice"

import dashboardService from "./dashboardService";

// Initial state for dashboard reducer

interface Database {
    id: number;
    name: string;
}

interface ColumnModal {
    t_id: any;
    tableName: string;
    columns: {
        coloum_type: string;
        coloum_name: string
    }[]
}

interface Column {
    coloum_type: string;
    coloum_name: string;
    checked: boolean;
}

interface Table {
    columns: Column[];
    t_id: any;
    tableName: string;
    tableChecked: boolean;
}

interface DashboardState {
    isError: boolean;
    isSuccess: boolean;
    isLoadingTableList: boolean;
    isLoadingColumnList: boolean;
    isLoading: boolean;
    databaseList: Database[];
    tableList: Table[];
    tableWithColumn: ColumnModal;
}

const initialState: DashboardState = {
    isError: false,
    isSuccess: false,
    isLoadingTableList: false,
    isLoadingColumnList: false,
    isLoading: false,
    databaseList: [],
    tableList: [],
    tableWithColumn: {
        t_id: "",
        tableName: "",
        columns: []
    }
}

// Slice for getting database list for user
export const databaseListPost = createAsyncThunk("post/database", async (userData: any, thunkApi: any) => {
    try {
        return await dashboardService.getDatabaseListPost(userData);

    }
    catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        toast.error("Something went wrong");
        return thunkApi.rejectWithValue(message)
    }
})

// Slice for getting tables list for a database
export const tableListPost = createAsyncThunk("/post/tableList", async (userData: any, thunkApi: any) => {
    try {
        return await dashboardService.getTableListPost(userData);
    }
    catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        toast.error("Something went wrong")
        return thunkApi.rejectWithValue(message)
    }
})

// Slice for getting colums for a table.
export const tableColumnPost = createAsyncThunk("post/tableColumn", async (userData: any, thunkApi) => {
    try {
        return await dashboardService.getTableColumnPost(userData);
    }
    catch (error: any) {
        const message = error?.response?.data?.message || error.message || error.string();
        toast.error("Something went wrong")
        return thunkApi.rejectWithValue(message)
    }
})

// Database reducer
export const dashboardDataReducer = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        resetDashboard: (state) => {
            state.isLoading = false;
            state.isLoadingTableList = false;
            state.isLoadingColumnList = false;
            state.isError = false;
            state.isSuccess = false;
            state.databaseList = [];
            state.tableList = [];
            state.tableWithColumn = {
                t_id: "",
                tableName: "",
                columns: []
            };

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(databaseListPost.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                setLoading(true)
            })
            .addCase(databaseListPost.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.databaseList = action.payload.data
                setLoading(false)
            })
            .addCase(databaseListPost.rejected, (state: any, action: any) => {
                state.isLoading = true;
                state.isSuccess = false;
                setLoading(false)
            })
            .addCase(tableListPost.pending, (state) => {
                state.isLoadingTableList = true;
                state.isSuccess = false;
                setLoading(true)
            })
            .addCase(tableListPost.fulfilled, (state: any, action: any) => {
                state.isLoadingTableList = false;
                state.isSuccess = true;
                state.tableList = action.payload.data;
                setLoading(false)
            })
            .addCase(tableListPost.rejected, (state: any, action: any) => {
                state.isLoadingTableList = false;
                state.isSuccess = false;
                setLoading(false)
            })
            .addCase(tableColumnPost.pending, (state) => {
                state.isLoadingColumnList = true;
                state.isSuccess = false;
            })
            .addCase(tableColumnPost.fulfilled, (state: any, action: any) => {
                state.isLoadingColumnList = false;
                state.isSuccess = true;
                state.tableWithColumn = action.payload.data[0];
            })
            .addCase(tableColumnPost.rejected, (state: any, action: any) => {
                state.isLoadingColumnList = true;
                state.isSuccess = false;
            })
    }
})


export const { resetDashboard } = dashboardDataReducer.actions;
export default dashboardDataReducer.reducer;