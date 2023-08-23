import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
}

export const setLoading = createAsyncThunk("HeaderName", async (status: boolean) => {
    return status
})

export const homeReducer = createSlice({
    name: "home",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(setLoading.fulfilled, (state: any, action: any) => {
                state.isLoading = action.payload;
            })


    }
})

export default homeReducer.reducer;