import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import PersonalDetails from "./PersonalDetails";
import Address from "./Address";
import Friends from "./Friends";
import Favorites from "./Favorites";
import { multiStepContext } from "../../../AddyourBusiness/ContextStore";
import { Link } from "react-router-dom";


const steps = [
  "Personal Details",
  "Addresses",
  "Family & Friends",
  "Favorites",
];

function UserInfo() {

  const {userInfo,setuserInfo}= React.useContext(multiStepContext)
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const dispatch = useDispatch();

  const isStepOptional = (step) => {
    return step === 0 || step === 1 || step == 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (values) => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
    // setSkipped(newSkipped);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    // dispatch(resetForm());
    setuserInfo('')
  };


 

  return (
    <div className="p-3">
        <Box>
       
        <div className="flex  bg-grey-100">
        <div>
        <Stepper activeStep={activeStep} orientation="vertical"  className="w-64 p-5 ">
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
           </div>
        <div className="w-full bg-gray-100 p-3 ">
        <Box sx={{ mt: 5 }}>{activeStep === 0 &&  <PersonalDetails handleNext={handleNext}  />}</Box>
<Box sx={{ mt: 3 }}>{activeStep === 1 && <Address handleNext={handleNext} handleBack={handleBack}/>}</Box>
<Box sx={{ mt: 3 }}>{activeStep === 2 && <Friends handleNext={handleNext} handleBack={handleBack}/>}</Box>
 <Box sx={{ mt: 3 }}>{activeStep === 3 && <Favorites handleBack={handleBack} handleNext={handleNext} handleReset={handleReset} />}</Box>
  </div>
     </div>
           
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
        
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>    
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
          
          </Box>
        </React.Fragment>
      )}
    </Box>
  </div>
  );
}

export default UserInfo;
