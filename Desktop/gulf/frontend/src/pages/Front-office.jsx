import React, { useState } from 'react';

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
    // Send patient data to backend (via fetch/axios)
  };

  return (
    <div>
      <h2>Front Office: Capture Patient Info</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={patientData.name} onChange={handleChange} />
        </label>

        <label>
          Age:
          <input type="number" name="age" value={patientData.age} onChange={handleChange} />
        </label>

        <label>
          Medical Type:
          <select name="medicalType" value={patientData.medicalType} onChange={handleChange}>
            <option value="general">NORMAL</option>
            <option value="mauritius">MAURITIUS</option>
            <option value="fm">FM</option>
            <option value="sm-vdrl">SM-VDRL</option>
            <option value="medical">MEDICAL</option>
          </select>
        </label>
        <label>
          Upload Photo:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FrontOffice;
