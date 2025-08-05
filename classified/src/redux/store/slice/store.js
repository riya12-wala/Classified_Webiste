import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './login-slice'
import signUpReducer from './signup-slice'
import forgetReducer from './forget-slice'
import categoryReducer from './category-slice'
import businessReducer from './business-slice'
import otpReducer from './otp-slice'
import reviewReducer from './review-slice'
const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signUpReducer,
        forgetpassword: forgetReducer,
        category: categoryReducer,
        business: businessReducer,
        otp: otpReducer,
        review:reviewReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ['login'],
                ignoreActions: ['signup'],
                ignoreActions: ['category'],
            },
        })
    }
})
        
export default store;

