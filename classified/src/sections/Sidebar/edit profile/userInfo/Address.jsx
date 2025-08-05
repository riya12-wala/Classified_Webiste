import React, { useEffect, useState } from "react";
import { Row,Col,Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {  Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { addAddress, deleteAdd,  updateAdd } from '../../../../redux/store/actions/user-action'



  const validationSchema = Yup.object({
 
  pincode: Yup.string().required("Pin code is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  address: Yup.string().required("Building/Block name is required"),
  tag: Yup.string().required("Tag is required"),
  }); 

const Address = ({handleBack,handleNext}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.users);
  const addressArr = user?.addressArr ?? [];
  console.log(addressArr)
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState({
    pincode: "",
    city: "",
    street: "",
    state: "",
    tag: "",
    address: "",
    customTag: ""
  });



  const handleSubmit = (values) => {
    const finalValues = { ...values };

    if (finalValues.tag === "Others" && finalValues.customTag) {
      finalValues.tag = finalValues.customTag;
    }

    if (!isEditing) {
      const tagExists = addressArr.some(
        (addr) => addr.tag.toLowerCase() === finalValues.tag.toLowerCase()
      );
      if (tagExists) {
        alert("Address with that tag already exists!");
        return;
      }
    }

    if (isEditing && editingAddressId) {
      dispatch(updateAdd({ _id: editingAddressId, updateAdd: finalValues }))
        .then(() => {
          resetFormState();
        })
        .catch((err) => {
          console.error("Update failed:", err);
        });
    } else {
      dispatch(addAddress({addressArr:[finalValues]}))
        .then(() => {
          resetFormState();
        })
        .catch((err) => {
          console.error("Add failed:", err);
        });
    }
  };

  const resetFormState = () => {
    setIsEditing(false);
    setEditingAddressId(null);
    setInitialFormValues({
      pincode: "", 
      city: "",
      street: "",
      state: "",
      tag: "",
      address: "",
      customTag: ""
    });
  };

  return (
    <div >
      <div >
        <Formik
          initialValues={initialFormValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, handleChange,handleBlur,  errors,
                touched, }) => (
            <FormikForm >
              <h4>{isEditing ? "Edit Address" : "Add Address"}</h4>

              <Row>
                    <Col className="space-y-4">
                      <h3>Please provide home and office address</h3>

                      {/* <div className="flex gap-3">
                        <TextField
                          fullWidth
                          type="text"
                          
                          name="fname"
                          placeholder="Enter  Name : "
                          value={values.fname}
                          error={!!(touched.fname && errors.fname)}
                          helperText={touched.fname && errors.fname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <TextField
                          fullWidth
                          type="text"
                          name="ContactNo"
                          placeholder="Enter Contact Number : "
                          value={values.ContactNo}
                           onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.ContactNo && errors.ContactNo)}
                          helperText={touched.ContactNo && errors.ContactNo}
                          
                        />

                        <TextField
                          fullWidth
                          type="text"
                          name="email"
                          placeholder="Enter  email : "
                          value={values.email}
                          error={!!(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div> */}

                      <div>
                        <TextField
                          fullWidth
                          type="text"
                          name="pincode"
                          label="pincode"
                          placeholder="Enter Pin Code: "
                          value={values.pincode}
                           onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.pincode && errors.pincode)}
                          helperText={touched.pincode && errors.pincode}
                        />
                      </div>

                   <div>
                        <TextField
                          fullWidth
                          type="text"
                          name="street"
                          label="Street"
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
                            label="City"
                            type="text"
                            name="city"
                            placeholder="Enter City : "
                            value={values.city}
                             onChange={handleChange}
                    onBlur={handleBlur}
                            error={!!(touched.city && errors.city)}
                            helperText={touched.city && errors.city}
                          />
                        </div>

                        <div className="w-1/2">
                          <TextField
                            fullWidth
                            label="State"
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
                      <div className="flex">
                       
                        <div className="w-1/2">
                          <label for="address">Address : </label>
                          <textarea
                            name="address"
                            id="address"
                            rows="4"
                            cols="65"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(touched.address && errors.address)}
                            helperText={touched.address && errors.address}
                            className="border border-gray-300"
                          ></textarea>
                        </div>
                        <div className="w-1/2 ml-3 space-y-2">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Tag
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="tag"
                              value={values.tag}
                              onChange={handleChange}
                              label="Tag : "
                              
                              onBlur={handleBlur}
                            >
                              <MenuItem value="Home">Home</MenuItem>
                              <MenuItem value="Work">Work</MenuItem>
                              <MenuItem value="Others">Others</MenuItem>
                            </Select>
                          </FormControl>
                          {values.tag === "Others" && (
                            <TextField
                              fullWidth
                              label="Enter custom tag"
                              name='customTag'
                              value={values.customTag}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="e.g. Gym, Parent's Place"
                            />
                          )}
                        </div>
                  </div>
                </Col>
                </Row>

              <Button type="submit" variant="primary" className="bg-blue-700">
                {isEditing ? "Update Address" : "Add Address"}
              </Button>
            </FormikForm>
          )}
        </Formik>

         <div className="space-x-3 flex py-3 items-start">
                        <Button
                          variant="contained"
                          onClick={handleBack}
                          className="w-1/4 bg-black text-white"
                        >
                          Back
                        </Button>
          <Button
            variant="contained"
                             className="w-1/4 bg-blue-600 "
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                      </div>


        <div className="mt-4 ">
          {addressArr?.map((addr) => (
            <div key={addr._id} className="border rounded p-3 mb-3 bg-white">
              <p>
                <strong>Tag:</strong> {addr.tag}
              </p>
              <p>
                <strong>Address:</strong> {addr.address} {addr.street}  {addr.city}  {addr.state} {addr.pincode} 
              </p>
             
              <div>
                <button
                 className="border-2 border-blue-600 py-2 px-4 mx-2"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingAddressId(addr._id);
                    setInitialFormValues({
                      pincode: addr.pincode,
                      city: addr.city,
                      street: addr.street,
                      state: addr.state,
                      address: addr.address,
                      tag: ["Home", "Work", "Others"].includes(addr.tag)
                        ? addr.tag
                        : "Others",
                      customTag: ["Home", "Work", "Others"].includes(addr.tag)
                        ? ""
                        : addr.tag,
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  
                  className="border-2 border-red-600  py-2 px-4 mx-2"
                  onClick={() => dispatch(deleteAdd(addr._id))}
                >
                  Delete
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Address;
