import React from 'react';
import { Field, ErrorMessage } from 'formik';

const TableRow = ({ testName, namePrefix, unitsPlaceholder, rangePlaceholder }) => (
  <tr>
    <td>{testName}</td>
    <td><Field name={`${namePrefix}.value`} type="number" /></td>
    
    {/* Conditionally render the units column */}
    {unitsPlaceholder && (
      <td><Field name={`${namePrefix}.units`} type="text" placeholder={unitsPlaceholder} /></td>
    )}
    
    <td><Field name={`${namePrefix}.status`} type="text" placeholder="Normal/Low/High" /></td>
    <td><Field name={`${namePrefix}.range`} type="text" placeholder={rangePlaceholder} /></td>
    <ErrorMessage name={`${namePrefix}.value`} component="div" className="error" />
  </tr>
);

export default TableRow;
