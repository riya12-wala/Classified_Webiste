import React, { useState } from 'react'
import { resetPassword } from '../../redux/store/actions/login-action';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { setData } from '../../redux/store/slice/forget-slice';
import classes from './ResetPassword.module.css'
import HomeButton from '../HomeButton';
function ResetPassword() {

  const dispatch = useDispatch();

  const {error} = useSelector((state) => state.forgetpassword);

  const [userData, setUserData] = useState({ email: "", newPassword: "" })
  console.log(userData)

       const validationSchema = Yup.object({
         email: Yup.string().required("Email is required").email("Invalid Email."),
         newPassword:Yup.string().required("Password is Required.")
      
        });

  return (
    <div>
      

      <div className={classes.back}>
        <Container className="py-4">
        <div className={classes.head}><h1>Reset Password</h1></div>
          <div className={`mt-3 ${classes.maindiv}`}>
            <Formik
              initialValues={{  }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(true);
                  dispatch(resetPassword(values))
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
                    
                                    <Field
                                      type="email"
                                      name="email"
                                      placeholder="Enter your Email: "
                                      value={values.email}
                                      onChange={(e) => {
                                        handleChange(e);
                                     setUserData({...userData,email:e.target.value})
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
                          
                          <Field
                                      type="newPassowrd"
                                      name="newPassword"
                                      placeholder="Enter your New Password: "
                                      value={values.newPassword}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setUserData({...userData,newPassword:e.target.value})
                                      }}
                                      onBlur={handleBlur}
                                      className={`${classes.input} ${
                                        errors.newPassword && touched.newPassword ? classes.error : ""
                                      }`}
                                    />
                                    {/* <ErrorMessage className="error" name="username" component="div" /> */}
                                    {errors.newPassword && touched.newPassword && (
                                      <div className={classes.inputfeedback}>
                                        {errors.newPassword}
                                      </div>
                                    )}
                                                        </div>
                                                        {/* {loading && <p>Loading...</p>}
                                                        {error && <h5 style={{ color: "white", marginTop: "10px" }}>{error}</h5>} */}
                                                        
                        <Row>
                          <Col> <HomeButton text='Submit' disabled={isSubmitting} /> </Col>
                          <Col className={classes.return}><Link to='/login'><h6> Return to  Login</h6></Link></Col>
                                                        </Row>

                                                        {error && <h6 style={{ color: "red",marginTop:"10px" }}>{error}</h6>}

                                </Form>
                              </Col>
                            </div></div>
              )}
            </Formik>
          </div>
        </Container>

        
      </div>
    </div>
  )
}

export default ResetPassword
