import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCategory, getSubcategory } from '../../redux/store/actions/category-action'
import { multiStepContext } from './ContextStore';
import { Button } from '@mui/material';
import { Formik, Form } from 'formik';
 import {  TextField } from "@mui/material";
import * as Yup from 'yup'
import {FormHelperText}  from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import category from './business_listed_2x_new.webp'

function MiscenallousDetails({handleBack,handleNext}) {

  const { businessData, setBusinessData } = React.useContext(multiStepContext);
  console.log(businessData)
    const dispatch = useDispatch();

    const { categories,subcategories } = useSelector((state) => state.category)

 
  
    useEffect(() => {
        dispatch(getCategory());
    },[dispatch])

    useEffect(() => {
      if (businessData.category) {
        const selectedCategory = categories.find(cat => cat._id === businessData.category);
        console.log(selectedCategory)
        if (selectedCategory) {
          dispatch(getSubcategory(selectedCategory.cat_name));
        }
      }
    }, [businessData.category, dispatch, categories]);
  
  

  
  return (
    <Formik
    enableReinitialize
            initialValues={
                { 
                noofemployee:'',
                turnover: '',
        description:'', 
        costfortwo:'',
        facilities:'',
                knownfor: '',
        ownedby:'',
                yearofestablishment: '',
                    board:"",
                            typeofschool:'',
      
             
              }
            }
                  
                  onSubmit={(values) => {
                    setBusinessData(prev => ({
                      ...prev,
                      ...values,
                    
                    }));
                    handleNext();
                  }
                  }
    >
      {({ values,
              errors,
              touched,
              handleChange,
              handleBlur, }) => (
        <Form>
          <Row className="flex justify-center items-center"
                      lg={2}
                      xs={1}>
            <Col className="flex justify-center items-center">
            <img src={category} alt="" srcset=""   className="w-1/2  ml-5" />
            </Col>
            <Col >
              <div className="px-lg-5 space-y-4 p-4">
                <h3>Add Additional Details</h3>
                <p>Let user find more thing about your business.</p>
      

      <div><Box sx={{ minWidth: 120 }}>
            
                   {/* restauatrant reservation */}
                      {
                        businessData.category == '67e29c61a3ee9aa7f22567bd'
                    && (
                      <div className='space-y-4'>
                       <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Reservation: </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.facilities || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      facilities: val
    }));
  }}
  name="facilities"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='Required'> <input
          type="checkbox"
          checked={values.facilities?.includes('Required')}
          readOnly
        />&nbsp;Required</MenuItem>
                           <MenuItem value ='Not Required'><input
          type="checkbox"
            checked={values.facilities?.includes('Not Required')}
          readOnly
        />&nbsp;Not Required</MenuItem>
                           <MenuItem value='Mandatory'><input
          type="checkbox"
            checked={values.facilities?.includes('Mandatory')}
          readOnly
        />&nbsp;Mandatoray</MenuItem>
                    </Select>
                        </FormControl>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                                <div className="">
                                                    <TextField
                                                      fullWidth
                                                      label='Turn Over'
                                                    type="text"
                                                    name="turnover"
                                                    placeholder="Enter Turn Over : "
                                                    value={businessData["turnover"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        turnover: e.target.value,
                                                      });
                                                    }}
                                                    error={!!(touched.turnover && errors.turnover)}
                                                    helperText={touched.turnover && errors.turnover}
                                                  />
                                                </div>
                        
                                                <div className="">
                                                    <TextField
                                                      fullWidth
                                                      label='No of Employees/Staff'
                                                    type="text"
                                                    name="noofemployee"
                                                    placeholder="Enter Employee : "
                                                    value={businessData["noofemployee"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        noofemployee: e.target.value,
                                                      });
                                                    }}
                                                    onBlur={handleBlur}
                                                    error={!!(touched.noofemployee && errors.noofemployee)}
                                                    helperText={touched.noofemployee && errors.noofemployee}
                                                  />
                                                </div>
                        </div>
                        
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                          <div className="">
                                                    <TextField
                                                      fullWidth
                                                      label='Cost For Two People'
                                                    type="text"
                                                    name="costfortwo"
                                                    placeholder="for eg: 2500 - 3000 : "
                                                    value={businessData["costfortwo"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        costfortwo: e.target.value,
                                                      });
                                                    }}
                                                    error={!!(touched.costfortwo && errors.costfortwo)}
                                                    helperText={touched.costfortwo && errors.costfortwo}
                                                  />
                        </div>
                         <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Know for: </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.knownfor || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      knownfor: val
    }));
  }}
  name="knownfor"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='High Quality Food'> <input
          type="checkbox"
          checked={values.knownfor?.includes('High Quality Food')}
          readOnly
        />&nbsp;High Quality Food</MenuItem>
                           <MenuItem value ='Reasonable Price'><input
          type="checkbox"
            checked={values.knownfor?.includes('Reasonable Price')}
          readOnly
        />&nbsp;Reasonable Price</MenuItem>
                           <MenuItem value='Hygenic & Maintained Place'><input
          type="checkbox"
            checked={values.knownfor?.includes('Hygenic & Maintained Place')}
          readOnly
                              />&nbsp;Hygenic & Maintained Place</MenuItem>
                                                         <MenuItem value='Outdoor Dining'><input
          type="checkbox"
            checked={values.knownfor?.includes('Outdoor Dining')}
          readOnly
        />&nbsp;Outdoor Dining</MenuItem>
                    </Select>
                          </FormControl></div>
                        

                        <div >
                         
                                                    <TextField
                                                      fullWidth
                                                      label='Year of Establishment'
                                                    type="text"
                                                    name="yearofestablishment"
                                                    placeholder="Since 1996 "
                                                    value={businessData["yearofestablishment"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        yearofestablishment: e.target.value,
                                                      });
                                                    }}
                                                    error={!!(touched.yearofestablishment && errors.yearofestablishment)}
                                                    helperText={touched.yearofestablishment && errors.yearofestablishment}
                          />
                          
                        </div>
                       <div> <label htmlFor="text">Highlights about your business:</label></div>
                          <textarea     name='description'  id='text' cols={30} rows={5} value={businessData['description']}                                              onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                      description  : e.target.value,
                                                      });
                        }}
                          placeholder='what users like?'
                                                    error={!!(touched.description && errors.description)}
                                                    helperText={touched.description && errors.description} className='border-2 border-black'></textarea>
                        </div>
                    )}
                  



                  {/* gym */}

                   {
                        businessData.category == '67e29c1ba3ee9aa7f22567bb'
                    && (
                      <div className='space-y-4'>
                       <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Facilities: </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.facilities || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      facilities: val
    }));
  }}
  name="facilities"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='Locker Facility'> <input
          type="checkbox"
          checked={values.facilities?.includes('Locker Facility')}
          readOnly
        />&nbsp;Locker Facility</MenuItem>
                           <MenuItem value ='Steam Room'><input
          type="checkbox"
            checked={values.facilities?.includes('Steam Room')}
          readOnly
        />&nbsp;Steam Room</MenuItem>
                           <MenuItem value='Changing Room'><input
          type="checkbox"
            checked={values.facilities?.includes('Changing Room')}
          readOnly
                            />&nbsp;Changing Room</MenuItem>
                             <MenuItem value='Free Trail'><input
          type="checkbox"
            checked={values.facilities?.includes('Free Trail')}
          readOnly
        />&nbsp;Free Trail</MenuItem>
                    </Select>
                        </FormControl>

                          
                        
                       
                        

                         <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>  <div className="">
                                                    <TextField
                                                      fullWidth
                                                      label='Starting at'
                                                    type="text"
                                                    name="costfortwo"
                                                    placeholder="for eg : 9000 : "
                                                    value={businessData["costfortwo"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        costfortwo: e.target.value,
                                                      });
                                                    }}
                                                    error={!!(touched.costfortwo && errors.costfortwo)}
                                                    helperText={touched.costfortwo && errors.costfortwo}
                                                  />
                        </div><div className=''>
                                                    <TextField
                                                      fullWidth
                                                      label='Year of Establishment'
                                                    type="text"
                                                    name="yearofestablishment"
                                                    placeholder="Since 1996 "
                                                    value={businessData["yearofestablishment"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        yearofestablishment: e.target.value,
                                                      });
                                                    }}
                                                    error={!!(touched.yearofestablishment && errors.yearofestablishment)}
                                                    helperText={touched.yearofestablishment && errors.yearofestablishment}
                          /></div>
                          
                        </div>
                       <div> <label htmlFor="text">Highlights about your business:</label></div>
                          <textarea cols={30} rows={5} id='text' value={businessData['description']}     name='description'                                                onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                      description  : e.target.value,
                                                      });
                        }}
                          placeholder='what users like?'
                                                    error={!!(touched.description && errors.description)}
                                                    helperText={touched.description && errors.description} className='border-2 border-black'></textarea>
                        </div>
                        )}


                  {/* hospitals */}


                   {
                        businessData.category == '67e29c90a3ee9aa7f22567bf' 
                    && (
                      <div className='space-y-4'>
                       <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Facilities: </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.facilities || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      facilities: val
    }));
  }}
  name="facilities"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='Insurance Accepted'> <input
          type="checkbox"
          checked={values.facilities?.includes('Insurance Accepted')}
          readOnly
        />&nbsp;Insurance Accepted</MenuItem>
                           <MenuItem value ='Blood Bank'><input
          type="checkbox"
            checked={values.facilities?.includes('Blood Bank')}
          readOnly
        />&nbsp;Blood Bank</MenuItem>
                           <MenuItem value='Emergency Services'><input
          type="checkbox"
            checked={values.facilities?.includes('Emergency Services')}
          readOnly
                            />&nbsp;Emergency Services</MenuItem>
                            
                    </Select>
                        </FormControl>

                        
                           <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Owned By: </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.ownedby || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      ownedby: val
    }));
  }}
  name="ownedby"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='Goverment'> <input
          type="checkbox"
          checked={values.ownedby?.includes('Goverment')}
          readOnly
        />&nbsp;Goverment</MenuItem>
                           <MenuItem value ='Private'><input
          type="checkbox"
            checked={values.ownedby?.includes('Private')}
          readOnly
        />&nbsp;Private</MenuItem>    
                    </Select>
                        </FormControl>

                          
                        
                       
                        

                         <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>  <div className="">
                                                    <TextField
                                                      fullWidth
                                                      label='Doctor Avability'
                                                    type="text"
                                                    name="noofemployee"
                                                    placeholder="4 Doctor Avability "
                                                    value={businessData["noofemployee"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                       noofemployee : e.target.value,
                                                      });
                                                    }}
                                                    error={!!(touched.noofemployee && errors.noofemployee)}
                                                    helperText={touched.noofemployee && errors.noofemployee}
                                                  />
                        </div><div className=''>
                                                    <TextField
                                                      fullWidth
                                                      label='Year of Establishment'
                                                    type="text"
                                                    name="yearofestablishment"
                                                    placeholder="Since 1996 "
                                                    value={businessData["yearofestablishment"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        yearofestablishment: e.target.value,
                                                      });
                                                    }}
                                                    error={!!(touched.yearofestablishment && errors.yearofestablishment)}
                                                    helperText={touched.yearofestablishment && errors.yearofestablishment}
                          /></div>
                          
                        </div>
                        </div>
                        )}

                


                  {/* school */}

                  
                   {
                        businessData.sub_category?.includes('67e2a055a3ee9aa7f22567d0')
                    && (
                      <div className='space-y-4 mt-3'>
                      
                        <div className='flex gap-3'>
<FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Board: </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.board || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      board: val
    }));
  }}
  name="board"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='CBSE'> <input
          type="checkbox"
          checked={values.board?.includes('CBSE')}
          readOnly
        />&nbsp;CBSE</MenuItem>
                           <MenuItem value ='ICSE '><input
          type="checkbox"
            checked={values.board?.includes('ICSE')}
          readOnly
        />&nbsp;ICSE</MenuItem>
                           <MenuItem value='State Board'><input
          type="checkbox"
            checked={values.board?.includes('State Board')}
          readOnly
                            />&nbsp;State Board</MenuItem>
                            
                          
                           
                    </Select>
                          </FormControl>
                          <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Type of: </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.typeofschool || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      typeofschool: val
    }));
  }}
  name="typeofschool"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='Girls Only'> <input
          type="checkbox"
          checked={values.typeofschool?.includes('Girls Only')}
          readOnly
        />&nbsp;Girls Only</MenuItem>
                           <MenuItem value ='Boys Only'><input
          type="checkbox"
            checked={values.typeofschool?.includes('Boys Only')}
          readOnly
        />&nbsp;Boys Only</MenuItem>
                           <MenuItem value='Co-Ed'><input
          type="checkbox"
            checked={values.typeofschool?.includes('Co-Ed')}
          readOnly
                            />&nbsp;Co-Ed</MenuItem>
                            
                          
                    </Select>
                        </FormControl>
                        </div>
                        </div>
                    )}

                  
                  {/* college */}
                  {
                    businessData.sub_category?.includes('67e2a07ca3ee9aa7f22567d2') && (
                       <div className='flex gap-3 space-y-2'>
                             <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Stream </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.stream || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      stream: val
    }));
  }}
  name="stream"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='Commerce'> <input
          type="checkbox"
          checked={values.stream?.includes('Commerce')}
          readOnly
        />&nbsp;Commerce</MenuItem>
                           <MenuItem value ='Science'><input
          type="checkbox"
            checked={values.stream?.includes('Science')}
          readOnly
        />&nbsp;Science</MenuItem>
                           <MenuItem value='Arts'><input
          type="checkbox"
            checked={values.stream?.includes('Arts')}
          readOnly
                            />&nbsp;Arts</MenuItem>
                            
                          
                    </Select>
                        </FormControl>
                        </div>
                    )
                  }

                    {/* Education */}
                     <br />
                  {
                    businessData.category == "67e294b6b4b374bdb8d15ba0" && (
                       <div className='space-y-3'>
                        
                        
                          <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Facilities: </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.facilities || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      facilities: val
    }));
  }}
  name="facilities"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='Ac Room'> <input
          type="checkbox"
          checked={values.facilities?.includes('Ac Room')}
          readOnly
        />&nbsp;Ac Room</MenuItem>
                           <MenuItem value ='Sports Facilities'><input
          type="checkbox"
            checked={values.facilities?.includes('Sports Facilities')}
          readOnly
        />&nbsp;Sports Facilities</MenuItem>
                           <MenuItem value='Cirricular activities'><input
          type="checkbox"
            checked={values.facilities?.includes('Cirricular activities')}
          readOnly
                            />&nbsp;Cirricular activities</MenuItem>
                            
                           <MenuItem value='Library'><input
          type="checkbox"
            checked={values.facilities?.includes('Library')}
          readOnly
        />&nbsp;Library</MenuItem>
                           <MenuItem value='Medical Room'><input
          type="checkbox"
            checked={values.facilities?.includes('Medical Room')}
          readOnly
                            />&nbsp;Medical Room</MenuItem>
                              <MenuItem value='CCTV'><input
          type="checkbox"
            checked={values.facilities?.includes('CCTV')}
          readOnly
        />&nbsp;CCTV</MenuItem>
                    </Select>
                        </FormControl>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">

                      
                                                 <div className=' space-y-3'>
                         
                                                    <TextField
                                                      fullWidth
                                                      label='Year of Establishment'
                                                    type="text"
                                                    name="yearofestablishment"
                                                    placeholder="Since 1996 "
                                                    value={businessData["yearofestablishment"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        yearofestablishment: e.target.value,
                                                      });
                                                    }}
                                                    error={!!(touched.yearofestablishment && errors.yearofestablishment)}
                                                    helperText={touched.yearofestablishment && errors.yearofestablishment}
                          />
                          
                        </div>
                        
                                                <div className="">
                                                    <TextField
                                                      fullWidth
                                                      label='Teacher Avability'
                                                    type="text"
                                                    name="noofemployee"
                                                    placeholder="teacher ratio : "
                                                    value={businessData["noofemployee"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        noofemployee: e.target.value,
                                                      });
                                                    }}
                                                    onBlur={handleBlur}
                                                    error={!!(touched.noofemployee && errors.noofemployee)}
                                                    helperText={touched.noofemployee && errors.noofemployee}
                                                  />
                                                </div>
                        </div>
                        
                        <div className='flex gap-3'>
                             <TextField
                                                      fullWidth
                                                      label='Known For'
                                                    type="text"
                                                    name="knownfor"
                                                   
                                                    value={businessData["knownfor"]}
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                        knownfor: e.target.value,
                                                      });
                                                    }}
                                                    onBlur={handleBlur}
                                                    error={!!(touched.knownfor && errors.knownfor)}
                                                    helperText={touched.knownfor && errors.knownfor}
                                                  />
                        </div>

                        
                          <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Owned By: </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.ownedby || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      ownedby: val
    }));
  }}
  name="ownedby"
  renderValue={(selected) => selected.join(', ')} // ✅ Custom display
                         
                        >
                          

                           <MenuItem value='Goverment'> <input
          type="checkbox"
          checked={values.ownedby?.includes('Goverment')}
          readOnly
        />&nbsp;Goverment</MenuItem>
                           <MenuItem value ='Private'><input
          type="checkbox"
            checked={values.ownedby?.includes('Private')}
          readOnly
        />&nbsp;Private</MenuItem>    
                    </Select>
                        </FormControl>


                        
                                     
                       <div> <label htmlFor="text">Highlights about your business:</label></div>
                          <textarea cols={30} rows={5} id='text'  value={businessData['description']}    name='description'                                                 onChange={(e) => {
                                                      handleChange(e);
                                                      setBusinessData({
                                                        ...businessData,
                                                      description  : e.target.value,
                                                      });
                        }}
                          
                                                    error={!!(touched.description && errors.description)}
                                                    helperText={touched.description && errors.description} className='border-2 border-black'></textarea></div>
                    )
                  }
                        
                       
                     
                      
                      
      


       
        
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
          </Box></div>
    </div>
            </Col>
         </Row>
        </Form>
      )}
   </Formik>
  )
}

export default MiscenallousDetails

