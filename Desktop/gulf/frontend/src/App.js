import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../src/pages/Home/Home.jsx";
import FrontOffice from './pages/Front-office';
import Accounts from './pages/Accounts';
import Phlebotomy from './pages/Phlebotomy';
import Lab from './pages/Lab';
import Clinical from './pages/Clinical';
import Admin from './pages/Admin';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/front-office" element={<FrontOffice />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/phlebotomy" element={<Phlebotomy />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/clinical" element={<Clinical />} />
        <Route path="/admin" element={<Admin />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
