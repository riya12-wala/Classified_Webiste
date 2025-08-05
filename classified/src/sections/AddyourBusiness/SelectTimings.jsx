import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";

import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel,Button } from "@mui/material";
import classes from "./SelectTimings.module.css";
import { multiStepContext } from './ContextStore';
import time from './business_time_2x_new.webp'




const DaysOFWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function SelectTimings({handleBack,handleNext}) {


  const {businessData, setBusinessData} = React.useContext(multiStepContext);

    
      const [selectAll, setSelectAll] = useState(false);

  console.log(businessData)

    


  


  

      return (
    <div>
       <Formik
            initialValues={{
                workingDays:businessData.workingDays || [],
                opensAt: businessData.opensAt || "",
                closesAt: businessData.closesAt || "",
                
             
            }}
           
            onSubmit={ (values) => {
              setBusinessData(b => {return {...b, ...values}})
              handleNext();
              }
            }
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
              isSubmitting,
            }) => (
              <Container className={`${classes.background}`} fluid>
              
                    <Form>
                  <Row  className="flex justify-center items-center"
                      lg={2}
                      xs={1}>
                    <Col  className="flex justify-center items-center">
                    <img src={time} alt=""  className="w-1/2  ml-5"/>
                    </Col>
                    <Col className="px-lg-5 space-y-4 p-4 ">
                      <h3>Add Business Timings</h3>
                      <p>Let your customer know when you are open for business</p>
                      <div className='flex flex-col '>
                        <h6>Select Days Of the Week</h6>
<div><ToggleButtonGroup
value={values.workingDays}
name="workingDays"
onChange={(event, newFormats) => {
  setFieldValue("workingDays", newFormats);
  setSelectAll(newFormats.length === DaysOFWeeks.length);
  console.log(newFormats);  
}}
aria-label="working days"
onBlur={handleBlur}
>
{DaysOFWeeks.map((day) => (
<ToggleButton key={day} value={day} className='flex rounded-full gap-4'>
{day}
</ToggleButton>
))}
</ToggleButtonGroup></div>

                        <div>
                        <FormControlLabel
control={<Checkbox checked={selectAll} />}
onChange={(event) => {
const isChecked = event.target.checked;
const selectedDays = isChecked ? DaysOFWeeks : [];
setFieldValue("workingDays", selectedDays);
setSelectAll(isChecked);
}}
label="Select All the days"
/>
</div>
</div>

        
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
 <div className='w-full'>                     <Box sx={{ minWidth: 120 }}>
<FormControl fullWidth >
<InputLabel id="demo-simple-select-label">Opens At</InputLabel>
<Select
labelId="demo-simple-select-label"
  id="demo-simple-select"
  name='opensAt'
value={businessData['opensAt']}
label="Opens At : "
  
  onChange={(event) => {
    handleChange(event);
        setBusinessData({
          ...businessData,
          opensAt: event.target.value,
        });
  }}
  onBlur={handleBlur} 
>
<MenuItem value='Open 24 Hours'>Open 24 Hours</MenuItem>
  <MenuItem value='6:00 am'>6:00 am</MenuItem>
  <MenuItem value='6:30 am'>6:30 am</MenuItem>
  <MenuItem value='7:00 am'>7:00 am</MenuItem>
  <MenuItem value='7:30 am'>7:30 am</MenuItem>
  <MenuItem value='8:00 am'>8:00 am</MenuItem>
  <MenuItem value='8:30 am'>8:30 am</MenuItem>
<MenuItem value='9:00 am'>9:00 am</MenuItem>
                              <MenuItem value='9:30 am'>9:30 am</MenuItem>
                              
<MenuItem value='10:00 am'>10:00 am</MenuItem>
<MenuItem value='10:30 am'>10:30 am</MenuItem>
<MenuItem value='11:00 am'>11:00 am</MenuItem>
<MenuItem value='11:40 am'>11:40 am</MenuItem>
                              <MenuItem value='12:00 am'>12:00 pm</MenuItem>
                              <MenuItem value='12:30 am'>12:30 pm</MenuItem>
                              
<MenuItem value='1:00 pm'>1:00 pm</MenuItem>
<MenuItem value='2:00 pm'>2:00 pm</MenuItem>
<MenuItem value='3:00 pm'>3:00 pm</MenuItem>
<MenuItem value='4:00 pm'>4:00 pm</MenuItem>
<MenuItem value='5:00 pm'>5:00 pm</MenuItem>
<MenuItem value='6:00 pm'>6:00 pm</MenuItem>
<MenuItem value='7:00 pm'>7:00 pm</MenuItem>
<MenuItem value='8:00 pm'>8:00 pm</MenuItem>
<MenuItem value='9:00 pm'>9:00 pm</MenuItem>
<MenuItem value='10:00 pm'>10:00 pm</MenuItem>
<MenuItem value='11:00 pm'>11:00 pm</MenuItem>
                              <MenuItem value='12:00 am'>12:00 am</MenuItem>
                              <MenuItem value='1:00 am'>1:00 am</MenuItem>
<MenuItem value='2:00 am'>2:00 am</MenuItem>
<MenuItem value='3:00 am'>3:00 am</MenuItem>
<MenuItem value='4:00 am'>4:00 am</MenuItem>
<MenuItem value='5:00 am'>5:00 am</MenuItem>
                              
</Select>

</FormControl>
</Box></div>

       
      <div className='w-full '>  {
            values.opensAt !== "Open 24 Hours" && (  <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Closes At</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
    id="demo-simple-select"
    name='closesAt'
                  value={values.closesAt}
                  label="CLoses At : "
    onChange={(e) => {
      handleChange(e);
      setBusinessData({
        ...businessData,
        closesAt: e.target.value,
      });
    }}
    onBlur={handleBlur}

 
                >
                   <MenuItem value='6:00 am'>6:00 am</MenuItem>
  <MenuItem value='6:30 am'>6:30 am</MenuItem>
  <MenuItem value='7:00 am'>7:00 am</MenuItem>
  <MenuItem value='7:30 am'>7:30 am</MenuItem>
  <MenuItem value='8:00 am'>8:00 am</MenuItem>
  <MenuItem value='8:30 am'>8:30 am</MenuItem>
<MenuItem value='9:00 am'>9:00 am</MenuItem>
                              <MenuItem value='9:30 am'>9:30 am</MenuItem>
                              
<MenuItem value='10:00 am'>10:00 am</MenuItem>
<MenuItem value='10:30 am'>10:30 am</MenuItem>
<MenuItem value='11:00 am'>11:00 am</MenuItem>
<MenuItem value='11:40 am'>11:40 am</MenuItem>
                              <MenuItem value='12:00 am'>12:00 pm</MenuItem>
                              <MenuItem value='12:30 am'>12:30 pm</MenuItem>
                              
<MenuItem value='1:00 pm'>1:00 pm</MenuItem>
<MenuItem value='2:00 pm'>2:00 pm</MenuItem>
<MenuItem value='3:00 pm'>3:00 pm</MenuItem>
<MenuItem value='4:00 pm'>4:00 pm</MenuItem>
<MenuItem value='5:00 pm'>5:00 pm</MenuItem>
<MenuItem value='6:00 pm'>6:00 pm</MenuItem>
<MenuItem value='7:00 pm'>7:00 pm</MenuItem>
<MenuItem value='8:00 pm'>8:00 pm</MenuItem>
<MenuItem value='9:00 pm'>9:00 pm</MenuItem>
<MenuItem value='10:00 pm'>10:00 pm</MenuItem>
<MenuItem value='11:00 pm'>11:00 pm</MenuItem>
                              <MenuItem value='12:00 am'>12:00 am</MenuItem>
                              <MenuItem value='1:00 am'>1:00 am</MenuItem>
<MenuItem value='2:00 am'>2:00 am</MenuItem>
<MenuItem value='3:00 am'>3:00 am</MenuItem>
<MenuItem value='4:00 am'>4:00 am</MenuItem>
<MenuItem value='5:00 am'>5:00 am</MenuItem>
  </Select>

              </FormControl>
            </Box>)
            } </div>
 </div>

            <p className='font-semibold text-blue-700'>+ Add Another Time Slot</p>


 <div className="space-x-3 flex py-3">
                     <Button
                      variant="contained"
                        onClick={handleBack}
                        className="w-1/2 bg-black"
                    >
                      Back
                    </Button>
                    <Button variant="contained"  type="Submit" className="w-1/2 bg-red-600">
                      Next
                    </Button>
                    </div>              

                    </Col>
                      </Row>
                  
         

                
                </Form>
                
              </Container>
            )}
          </Formik>
    </div>
  )
}

export default SelectTimings
