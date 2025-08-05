  import React from "react";
  import { Formik,  Form } from "formik";
  import { Container, Row, Col } from "react-bootstrap";
  import * as Yup from "yup";
  import {  TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateBusiness } from "../../../redux/store/actions/business-action";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";
  const validationSchema = Yup.object({
   
    zip: Yup.string().required("Zip code is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    compAdd: Yup.string().required("Building/Block name is required"),
  });

  function BusinessAddress() {
    const { id } = useParams();

    const {error} = useSelector(state => state.business)
    const dispatch = useDispatch();

     const [open, setOpen] = useState(false);
      
        
        useEffect(() => {
          if (error) {
            setOpen(true);
            const timer = setTimeout(() => {
              setOpen(false);
            }, 5000); // hide after 3 seconds
        
            return () => clearTimeout(timer);
          }
        }, [error]);


    return (
      <div>
        <Container className='' fluid>
           <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                            <MuiAlert  sx={{ width: '100%' }} variant="filled">
                              {error}
                            </MuiAlert>
                          </Snackbar>
              <Formik
                initialValues={{            
                  zip: "",
                  street: "",
                  city: "",
                  state: "",
                  compAdd: "",
                 
                }}
                validationSchema={validationSchema}
                onSubmit={async (values,{setSubmitting,resetForm}) => {
                   console.log(values)
                                      try{ await dispatch(updateBusiness({ _id: id, updateData: values })).unwrap();
                                          resetForm();
                                        } catch (err) {
                                          console.error("Error updating business:", err);
                                        }
                                                setSubmitting(false);
                         
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur,isSubmitting }) => (
                  <Form>
                    <Row className="flex justify-center items-center"
                      lg={2}
                      xs={1}
                    >
                     

                      <Col className="px-5 space-y-4 p-4">
                        
                        <h3>Enter Your  Business Address</h3>

                     

                        <div>
                          <TextField
                             fullWidth
                            type="text"
                            name="zip"
                            label='Zip'
                            placeholder="Enter Zip Code: "
                            value={values.zip}
                            onChange={handleChange}
                            error={!!(touched.zip && errors.zip)}
                            helperText={touched.zip && errors.zip}
                          />
                        </div>

                        <div>
                          <TextField
                             fullWidth
                            type="text"
                            name="street"
                            label='Street'
                            placeholder="Enter Street / Colony Name : "
                            value={values.street}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                            error={!!(touched.street && errors.street)}
                            helperText={touched.street && errors.street}
                          />
                        </div>

                        <div className="flex gap-3">
                        <div className="w-1/2">
                            <TextField
                              fullWidth
                              label='City'
                            type="text"
                            name="city"
                            placeholder="Enter City : "
                            value={values.city}
                            onChange={handleChange}
                            error={!!(touched.city && errors.city)}
                            helperText={touched.city && errors.city}
                          />
                        </div>

                        <div className="w-1/2">
                            <TextField
                              fullWidth
                              label='State'
                            type="text"
                            name="state"
                            placeholder="Enter State : "
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(touched.state && errors.state)}
                            helperText={touched.state && errors.state}
                          />
                        </div>
                      </div>

                        <div>
                          <TextField
                            fullWidth
                            label='Block no. / Address'
                            type="text"
                            name="compAdd"
                            placeholder="Enter Building Name / Block Number : "
                            value={values.compAdd}
                            onChange={handleChange}
                            error={!!(touched.compAdd && errors.compAdd)}
                            helperText={touched.compAdd && errors.compAdd}
                          />
                        </div>

                      

                        <div >
                                       
                     <button className="bg-blue-400 px-4 p-2 m-3 text-white rounded-l-sm text-center" type="submit" disabled={isSubmitting}>Save & Continue</button>
                        </div>            
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
         
        </Container>
      </div>
    );
  }

  export default BusinessAddress;
