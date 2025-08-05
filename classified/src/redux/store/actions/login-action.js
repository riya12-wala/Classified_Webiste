import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosHttp from "../../utils/axiosHttp";


export const login = createAsyncThunk('login', async (userData,{rejectWithValue}) => {
    try {
        const response = await axiosHttp.post('/login', userData);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user',JSON.stringify(response.data.data))
        localStorage.setItem('filepath',response.data.filepath)
        console.log(response)
        return response;
    }

    catch (error) {
            return rejectWithValue (error.response?.data?.message ||  "Invalid Email or Password :)")
    }
})

export const signup = createAsyncThunk('signup', async (userData,{rejectWithValue}) => {
    try {
        const response = await axiosHttp.post('signup', userData)
        return response
    } catch (error) {
        return rejectWithValue (error.response?.data?.message || "User Already Exists !!" )
    }
})

export const forgetPassword = createAsyncThunk('forgetPassword', async (email,{rejectWithValue}) => {
    try {

        console.log(email)
        const response = await axiosHttp.post('/forget-pass', { email })
        console.log(response.data.message);
        return response
    } catch (error) {
        return rejectWithValue (error.response?.data?.message || "Email does not Exits!!" )
    }
})

export const resetPassword = createAsyncThunk('resetPassword', async (userData,{rejectWithValue}) => {
    try {
        const response = await axiosHttp.post('reset-pass', userData)
        return response.data
    } catch (error) {
        return rejectWithValue (error.response?.data?.message || "Email does not Exits!!" )
    }
})

export const otpSend = createAsyncThunk('OtpSend', async (phoneNumber, { rejectWithValue }) => {
    try {
        const response = await axiosHttp.post('send', phoneNumber,{
            withCredentials: true
          })
        console.log(response.data.message)
        return response.data
    } catch (error) {
        return rejectWithValue (error.response?.data?.message || "Something Went Wrong" )
    }
})

export const verifyOTP = createAsyncThunk('verifyOTP', async (otp, { rejectWithValue }) => {
    try {
        const response = await axiosHttp.post('verify', {otp:String(otp)},{withCredentails:true})
        console.log(response.data.data)
        return response.data
    } catch (error) {
        return rejectWithValue (error.response?.data?.message || "Something Went Wrong ifel" )
    }
})




