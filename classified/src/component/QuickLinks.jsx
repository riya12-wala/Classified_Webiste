import React from 'react'
import { Link } from 'react-router-dom'

function QuickLinks({src,text,bgclass,to,onClick}) {
  return (
      <Link to={to} className='no-underline text-inherit'>
       <div>
          <div className={` w-16 h-16 rounded-full ${bgclass} flex items-center justify-center `}>
              <img src={src} alt="" className='' onClick={onClick} />
          </div>
          <p className='text-[13px] mt-2'>{text}</p>
    </div>
      </Link>
  )
}

export default QuickLinks
