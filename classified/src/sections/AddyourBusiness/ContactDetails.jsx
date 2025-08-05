import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import classes from "./ContactDetails.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { multiStepContext } from "./ContextStore";

import contact from "./add_contact_2x.webp";
import { setPhoneNumber } from "../../redux/store/slice/business-slice";
function ContactDetails({ handleNext, handleBack }) {
  const validationSchema = Yup.object({
    // contactPerson: Yup.string().required("Contact Person is required"),
    phone: Yup.string().required("Contact Number is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    // website: Yup.string().required("Website is required"),
    // title: Yup.string().required("title is required"),
  });

  const { businessData, setBusinessData } = React.useContext(multiStepContext);

  const {phoneNumber} = useSelector((state) => state.business)
  return (
    <div>
      <Formik
        initialValues={{
          contactPerson: "",
          phone: "",
          whatsapp:"",
          email: "",
          website: "",
          title: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setBusinessData((b) => {
            return { ...b, ...values };
          });
          handleNext();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Container className={`${classes.background}`} fluid>
              <Row className="flex  justify-center items-center"    lg={2}
                      xs={1}>
                <Col className="flex justify-center items-center">
                  <img
                    src={contact}
                    alt="contact_image"
                    srcset=""
                    className="w-1/2  ml-5"
                  />
                </Col>
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
                        value={businessData["title"]}
                        label="Title"
                        onChange={(e) => {
                          handleChange(e);
                          setBusinessData({
                            ...businessData,
                            title: e.target.value,
                          });
                        }}
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
                      value={businessData["contactPerson"]}
                      onChange={(e) => {
                        handleChange(e);
                        setBusinessData({
                          ...businessData,
                          contactPerson: e.target.value,
                        });
                      }}
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
                      value={businessData['phone']}
                      onChange={(e) => {
                        handleChange(e);
                        setBusinessData({
                          ...businessData,
                          phone: e.target.value,
                        });
                      }}
                      onBlur={handleBlur}
                      error={!!(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
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
                      label="Whatsapp Number"
                      variant="outlined"
                      type="text"
                      name="whatsapp"
                      placeholder="Enter Contact Number : "
                      value={businessData["whatsapp"]}
                      onChange={(e) => {
                        handleChange(e);
                        setBusinessData({
                          ...businessData,
                          whatsapp: e.target.value,
                        });
                      }}
                      onBlur={handleBlur}
                      error={!!(touched.whatsapp && errors.whatsapp)}
                      helperText={touched.whatsapp && errors.whatsapp}
                    />
                  </div>
                  </div>

                  <div>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      type="text"
                      name="email"
                      placeholder="Enter Email : "
                      value={businessData["email"]}
                      onChange={(e) => {
                        handleChange(e);
                        setBusinessData({
                          ...businessData,
                          email: e.target.value,
                        });
                      }}
                      onBlur={handleBlur}
                      error={!!(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </div>

                  <div>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Website"
                      variant="outlined"
                      type="text"
                      name="website"
                      placeholder="Enter Website : "
                      value={businessData["website"]}
                      onChange={(e) => {
                        handleChange(e);
                        setBusinessData({
                          ...businessData,
                          website: e.target.value,
                        });
                      }}
                      onBlur={handleBlur}
                      error={!!(touched.website && errors.website)}
                      helperText={touched.website && errors.website}
                    />

                    <div className="space-x-3 flex py-3">
                     <Button
                      variant="contained"
                        onClick={handleBack}
                        className="w-1/2 bg-black"
                    >
                      Back
                    </Button>
                    <Button   variant="contained" type="Submit" className="w-1/2 bg-red-600">
                      Next
                    </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ContactDetails;
