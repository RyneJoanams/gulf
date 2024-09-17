import React, { useState } from 'react';
import './Front-Office.css'; // Import the CSS file for styles

const FrontOffice = () => { 
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    medicalType: '',
    photo: null,
  });

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setPatientData({
      ...patientData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send patient data to the backend using fetch/axios
    console.log(patientData);
  };

  return (
    <div className="container">
      <h2>Front Office: Capture Patient Info</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            name="name" 
            value={patientData.name} 
            onChange={handleChange} 
            placeholder="Enter patient name" // Add placeholder
          />
        </label>

        <label>
          Age:
          <input 
            type="number" 
            name="age" 
            value={patientData.age} 
            onChange={handleChange} 
            placeholder="Enter patient age" // Add placeholder
          />
        </label>

        <label>
          Medical Type:
          <select 
            name="medicalType" 
            value={patientData.medicalType} 
            onChange={handleChange}
          >
            <option value="">Select medical type</option> {/* Add a default option */}
            <option value="general">NORMAL</option>
            <option value="mauritius">MAURITIUS</option>
            <option value="fm">FM</option>
            <option value="sm-vdrl">SM-VDRL</option>
            <option value="medical">MEDICAL</option>
          </select>
        </label>

        <label>
          Upload Photo:
          <input 
            type="file" 
            onChange={handleFileChange} 
          />
        </label>

        {/* Show image preview */}
        {patientData.photo && (
          <div>
            <img 
              src={URL.createObjectURL(patientData.photo)} 
              alt="Uploaded Preview" 
            />
          </div>
        )}
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FrontOffice;
