import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/axiosHttp";


export const addBusiness = createAsyncThunk('/business/addBusiness', async (businessData, { rejectWithValue }) => {
    try {
        const response = await axiosHttp.post('/add-business', businessData)
        // console.log(response.data)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
})


export const getAllBusiness = createAsyncThunk('/business/getAllBusiness', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosHttp.get('/getall-business')
        // console.log(response.data.data)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
}
)


export const getBusinessFilter = createAsyncThunk('/business/getBusiness', async (searchQuery, { rejectWithValue }) => {
    try {
        const params = {};
      if (searchQuery.phone) params.phone = searchQuery.phone;
      if (searchQuery.cat_name) params.cat_name = searchQuery.cat_name;
      if (searchQuery.address) params.address = searchQuery.address;
      if (searchQuery.name) params.name = searchQuery.name;
     
        const response = await axiosHttp.get('/get-business-filter', { params } )
        // console.log(response.data.data)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
})

export const getBusiness = createAsyncThunk('/business', async (searchQuery, { rejectWithValue }) => {
    try {
        const params = {};
        if (searchQuery.sub_cat) params.sub_cat = searchQuery.sub_cat;
        if (searchQuery.cat_name) params.cat_name = searchQuery.cat_name;
        if (searchQuery.address) params.address = searchQuery.address;
        if (searchQuery.name) params.name = searchQuery.name;
         if (searchQuery.price) params.price = searchQuery.price;
        if (searchQuery.ownedby) params.ownedby = searchQuery.ownedby;
        if (searchQuery.verified !== undefined) params.verified = searchQuery.verified;
        if (searchQuery.typeofschool) params.typeofschool = searchQuery.typeofschool;
        if (searchQuery.openNow) params.openNow = searchQuery.openNow;
        const response = await axiosHttp.get('/get-business',{params})
        // console.log(response.data.data)
        return response.data.data
     } catch (error) {
        return rejectWithValue(error.response || "Something went wrong");
    }})


export const getBusinessById = createAsyncThunk('/businessId', async(id,{rejectWithValue}) => {
  try {
      const response = await axiosHttp.get(`/get-business-byid/${id}`)
    
    return response.data.data
  } catch (error) {
    return rejectWithValue(error.response || "Something Went Wrong")
  }
    })


export const similarBusiness = createAsyncThunk("/similarBusiness", async(subCategoryId,{rejectWithValue}) => {
    try {
        const response = axiosHttp.get(`/similar-business/${subCategoryId}`)

        return (await response).data.data
    } catch (error) {
        return rejectWithValue(error.response || "Something Went Wrong")
    }
})
        
    
export const updateBusiness = createAsyncThunk('/updateBusiness', async ({_id,updateData},{rejectWithValue}) => {
    try {
        const response = axiosHttp.put(`/update-business/${_id}`,updateData)
        console.log(response)
        return response
    } catch (error) {
        return rejectWithValue(error.response || "Something Went Wrong")
    }
}) 