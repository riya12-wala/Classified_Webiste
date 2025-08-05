import axiosHttp from "../../utils/axiosHttp";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategory = createAsyncThunk('category/getCategory', async (_,{rejectWithValue}) => {
    try {
        const response = await axiosHttp.get('/get-categories1')
        console.log(response.data)
        return response.data.data
       
    } catch (error) {
        return rejectWithValue(error.response || "Something went wrong");
    }
})

export const getSubcategory = createAsyncThunk('category/getSubcategory', async (searchQuery, { rejectWithValue }) => {
    try {
       
        const response = await axiosHttp.get('/sub-categories1',{params :{cat_name: searchQuery}})
        console.log(response.data.data)
        return response.data.data
     } catch (error) {
        return rejectWithValue(error.response || "Something went wrong");
    }})

export const getAllSubCategory = createAsyncThunk('/getall', async(_,{rejectWithValue})=> {
    try {
        const response = await axiosHttp.get('/get-allsub')
        console.log(response.data.data)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response || "Something went wrong")
    }
    })