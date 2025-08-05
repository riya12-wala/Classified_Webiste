import { createSlice } from "@reduxjs/toolkit";
import { forgetPassword } from "../actions/login-action";
import { resetPassword } from "../actions/login-action";
const initialState = {
    email: null,
    error: null,
    newPassword: null,
}

const forgetSlice = createSlice({
    name: "forgetpassword",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
            state.error = null
        },
        setData: (state, action) => {
                    // state.email = action.payload
                    // state.newPassword = action.payload
                },
    },
    extraReducers: (builder) => {
         builder.addCase(forgetPassword.pending, (state) => {         
                    state.email = false;
                    state.error = null;
                })
             .addCase(forgetPassword.fulfilled, (state, action) => {
                 console.log(action.payload);
                 state.email = true;
                        state.error = action.payload.data.message;
                    })
                    .addCase(forgetPassword.rejected, (state,action) => {                   
                        state.error = 'Email does not Exists !';
                      
                    })
                    builder.addCase(resetPassword.pending, (state) => {          
                        state.newPassword = null
                        state.email = false
                                  state.error = null;
                              })
                           .addCase(resetPassword.fulfilled, (state, action) => {
                               console.log(action.payload);
                               state.email = true;
                               state.newPassword = action.payload;
                               state.error = action.payload.message
                                  })
                                  .addCase(resetPassword.rejected, (state,action) => {
                                      state.email = null
                                      state.error = 'Email does not Exits !';
                                      state.newPassword = null;
                                   
                                  })
    }
})

export const { setEmail,setData } = forgetSlice.actions;

export default forgetSlice.reducer;