import { createSlice } from "@reduxjs/toolkit";
import { addBusiness, getAllBusiness, getBusiness, getBusinessById, getBusinessFilter, similarBusiness, updateBusiness } from "../actions/business-action";

const initialState = {
    phoneNumber :localStorage.getItem('phoneNumber'),
    business: [],
    similarbusiness:[],
    error:''
}

const businessSlice = createSlice({
    name:"business",
    initialState,
    reducers: {
        setPhoneNumber: (state, action) => {
            localStorage.setItem('phoneNumber',action.payload)
            state.phoneNumber = action.payload
        },
        resetForm :() => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(addBusiness.pending, (state) => {
            state.error = "Pending..."
            state.business = null
        })
            .addCase(addBusiness.fulfilled, (state, action) => {         
                state.business = action.payload
                state.error = 'Business Added Successfully !!'
                
            })
        .addCase(addBusiness.rejected,(state,action)=>{
            state.business = '',
                state.error =action.payload
        })


       .addCase(getBusinessFilter.pending, (state) => {
            state.error = "Pending..."
            state.business = []
        })
            .addCase(getBusinessFilter.fulfilled, (state, action) => {    
                localStorage.getItem('phoneNumber')
                state.business = action.payload
                state.error =action.payload.message
            })
        .addCase(getBusinessFilter.rejected,(state,action)=>{
            localStorage.removeItem('phoneNumber')
            state.business = [],
                state.error ="Error while Fetching"
        })
        .addCase(getBusiness.pending, (state) => {
            state.error = "Pending..."
            state.business = []
        })
            .addCase(getBusiness.fulfilled, (state, action) => {    
                localStorage.getItem('phoneNumber')
                state.business = action.payload
                state.error =action.payload.message
            })
        .addCase(getBusiness.rejected,(state,action)=>{
            localStorage.removeItem('phoneNumber')
            state.business = [],
                state.error ="Error while Fetching"
        })
            
         .addCase(getBusinessById.pending, (state) => {
            state.error = "Pending..."
            state.business = []
        })
            .addCase(getBusinessById.fulfilled, (state, action) => {    
                
                state.business = action.payload
                state.error =action.payload.message
            })
        .addCase(getBusinessById.rejected,(state,action)=>{
           
            state.business = [],
                state.error ="Error while Fetching"
        })
          .addCase(getAllBusiness.pending, (state) => {
            state.error = "Pending..."
            state.business = []
        })
            .addCase(getAllBusiness.fulfilled, (state, action) => {    
                
                state.business = action.payload
                state.error =action.payload.message
            })
        .addCase(getAllBusiness.rejected,(state,action)=>{
           
            state.business = [],
                state.error ="Error while Fetching"
        })
           .addCase(similarBusiness.pending, (state) => {
            state.error = "Pending..."
            state.similarbusiness = []
        })
            .addCase(similarBusiness.fulfilled, (state, action) => {    
                
                state.similarbusiness = action.payload
                state.error =action.payload.message
            })
        .addCase(similarBusiness.rejected,(state,action)=>{
           
            state.similarbusiness = [],
                state.error ="Error while Fetching"
        })
           .addCase(updateBusiness.pending, (state) => {
            state.error = "Pending..."
           
        })
            .addCase(updateBusiness.fulfilled, (state, action) => {    
                
                state.similarbusiness = action.payload.data;
                state.error = action.payload.data.message;
                console.log(action.payload.message)
            })
        .addCase(updateBusiness.rejected,(state)=>{
           
            state.similarbusiness = [],
                state.error ="Error while Fetching"
        })
       

       
    }
})
export const {setPhoneNumber,resetForm} = businessSlice.actions

export default businessSlice.reducer;