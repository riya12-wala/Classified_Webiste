import React, { useEffect, useState } from "react";
import classes from "./Forget.module.css";
import { Container,Row,Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import forget from "./forget.jpeg";
import HomeButton from "../HomeButton";
import { useSelector, useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/store/actions/login-action";
import { useNavigate } from "react-router-dom";
import { setEmail } from "../../redux/store/slice/forget-slice";
function ForgetPassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

    const { email, error } = useSelector((state) => state.forgetpassword);
    console.log("email "+ email)

     
      const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Email is invalid"),
    
      });
    
    // if (email) {
    //     navigate('/resetpass')
    // }
    // useEffect(() => {
    //     if (email) {
    //         navigate('/resetpass')
    //     }
    // },[])
    
  return (
    <>
      <div className={classes.back}>
        <Container className="py-4">
          <div className={classes.head}>
            <h1>Classified</h1>
          </div>

         

          <div className={`mt-3 ${classes.maindiv}`}>
            <Formik
              initialValues={{ email: email || '' }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(true);
                  dispatch(forgetPassword(values.email))
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
                              <div className={`p-5 ${classes.mondiv}`}>
                              <div className={` ${classes.container}`}>
                              <Col className={classes.col1}>
                                <Form onSubmit={handleSubmit}>
                                                    <div>
                                                    <div>
                                                    <img src={forget} alt="" srcset="" />
                                                    <h4>Forget Your Password ? </h4>
                                        
                                                    <p>
                                                      It's Okay , it happens ! Enter below your Email to Reset Your
                                                      Password.
                                                    </p>
                                                  </div>
                    
                                    <Field
                                      type="email"
                                      name="email"
                                      placeholder="Enter  your Email Address: "
                                      value={values.email}
                                      onChange={(e) => {
                                        handleChange(e);
                                      dispatch(setEmail(e.target.value))
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
                                                        {/* {loading && <p>Loading...</p>}
                                                        {error && <h5 style={{ color: "white", marginTop: "10px" }}>{error}</h5>} */}
                                                        
                                                        <HomeButton text='Reset Your Password' disabled={isSubmitting}/>

                                                        {error && <h6 style={{ color: "red",marginTop:"10px" }}>{error}</h6>}

                                </Form>
                              </Col>
                            </div></div>
              )}
            </Formik>
          </div>
        </Container>

        
      </div>
    </>
  );
}

export default ForgetPassword;
