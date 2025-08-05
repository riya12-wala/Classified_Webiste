import { Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  getReviewByBusiness,
} from "../../../../redux/store/actions/review-action";

import { TiCamera } from "react-icons/ti";
import { Formik, Form } from "formik";
import RecentActivityCard from "../recentactivity/RecentActivityCard";
import StarRating from "../../../../component/StarComponent";

function Review() {
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
  const dispatch = useDispatch();

  const { business } = useSelector((state) => state.business);
  const { reviewbyid } = useSelector((state) => state.review);
  const {filepath} = useSelector(state=>state.login)
  // console.log(reviewbyid);

  useEffect(() => {
    dispatch(getReviewByBusiness({id:normal._id,searchQuery: { page: 1, limit: 3 } }));
  }, [dispatch]);

  const normal = Array.isArray(business) ? business[0] : business;

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  return (
    <Formik
      initialValues={{
        rating: 0,
        comment: "",
        images: [],
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
       
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
      

        dispatch(addReview({ _id: normal._id, formData: formData }))
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
          <div>
           <h4> Write a review:</h4> 
            <label for="comment" className="font-semibold p-2">
              Comment :
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

            {
               reviewbyid[normal._id] && reviewbyid[normal._id].length > 0 && (
                reviewbyid[normal._id].map((e) => (
                  <RecentActivityCard src1={`${filepath}/${e.userId.profilePic}`} text2={e.userId.name} text={e.comment} text1={<StarRating rating={e.rating}/>} text3={e.createdAt} images={e.images}/>
                ))
              )
            }
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Review;
