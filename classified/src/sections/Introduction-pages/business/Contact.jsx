import React, { useState } from "react";
import { Formik,  Form } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";


import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { updateBusiness } from "../../../redux/store/actions/business-action";


function Contact() {

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

  const { id } = useParams();
  const validationSchema = Yup.object({
    phone: Yup.string().required("Contact Number is required"),

  });

  const dispatch = useDispatch();

    const [showPhone,setShowPhone] =  useState(false)

  return (
    <div>
       <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
  <MuiAlert  sx={{ width: '100%' }} variant="filled">
    {error}
  </MuiAlert>
</Snackbar>
      <Formik
        initialValues={{
          contactPerson: "",
          phone: "",
          phone1:'',
          whatsapp:"",   
          title: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values,{setSubmitting,resetForm}) => {
          
          console.log(values)
          try {

         const phoneNumbers = [values.phone]; // start with main number
    if (values.phone1?.trim()) {
      phoneNumbers.push(values.phone1); // add second number if provided
    }

    const contactData = {
      ...values,
      phone: phoneNumbers, // 🔁 replace single string with array
    };    
    await dispatch(updateBusiness({ _id: id, updateData: contactData })).unwrap();
    resetForm();
  } catch (err) {
    console.error("Error updating business:", err);
  }
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur,handleSubmit,isSubmitting }) => (
          <Form>
            <div className=" flex flex-col justify-center items-center " >
              <Row className='w-full max-w-2xl  border border-gray-300 m-3 shadow-sm' >
                <Col className="space-y-4 p-4">
                <h3>Add Contact Details </h3>
                  <div className="flex gap-3">

                  <div>
                    <FormControl
                      className="w-24"
                      error={touched.title && Boolean(errors.title)}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Title
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="title"
                        value={values.title}
                        label="Title"
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                      >
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Miss">Miss</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                      </Select>
                      {/* Show validation error below the select */}
                      {touched.title && errors.title && (
                        <FormHelperText>{errors.title}</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Contact Person"
                      variant="outlined"
                      type="text"
                      name="contactPerson"
                      placeholder="Enter Name : "
                      value={values.contactPerson}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(touched.contactPerson && errors.contactPerson)}
                      helperText={touched.contactPerson && errors.contactPerson}
                    />
                  </div>
                  
                  </div>

                  <div className="flex gap-3">
                      <div className="border border-1 border-grey-400 rounded px-2 flex w-[110px]  items-center">
                    <img src='./flag.webp' alt="flag" className=" mr-2 w-9" />
                    <p className="m-0">+91</p>
                  </div>

                  <div className="w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Contact Number"
                      variant="outlined"
                      type="text"
                      name="phone"
                      placeholder="Enter Contact Number : "
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                                      </div>
                                      
                  </div>
                                      <p className="text-blue-500" onClick={()=>{ setShowPhone(true)}}>+ Add Another Phone Number</p>

                                  {
                                      showPhone && (
                                          <div className="w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Contact Number"
                      variant="outlined"
                      type="text"
                      name="phone1"
                      placeholder="Enter Contact Number : "
                      value={values.phone1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(touched.phone1 && errors.phone1)}
                      helperText={touched.phone1 && errors.phone1}
                    />
                                      </div>
                                      )
                                  }

                  <div className="flex gap-3">
                      <div className="border border-1 border-grey-400 rounded px-2 flex w-[110px]  items-center">
                    <img src='./flag.webp' alt="flag" className=" mr-2 w-9" />
                    <p className="m-0">+91</p>
                  </div>

                  <div className="w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Whatsapp Number"
                      variant="outlined"
                      type="text"
                      name="whatsapp"
                      placeholder="Enter Contact Number : "
                      value={values.whatsapp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(touched.whatsapp && errors.whatsapp)}
                      helperText={touched.whatsapp && errors.whatsapp}
                    />
                                      </div>
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

export default Contact;
