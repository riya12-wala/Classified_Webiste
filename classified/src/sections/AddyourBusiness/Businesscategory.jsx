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
import * as Yup from 'yup'
import {FormHelperText}  from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import category from './business_listed_2x_new.webp'

function Businesscategory({handleBack,handleNext}) {

  const { businessData, setBusinessData } = React.useContext(multiStepContext);
  console.log(businessData)
    const dispatch = useDispatch();

    const { categories,subcategories } = useSelector((state) => state.category)

    const validationSchema = Yup.object({
          category:Yup.string().required("Category is required"),
          
        });
  
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
            {   category: businessData.category || "",
        sub_category: businessData.sub_category || []
             
              }
            }
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    setBusinessData(prev => ({
                      ...prev,
                      ...values,
                      sub_category:  values.sub_category === "" ? "" : values.sub_category,
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
              <div className="px-5 space-y-4 p-4">
                <h3>Add Business Category</h3>
                <p>Select the correct categories so that your customers can easily find you</p>
       <div> <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={touched.category && Boolean(errors.category)}>
              <InputLabel id="demo-simple-select-label">Select Category : </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name='category'
                value={values.category}
                onChange={(e) => {
                  handleChange(e);
                  setBusinessData(prev => ({
                    ...prev,
                    category: e.target.value,
                    sub_category: "", // Reset subcategory when category changes
                  }));
                }}
                label="Category  : "
                
              >
                      {
                          categories.map((e) => (   
                            <MenuItem value={e._id}>{e.cat_name}</MenuItem>
                          ))
               }
                </Select>
                   {/* Show validation error below the select */}
  {touched.category && errors.category && (
    <FormHelperText>{errors.category}</FormHelperText>
  )}
            </FormControl>
          </Box></div>

      <div><Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Select Sub Category : </InputLabel>
              <Select
  labelId="demo-multi-select-label"
  id="demo-multi-select"
  multiple
  value={values.sub_category || []}
  onChange={(e) => {
    const val = e.target.value;
    handleChange(e);
    setBusinessData(prev => ({
      ...prev,
      sub_category: val
    }));
  }}
  renderValue={(selected) =>
    subcategories
      .filter((sc) => selected.includes(sc._id))
      .map((sc) => sc.sub_category)
      .join(", ")
  }
  name="sub_category"
  disabled={!businessData.category}
>
  {subcategories.length === 0 ? (
    <MenuItem disabled>No subcategory found</MenuItem>
  ) : (
    subcategories.map((e) => (
      <MenuItem key={e._id} value={e._id}>
        <input
          type="checkbox"
          checked={values.sub_category?.includes(e._id)}
          readOnly
        />
        &nbsp;{e.sub_category}
      </MenuItem>
    ))
  )}
</Select>

                    {/* Show validation error below the select
  {touched.subcategory && errors.subcategory && (
    <FormHelperText>{errors.subcategory}</FormHelperText>
  )}   */}
        </FormControl>
        
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

export default Businesscategory
