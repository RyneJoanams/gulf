import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DepartmentSelection() {
  const [ setSelectedDepartment] = useState('');
  const navigate = useNavigate();

  const handleDepartmentSelection = (department) => {
    setSelectedDepartment(department);
    // Navigate to login page with the selected department passed as state
    navigate('/login', { state: { department } });
  };

  return (
    <div>
      <h1>Select Your Department</h1>
      <ul>
        <li>
          <button onClick={() => handleDepartmentSelection('Front-office')}>
            Front Office
          </button>
        </li>
        <li>
          <button onClick={() => handleDepartmentSelection('Accounts')}>
            Accounts
          </button>
        </li>
        <li>
          <button onClick={() => handleDepartmentSelection('Phlebotomy')}>
            Phlebotomy
          </button>
        </li>
        <li>
          <button onClick={() => handleDepartmentSelection('Laboratory')}>
            Laboratory
          </button>
        </li>
        <li>
          <button onClick={() => handleDepartmentSelection('Clinical')}>
            Clinical
          </button>
        </li>
        <li>
          <button onClick={() => handleDepartmentSelection('Admin')}>
            Admin
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DepartmentSelection;
