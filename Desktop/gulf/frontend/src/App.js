import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from "../src/pages/Home/Home.jsx";
import Admin from './pages/Admin';
import Login from './components/Login';


import FrontOffice from './pages/FrontOffice';

const theme = createTheme();

const App = () => {
  return (
    
    <ThemeProvider theme={theme}>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Admin" element={<Admin />} />
        
        <Route path="/FrontOffice" element={<FrontOffice />} />        

        {/* Add more routes as needed */}
      </Routes>
    </Router>

    </ThemeProvider>

  );
};

export default App;
