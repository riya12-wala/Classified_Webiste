import React from 'react'
import classes from './Heading.module.css'
import { Container } from 'react-bootstrap'
function Heading({text,description}) {
  return (
    <Container className='my-4'>
      <div className={classes.heading}>
          <h1>{text}</h1>
          <p>{ description}</p>
    </div>
    </Container>
  )
}

export default Heading
