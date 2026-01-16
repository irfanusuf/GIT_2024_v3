import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";



export const handleRegister = createAsyncThunk("user/register", async (formBody) => {
        const res = await axiosInstance.post("/user/register", formBody)
        return res.data
})



export const handleLogin = createAsyncThunk("user/login", async (formBody) => {
    const res = await axiosInstance.post("/user/login", formBody)
    return res.data
})




export const getUser = createAsyncThunk("user/get", async (userId) => {
    const res = await fetch(`/user/getuser?userId=${userId}`, {
        method: "GET"
    })
    const data = await res.json()
    return data
})




const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        loading: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        builder.addCase(handleRegister.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(handleRegister.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.errorMessage = null;
        })
        builder.addCase(handleRegister.rejected, (state, action) => {
            state.loading = false
            state.errorMessage = action.error.message
        })




        builder.addCase(handleLogin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.errorMessage = null;
        })
        builder.addCase(handleLogin.rejected, (state, action) => {
            state.loading = false
            state.errorMessage = action.error.message
        })
    }
})



export default userSlice