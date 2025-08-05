import React,{useState} from "react";
import { Formik, Form } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import * as Yup from "yup";
import { Button,TextField ,FormHelperText} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateFriend,deleteAdd,addAddress } from "../../../../redux/store/actions/user-action";

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    fphone: Yup.string().required("Contact Number is required"),
    femail: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    relationship: Yup.string().required("Relationship is required"),
  });

function Friends({ handleBack, handleNext }) {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.users);
  const friends = user?.friends ?? [];

    const [isEditing, setIsEditing] = useState(false);
    const [editingFriendsId, setEditingFriendsId] = useState(null);
    const [editValues, setEditValues] = useState(null);


  return (
    <Container fluid>
      <Row>
        <Col>
          <Formik
            enableReinitialize
            initialValues={
                  editValues || 
              {firstname: "",
              lastname: "",
              ftitle: "",
              fphone: "",
              femail: "",
              fdob: "",
              relationship: "",}
            }
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const finalValues = { ...values };
              
             
             
              
              if (isEditing && editingFriendsId) {
                dispatch(updateFriend({ _id: editingFriendsId, updateFriend: finalValues }))
                  .then(() => {
                    resetForm();
                    setIsEditing(false);
          setEditingFriendsId(null);
          setEditValues(null);
                  })
                  .catch((err) => {
                    console.error("Update failed:", err);
                  });
              } else {
                dispatch(addAddress({friends :[finalValues]}))
                  .then(() => {
                    resetForm();
                  })
                  .catch((err) => {
                    console.error("Add failed:", err);
                  });
              }
              resetForm();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
             
            }) => (
              <Form>
                <Row>
                  <Col className="px-5 space-y-4 p-4">
                    <h3>Friends & Family </h3>

                    <div className="flex gap-3">
                      <div>
                        <FormControl
                          className="w-24"
                          error={touched.ftitle && Boolean(errors.ftitle)}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Title
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="ftitle"
                            value={values.ftitle}
                            label="Title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="Mr">Mr</MenuItem>
                            <MenuItem value="Miss">Miss</MenuItem>
                            <MenuItem value="Ms">Ms</MenuItem>
                          </Select>
                          {/* Show validation error below the select */}
                          {touched.ftitle && errors.ftitle && (
                            <FormHelperText>{errors.ftitle}</FormHelperText>
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
                          name="firstname"
                          placeholder="Enter First Name : "
                          value={values.firstname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.firstname && errors.firstname)}
                          helperText={touched.firstname && errors.firstname}
                        />
                      </div>

                      <div className="w-full">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Last Name"
                          variant="outlined"
                          type="text"
                          name="lastname"
                          placeholder="Enter Last Name : "
                          value={values.lastname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.lastname && errors.lastname)}
                          helperText={touched.lastname && errors.lastname}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-3/4">
                        <FormControl
                          fullWidth
                          error={
                            touched.relationship && Boolean(errors.relationship)
                          }
                        >
                          <InputLabel id="demo-simple-select-label">
                            RelationShip
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="relationship"
                            value={values.relationship}
                            label="Relation Ship : "
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="Parent">Parent</MenuItem>
                            <MenuItem value="Spouse">Spouse</MenuItem>
                            <MenuItem value="Child">Child</MenuItem>
                            <MenuItem value="In-Law">In-Law</MenuItem>
                            <MenuItem value="Sibling">Sibling</MenuItem>
                          </Select>
                          {touched.relationship && errors.relationship && (
                            <FormHelperText>
                              {errors.relationship}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </div>

                      <div className="w-1/2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Select Date of Birth:"
                            value={values.fdob ? dayjs(values.fdob) : null}
                           onChange={(newValue) => {
      const event = {
        target: {
          name: 'fdob',
          value: newValue ? newValue.format('YYYY-MM-DD') : ''
        }
      };
      handleChange(event);
                            }}
                            onBlur={handleBlur}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-1/2">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          type="text"
                          name="femail"
                          placeholder="Enter Email : "
                          value={values.femail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.femail && errors.femail)}
                          helperText={touched.femail && errors.femail}
                        />
                      </div>

                      <div className="w-1/2">
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Contact Number"
                          variant="outlined"
                          type="text"
                          name="fphone"
                          placeholder="Enter Contact Number : "
                          value={values.fphone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.fphone && errors.fphone)}
                          helperText={touched.fphone && errors.fphone}
                        />
                      </div>
                    </div>
                   
                                 <Button type="submit" variant="primary" className="bg-blue-500">
                                   {isEditing ? "Update " : "Add "}
                                 </Button>

                    <div className="space-x-3 flex py-3">
                      <Button
                        variant="contained"

                        onClick={handleBack}
                        className="w-1/4 bg-black"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        type="Submit"
                        className="w-1/4  bg-red-600"
                      >
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

       {friends?.map((addr) => (
                  <div key={addr._id} className="border rounded p-3 mb-3 bg-white">
           <p className="tracking-normal"><strong>{addr.relationship}</strong></p>
           <p>{addr.firstname} {addr.lastname}</p>
                    <div>
                      <button
                       className="border-blue-500 border-2 py-2 px-4 mx-2"
                        onClick={() => {
                          setIsEditing(true);
                          setEditingFriendsId(addr._id);
                          setEditValues(addr)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        
                        className="border-2 border-red-600 py-2 px-4 mx-2"
                        onClick={() => dispatch(deleteAdd(addr._id))}
                      >
                        Delete
                      </button>
                      
                    </div>
                  </div>
                ))}
    </Container>
  );
}

export default Friends;
