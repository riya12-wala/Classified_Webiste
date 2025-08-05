import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/axiosHttp";

export const getUser = createAsyncThunk('/getUser', async(_,{rejectWithValue})=> {
   
  try {
      const response = await axiosHttp.get('/getUser'); 
    //   console.log(response.data)
    return response.data
  } catch (error) {
      
      return rejectWithValue(error.response?.data || "Something went wrong !! ")
};

})


export const Saved = createAsyncThunk('/saved', async (saved,{rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosHttp.post('/saved', saved, {
            headers: {
            Authorization :`Bearer ${token}`
        }})
        console.log(response.data)
        return response.data.message
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
})

export const getSaved = createAsyncThunk('/getSaved', async (_,{rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosHttp.get('/getSaved', {
            headers: {
            Authorization :`Bearer ${token}`
        }})
        console.log(response.data)
        return response.data.saved
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
})


export const deleteSaved = createAsyncThunk('/deleteSaved', async (_id,{rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axiosHttp.put(`/deleteSaved/${_id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            },
           
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
})

export const updateUser = createAsyncThunk('/updateUser', async (updateUser,{rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosHttp.put('/updateUser',updateUser,{
            headers: {
            Authorization :`Bearer ${token}`
        }})
        // console.log(response.data)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
})

export const addAddress = createAsyncThunk('/addAdd', async ({addressArr,friends} ,{rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        const payload = { addressArr, friends };
        const response = await axiosHttp.post('/addAdd', payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            // console.log(response.data.data)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
})




export const updateAdd = createAsyncThunk('/updateAdd', async ({_id,updateAdd},{rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axiosHttp.put(`/updateAdd/${_id}`, updateAdd, {
            headers: {
                Authorization: `Bearer ${token}`
            },
           
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
})

export const updateFriend = createAsyncThunk('/updateFriend', async ({_id,updateFriend},{rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axiosHttp.put(`/updateFriend/${_id}`, updateFriend, {
            headers: {
                Authorization: `Bearer ${token}`
            },
           
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong !! ")
    }
})

export const deleteAdd = createAsyncThunk('/deleteAdd', async (_id,{rejectWithValue}) => {
    try {
      const token  = localStorage.getItem('token')
      const response  = await axiosHttp.delete(`/deleteAdd/${_id}`, {
          headers: {
            Authorization : `Bearer ${token}`
          }
        
      })
        console.log(response.data)
          return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something Went Wrong")
  }  
})


