import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Text from '../../../component/Text'
import classes from './Footer.module.css'
function Footer() {
  return (
    <div>
          <footer>
              <Container className='p-4'>
                  <Row xs={1} xl={6}>
            <Col className={`${classes.col1}`} xl={5} xs={11}>
                          <a href=""><span>Tempo</span></a>
                          <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
                          <div class='d-flex justify-content-center justify-content-md-start mt-4'>
                              <FaXTwitter/>
                              <FaFacebook />
                              <FaInstagram/>
                              <FaLinkedin/>
                          </div>
                      </Col>
                      <Col className={`my-2 {classes.col2}`}>
                          <h4>Useful Links</h4>
                          <ul>
                              <li>Home</li>
                              <li>About US</li>
                              <li>Services</li>
                              <li>Terms Of Service</li>
                              <li>Privacy Policy</li>
                          </ul>
                      </Col>
                      <Col className={classes.col3}>
                      <h4>Our Services</h4>
                          <ul>
                              <li>Web Desing</li>
                              <li>Web Development</li>
                              <li>Product Management</li>
                              <li>Marketing</li>
                              <li>Graphic Design</li>
                              </ul>
                      </Col>
                      <Col className={classes.col4}>
                      <h4>Contact Us</h4>
                        <p>A108 Adam Street</p>
                          <p>New York, NY 535022</p>
                          <p>United States</p>
                          <div className='mt-5'>
                          <p><strong>Phone:</strong><span>+1 5589 55488 55</span></p>
                          <p><strong>Email:</strong><span>info@example.com</span></p>
                        </div>
                      </Col>
                  </Row>
                  <Container className={`mt-5 ${classes.copyright}`}>
                      <p><span>© Copyright</span> <strong>Tempo</strong> <span>All rights Reserved</span></p>
                      <Text text="Designed By" text1="Riya Gulmohar"  />
                  </Container>
              </Container>
      </footer>
    </div>
  )
}

export default Footer
