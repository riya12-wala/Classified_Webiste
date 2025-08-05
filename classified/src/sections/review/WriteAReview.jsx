import React from 'react'
import { Container, Row, Col ,Button} from 'react-bootstrap'
import { Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from '../../redux/store/actions/review-action';
import { debounce } from "lodash";
import { TiCamera } from "react-icons/ti";
import { Formik, Form } from "formik";
import {Form as BsForm}  from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getBusinessFilter } from '../../redux/store/actions/business-action';
function WriteAReview() {


     const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
    const {savedmsg} = useSelector(state=> state.review)
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
  
    const [businessname, setBusinessName] = useState("");
    const dispatch = useDispatch();
    

    const { business } = useSelector((state) => state.business);
    const array = Array.isArray(business) ? business[0] : business;

   

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);

    const debouncedSearch = debounce((value) => {
  dispatch(getBusinessFilter({ name: value }));
}, 300);
    
  return (
    <div>
          <Container >
              

              <div>
    <Formik
      initialValues={{
        rating: 0,
        comment: "",
        images: [],
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // console.log("Submitting values:", values);
        const formData = new FormData();
        for (let key in values) {
          if (key === "images") {
            if (Array.isArray(values.images)) {
              values.images.forEach((file) => formData.append("images", file));
            } else {
              formData.append("images", values.images);
            }
          } else {
            formData.append(key, values[key]);
          }
        }
        // console.log("FormData keys:", [...formData.keys()]);

        dispatch(addReview({ _id: array?._id, formData: formData }))
          .then(() => {
            console.log("Review added");
            resetForm();
          })
          .catch((err) => {
            console.error("Dispatch failed:", err);
          });

        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
              <Form onSubmit={handleSubmit}>
                    
                <div className=''>
                   <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <MuiAlert  sx={{ width: '100%' }} variant="filled">
                      {savedmsg}
                    </MuiAlert>
                  </Snackbar>
                                  
                                  <Row className='flex  items-center justify-content-center m-lg-5 pl-4 p-2' xs={1} lg={2}>
                  <Col>
                        <h3>Find A Business to Review </h3>
                    <p>Review anything from your favorite restuarants to your favorite gym.</p>

                      <div className='flex items-center relative w-full max-w-md'>
                          <BsForm.Control
                  type="search"
                          autoComplete="off"
                          autoFocus
                   placeholder="business name,things to do, nail salons, plumbers"
              aria-label="Search"
                                                  className='w-[150px]'
                                                   value={businessname}
                    onChange={(e) =>{ const value = e.target.value;
    setBusinessName(value);
    debouncedSearch(value);}}
                                              />
                                              <Button className='p-2 m-2' onClick={() => {
                            dispatch(getBusinessFilter({ name: businessname }));
                                              }}><IoIosSearch className='text-xl'/></Button>


                                          </div>
                                          
                                              {Array.isArray(business) && business.length > 0 && (
  <ul className=" bg-white border mt-1 z-10 w-full rounded shadow max-h-100 overflow-auto">
    {business.slice(0,5).map((item) => (
      <li
        key={item._id}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
             onClick={() => {
            setBusinessName(item.name); // ✅ Sets selected business name in input
          }}
      >
        {item.name}
      </li>
    ))}
  </ul>
)}
                  </Col>

                  <Col>
                      <img src='/rating.jpg' className='w-3/4 h-3/4 rounded-all' alt='Write a review' />
                  </Col>
                </Row>
         
                                  
                                  <div className='m-lg-5 p-lg-3 p-2'>  <h4> Write a review:</h4> 
            <p className='font-sans'>How Would you rate your experience ? </p>
                                       <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
              <Rating
                name="rating"
                value={values.rating}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setFieldValue("rating", newValue);
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                sx={{ fontSize: "2rem" }}
                emptyIcon={
                  <StarIcon xs={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
                                      </Box>
                                      

            <label for="comment" className="font-semibold p-2">
              Tell us about your experience :
            </label>
            
            <div className="w-full max-w-3xl">
  <textarea
    name="comment"
    value={values.comment}
    onChange={handleChange}
    onBlur={handleBlur}
    id="comment"
    rows={6}
    className="w-full border-2 border-black text-lg p-3"
    placeholder="Your comment here..."
  ></textarea>
</div>

           

            <input
              id="files"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const event = {
                  target: {
                    name: "images",
                    value: files,
                  },
                };
                handleChange(event);
              }}
              style={{ display: "none" }}
            />
            <div className="flex gap-4 items-center mt-3">
              <label
                htmlFor="files"
                className="text-red-600 border-2 border-red-600 rounded text-sm mt-2 flex items-center gap-2 p-2 w-32"
              >
                <TiCamera className="text-red-600 text-2xl" /> Add Photo
              </label>

              {/* Optional: Show number of selected images */}
              {values.images.length > 0 && (
                <div className="text-sm mt-1 text-gray-600 ">
                  {values.images.length} image(s) selected
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 mt-2 px-3 border-2 border-red-600 text-red-600 rounded"
              >
                Submit Review
              </button>
            </div>

     </div>
        
          </div>
        </Form>
      )}
    </Formik>
              </div>
              

      </Container>
    </div>
  )
}

export default WriteAReview
