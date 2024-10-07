import React, { useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Typography, Container, Grid, Box } from '@mui/material';
import Webcam from 'react-webcam'; // For live capture
import { Formik, Form, Field } from 'formik';
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
  const { updatePatientData } = usePatient(); // Access context

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await submitPatientData(values);
      updatePatientData({ personalDetails: values });
      alert('Patient details submitted successfully');
    } catch (error) {
      alert('Error submitting patient details');
    } finally {
      setSubmitting(false);
    }
  };

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
  const renderPhotoInput = (setFieldValue, photo) => (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box
        border={1}
        borderColor="gray"
        p={2}
        mt={2}
        width={200}
        height={250}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        overflow="hidden"
      >
        {photo ? (
          <img
            src={photo}
            alt="Patient"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
        ) : (
          <Typography variant="body1" color="textSecondary">No Photo Uploaded</Typography>
        )}
        {photo && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setFieldValue('photo', '')}
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent background
            }}
          >
            Remove
          </Button>
        )}
      </Box>
      <label style={{ marginTop: '10px' }}>Upload Photo: </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const photoURL = URL.createObjectURL(file);
            setFieldValue('photo', photoURL);
          }
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setShowWebcam(!showWebcam)}
        style={{ marginTop: '10px',
        backgroundColor: 'teal',
        color: 'white'
         }}
      >
        {showWebcam ? 'Hide Webcam' : 'Take Live Picture'}
      </Button>
      {showWebcam && (
        <Box mt={2}>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
            onClick={() => {
              const imageSrc = captureImage();
              setFieldValue('photo', imageSrc);
            }}
          >
            Capture
          </Button>
        </Box>
      )}
    </Box>
  );
  
  // Define form structure with two-column layout
  const renderFields = (setFieldValue) => {
    switch (medicalType) {
      // Fields for MAURITIUS, MEDICAL, FM
      case 'MAURITIUS':
      case 'MEDICAL':
      case 'FM':
        return (
          <Grid container spacing={2}>
            {/* Left Column for Form Inputs */}
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field name="name" component={FormikTextField} label="Name" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="passportNumber" component={FormikTextField} label="Passport Number" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="issuingCountry" component={FormikTextField} label="To Issuing Country" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="occupation" component={FormikTextField} label="Occupation" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="recruitingAgency" component={FormikTextField} label="Recruiting Agency" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="sex" component={FormikTextField} label="Sex" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="height" component={FormikTextField} label="Height (cm)" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="weight" component={FormikTextField} label="Weight (kg)" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="age" component={FormikTextField} label="Age" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="illnessHistory" component={FormikTextField} label="History of Past Illness" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="allergy" component={FormikTextField} label="Allergy" />
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column for Photo Upload */}
            <Grid item xs={4}>
              {renderPhotoInput(setFieldValue)}
            </Grid>
          </Grid>
        );

      // Fields for SM-VDRL and NORMAL
      case 'SM-VDRL':
      case 'NORMAL':
        return (
          <Grid container spacing={2}>
            {/* Left Column for Form Inputs */}
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field name="name" component={FormikTextField} label="Name" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="passportNumber" component={FormikTextField} label="Passport Number" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="age" component={FormikTextField} label="Age" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="sex" component={FormikTextField} label="Sex" />
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column for Photo Upload */}
            <Grid item xs={4}>
              {renderPhotoInput(setFieldValue)}
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
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
              onChange={(e) => handleMedicalTypeChange(e)}
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
              <Box display="flex" justifyContent="center" marginTop="20px">
              <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: 'teal', 
                color: 'white', // Text color
                marginTop: '20px',
                padding: '10px 20px', // Padding for the button
              }}
              >
                Submit
              </Button>
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FrontOffice;
