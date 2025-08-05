import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/axiosHttp";
// router.post('/addReview', addReviews)
//     .get('/get-review', getreview)
//     .get('/getreview-byid/:id', getReviewById)
export const addReview = createAsyncThunk('/addReview', async ({_id,formData}, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')

    const response = await axiosHttp.post(`/addReview/${_id}`,formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
   return  rejectWithValue(error.response?.data || "Something Went Wrong")
  }
}) 



export const getReview = createAsyncThunk('/getAllReview', async (searchQuery = { page: 1, limit: 6}, { rejectWithValue }) => {  
  
  try {
    const params = {};
    if (searchQuery.limit) params.limit = searchQuery.limit;
    if (searchQuery.page) params.page = searchQuery.page; 
    const response = await axiosHttp.get('/get-review', { params });
    console.log(response.data.data)
   return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something Went Wrong");
  }
})


export const getReviewByBusiness = createAsyncThunk('/getReview', async ({id,searchQuery = {page:1,limit:3}}, { rejectWithValue }) => {
    try {
        const params = { };
      if (searchQuery.limit) params.limit = searchQuery.limit;
      if (searchQuery.page) params.page = searchQuery.page;
      const response = await axiosHttp.get(`/getreview-pagination/${id}`,{ params });
        console.log( response.data)
      return {
        businessId: id,
        reviews: response.data.data,
        message: response.data.message
      };
    } catch (error) {
     return  rejectWithValue(error.response?.data || "Something Went Wrong")
    }
  }) 
    

  export const getReviewAvgCount = createAsyncThunk('/getReviewAvg', async (id, { rejectWithValue }) => {
    try {
      
      const response = await axiosHttp.get(`/getreview-byid/${id}`);
        console.log( response.data)
      return {
        businessId: id,
        avgRating: response.data.avgRating,
        ratingCount: response.data.ratingCount
      };
    } catch (error) {
     return  rejectWithValue(error.response?.data || "Something Went Wrong")
    }
  }) 


export const getReviewByUserId = createAsyncThunk('/getReviewByUserId', async (_, { rejectWithValue }) => {  
  try {
    const token = localStorage.getItem('token')
    const response = await axiosHttp.get(`/review-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
   return  rejectWithValue(error.response?.data || "Something Went Wrong")
  }
})