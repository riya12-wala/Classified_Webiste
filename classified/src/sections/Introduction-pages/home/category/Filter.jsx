import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { getBusiness } from "../../../../redux/store/actions/business-action";
import { useLocation } from "react-router-dom";

const Filter = ({ categoryName, subCategoryName, address }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const initialValues = {
    price: "",
    typeofschool: "",
    ownedby: "",
    verified: false,
    openNow: false,
  };

 const handleSubmit = (values) => {
  const cleanedFilters = {};

  // Only add filters if the user selected them
  if (values.price) cleanedFilters.price = values.price;
  if (values.typeofschool) cleanedFilters.typeofschool = values.typeofschool;
  if (values.ownedby) cleanedFilters.ownedby = values.ownedby;
  if (values.verified) cleanedFilters.verified = true;
  if (values.openNow) cleanedFilters.openNow = true;

  // Merge with category/address filters
  const fullFilters = {
    ...cleanedFilters,
    ...(categoryName && { cat_name: categoryName }),
    ...(subCategoryName && { sub_cat: subCategoryName }),
    ...(address && { address }),
  };

  dispatch(getBusiness(fullFilters));
};


  return (
    <div className="flex flex-col gap-4 bg-gray-100 p-lg-4 p-2 max-h-screen h-full">
      <p className="font-bold">Apply Filters</p>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleReset }) => (
          <Form className="flex flex-col gap-4">
            {/* Price Filter */}
            <FormControl fullWidth>
              <InputLabel>Price</InputLabel>
              <Select
                name="price"
                value={values.price}
                onChange={handleChange}
                label="Price"
              >
                <MenuItem value="500">Upto ₹500</MenuItem>
                <MenuItem value="1000"> ₹1000 </MenuItem>
                <MenuItem value="1200"> ₹1200 </MenuItem>
                <MenuItem value="3000">₹3000 - ₹4500</MenuItem>
                <MenuItem value="4500">₹4500+</MenuItem>
                <MenuItem value="6000">₹6000+</MenuItem>
                <MenuItem value="8000">₹8000+</MenuItem>
              </Select>
            </FormControl>

            {/* Gender Filter */}
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="typeofschool"
                value={values.typeofschool}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="Boys Only">Boys Only</MenuItem>
                <MenuItem value="Girls Only">Girls Only</MenuItem>
                <MenuItem value="Co-Ed">Co-Ed</MenuItem>
              </Select>
            </FormControl>

            {/* Managed By */}
            <FormControl fullWidth>
              <InputLabel>Managed By</InputLabel>
              <Select
                name="ownedby"
                value={values.ownedby}
                onChange={handleChange}
                label="Managed By"
              >
                <MenuItem value="Government">Government</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
              </Select>
            </FormControl>

            {/* Verified + Open Now */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="verified"
                    checked={values.verified}
                    onChange={handleChange}
                  />
                }
                label="Verified"
              />
             
            </FormGroup>

            {/* Buttons */}
           
              <Button variant="contained" color="primary" type="submit">
                Apply Filter
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                onClick={() => {
                  handleReset();
                  dispatch(
                    getBusiness({
                      ...(categoryName && { cat_name: categoryName }),
                      ...(subCategoryName && { sub_cat: subCategoryName }),
                      ...(address && { address }),
                    })
                  );
                }}
              >
                Reset Filter
              </Button>
          
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Filter;
