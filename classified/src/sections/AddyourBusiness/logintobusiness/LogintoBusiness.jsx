import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Container, Row, Col ,Button} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HomeButton from "../../../component/HomeButton";
import { setPhoneNumber } from "../../../redux/store/slice/business-slice";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import classes from './LogintoBusiness.module.css';
import ListItemText from "@mui/material/ListItemText";
import { FaCheck } from "react-icons/fa";
import mobile from './mobile.svg'
import search from './search.svg'
import info from './info.svg'
import business from './freebusinesslisting.webp'
import people from './people.jpg'
// import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import FAQs from './FAQs'
import OtpModal from "./OtpModal";
import { verifyOTP } from "../../../redux/store/actions/login-action";
import { otpSend } from "../../../redux/store/actions/login-action";
function LogintoBusiness() {
  const data = [
   { src: mobile,
    step: "Step 1",
    heading: "Create Account Number",
      description: "Enter Your Phone Number to get Started",
    },
   { src: info,
    step: "Step 2",
    heading: "Add Business Details",  
      description: "Add name, address, business hours and photos",
    },
    { src: search,
      step: "Step 3",
      heading: "Select Categories",  
      description: "Add relevant categories to your free listing page",}
  ]


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showOtp, setShowOtp] = useState(false)
  
  const {msg} = useSelector(state=>state.otp)

  const onOtpSubmit = (otp) => {
    dispatch(verifyOTP(otp))
      .unwrap()
      .then((res) => {
        console.log("OTP Verified", res);
        setShowOtp(false); // Close modal
        navigate("/businesscart"); // Or whatever route next
      })
      .catch((err) => {
        console.error("OTP Verification failed", err);
        // Optionally show error message
      });
  };

  const { error } = useSelector((state) => state.business);

  const validationSchema = Yup.object({
    phone: Yup.string().required("Phone Number  is required"),
  });
  return (
    <div>
      <Container className="my-5" fluid>
      

        <Formik
          initialValues={{ phone: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values)
              setSubmitting(true);
              dispatch(setPhoneNumber(values.phone));
              dispatch(otpSend(values)).unwrap().then((res) => {
                setShowOtp(true)
              }).catch((err) => {
                console.log('OTP Failed',err)
              })
                
              // navigate("/businesscart");

              setSubmitting(false);
            }, 100);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Col >
              <Form onSubmit={handleSubmit}>
                <Row className="m-2 lg:m-8" xs={1} lg={2}>
                <Col className="">
                    <div>
                    <div>
          <h1 class="text-[45px] text-[#] font-medium font-serif">
          List Your Business <span class=" text-red-700">for FREE</span>{" "}
        </h1>
          <h5 class='text-2xl'>with India's no.1 Business Listing Website </h5>
          </div>
                  <Field
                    class="appearance-none block  w-75 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    name="phone"
                    placeholder="Enter your Phone Number : "
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* <ErrorMessage className="error" name="username" component="div" /> */}
                  {errors.phone && touched.phone && (
                    <div className={classes.inputfeedback}>{errors.phone}</div>
                  )}
                </div>
                    <p>{ msg}</p>
                <Col>
                  {" "}
                  <button  disabled={isSubmitting} className="bg-red-600 p-2 px-4 text-white ">Submit </button>  
                  </Col>
                      
                <List>
          <ListItem disablePadding>
            <FaCheck class="p-2 text-red-700 text-3xl" />
            <ListItemText primary="Get Discovered & Create Your Online Business" />
          </ListItem>
          <ListItem disablePadding>
            <FaCheck class="p-2 text-red-700 text-3xl" />
            <ListItemText primary="Showcase Your Product & Service Offerings" />
          </ListItem>
          <ListItem disablePadding>
            <FaCheck class="p-2 text-red-700 text-3xl" />
            <ListItemText primary="Get customer details over SMS, email and push notification" />
          </ListItem>
                </List>
                </Col>
                <Col>
                <img src={people} alt=""  />
                </Col>
                </Row>
                 
            
                
      <Container class="bg-gray-100 p-3 my-5" fluid>
        <h1 class="text-[55px] text-[#] font-medium font-serif text-center mt-2">
          Get a <span class="text-red-500">FREE</span> Business Listing in 3
          Simple Steps
        </h1>
        <Row>
      <Col className ='flex flex-wrap justify-evenly'>  {
          data.map((item, index) => (
            <div key={index} className="">
              <img src={item.src} alt="" className="h-80 w-120 m-2" />
           
              <div className="w-3/2 text-center">
                <h3 className="text-2xl font-bold">{item.step}</h3>
                <h1 className="text-3xl font-bold">{item.heading}</h1>
                <p>{item.description}</p>
              </div>   
            </div>
          ))
          }</Col>

        
        </Row>
                  <Container className="flex justify-center my-5">
                  <Row xs={1} lg={2}>
                    <Col> <img src={business} alt="" srcset="" /></Col>
                    <Col>
                      
        <Container className='m-3 text-sm/7 flex flex-col justify-center'> 
            <h4>FREE BUSINESS LISTING PAGE</h4>
            <p>Having a presence on Justdial helps you build trust with your potential customers</p>
            <List>
          <ListItem disablePadding>
            <FaCheck class="p-2 text-red-700 text-3xl" />
            <ListItemText primary="Enrich your business details so that people can find you online easily" />
          </ListItem>
          <ListItem disablePadding>
            <FaCheck class="p-2 text-red-700 text-3xl" />
            <ListItemText primary="Increase customer engagement by responding to their reviews and questions" />
          </ListItem>
          <ListItem disablePadding>
            <FaCheck class="p-2 text-red-700 text-3xl" />
            <ListItemText primary="Upload photos and videos to showcase your business online" />
          </ListItem>
        </List>

                    <h1>Register Your Business Today</h1>
                    <div>
                    <Field
                    class="appearance-none block  w-3/4 bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    name="phone"
                    placeholder="Enter your Phone Number : "
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* <ErrorMessage className="error" name="username" component="div" /> */}
                  {errors.phone && touched.phone && (
                    <div className={classes.inputfeedback}>{errors.phone}</div>
                  )}
                </div>
                {error}
                <Col>
                  {" "}
                  <button disabled={isSubmitting} className="bg-red-600 p-2 px-4 text-white ">Submit </button>  
                </Col>
           
       
    
          </Container>
                    </Col>
        </Row>
          </Container>

      
      </Container>
              </Form>
            </Col>

          )}
        </Formik>    
        <Container >

<h1>Got a Question ? </h1>

<FAQs/>
</Container>
      </Container>

      <OtpModal show={showOtp} onHide={() => setShowOtp(false)} length={6}   onOtpSubmit={onOtpSubmit} />

    </div>
  );
}

export default LogintoBusiness;
