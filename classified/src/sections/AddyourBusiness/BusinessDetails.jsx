  import React from "react";
  import { Formik, Field, Form, ErrorMessage } from "formik";
  import { Container, Row, Col } from "react-bootstrap";
  import * as Yup from "yup";
  import { multiStepContext } from "./ContextStore";
  import classes from "./BusinessDetails.module.css";
  import { Button, TextField } from "@mui/material";
  import business from "./business_details_2x.webp";
import HomeButton from "../../component/HomeButton";
  const validationSchema = Yup.object({
    name: Yup.string().required("Business name is required"),
    zip: Yup.string().required("Zip code is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    compAdd: Yup.string().required("Building/Block name is required"),
  });

  function BusinessDetails({ handleNext }) {
    const { businessData, setBusinessData } = React.useContext(multiStepContext);



    return (
      <div>
        <Container className={`${classes.background}`} fluid>
          <Row className={`${classes.container}`}>
            <Col className={classes.col1}>
              <Formik
                initialValues={{
                  name: "",
                  zip: "",
                  street: "",
                  city: "",
                  state: "",
                  compAdd: "",
                  location: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  const upvAlues = {
                    ...values,
                    location: businessData.location,
                  };
                  setBusinessData((b) => {
                    return { ...b, ...upvAlues };
                  });
                  handleNext();
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <Row className="flex justify-center items-center"
                      lg={2}
                      xs={1}
                    >
                      <Col className="flex justify-center items-center">
                        
                        <img
                          src={business}
                          alt=""
                          srcset=""
                          className="w-1/2  ml-5"
                        />
                      </Col>

                      <Col className="px-lg-5 space-y-4 p-4">
                        
                        <h3>Enter Your  Business Address</h3>

                        <div>
                          {/* <TextField
                          
                            name="locationName"
                            value={businessData["locationName"]}
                            slotProps={{ readOnly: true }}
                            fullWidth
                            margin="normal"
                          />

                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleDetectLocation}
                            style={{ marginRight: "1rem" }}
                          >
                            Use Current Location
                          </Button> */}

                          <TextField
                            fullWidth
                            label='Business Name'
                            type="text"
                            name="name"
                            placeholder="Enter Business Name : "
                            value={businessData["name"]}
                            error={!!(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                            onChange={(e) => {
                              handleChange(e);
                              setBusinessData({
                                ...businessData,
                                name: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <div>
                          <TextField
                             fullWidth
                            type="text"
                            name="zip"
                            label='Zip'
                            placeholder="Enter Zip Code: "
                            value={businessData["zip"]}
                            onChange={(e) => {
                              handleChange(e);
                              setBusinessData({
                                ...businessData,
                                zip: e.target.value,
                              });
                            }}
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
                            value={businessData["street"]}
                            onChange={(e) => {
                              handleChange(e);
                              setBusinessData({
                                ...businessData,
                                street: e.target.value,
                              });
                            }}
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
                            value={businessData["city"]}
                            onChange={(e) => {
                              handleChange(e);
                              setBusinessData({
                                ...businessData,
                                city: e.target.value,
                              });
                            }}
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
                            value={businessData["state"]}
                            onChange={(e) => {
                              handleChange(e);
                              setBusinessData({
                                ...businessData,
                                state: e.target.value,
                              });
                            }}
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
                            value={businessData["compAdd"]}
                            onChange={(e) => {
                              handleChange(e);
                              setBusinessData({
                                ...businessData,
                                compAdd: e.target.value,
                              });
                            }}
                            error={!!(touched.compAdd && errors.compAdd)}
                            helperText={touched.compAdd && errors.compAdd}
                          />
                        </div>

                        {/* <Button variant="contained" color="primary" type="submit">
                          Next
                        </Button> */}

                        <div >
 <Button   variant="contained" type="Submit" className="w-1/2 bg-red-600">
                      Next
                    </Button> 
                        </div>

                       
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  export default BusinessDetails;
