import React from 'react'
import { Row,Col, Container } from 'react-bootstrap';
import { FaSearchLocation } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import HowItWorkCard from './HowItWorkCard';
import classes from './Htw.module.css'
import Heading from '../../../../component/Heading';
function Howitworks() {
    const data = [
        {
            Icon: FaSearchLocation,
            text: "Find Businessess",
            description:'Through our user-friendly app and website, users can easily find and engage with local businesses in their area.'
        },
        {
            Icon: FaCalendarAlt,
            text: "Review Listings",
            description:'You can share your thoughts and experiences about a product, service, or business.'
        },
        {
            Icon: MdOutlineRateReview,
            text: "Make a Reservation",
            description:'Book a table online!.Quick, easy and free table reservation at Mumbai. '
        }
    ]
  return (
      <div className={classes.background}>
          <Container className='py-5'>
              <div className={classes.center}>
                  <Heading text='How It Works' description='Bringing Businnes And community members  together'/>

          </div>
        
              <Container className='mx-auto'>
                  <Row xs={1} md={2} lg={3}>
                 
              {
                  data.map((d,i) => (
                      <Col key={i} >
                          <HowItWorkCard title={d.text} description={d.description} Icon={d.Icon}/>
                            </Col>
                     
                  ))
                          }
              </Row>
          </Container>
         </Container>      
    </div>
  )
}

export default Howitworks
