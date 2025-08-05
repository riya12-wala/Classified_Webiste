import classes from "./SignUp.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { IoIosContact } from "react-icons/io";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { signup } from "../../redux/store/actions/login-action";


function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error,loading,user } = useSelector((state) => state.signup);

  const [userData, setUserData] = useState({ password: '', email: "",name:"", ContactNo:""})

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    ContactNo: Yup.string().required("Contact Number is required"),
  });

 

  return (
    <div className={classes.maindiv}>
      <Formik
        initialValues={{ email: "", password: "", name: "", ContactNo: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(true);

            dispatch(signup(values))
            console.log(values);
            setSubmitting(false)
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
          <Container className={`${classes.background}`} fluid>
            <Row className={`p-5 ${classes.container}`}>
              <Col className={classes.col1}>
                <Form onSubmit={handleSubmit}>
                  <h1>Create Account</h1>
                
                                  <Row>
                                      
                                  <Col>  <IoIosContact /></Col>
                    <Col lg={10}>
                      <div>
                      
                        <Field
                          type="name"
                          name="name"
                          placeholder="Enter Name : "
                          value={values.name}
                          onChange={(e) => {
                            handleChange(e);
                            setUserData({ ...userData, name: e.target.value });
                          }}
                          onBlur={handleBlur}
                          className={`${classes.input} ${
                            errors.name && touched.name ? classes.error : ""
                          }`}
                        />
                        {/* <ErrorMessage  className="error" name="password" component="div" /> */}

                        {errors.name && touched.name && (
                          <div className={classes.inputfeedback}>
                            {errors.name}
                          </div>
                        )}
                      </div>
                    </Col>
</Row>

                                  
                                  <Row>
                                  <Col>   <MdOutlineEmail/></Col>
                    <Col lg={10}>
                                      <div>
                                   
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter Email: "
                          value={values.email}
                          onChange={(e) => {
                            handleChange(e);
                            setUserData({ ...userData, email: e.target.value });
                          }}
                          onBlur={handleBlur}
                          className={`${classes.input} ${
                            errors.email && touched.email ? classes.error : ""
                          }`}
                        />
                        {/* <ErrorMessage className="error" name="username" component="div" /> */}
                        {errors.email && touched.email && (
                          <div className={classes.inputfeedback}>
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </Col>
                                      </Row>

                                  
                                  <Row>
                                  <Col><FaKey/></Col>
                    <Col lg={10}>
                      <div>
                      
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter Password : "
                          value={values.password}
                          onChange={(e) => {
                            handleChange(e);
                            setUserData({ ...userData, password: e.target.value });
                          }}
                          onBlur={handleBlur}
                          className={`${classes.input} ${
                            errors.password && touched.password
                              ? classes.error
                              : ""
                          }`}
                        />
                        {/* <ErrorMessage  className="error" name="password" component="div" /> */}

                        {errors.password && touched.password && (
                          <div className={classes.inputfeedback}>
                            {errors.password}
                          </div>
                        )}
                      </div>
                    </Col>
                       </Row>

                                  
                                  <Row>
                                  <Col> <MdOutlineDriveFileRenameOutline/></Col>
                    <Col lg={10}>
                                      <div>
                                         
                        <Field
                          type="ContactNo"
                          name="ContactNo"
                          placeholder="Enter Contact Number : "
                          value={values.ContactNo}
                          onChange={(e) => {
                            handleChange(e);
                            setUserData({ ...userData, ContactNo: e.target.value });
                          }}
                          onBlur={handleBlur}
                          className={`${classes.input} ${
                            errors.ContactNo && touched.ContactNo
                              ? classes.error
                              : ""
                          }`}
                        />
                        {/* <ErrorMessage  className="error" name="password" component="div" /> */}

                        {errors.ContactNo && touched.ContactNo && (
                          <div className={classes.inputfeedback}>
                            {errors.ContactNo}
                          </div>
                        )}
                      </div>
                    </Col></Row>

                    
                

                  <Row >
                    <Col>  <button
                    type="submit"
                    className={classes.btn}
                    disabled={isSubmitting}
                  >
                    Sign Up
                    </button></Col>
                    <Col className={classes.flexed} md={8}><p> Already have a Account ? </p><Link to='/login'> Login</Link></Col>
                </Row>

                  {loading && <p>Loading...</p>}
                  {error && <h5 style={{ color: "white",marginTop:"10px" }}>{error}</h5>}

                  <></>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    </div>
    // <div  className={classes.background}>
    //       <div>
  );
}

export default SignUp;
