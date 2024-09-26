import React, { useState } from 'react';
import { Typography, TextField, Button, Container } from '@mui/material';
import { usePatient } from '../context/PatientContext';

const Lab = () => {
  const { patientData, updatePatientData } = usePatient();
  const [testResults, setTestResults] = useState('');

  const handleTestResultsSubmit = () => {
    updatePatientData({ testResults });
    alert('Test results submitted');
  };

  if (!patientData.labNumber) {
    return <Typography>No lab number assigned. Please go to Phlebotomy first.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center">Lab Tests</Typography>
      <Typography variant="h6">Lab Number: {patientData.labNumber}</Typography>

      <TextField
        label="Enter Test Results"
        multiline
        fullWidth
        rows={4}
        value={testResults}
        onChange={(e) => setTestResults(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleTestResultsSubmit}
      >
        Submit Test Results
      </Button>
    </Container>
  );
};

export default Lab;
