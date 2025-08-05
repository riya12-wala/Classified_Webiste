import React, { useContext, useState } from "react";
import { multiStepContext } from "./ContextStore";
import { Button } from "@mui/material";
import { addBusiness } from "../../redux/store/actions/business-action";
import { useSelector ,useDispatch} from "react-redux";
import { Formik, Form } from "formik";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";
import { Row,Col } from "react-bootstrap";
import photo from './business_addphot_2x_new.webp'
import { TiCamera } from "react-icons/ti";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function UploadImages({ handleBack,handleReset }) {

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.business);
  
  const [open, setOpen] = useState(false);
 useEffect(() => {
   if (error) {
     setOpen(true);
     const timer = setTimeout(() => {
       setOpen(false);
     }, 6000); // hide after 3 seconds
 
     return () => clearTimeout(timer);
   }
 }, [error]);
  
  const navigate = useNavigate();

  const { businessData, setBusinessData } = useContext(multiStepContext);
  const [fileNames, setFileNames] = useState([]);

  const [uploadDoc, setUploadDoc] = useState([]);

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setFileNames((prev) => [...prev, ...files]);
    setBusinessData(prev => ({
      ...prev,
      images: files,
    }));
  };
  const photoInputRef = useRef(null);
  const docInputRef = useRef(null);

  const handleDoc = (e) => {
    const files = Array.from(e.target.files);
    setUploadDoc((prev) => [...prev, ...files]);
    setBusinessData(prev => ({
      ...prev,
      menu: files,
    }));
  };


  return (
     <>

    <Snackbar
  open={open}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  autoHideDuration={4000}
  onClose={() => setOpen(false)}
  sx={{
    mt: 2, // margin from top
  }}
>
  <MuiAlert
    onClose={() => setOpen(false)}
    severity="success" // or "error", "warning", "info"
    variant="filled"
    sx={{
      width: '100%',
      fontSize: '1rem',
      fontWeight: '500',
      bgcolor: '#4caf50', // custom green (override MUI success)
      color: '#fff',
      borderRadius: '10px',
      boxShadow: 4, // elevation
    }}
  >
    {error || "Business added successfully!"}
  </MuiAlert>
</Snackbar>

    <Formik
      initialValues={{ file: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(true);
          const formData = new FormData();

          for (let key in businessData) {
            if (key === "images") {
              businessData.images.forEach((file) => {
                formData.append("images", file);
              });
            } else if (key === "menu") {
              businessData.menu.forEach((file) => {
                formData.append("menu", file);
              });
              
            }
               else if (Array.isArray(businessData[key]) || typeof businessData[key] === "object") {
    formData.append(key, JSON.stringify(businessData[key])); // 👈 fix here
  } 
            else {
              formData.append(key, businessData[key]);
            }
          }        
          dispatch(addBusiness(formData)).unwrap().then((res) => {
            navigate('/addbusiness')
          }).catch((err) => {
            console.log("Something Went Wrong",err)
          })

          handleReset();
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
        
          <Form onSubmit={handleSubmit}>
          <Row className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center" lg={2} xs={1}>
                         <Col className="flex justify-center items-center p-0 g-0">
                           <img
                             src={photo}
                             alt="contact_image"
                             srcset=""
                             className="w-1/2  ml-5"
                           />
                         </Col>
            <Col className="space-y-4 p-lg-4">
              <div >
                <h5>Add Photos</h5>
                <p>Upload images of your business to look authentic</p>
                  <div className="flex gap-3">
                     <input
              id="file"
              name="file"
              type="file"
              accept="image/*"
                  multiple
                  ref={photoInputRef}
                  onChange={handleFile}
                  style={{display:'none'}}
            />
             <div
                  className="w-[120px] h-[120px] border border-dotted border-blue-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <TiCamera className="text-blue-500 text-3xl" />
                  <p className="text-blue-500 text-sm mt-2">Add Photo</p>
                </div>
            
                   <input
              id="files"
                  name="image"
                  ref={docInputRef}
              type="file"
              accept="image/*"
              multiple
                  onChange={handleDoc}
                  style={{display:'none'}}
                />
                  <div
                  className="w-[120px] h-[120px] border border-dotted border-blue-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => docInputRef.current?.click()}
                >
                  <TiCamera className="text-blue-500 text-3xl" />
                  <p className="text-blue-500 text-sm mt-2 text-center">Add Brochures / Menu</p>
                </div>
           </div>


<div style={{ marginTop: "10px", display: "flex", gap: "10px" ,flexWrap:'wrap'}}>
{(businessData.images || [] && (businessData.menu || [])).map((file, index) => {
  const src =
    file instanceof File ? URL.createObjectURL(file) : file;

  return (
    <img
      key={index}
      src={src}
      alt="preview"
      width={100}
      height={100}
      style={{
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  );
})}
                  </div>
                  


           

            
           


{/* <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
{).map((file, index) => {
  const src =
    file instanceof File ? URL.createObjectURL(file) : file;

  return (
    <img
      key={index}
      src={src}
      alt="preview"
      width={100}
      height={100}
      style={{
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  );
})}
            </div> */}
         

                  <div className="space-x-3 flex py-3">
                                     <Button
                                      variant="contained"
                                        onClick={handleBack}
                                        className="w-1/2 bg-black"
                                    >
                                      Back
                                    </Button>
                                    <Button variant="contained"  type="Submit" className="w-1/2 bg-red-600" disabled={isSubmitting}>
                                      Finish
                                    </Button>
                                    </div>

         
            
              
         
        </div>
            </Col>
</Row>
      </Form>
  )
}
      </Formik>
      </>
  );
}

export default UploadImages;
