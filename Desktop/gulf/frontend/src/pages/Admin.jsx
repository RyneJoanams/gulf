// src/components/AdminDashboard.js
import React from 'react';
import { Typography, Container } from '@mui/material';
import { usePatient } from '../context/PatientContext';

const AdminDashboard = () => {
  const { patientData } = usePatient();

  return (
    <Container>
      <Typography variant="h4" align="center">Admin Dashboard</Typography>
      <Typography variant="h6">Patient Name: {patientData?.personalDetails?.name || 'No data'}</Typography>
      <Typography variant="h6">Payment Status: {patientData.paymentStatus || 'Not completed'}</Typography>
      <Typography variant="h6">Lab Number: {patientData.labNumber || 'Not assigned'}</Typography>
      <Typography variant="h6">Test Results: {patientData.testResults || 'Not available'}</Typography>
      <Typography variant="h6">Clinical Remarks: {patientData.clinicalRemarks || 'Not provided'}</Typography>
      <Typography variant="h6">Flow Completed: {patientData.flowCompleted ? 'Yes' : 'No'}</Typography>
    </Container>
  );
};

export default AdminDashboard;
