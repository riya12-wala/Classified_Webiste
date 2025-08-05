import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBusiness } from "../../redux/store/actions/business-action";
import { resetForm } from "../../redux/store/slice/business-slice";

import BusinessDetails from "./BusinessDetails";
import ContactDetails from "./ContactDetails";
import SelectTimings from "./SelectTimings";
import Businesscategory from "./Businesscategory";
import UploadImages from "./UploadImages";
import { multiStepContext } from "./ContextStore";
import MiscenallousDetails from "./MiscenallousDetails";

// ✅ ADD THIS
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const steps = [
  "Enter Your Business Address",
  "Add Contact Details",
  "Add business Timings",
  "Add Business category",
  "Additional  Details",
  "Add Photos",
];

function AddYourBusiness() {
  const theme = useTheme(); // ✅ Theme for breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <600px is "sm"

  const { businessData, setBusinessData } = React.useContext(multiStepContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const dispatch = useDispatch();

  const isStepOptional = (step) => {
    return step >= 0 && step <= 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (values) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
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
    dispatch(resetForm());
    setBusinessData("");
  };

  return (
    <div className="p-lg-4 p-2">
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={activeStep}
          orientation={isSmallScreen ? "vertical" : "horizontal"} // ✅ Responsive!
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
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

        <Box sx={{ mt: 5 }}>
          {activeStep === 0 && <BusinessDetails handleNext={handleNext} />}
        </Box>
        <Box sx={{ mt: 3 }}>
          {activeStep === 1 && (
            <ContactDetails handleNext={handleNext} handleBack={handleBack} />
          )}
        </Box>
        <Box sx={{ mt: 3 }}>
          {activeStep === 2 && (
            <SelectTimings handleNext={handleNext} handleBack={handleBack} />
          )}
        </Box>
        <Box sx={{ mt: 3 }}>
          {activeStep === 3 && (
            <Businesscategory handleNext={handleNext} handleBack={handleBack} />
          )}
        </Box>
        <Box sx={{ mt: 3 }}>
          {activeStep === 4 && (
            <MiscenallousDetails
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}
        </Box>
        <Box sx={{ mt: 3 }}>
          {activeStep === 5 && (
            <UploadImages
              handleBack={handleBack}
              handleNext={handleNext}
              handleReset={handleReset}
            />
          )}
        </Box>

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

export default AddYourBusiness;
