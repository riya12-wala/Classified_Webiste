import React, { useContext, useState } from "react";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";


import { TiCamera } from "react-icons/ti";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { getBusinessById, updateBusiness } from "../../../redux/store/actions/business-action";
import { resetForm } from "../../../redux/store/slice/business-slice";


function Photo() {

  const { id } = useParams();
  const dispatch = useDispatch();

 
  const {filepath} = useSelector(state =>state.login)
  const {business,error} = useSelector(state=> state.business)
  console.log(business)

  const [fileNames, setFileNames] = useState([]);

  const [uploadDoc, setUploadDoc] = useState([]);

  useEffect(() => {
    dispatch(getBusinessById({id:id}))
  },[dispatch,id])

  const photoInputRef = useRef(null);
  const docInputRef = useRef(null);

  const [open, setOpen] = useState(false);
    
    
    useEffect(() => {
      if (error) {
        setOpen(true);
        const timer = setTimeout(() => {
          setOpen(false);
        }, 5000); // hide after 3 seconds
    
        return () => clearTimeout(timer);
      }
    }, [error]);
    
  

  return (
    <>
        <Snackbar open={open}  autoHideDuration={5000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} message={error}/>
              
               
              
           
      <Formik
      initialValues={{ images: "", menu: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        setTimeout(() => {

          console.log(values.menu)
          setSubmitting(true);
          const formData = new FormData();

          for (let key in values) {
            if (key === "images") {
              values.images.forEach((file) => {
                formData.append("images", file);
              });
            } else if (key === "menu") {
              values?.menu.forEach((file) => {
                formData.append("menu", file);
              });
            } else if (
              Array.isArray(values[key]) ||
              typeof values[key] === "object"
            ) {
              formData.append(key, JSON.stringify(values[key])); // 👈 fix here
            } else {
              formData.append(key, values[key]);
            }
          }
          // console.log(values);
            dispatch(updateBusiness({_id:id,updateData:formData})).unwrap().then((res) => {
              resetForm();
            }).catch((err) => {
              console.log("Something Went Wrong",err)
            })

          setSubmitting(false);
        }, 4000);
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
      }) => (
        <Form>
         
              <div className="border border-gray-300 m-5 p-5">
                
                              <div className="flex gap-4 flex-wrap items-center justify-center">
                                  <div> <input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  ref={photoInputRef}
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const media = files.map((file) => ({
                      file,
                      url: URL.createObjectURL(file),
                      type: file.type.startsWith("image") ? "image" : "video",
                    }));
                    const event = {
                      target: {
                        name: "images",
                        value: files,
                      },
                    };
                    handleChange(event);
                    setFileNames(media);
                  }}
                  style={{ display: "none" }}
                />
                <div
                  className="w-[120px] h-[120px] border border-dotted border-blue-400 rounded-lg flex flex-col  items-center justify-center cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <TiCamera className="text-blue-500 text-3xl" />
                  <p className="text-blue-500 text-sm  text-center p-2">Upload Photos & Videos</p>
                                      </div>
                                      
                                  </div>
                                 
               <div> <input
                  id="menu"
                  name="menu"
                  ref={docInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  onChange={(e) => {
  const files = Array.from(e.target.files); // ⬅️ only File[]
  const preview = files.map((file) => ({
    url: file.type.startsWith("image") ? URL.createObjectURL(file) : null,
    type: file.type,
    name: file.name,
  }));

  // Store File[] in Formik for FormData
  handleChange({
    target: {
      name: "menu",
      value: files,
    },
  });

  // Store preview data for UI only
  setUploadDoc(preview);
}}

                  style={{ display: "none" }}
                />
                <div
                  className="w-[120px] h-[120px] border border-dotted border-blue-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => docInputRef.current?.click()}
                >
                  <TiCamera className="text-blue-500 text-3xl" />
                  <p className="text-blue-500 text-sm mt-2">Add Brochures</p>
                                      </div>

                                  </div>
</div>
               
                <div className="flex flex-wrap gap-4">
  {[...fileNames, ...uploadDoc].map((media, index) => (
    <div
      key={index}
      className="w-[200px] h-[150px] border rounded overflow-hidden flex items-center justify-center bg-gray-100"
    >
      {media.type.startsWith("image") ? (
        <img
          src={media.url}
          alt="preview"
          className="w-full h-full object-cover"
        />
      ) : media.type.startsWith("video") ? (
        <video
          controls
          className="w-full h-full object-cover"
        >
          <source src={media.url} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-sm px-2 text-center break-words">
          📄 {media.name}
        </p>
      )}
    </div>
  ))}
            </div>
            

            {/* <div>
              {
                business.images.map((e,i) => (
                    <img src={`${filepath}/${e}`} alt="" srcset="" />
                  ))
              }
            </div>
            */}
                <div className="space-x-3 flex py-3 text-center">
                  <button
                    variant="contained"
                    type="submit"
                    className="p-2 px-4 text-white bg-blue-500"
                    disabled={isSubmitting}
                  >
                    Finish
                  </button>
                      </div>
                      



              </div>
           
        </Form>
      )}
    </Formik>
    </>
  );
}

export default Photo;
