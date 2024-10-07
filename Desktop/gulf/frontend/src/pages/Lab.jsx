import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Lab.css';
import TableRow from '../components/TableRow';  // Reusable table row

const Lab = () => {
  const [bloodGroups, setBloodGroups] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setBloodGroups(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
    }, 1000);
  }, []);

  const initialValues = {
    albumin: '',
    sugar: '',
    microscopic: '', // New field for Urine
  reaction: '', // New field for Urine
  bloodTests: {
    hivTest: '', // New field for Blood
    hbsAg: '',   // New field for Blood
    hcv: '',     // New field for Blood
    esr: '',     // New field for Blood
  },
  generalExamination: {
    hernia: '',         // New field for General Examination
    varicoseVein: '',   // New field for General Examination
    rightEye: '',       // New field for General Examination
    leftEye: '',        // New field for General Examination
  },
  systemicExamination: {
    heart: '',           // New field for Systemic Examination
    bloodPressure: '',   // New field for Systemic Examination
    pulseRate: '',       // New field for Systemic Examination
  },

    fullHaemogram: {
      wbc: { value: '', units: '', status: '', range: '' },
      rbc: { value: '', units: '', status: '', range: '' },
      hgb: { value: '', units: '', status: '', range: '' }
    },
    liverFunction: {
      totalBilirubin: { value: '', status: '', range: '' },
      directBilirubin: { value: '', status: '', range: '' },
      sgot: { value: '', status: '', range: '' },
    },
    renalFunction: {
      urea: { value: '', status: '', range: '' },
      creatinine: { value: '', status: '', range: '' },
    },
    bloodGroup: '',

    // Added Area 1 Fields
    stoolConsistency: '',
    stoolMicroscopy: '',
    tpha: '',
    vdrlTest: '',
    venerealDisease: '',
    pregnancyTest: '',
    typhoid: '',
    hydrocele: '',
    otherDeformities: '',
    earRight: '',
    earLeft: '',
    lungs: '',
    liver: '',
    spleen: '',
  };

  const validationSchema = Yup.object({
    albumin: Yup.string().required('Albumin is required'),
    sugar: Yup.string().required('Sugar is required'),
    microscopic: Yup.string().required('Microscopic is required'), // New field for Urine
  reaction: Yup.string().required('Reaction is required'), // New field for Urine
  bloodTests: Yup.object({
    hivTest: Yup.string().required('HIV Test is required'),
    hbsAg: Yup.string().required('HbsAG is required'),
    hcv: Yup.string().required('HCV is required'),
    esr: Yup.number().required('ESR is required').min(1, 'Invalid ESR'),
  }),
  generalExamination: Yup.object({
    hernia: Yup.string().required('Hernia is required'),
    varicoseVein: Yup.string().required('Varicose Vein is required'),
    rightEye: Yup.string().required('Right Eye is required'),
    leftEye: Yup.string().required('Left Eye is required'),
  }),
  systemicExamination: Yup.object({
    heart: Yup.string().required('Heart status is required'),
    bloodPressure: Yup.string().required('Blood Pressure is required'),
    pulseRate: Yup.string().required('Pulse Rate is required'),
  }),

    fullHaemogram: Yup.object({
      wbc: Yup.object({ value: Yup.number().required('WBC is required') }),
      rbc: Yup.object({ value: Yup.number().required('RBC is required') }),
      hgb: Yup.object({ value: Yup.number().required('HGB is required') }),
    }),
    liverFunction: Yup.object({
      totalBilirubin: Yup.object({ value: Yup.number().required('Total Bilirubin is required') }),
    }),
    urea: Yup.number().required('Urea is required'),
    creatinine: Yup.number().required('Creatinine is required'),
    bloodGroup: Yup.string().required('Blood Group is required'),

    // Added Validation for Area 1 Fields
    stoolConsistency: Yup.string().required('Stool consistency is required'),
    stoolMicroscopy: Yup.string().required('Stool microscopy is required'),
    tpha: Yup.string().required('TPHA is required'),
    vdrlTest: Yup.string().required('VDRL test is required'),
    venerealDisease: Yup.string().required('Venereal disease is required'),
    pregnancyTest: Yup.string().required('Pregnancy test is required'),
    typhoid: Yup.string().required('Typhoid is required'),
    hydrocele: Yup.string().required('Hydrocele is required'),
    otherDeformities: Yup.string().required('Other deformities are required'),
    earRight: Yup.string().required('Right ear status is required'),
    earLeft: Yup.string().required('Left ear status is required'),
    lungs: Yup.string().required('Lung status is required'),
    liver: Yup.string().required('Liver status is required'),
    spleen: Yup.string().required('Spleen status is required'),
  });

  const handleSubmit = (values) => {
    console.log('Submitted data:', values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <h1>Comprehensive Laboratory Examination Report</h1>

          {/* Area 1: Comprehensive Lab Examination */}
          <div className="test-section">
            <h3>Area 1:</h3>
            
            {/* Stool Analysis */}
            <div className="form-group">
              <label>Stool Consistency:</label>
              <Field name="stoolConsistency" type="text" />
              <ErrorMessage name="stoolConsistency" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Stool Microscopy:</label>
              <Field name="stoolMicroscopy" type="text" />
              <ErrorMessage name="stoolMicroscopy" component="div" className="error" />
            </div>

            {/* TPHA and VDRL */}
            <div className="form-group">
              <label>TPHA:</label>
              <Field name="tpha" type="text" />
              <ErrorMessage name="tpha" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>VDRL Test:</label>
              <Field name="vdrlTest" type="text" />
              <ErrorMessage name="vdrlTest" component="div" className="error" />
            </div>

            {/* Venereal Disease */}
            <div className="form-group">
              <label>Venereal Disease:</label>
              <Field name="venerealDisease" type="text" />
              <ErrorMessage name="venerealDisease" component="div" className="error" />
            </div>

            {/* Pregnancy Test, Typhoid, Hydrocele */}
            <div className="form-group">
              <label>Pregnancy Test:</label>
              <Field name="pregnancyTest" type="text" />
              <ErrorMessage name="pregnancyTest" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Typhoid:</label>
              <Field name="typhoid" type="text" />
              <ErrorMessage name="typhoid" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Hydrocele:</label>
              <Field name="hydrocele" type="text" />
              <ErrorMessage name="hydrocele" component="div" className="error" />
            </div>

            {/* Other Deformities, Ear, Lungs, Liver, Spleen */}
            <div className="form-group">
              <label>Other Deformities:</label>
              <Field name="otherDeformities" type="text" />
              <ErrorMessage name="otherDeformities" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Right Ear:</label>
              <Field name="earRight" type="text" />
              <ErrorMessage name="earRight" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Left Ear:</label>
              <Field name="earLeft" type="text" />
              <ErrorMessage name="earLeft" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Lungs:</label>
              <Field name="lungs" type="text" />
              <ErrorMessage name="lungs" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Liver:</label>
              <Field name="liver" type="text" />
              <ErrorMessage name="liver" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Spleen:</label>
              <Field name="spleen" type="text" />
              <ErrorMessage name="spleen" component="div" className="error" />
            </div>
            {/* Blood Group Section */}
          <div className="form-group">
            <label>Blood Group:</label>
            <Field as="select" name="bloodGroup">
              <option value="">Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </Field>
            <ErrorMessage name="bloodGroup" component="div" className="error" />
          </div>
          </div>

          {/* Urine Test Section */}
          <div className="test-section">
            <h3>Urine Test</h3>
            <div className="form-group">
              <label>Albumin:</label>
              <Field name="albumin" type="text" />
              <ErrorMessage name="albumin" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Sugar:</label>
              <Field name="sugar" type="text" />
              <ErrorMessage name="sugar" component="div" className="error" />
            </div>
          
          <div className="form-group">
            <label>Microscopic:</label>
            <Field name="microscopic" type="text" />
            <ErrorMessage name="microscopic" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>Reaction:</label>
            <Field name="reaction" type="text" />
            <ErrorMessage name="reaction" component="div" className="error" />
          </div>
          </div>

        {/* Blood Test Section */}
        <div className="test-section">
          <h3>Blood Test</h3>
          <div className="form-group">
            <label>HIV Test (I, II):</label>
            <Field name="bloodTests.hivTest" type="text" />
            <ErrorMessage name="bloodTests.hivTest" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>HbsAG:</label>
            <Field name="bloodTests.hbsAg" type="text" />
            <ErrorMessage name="bloodTests.hbsAg" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>HCV:</label>
            <Field name="bloodTests.hcv" type="text" />
            <ErrorMessage name="bloodTests.hcv" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>ESR (1st Hour):</label>
            <Field name="bloodTests.esr" type="number" />
            <ErrorMessage name="bloodTests.esr" component="div" className="error" />
          </div>
        </div>

        {/* General Examination */}
        <div className="test-section">
          <h3>General Examination</h3>
          <div className="form-group">
            <label>Hernia:</label>
            <Field name="generalExamination.hernia" type="text" />
            <ErrorMessage name="generalExamination.hernia" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>Varicose Vein:</label>
            <Field name="generalExamination.varicoseVein" type="text" />
            <ErrorMessage name="generalExamination.varicoseVein" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>R. Eye:</label>
            <Field name="generalExamination.rightEye" type="text" />
            <ErrorMessage name="generalExamination.rightEye" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>L. Eye:</label>
            <Field name="generalExamination.leftEye" type="text" />
            <ErrorMessage name="generalExamination.leftEye" component="div" className="error" />
          </div>
        </div>

        {/* Systemic Examination */}
        <div className="test-section">
          <h3>Systemic Examination</h3>
          <div className="form-group">
            <label>Heart:</label>
            <Field name="systemicExamination.heart" type="text" />
            <ErrorMessage name="systemicExamination.heart" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>Blood Pressure:</label>
            <Field name="systemicExamination.bloodPressure" type="text" />
            <ErrorMessage name="systemicExamination.bloodPressure" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>Pulse Rate:</label>
            <Field name="systemicExamination.pulseRate" type="text" />
            <ErrorMessage name="systemicExamination.pulseRate" component="div" className="error" />
          </div>
        </div>

          {/* Full Haemogram Report */}
          <div className="test-section">
            <h3>Full Haemogram Report</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Value</th>
                  <th>Units</th>
                  <th>Status</th>
                  <th>Range</th>
                </tr>
              </thead>
              <tbody>
                <TableRow testName="WBC" namePrefix="fullHaemogram.wbc" unitsPlaceholder="cells/uL" rangePlaceholder="4,000-11,000" />
                <TableRow testName="RBC" namePrefix="fullHaemogram.rbc" unitsPlaceholder="cells/uL" rangePlaceholder="4.7-6.1" />
                <TableRow testName="HGB" namePrefix="fullHaemogram.hgb" unitsPlaceholder="g/dL" rangePlaceholder="13.5-17.5" />
              </tbody>
            </table>
          </div>

          {/* Liver Function Test */}
          <div className="test-section">
            <h3>Liver Function Test</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Range</th>
                </tr>
              </thead>
              <tbody>
                <TableRow testName="Total Bilirubin" namePrefix="liverFunction.totalBilirubin"   />
                <TableRow testName="Direct Bilirubin" namePrefix="liverFunction.directBilirubin" unitsPlaceholder="mg/dL" />
                <TableRow testName="SGOT" namePrefix="liverFunction.sgot" unitsPlaceholder="U/L"  />
              </tbody>
            </table>
          </div>

          {/* Renal Function Test */}
          <div className="test-section">
            <h3>Renal Function Test</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Range</th>
                </tr>
              </thead>
              <tbody>
                <TableRow testName="Urea" namePrefix="renalFunction.urea" unitsPlaceholder="mg/dL" rangePlaceholder="7-20" />
                <TableRow testName="Creatinine" namePrefix="renalFunction.creatinine" unitsPlaceholder="mg/dL" rangePlaceholder="0.6-1.2" />
              </tbody>
            </table>
          </div>

          

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Lab;
