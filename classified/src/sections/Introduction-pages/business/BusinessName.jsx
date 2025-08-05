import React, { useState } from "react";
import { Formik,  Form } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { updateBusiness } from "../../../redux/store/actions/business-action";
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";


function BusinessName() {
  const { id } = useParams();
  const validationSchema = Yup.object({
    name: Yup.string().required("Business Name is required"),

  });

  const {error} = useSelector(state=>state.business)
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
      <Formik
        initialValues={{
          
                name:''
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
            <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                        <MuiAlert  sx={{ width: '100%' }} variant="filled">
                                          {error}
                                        </MuiAlert>
                                      </Snackbar>
            <div className=" flex flex-col justify-center items-center " >
              <Row className='w-full max-w-2xl  border border-gray-300 m-3 shadow-sm' >
                <Col className="space-y-4 p-4">
                <h3>Add Business  Name </h3>
                 

                  <div className="w-full">
                                     <TextField
                                       fullWidth
                                       id="outlined-basic"
                                       label="Enter Business Name"
                                       variant="outlined"
                                       type="text"
                                       name="name"
                                       placeholder="Enter Name : "
                                       value={values.name}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       error={!!(touched.name && errors.name)}
                                       helperText={touched.name && errors.name}
                                     />
                                   </div>
                                   
                     <button className="bg-blue-400 px-4 p-2 m-3 text-white rounded-l-sm text-center" type='submit' disabled={isSubmitting}>Save & Continue</button>
                              </Col>
                              
                          </Row>
                          

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BusinessName;
