// src/components/Clinical.js
import React, { useState } from 'react';
import { Typography, TextField, Button, Container } from '@mui/material';
import { usePatient } from '../context/PatientContext';

const Clinical = () => {
  const { patientData, updatePatientData } = usePatient();
  const [clinicalRemarks, setClinicalRemarks] = useState('');

  const handleSubmitRemarks = () => {
    updatePatientData({ clinicalRemarks, flowCompleted: true });
    alert('Clinical remarks submitted and flow completed.');
  };

  if (!patientData.testResults) {
    return <Typography>No test results available. Please go to Lab first.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center">Clinical Review</Typography>
      <Typography variant="h6">Test Results: {patientData.testResults}</Typography>

      <TextField
        label="Enter Clinical Remarks"
        multiline
        fullWidth
        rows={4}
        value={clinicalRemarks}
        onChange={(e) => setClinicalRemarks(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmitRemarks}
      >
        Submit Remarks
      </Button>
    </Container>
  );
};

export default Clinical;
