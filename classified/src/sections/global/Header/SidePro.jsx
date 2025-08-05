import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { NavLink } from 'react-router-dom'
import classes from './SidePro.module.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../../redux/store/slice/login-slice'
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
                                 import { MdOutlinePersonOutline } from "react-icons/md";  

function SidePro({toggled,setToggled}) {
  const { users, filepath, isLogged } = useSelector((state) => state.login)

  // if (!users) {
  //   return <div>Loading...</div>
  // }
  const dispatch = useDispatch();
  
  const navigate = useNavigate()
  return (
    <div>
      <div style={{ display: 'flex', direction: 'rtl'  }} >
        
       
     
        <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint='all' rtl className={classes.sidebar}>
          
          <Menu transitionDuration={300}  className={classes.menu}>
            <MenuItem>
           
               
  
                            
              {isLogged ?

              ( users &&  users.profilePic ? (
                
                  <img className={classes.image} src={`${filepath}/${users.profilePic}`} /> ) :
                  (
                    <MdOutlinePersonOutline />
                  )
                ) : null
}
               
                 { users && <h6> {users.fname} {users.mname} {users.lname}</h6> }
              
           
              
            </MenuItem>
            <hr />

              <MenuItem> 
              <NavLink to='/viewyourprofile'  className={({ isActive }) => isActive ? classes.active : classes.default}>View Your Profile </NavLink></MenuItem>
           
              <MenuItem>
           <NavLink to='/fav' className={({ isActive }) => isActive ? classes.active :  classes.default}>
          Favourites
              </NavLink>
            </MenuItem>
            
            <MenuItem >
           <NavLink to='/editprofile' className={({ isActive }) => isActive ? classes.active :  classes.default}>
        Edit Profile
              </NavLink>
              </MenuItem>
            
             {/* <NavLink to='/' className={({isActive})=>isActive ? classes.active :" "}>
             <MenuItem> Change Language</MenuItem>
           </NavLink> */}
            <MenuItem >
           <NavLink to='/business' className={({ isActive }) => isActive ? classes.active :  classes.default}>
          My Business
           </NavLink>
            </MenuItem>
            
            
            <MenuItem onClick={() => {
              dispatch(logout())
              setToggled(false);
              navigate('/')
           }}>Log Out</MenuItem>
           
       </Menu>
     </Sidebar>

    
        <main>
     <div>     
     </div>
   </main>
 </div>
    </div>
  )
}

export default SidePro
