import { createSlice } from "@reduxjs/toolkit";
import { otpSend } from "../actions/login-action";
import { verifyOTP } from "../actions/login-action";
const initialState = {
    phone: null,
    msg: null,
    otps:null
   
}

const otpSlice = createSlice({
    name: "otp",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(otpSend.pending, (state) => {         
            state.phone = false;
            state.msg = null;
        })
        .addCase(otpSend.fulfilled, (state, action) => {
         console.log(action.payload.message);
         state.phone = true;
               
            })
            .addCase(otpSend.rejected, (state,action) => {                   
                state.msg = 'Phone Number not found';
              
            })
            .addCase(verifyOTP.pending, (state) => {         
                state.otps = false;
                state.msg = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
             console.log(action.payload);
             state.otps = action.payload;
                    state.msg = 'OTP verified SuccessFully ';
                })
                .addCase(verifyOTP.rejected, (state,action) => {                   
                    state.msg = 'Session Expired Or Invalid OTP !';
                  
                })
    }
})



export default otpSlice.reducer;



