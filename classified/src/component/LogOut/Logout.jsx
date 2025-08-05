import React from 'react'
import HomeButton from '../HomeButton'
import { login } from '../../redux/store/actions/login-action'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../../redux/store/slice/login-slice'
function Logout() {

    
    const dispatch = useDispatch();



  return (
    <div>
          <HomeButton text='Log Out' onClick={()=>dispatch(logout())}  />

          
    </div>
  )
}

export default Logout
