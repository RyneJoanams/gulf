import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../src/pages/Home/Home.jsx";
import Admin from './pages/Admin';
import Login from './components/Login';
import DepartmentSelection from './components/DepartmentSelection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/DepartmentSelection" element={<DepartmentSelection />} />
        <Route path="/admin" element={<Admin />} />

        {/* If DepartmentSelection is not used as a page, remove its route */}
        {/* <Route path="/DepartmentSelection" element={<DepartmentSelection />} /> */}

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
