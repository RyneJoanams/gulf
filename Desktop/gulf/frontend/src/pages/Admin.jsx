import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Chip, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress } from '@mui/material';
import { usePatient } from '../context/PatientContext';
//import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Admin = () => {
  const { patientData } = usePatient() || {};
  const [searchQuery, setSearchQuery] = useState('');

  // Sample chart data for patient flow stages (for visualization)
  /*
  const chartData = {
    labels: ['Front Office', 'Accounts', 'Phlebotomy', 'Lab', 'Clinical'],
    datasets: [
      {
        label: 'Completion Progress',
        data: [20, 40, 60, 80, 100], // Change this dynamically based on patientData
        fill: true,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgba(0, 123, 255, 1)',
      },
    ],
  }; */

  // Search functionality for filtering patients
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtering logic (just an example)
  const filteredData = patientData
    ? [patientData].filter((patient) =>
        patient.personalDetails?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Conditional rendering when patientData is loading or empty
  if (!patientData) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6">Loading Patient Data...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Admin Dashboard
      </Typography>

      {/* Search Field */}
      <TextField
        fullWidth
        label="Search by Patient Name"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

      {/* Chart for Visualization */}
      <Card style={{ marginBottom: '30px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Patient Flow Progress Overview
          </Typography>
         {/* <Line data={chartData} />  */}
        </CardContent>
      </Card>

      {/* Patient Table */ }
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Patient Name</strong></TableCell>
              <TableCell><strong>Payment Status</strong></TableCell>
              <TableCell><strong>Lab Number</strong></TableCell>
              <TableCell><strong>Test Results</strong></TableCell>
              <TableCell><strong>Clinical Remarks</strong></TableCell>
              <TableCell><strong>Flow Completed</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.personalDetails?.name || 'N/A'}</TableCell>
                <TableCell>
                  <Chip
                    label={patient.paymentStatus || 'Pending'}
                    color={patient.paymentStatus === 'Paid' ? 'success' : 'warning'}
                  />
                </TableCell>
                <TableCell>{patient.labNumber || 'Not Assigned'}</TableCell>
                <TableCell>{patient.testResults || 'Not Available'}</TableCell>
                <TableCell>{patient.clinicalRemarks || 'Not Provided'}</TableCell>
                <TableCell>
                  <Chip
                    label={patient.flowCompleted ? 'Completed' : 'In Progress'}
                    color={patient.flowCompleted ? 'success' : 'info'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Call to Action Buttons */}
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Button variant="contained" color="primary">
            Generate Report
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">
            Export Data
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin; 
