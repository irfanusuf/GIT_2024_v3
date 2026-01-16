import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const fetchAllUsers = createAsyncThunk("/user/fetch",

    async () => {

        const res = await axios.get("/users/fetch")
        return res.data
    }
)





const initialState = {
  users: [],
  errorMessage: "",
  loading: false,
};



export const fetchAllUsersSlice = createSlice({
    name: "extra",
    initialState,
    reducers: {
        resetUsers: () => initialState,
    },

    
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.errorMessage = "NEtwork Errore !"
        })
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.loading = true
        })
    }
})



