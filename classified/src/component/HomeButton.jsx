import React from 'react'
import classes from './HomeButton.module.css';
import {Link} from 'react-router-dom' 
function HomeButton({ text, className = " ",to,icon,...props}) {
  return (
    <div >
      <Link to={to} className='no-underline'>
      <button className={`${classes.homebutton} ${className}`} type="submit" {...props} >
       {icon}{text}        
        </button>
            </Link>
    </div>
  )
}

export default HomeButton

