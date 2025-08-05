import React from 'react'
import classes from './CategoryCard.module.css'


function CategoryCard({head,src ,...props}) {

  return (
      <div className={classes.bor} {...props}>
        <img src={src} alt="This is img" style={{width:'60px', height:"60px",objectFit:'contain'}}/>        
      <h6>{head}</h6>
    </div>
  )
}

export default CategoryCard
