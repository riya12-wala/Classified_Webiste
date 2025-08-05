import React, { useState } from "react";
import { Formik,  Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";
import {  Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";

import { useParams } from "react-router-dom";
import { updateBusiness } from "../../../redux/store/actions/business-action";


function Website() {

  const { id } = useParams();
  const validationSchema = Yup.object({
    website: Yup.string().required("website is required"),

  });
  
   const [open, setOpen] = useState(false);
  const { error } = useSelector(state => state.business);
  
  useEffect(() => {
    if (error) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 5000); // hide after 3 seconds
  
      return () => clearTimeout(timer);
    }
  }, [error]);
  const dispatch = useDispatch();

   

  return (
    <div>
           <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert  sx={{ width: '100%' }} variant="filled">
          {error}
        </MuiAlert>
      </Snackbar>
      <Formik
        initialValues={{
          
                website:''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting ,resetForm}) => {
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
            <div className=" flex flex-col justify-center items-center " >
              <Row className='w-full max-w-2xl  border border-gray-300 m-3 shadow-sm' >
                <Col className="space-y-4 p-4">
                <h3>Add Business  Website </h3>
                 

                  <div className="w-full">
                                     <TextField
                                       fullWidth
                                       id="outlined-basic"
                                       label="Add Website"
                                       variant="outlined"
                                       type="text"
                                       name="website"
                                       placeholder="Enter Name : "
                                       value={values.website}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       error={!!(touched.website && errors.website)}
                                       helperText={touched.website && errors.website}
                                     />
                                   </div>
                                   
                     <button className="bg-blue-400 px-4 p-2 m-3 text-white rounded-l-sm text-center" type="submit" disabled={isSubmitting}>Save & Continue</button>
                              </Col>
                              
                          </Row>
                          

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Website;
