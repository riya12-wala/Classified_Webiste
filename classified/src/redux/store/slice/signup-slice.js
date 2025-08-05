import { createSlice } from "@reduxjs/toolkit";
import { signup } from "../actions/login-action";

const initialState = {
    user: null,
    error: null,
    loading: false
}

const signUpSlice = createSlice({
    name: 'signup',  
    initialState,
    reducers: {

        signUp(state){
            state.user = null
            state.error = null;
            
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
            state.user = false;
            state.error = null;
        })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error =action.payload.data.message
            })
            .addCase(signup.rejected, (state,action) => {
                
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const {signUp} = signUpSlice.actions
export default signUpSlice.reducer;