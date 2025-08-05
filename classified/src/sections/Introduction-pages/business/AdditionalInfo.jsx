
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Formik, Form } from 'formik';
 import {  TextField } from "@mui/material";
import { getBusinessById } from '../../../redux/store/actions/business-action';
import { Col, Row } from 'react-bootstrap';
import { updateBusiness } from '../../../redux/store/actions/business-action';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";
function AdditionalInfo() {

    
  const dispatch = useDispatch();
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(getBusinessById(id));
  // }, [dispatch, id]);

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
   

 
  
   
  
  

  
  return (
    <Formik
    enableReinitialize
            initialValues={
                { 
                noofemployee:'',
                turnover: '',
          yearofestablishment: '',
                   
      
             
              }
            }
                  
      onSubmit={async(values,{setSubmitting,resetForm}) => {
            
            try{ await dispatch(updateBusiness({ _id: id, updateData: values })).unwrap();
                                                                resetForm();
                                                              } catch (err) {
                                                                console.error("Error updating business:", err);
                                                              }
                                                                      setSubmitting(false);
          }
                  }
    >
      {({ values,
              errors,
              touched,
              handleChange,
              handleBlur,isSubmitting }) => (
        <Form>
            <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                  <MuiAlert  sx={{ width: '100%' }} variant="filled">
                    {error}
                  </MuiAlert>
                </Snackbar>
          <Row className="flex justify-center items-center"
                      lg={2}
                      xs={1}>
         
            <Col >
              <div className="px-5 space-y-4 p-4">
                <h3>Add Additional Details</h3>
                <p>Let user find more thing about your business.</p>
      

      <div><Box sx={{ minWidth: 120 }}>
            
                 
                    
                      
                       

                          <div className="flex  gap-3">
                                                <div className="w-1/2 mb-3">
                                                    <TextField
                                                      fullWidth
                                                      label='Turn Over'
                                                    type="text"
                                                    name="turnover"
                                                    placeholder="Enter Turn Over : "
                                                    value={values.turnover}
                                                    onChange={handleChange}
                                                    error={!!(touched.turnover && errors.turnover)}
                                                    helperText={touched.turnover && errors.turnover}
                                                  />
                                                </div>
                        
                                                <div className="w-1/2 mb-3">
                                                    <TextField
                                                      fullWidth
                                                      label='No of Employees/Staff'
                                                    type="text"
                                                    name="noofemployee"
                                                    placeholder="Enter Employee : "
                                                    value={values.noofemployee}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={!!(touched.noofemployee && errors.noofemployee)}
                                                    helperText={touched.noofemployee && errors.noofemployee}
                                                  />
                                                </div>
                        </div>
                        
                     
                        

                        <div >
                         
                                                    <TextField
                                                      fullWidth
                                                      label='Year of Establishment'
                                                    type="text"
                                                    name="yearofestablishment"
                                                    placeholder="Since 1996 "
                                                    value={values.yearofestablishment}
                                                    onChange={handleChange}
                                                    error={!!(touched.yearofestablishment && errors.yearofestablishment)}
                                                    helperText={touched.yearofestablishment && errors.yearofestablishment}
                          />
                          
                        </div>



 
      


       
        
 <div className="space-x-3 flex py-3">
                    
                    <Button variant="contained"  type="submit" className="w-1/2 bg-red-600" disabled={isSubmitting}>
                      Save & Continue
                    </Button>
                    </div>
          </Box></div>
    </div>
            </Col>
         </Row>
        </Form>
      )}
   </Formik>
  )
}

export default AdditionalInfo

