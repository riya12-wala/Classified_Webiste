import React from "react";
import classes from "./LoginPage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/store/actions/login-action";
import { Link } from "react-router-dom";
import loginImg from "./3227472.jpg";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, message, isLogged } = useSelector((state) => state.login);

  const [userData, setUserData] = useState({ password: "", email: " " });

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });


  if (isLogged) {
    navigate("/")
  }

  useEffect(() => {
    if (isLogged) {
      navigate("/")
    }
  }, [])

  return (
  
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(true);
            dispatch(login(values))
            //   .then(() => navigate("/"))
            // .catch((error) => {
            //  setSubmitting(false)
            // });
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
          <Container className={`${classes.main}`}>
            <Row className={` ${classes.container}`}>

             <Col className={classes.col1}>
                <Form onSubmit={handleSubmit}>
                  <div>
                    <h1>Log In</h1>
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
                        errors.password && touched.password ? classes.error : ""
                      }`}
                    />
                    {/* <ErrorMessage  className="error" name="password" component="div" /> */}

                    {errors.password && touched.password && (
                      <div className={classes.inputfeedback}>
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {(error && !message) && <div className={classes.error}>{error}</div>}

{( message && !error) && (
  <div className={classes.success}>{message}</div>
)}

                  <button
                    type="submit"
                    className={classes.btn}
                    disabled={isSubmitting || loading}
                  >
                    {loading ? "Logging in.." : "Login"}
                  </button>
                  <>
                    <Link to='/signup'>
                      <div>No account yet? Create an account</div>
                    </Link>

                   
                  </>
                </Form>
              </Col>

             
              <Col
                className={`"flex justify-center items-center" ${classes.img}`}
              >
                <img src={loginImg} alt="" className="h-auto max-w-full" />
                
                  <div className={classes.forgot}><Link to='/forgetpass'>Forgot Password?</Link></div>
               
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    
  );
};
export default LoginPage;
