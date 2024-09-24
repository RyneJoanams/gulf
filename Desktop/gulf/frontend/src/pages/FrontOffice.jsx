import React, { useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Typography, Container } from '@mui/material';
import Webcam from 'react-webcam'; // For live capture
import { Formik, Form, Field,  } from 'formik';
import * as Yup from 'yup';
import { usePatient } from '../context/PatientContext.jsx';
import { submitPatientData } from '../api/patientApi';

// Validation Schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  passportNumber: Yup.string().required('Passport number is required'),
  age: Yup.number().required('Age is required').positive().integer(),
  height: Yup.number().min(50, 'Invalid height').max(250, 'Invalid height'),
  weight: Yup.number().min(20, 'Invalid weight').max(200, 'Invalid weight'),
  date: Yup.date().required('Date is required'),
  sex: Yup.string().required('Sex is required').oneOf(['male', 'female'], 'Invalid sex'),
});

const medicalTypes = ['MAURITIUS', 'SM-VDRL', 'MEDICAL', 'FM', 'NORMAL'];

const FormikTextField = ({ field, form: { touched, errors }, ...props }) => (
  <TextField
    {...field}
    {...props}
    error={touched[field.name] && !!errors[field.name]}
    helperText={touched[field.name] && errors[field.name]}
    fullWidth
    margin="normal"
  />
);


const FrontOffice = () => {
  const [medicalType, setMedicalType] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = React.useRef(null);
  const { updatePatientData } = usePatient(); //access context


  const handleSubmit = async (values, {setSubmitting}) =>{
    try {
      await submitPatientData(values);
      updatePatientData({ personalDetails: values });
      alert('Patient details submitted successfully');
    } catch (error) {
      alert('Error submitting patient details');
    } finally {
      setSubmitting(false);
    }
  }


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
    
        case 'MAURITIUS':
        case 'MEDICAL':
        case 'FM':
          return(
            <>
             <Field name="name" component={FormikTextField} label="Name" />
            <Field name="passportNumber" component={FormikTextField} label="Passport Number" />
            <Field name="issuingCountry" component={FormikTextField} label="To Issuing Country" />
            <Field name="occupation" component={FormikTextField} label="Occupation" />
            <Field name="recruitingAgency" component={FormikTextField} label="Recruiting Agency" />
            <Field name="sex" component={FormikTextField} label="Sex" />
            <Field name="height" component={FormikTextField} label="Height" />
            <Field name="weight" component={FormikTextField} label="Weight" />
            <Field name="age" component={FormikTextField} label="Age" />
            <Field name="illnessHistory" component={FormikTextField} label="History of past Illness" />
            <Field name="allergy" component={FormikTextField} label="Allergy" />
            {renderPhotoInput(setFieldValue)}
            </>
          );

      case 'SM-VDRL':
      case 'NORMAL':
        return (
          <>
             <Field name="name" component={FormikTextField} label="Name" />
            <Field name="age" component={FormikTextField} label="Age" />
            <Field name="sex" component={FormikTextField} label="Sex" />
            <Field name="passportNumber" component={FormikTextField} label="Passport Number" />
            {renderPhotoInput(setFieldValue)}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        PATIENT INTAKE FORM
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
              as={TextField}
              fullWidth
              margin="normal"
              value={medicalType}
              onChange={(e) => handleMedicalTypeChange(e, setFieldValue)}
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

 