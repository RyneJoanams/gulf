import React, { useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Typography, Container } from '@mui/material';
import Webcam from 'react-webcam'; // For live capture
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';

// Validation Schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  passportNumber: Yup.string().required('Passport number is required'),
  age: Yup.number().required('Age is required').positive().integer(),
  height: Yup.number().min(50, 'Invalid height').max(250, 'Invalid height'),
  weight: Yup.number().min(20, 'Invalid weight').max(200, 'Invalid weight'),
  date: Yup.date().required('Date is required'),
  sex: Yup.string().required('Sex is required'),
});

const medicalTypes = ['MAURITIUS', 'SM-VDRL', 'MEDICAL', 'FM', 'NORMAL'];

const FrontOffice = () => {
  const [medicalType, setMedicalType] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = React.useRef(null);

  // Capture image from webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  };

  // Handle medical type selection
  const handleMedicalTypeChange = (e) => {
    setMedicalType(e.target.value);
  };

  // Render photo input fields (upload + webcam)
  const renderPhotoInput = (setFieldValue) => (
    <div style={{ marginTop: '20px' }}>
      <label>Upload Photo: </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFieldValue('photo', URL.createObjectURL(e.target.files[0]))}
      />
      <br />
      <Button variant="outlined" color="primary" onClick={() => setShowWebcam(!showWebcam)}>
        {showWebcam ? 'Hide Webcam' : 'Take Live Picture'}
      </Button>
      {showWebcam && (
        <div style={{ marginTop: '10px' }}>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" /> 
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
            onClick={() => setFieldValue('photo', captureImage())}
          >
            Capture
          </Button>
        </div>
      )}
    </div>
  );

  // Define form structure based on medical type
  const renderFields = (setFieldValue) => {
    switch (medicalType) {
      
      case 'MAURITUS':
        return (
          <>
            <Field name="name" label="Name" component={TextField} fullWidth margin="normal" />
            <Field name="passportNumber" label="Passport Number" component={TextField} fullWidth margin="normal" />
            <Field name="issuingCountry" label="To Issuing Country" component={TextField} fullWidth margin="normal" />
            <Field name="occupation" label="Occupation" component={TextField} fullWidth margin="normal" />
            <Field name="recruitingAgency" label="Recruiting Agency" component={TextField} fullWidth margin="normal" />
            <Field name="sex" label="Sex" component={TextField} fullWidth margin="normal" />
            <Field name="height" label="Height" component={TextField} fullWidth margin="normal" />
            <Field name="weight" label="Weight" component={TextField} fullWidth margin="normal" />
            <Field name="age" label="Age" component={TextField} fullWidth margin="normal" />
            {renderPhotoInput(setFieldValue)}
            </>
        );

        case 'MEDICAL':
        case 'FM':
          return(
            <>
            <Field name="name" label="Name" component={TextField} fullWidth margin="normal" />
            <Field name="passportNumber" label="Passport Number" component={TextField} fullWidth margin="normal" />
            <Field name="issuingCountry" label="To Issuing Country" component={TextField} fullWidth margin="normal" />
            <Field name="occupation" label="Occupation" component={TextField} fullWidth margin="normal" />
            <Field name="recruitingAgency" label="Recruiting Agency" component={TextField} fullWidth margin="normal" />
            <Field name="sex" label="Sex" component={TextField} fullWidth margin="normal" />
            <Field name="height" label="Height" component={TextField} fullWidth margin="normal" />
            <Field name="weight" label="Weight" component={TextField} fullWidth margin="normal" />
            <Field name="age" label="Age" component={TextField} fullWidth margin="normal" />
            <Field name="illnessHistory" label="History of past Illness" component={TextField} fullWidth margin="normal" />
            <Field name="allergy" label="Allergy" component={TextField} fullWidth margin="normal" />  
            {renderPhotoInput(setFieldValue)}
            </>
          );

      case 'SM-VDRL':
      case 'NORMAL':
        return (
          <>
            <Field name="name" label="Name" component={TextField} fullWidth margin="normal" />
            <Field name="age" label="Age" component={TextField} fullWidth margin="normal" />
            <Field name="sex" label="Sex" component={TextField} fullWidth margin="normal" />
            <Field name="passportNumber" label="Passport Number" component={TextField} fullWidth margin="normal" />
            {renderPhotoInput(setFieldValue)}
          </>
        );
      default:
        return null;
    }
  };

  // Form submission handler
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form data:', values);
    // Simulate async operation
    setTimeout(() => {
      setSubmitting(false);
      alert('Form submitted successfully');
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Patient Intake Form
      </Typography>
      <Formik
        initialValues={{
          name: '',
          passportNumber: '',
          issuingCountry: '',
          occupation: '',
          recruitingAgency: '',
          sex: '',
          height: '',
          weight: '',
          age: '',
          date: '',
          illnessHistory: '',
          allergy: '',
          photo: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Field
              name="medicalType"
              label="Select Medical Type"
              select
              component={TextField}
              fullWidth
              margin="normal"
              value={medicalType}
              onChange={handleMedicalTypeChange}
            >
              {medicalTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>

            {medicalType && renderFields(setFieldValue)}

            {isSubmitting ? (
              <CircularProgress style={{ marginTop: '20px' }} />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
              >
                Submit
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FrontOffice;

