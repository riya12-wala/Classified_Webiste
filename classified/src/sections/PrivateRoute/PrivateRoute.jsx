import { Navigate,Outlet } from "react-router-dom";
import React from 'react'
import Header from '../global/Header/Header.jsx'
import Footer from '../global/Footer/Footer.jsx'
import { useState } from "react";
import SidePro from "../global/Header/SidePro.jsx";
function PrivateRoute() {

  const token = localStorage.getItem('token')
  const [toggled, setToggled] = useState(false);

  // const location = useLocation();
  // const hideHeaderFooter = ['/signup','/login'].includes(location.pathname)

  return (
    <div>
    
      <Header toggled={toggled} setToggled={setToggled}/> 
      <div>
      <SidePro toggled={toggled} setToggled={setToggled} />
      
       <Outlet />
 
        </div> 
        <Footer/>

     

    </div>
  )
}

export default PrivateRoute
