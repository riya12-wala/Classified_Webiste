import React, { useState } from "react";
import { Formik, Form, validateYupSchema } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { FormHelperText  } from "@mui/material";
import classes from "./PersonalDetails.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { multiStepContext } from "../../../AddyourBusiness/ContextStore";
import { useDispatch,useSelector } from "react-redux";
import { updateUser ,getUser} from "../../../../redux/store/actions/user-action";
import { useEffect } from "react";
function PersonalDetails({ handleNext }) {
  const validationSchema = Yup.object({
    fname:  Yup.string().required("First Name is required"),
    ContactNo: Yup.string().required("Contact Number is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    title: Yup.string().required("title is required"),
  });



  const dispatch = useDispatch();

    const users = useSelector((state)=>state.login.allUsers || [])
    console.log(users)
  
  // const handleDoc = (e) => {
  //   const files = Array.from(e.target.files);
  //   setUploadDoc((prev) => [...prev, ...files]);
  //   setuserInfo((prev) => ({
  //     ...prev,
  //     profilePic: files, // or array if supporting multiple
  //   }));
   
  // };
  useEffect(() => {
  dispatch(getUser());
}, [dispatch]);

  return (
    <div>
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          title: "",
          mname: "",
          ContactNo: "",
          whatsapp: "",
          email:'',
          Occupation: '',
          status: '',
          DOB: '',
          home1: '',
          home2: '',
          office: '',
          profilePic:''
        }}
        validationSchema={validationSchema}
        onSubmit={(values,{setSubmitting,setErrors}) => {

          const emailExists = users.some(
  (u) => u.email.toLowerCase() === values.email.toLowerCase()
);

           if (emailExists) {
    setErrors({ email: "Account with this email already exists" });
    setSubmitting(false);
    return;
  }

         console.log("Submitting values:", values);
            const formData = new FormData();
                  for (let key in values) {
                    if (key === "profilePic") {
                      if (Array.isArray(values.profilePic)) {
                        values.profilePic.forEach((file) =>
                          formData.append("profilePic", file)
                        );
                      } else {
                        formData.append("profilePic", values.profilePic);
                      }
                    } else {
                      formData.append(key, values[key]);
                    }
          }
          console.log("FormData keys:", [...formData.keys()]);
           
   dispatch(updateUser(formData))
    .then(() => {
      console.log("User updated successfully");
      handleNext();
    })
    .catch((err) => {
      console.error("Dispatch failed:", err);
    });
          
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur ,handleSubmit,isSubmitting}) => (
          <Form onSubmit={handleSubmit}>
            <Container className={`${classes.background} `} fluid>
              <Row className="flex justify-center text-sm/6">
                <Col className="space-y-4 p-4 ">
                  <h4>Please provide your personal details </h4>
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
                         
                          label="Title"
                          value={values.title}
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
                        label="First Name"
                        variant="outlined"
                        type="text"
                        name="fname"
                        placeholder="Enter First Name : "
                         value={values.fname}
              onChange={handleChange}
              onBlur={handleBlur}
                        
                        error={!!(touched.fname && errors.fname)}
                        helperText={touched.fname && errors.fname}
                      />
                    </div>
                    <div className="w-full">
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Middle Name"
                        variant="outlined"
                        type="text"
                        name="mname"
                        placeholder="Enter Middle Name : "
                         value={values.mname}
              onChange={handleChange}
              onBlur={handleBlur}
                        error={!!(touched.mname && errors.mname)}
                        helperText={touched.mname && errors.mname}
                      />
                    </div>
                    <div className="w-full">
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        type="text"
                        name="lname"
                        placeholder="Enter Last Name : "
                         value={values.lname}
              onChange={handleChange}
              onBlur={handleBlur}
                        error={!!(touched.lname && errors.lname)}
                        helperText={touched.lname && errors.lname}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex gap-3 w-1/2">
                      <div className="border border-1 border-grey-400 rounded px-2 flex w-[110px]  items-center">
                        <img
                          src="./flag.webp"
                          alt="flag"
                          className=" mr-2 w-9"
                        />
                        <p className="m-0">+91</p>
                      </div>

                      <div className="w-full">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Contact Number"
                          variant="outlined"
                          type="text"
                          name="ContactNo"
                          placeholder="Enter Contact Number : "
                           value={values.ContactNo}
              onChange={handleChange}
              onBlur={handleBlur}
                          error={!!(touched.ContactNo && errors.ContactNo)}
                          helperText={touched.ContactNo && errors.ContactNo}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 w-1/2">
                      <div className="border border-1 border-grey-400 rounded px-2 flex w-[110px]  items-center">
                        <img
                          src="./flag.webp"
                          alt="flag"
                          className=" mr-2 w-9"
                        />
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
                  </div>

                  <div className="flex gap-3">
                    <div className="w-1/2 space-y-3">
                      <div>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          type="text"
                          name="email"
                          placeholder="Enter Email : "
                           value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
                          error={!!(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </div>

                      <div>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Occupation"
                          variant="outlined"
                          type="text"
                          name="Occupation"
                          placeholder="Eg. Student,Teacher,Job Title  "
                          value={values.Occupation}
              onChange={handleChange}
              onBlur={handleBlur}
                          error={!!(touched.Occupation && errors.Occupation)}
                          helperText={touched.Occupation && errors.Occupation}
                        />
                      </div>

                      <div className="flex items-center gap-5">
                        <label
                          for="files"
                          className="btn btn-outlined border border-grey-2 rounded-all bg-gray-100"
                        >
                          Select Profile
                        </label>
                        <input
                          id="files"
                          name="profilePic"
                          type="file"
                          accept="image/*"
                         onChange={(e) => {
  const files = Array.from(e.target.files);
  const event = {
    target: {
      name: 'profilePic',
      value: files
    }
  };
  handleChange(event);
}}
                          style={{ display: "none" }}
                        />
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                          }}
                        >
{(values.profilePic && values.profilePic.length > 0) ? (
  values.profilePic.map((file, index) => {
    const src = file instanceof File ? URL.createObjectURL(file) : file;

    return (
      <img
        key={index}
        src={src}
        alt="preview"
        width={100}
        height={100}
        style={{
          objectFit: "cover",
          borderRadius: "4px",
          backgroundColor:'white'
        }}
      />
    );
  })
) : (
  <img
    src="./nature.jpg" // replace with your default image path
    alt="default"
    width={100}
    height={100}
    style={{
      objectFit: "cover",
      borderRadius: "8px",
    }}
  />
)}

                        </div>
                      </div>
                    </div>

                    <div className="w-1/2 space-y-3">
                      <div className="flex items-center gap-3">
                        <h6>DOB: </h6>
                    
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Select Date"
    value={values.DOB ? dayjs(values.DOB) : null}
    onChange={(newValue) => {
      const event = {
        target: {
          name: 'DOB',
          value: newValue ? newValue.format('YYYY-MM-DD') : ''
        }
      };
      handleChange(event);
    }}
    onBlur={handleBlur}
    
  />
</LocalizationProvider>

                        <div className="w-3/4">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Marital Status
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="status"
                               value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
                            
                   
                            >
                              <MenuItem value="Single">Single</MenuItem>
                              <MenuItem value="Married">Married</MenuItem>
                              <MenuItem value="Widowed">Divorced</MenuItem>
                              <MenuItem value="Widowed">Widowed</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>

                      <div>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Home Landline 1"
                          variant="outlined"
                          type="text"
                          name="home1"
                          placeholder="Enter Home Landline 1 : "
                           value={values.home1}
              onChange={handleChange}
              onBlur={handleBlur}
                          error={!!(touched.home1 && errors.home1)}
                          helperText={touched.home1 && errors.home1}
                        />
                      </div>

                      <div>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Home Landline 2"
                          variant="outlined"
                          type="text"
                          name="home2"
                          placeholder="Enter Home Landline 2 : "
                           value={values.home2}
              onChange={handleChange}
              onBlur={handleBlur}
                          error={!!(touched.home2 && errors.home2)}
                          helperText={touched.home2 && errors.home2}
                        />
                      </div>

                      <div>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Office Landline"
                          variant="outlined"
                          type="text"
                          name="office"
                          placeholder="Enter Office Landline : "
                           value={values.office}
              onChange={handleChange}
              onBlur={handleBlur}
                          error={!!(touched.office && errors.office)}
                          helperText={touched.office && errors.office}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-x-3 flex py-3">
                    <Button
                      variant="contained"
                      type="Submit"  
                      disabled={isSubmitting}
                    >
                      Save & Continue
                    </Button>
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

export default PersonalDetails;
