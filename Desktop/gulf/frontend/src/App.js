import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../src/pages/Home/Home.jsx";
import Admin from './pages/Admin';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Admin" element={<Admin />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
