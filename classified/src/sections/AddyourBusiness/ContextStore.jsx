import React, { useState } from 'react'

export const multiStepContext = React.createContext();

const ContextStore = ({ children }) => {
   
    const [businessData, setBusinessData] = useState({});
    const [userInfo, setuserInfo] = useState({});
  
  
    console.log("businessData", businessData);
    console.log("USERINFO", userInfo);


    return (
        <>
            <multiStepContext.Provider value={{ businessData, setBusinessData,userInfo,setuserInfo}}>
             {children}
            </multiStepContext.Provider>    
        </>
)
}

export default  ContextStore