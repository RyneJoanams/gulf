import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PatientProvider } from './context/PatientContext';
import Home from "../src/pages/Home/Home.jsx";
import Admin from './pages/Admin';
import Login from './components/Login';


import FrontOffice from './pages/FrontOffice';
import Accounts from './pages/Accounts';
import Phlebotomy from './pages/Phlebotomy';
import Lab from './pages/Lab';
import Clinical from './pages/Clinical';


const theme = createTheme();
const App = () => {
  return (
    
    <PatientProvider>
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Admin" element={<Admin />} />
        
        <Route path="/FrontOffice" element={<FrontOffice />} /> 
        <Route path="/Accounts" element={<Accounts />} /> 
        <Route path="/Phlebotomy" element={<Phlebotomy />} />
        <Route path="/Lab" element={<Lab />} />
        <Route path="/Clinical" element={<Clinical />} />      
 
        {/* Add more routes as needed */}
      </Routes>
    </Router>

    </ThemeProvider>
    </PatientProvider>
  );
};

export default App;
