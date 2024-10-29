import React from 'react';
import { Field, ErrorMessage } from 'formik';

const TableRow = ({ testName, namePrefix, unitsPlaceholder, rangePlaceholder, disabled }) => {
  return (
    <tr>
      <td>{testName}</td>
      <td>
        <Field name={`${namePrefix}.value`} type="text" placeholder="Enter Value" disabled={disabled} />
        <ErrorMessage name={`${namePrefix}.value`} component="div" className="error" />
      </td>
      
      {/* Conditionally render the Units column */}
      {unitsPlaceholder && (
        <td>{unitsPlaceholder}</td>
      )}
      
      <td>
        <Field name={`${namePrefix}.status`} as="select" disabled={disabled}>
          <option value="">Select Status</option>
          <option value="normal">Normal</option>
          <option value="abnormal">Abnormal</option>
        </Field>
        <ErrorMessage name={`${namePrefix}.status`} component="div" className="error" />
      </td>
      
      <td>{rangePlaceholder}</td>
    </tr>
  );
};
export default TableRow;
