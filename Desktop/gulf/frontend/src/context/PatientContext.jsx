// src/context/PatientContext.js
import React, { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState({
    personalDetails: null,   // Front Office
    paymentStatus: null,     // Accounts Office
    amountDue: null,         // Amount due (from Accounts)
    amountPaid: null,        // Amount paid (from Accounts)
    labNumber: null,         // Phlebotomy lab number
    testResults: null,       // Lab test results
    clinicalRemarks: null,   // Clinical remarks
    flowCompleted: false,    // Tracking if the flow is complete
  });

  const updatePatientData = (newData) => {
    setPatientData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <PatientContext.Provider value={{ patientData, updatePatientData }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
