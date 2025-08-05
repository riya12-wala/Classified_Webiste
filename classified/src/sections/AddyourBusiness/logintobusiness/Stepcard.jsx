import React from 'react'
import {Row, Col} from 'react-bootstrap'
function Stepcard({ src,step,heading, description }) {
  return (
    <div>
  
           
                  <img src={src} alt="" />
                  <h3>{step}</h3>
                  <h1>{heading}</h1>
                  <p>{ description}</p>
              
      
    </div>
  )
}

export default Stepcard
