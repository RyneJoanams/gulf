// src/components/Accounts.js
import React, { useState } from 'react';
import { Typography, TextField, Button, Container } from '@mui/material';
import { usePatient } from '../context/PatientContext';

const Accounts = () => {
  const { patientData, updatePatientData } = usePatient();
  const [amountDue, setAmountDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');

  const handlePaymentSubmit = () => {
    updatePatientData({ amountDue, amountPaid, paymentStatus: amountPaid >= amountDue ? 'Paid' : 'Pending' });
    alert(`Payment recorded: Due - ${amountDue}, Paid - ${amountPaid}`);
  };

  return (
    <Container>
      <Typography variant="h4" align="center">Accounts Office</Typography>
      <Typography variant="h6">Patient Name: {patientData?.personalDetails?.name || 'No data'}</Typography>

      <TextField
        label="Amount Due"
        fullWidth
        margin="normal"
        value={amountDue}
        onChange={(e) => setAmountDue(e.target.value)}
      />

      <TextField
        label="Amount Paid"
        fullWidth
        margin="normal"
        value={amountPaid}
        onChange={(e) => setAmountPaid(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handlePaymentSubmit}
        style={{ marginTop: '20px' }}
      >
        Record Payment
      </Button>
    </Container>
  );
};

export default Accounts;
