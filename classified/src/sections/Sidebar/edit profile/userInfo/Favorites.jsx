import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "../../../../redux/store/actions/category-action";

import { Formik, Form } from "formik";

import { FormHelperText,Button } from "@mui/material";
import { Col, Row ,Container} from "react-bootstrap";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { getBusinessFilter } from "../../../../redux/store/actions/business-action";
import { Saved ,updateUser} from "../../../../redux/store/actions/user-action";


function Favorites({ handleBack,handleReset }) {
 
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { saved,savedmsg} = useSelector((state) => state.login);
  const { business,error } = useSelector((state) => state.business)
 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addressValue, setAddress] = useState("");
  const [selectName, setSelectedName] = useState('')



      const [open, setOpen] = useState(false);
     useEffect(() => {
       if (savedmsg) {
         setOpen(true);
         const timer = setTimeout(() => {
           setOpen(false);
         }, 6000); // hide after 3 seconds
     
         return () => clearTimeout(timer);
       }
     }, [savedmsg]);
    



  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const AddToFavourites = (businessId) => {
    dispatch(Saved({businessId})); // adjust payload format if your API expects different keys
  };

  const onChange = (e) =>{
    {
      setSelectedName(e.target.value);  
      if (selectedCategory?.cat_name && addressValue && selectName) {
        dispatch(getBusinessFilter({
          cat_name: selectedCategory.cat_name,
          name: selectName,
          address:addressValue
        }))
          }
    }
}

  return (
   

        
          <Row >
            <Col>
              <div className="px-lg-5 space-y-4 p-lg-4 ">
                <h3>Select Category</h3>
                <div>
      {selectedCategory === null ? (
        <div>
          {categories.map((e) => (
            <p
              key={e._id}
              value={e._id}
              className="border border-gray-400 bg-white shadow-md p-4  cursor-pointer hover:bg-gray-100 transition"
              onClick={() => 
                { setSelectedCategory(e);
      setAddress("");
      setSelectedName("");}
              }
            >
              {e.cat_name}
            </p>
          ))}

                      
                      <Button
                                      variant="contained"
                                        onClick={handleBack}
                                        className="w-1/4 bg-black"
                                    >
                                      Back
                                    </Button>
        </div>
      ) : (
        <div>
          <label className="block mb-2 text-2xl font-medium text-gray-700">
            You selected: {selectedCategory.cat_name}
          </label>
          
                        <div className="flex flex-wrap gap-2 lg:gap-5">
                        <input
                                          type="search"
                                          autoComplete="off"
                                          placeholder="Enter Area : "
                              aria-label="Search"
                              value={addressValue}
                              onChange={(e) => setAddress(e.target.value)}
                              className="border p-2 rounded w-3/2"
                                        />
                                    
                                        <input
                                          type="search"
                                          autoComplete="off"
                                          placeholder="address, neighborhood, city, state or zip"
                              aria-label="Search"
                              value={selectName}
                            onInput={onChange}
                              className="border p-2 rounded lg:w-3/4"
                                        />
                                        
                                          {/* <button  onClick={onChange}>Search </button> */}
                                       
                      
                        </div>
                        
                        <div className="w-lg-3/4">
                          {
                            
                            business && business.length > 0 ?(business.map(item =>
                              (
                              <>
                              <Container className="m-2"> <div className="flex flex-wrap justify-between items-center border border-gray-400 shadow-md px-5 py-2 bg-white cursor-pointer">
                                  <p>{item.name} {item.zip}</p>
                                  <p className='text-blue-700 font-light' onClick={() => {
                    
                                    AddToFavourites(item._id)
                                  }} >Add to favourites</p>
                              </div>
                                <div>{error}</div>
                                </Container>
                                
                                </>
                              
                           
                              
                              )
                              )):(  <p className="text-gray-500 italic m-2 ">No data found</p>) 
                          }
                        </div>
                      
                        

                        <Button variant='contained' onClick={() => {
                          setSelectedCategory(null); // Go back to category list
                          setInputValue("");
                        }} className='m-4'>Back</Button>

                
                      </div>
                      
                     
      )}
    </div>
<Snackbar
                  open={open}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  autoHideDuration={6000}
                  onClose={() => setOpen(false)}
                  sx={{
                    mt: 2, // margin from top
                  }}
                  message={savedmsg}
                />
                
               
                 
           
               
              </div>
            </Col>
           
          </Row>
      
  );
}

export default Favorites;
