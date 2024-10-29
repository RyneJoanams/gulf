import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Lab.css';
import TableRow from '../components/TableRow';  

const TESTS_BY_UNIT = {
  urineTest: ['albumin', 'sugar', 'microscopic', 'reaction'],
  bloodTest: ['hivTest', 'hbsAg', 'hcv', 'esr'],
  generalExamination: ['hernia', 'varicoseVein', 'rightEye', 'leftEye'],
  systemicExamination: [ 'heart', 'bloodPressure', 'pulseRate'],
  fullHaemogram: [],
  liverFunction: [],
  renalFunction: [],
  heafChestTest: ['heafMantouxTest', 'chestXray'],
  area1: ['stoolConsistency','stoolMicroscopy', 'tpha', 'vdrlTest', 'venerealDisease', 'pregnancyTest',
     'typhoid', 'hydrocele', 'otherDeformities','earRight', 'earLeft', 'lungs', 'liver', 'spleen', 'bloodGroup']
};

const Lab = () => {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState({});
  const [selectedTests, setSelectedTests] = useState({});
  const [selectAll, setSelectAll] = useState({});


  useEffect(() => {
    setTimeout(() => {
      setBloodGroups(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
    }, 1000);
  }, []);

  const initialValues = {
    albumin: '', sugar: '', microscopic: '', reaction: '', 
  bloodTest: { hivTest: '', hbsAg: '', hcv: '', esr: '',     
  },
  generalExamination: {hernia: '', varicoseVein: '', rightEye: '', leftEye: '',       
  },
  systemicExamination: { heart: '', bloodPressure: '', pulseRate: '',      
  },



    fullHaemogram: {
      wbc:  { value: '', units: '', status: '', range: '' },
      lym:  { value: '', units: '', status: '', range: '' },
      mid:  { value: '', units: '', status: '', range: '' },
      gran: { value: '', units: '', status: '', range: '' },
      rbc:  { value: '', units: '', status: '', range: '' },
      mcv:  { value: '', units: '', status: '', range: '' },
      hgb:  { value: '', units: '', status: '', range: '' },
      hct:  { value: '', units: '', status: '', range: '' },
      mch:  { value: '', units: '', status: '', range: '' },
      mchc: { value: '', units: '', status: '', range: '' },
      rwd:  { value: '', units: '', status: '', range: '' },
      plcr: { value: '', units: '', status: '', range: '' },
      plt:  { value: '', units: '', status: '', range: '' },
      mpv:  { value: '', units: '', status: '', range: '' },
      pct:  { value: '', units: '', status: '', range: '' },
      pdw:  { value: '', units: '', status: '', range: '' }

      
    },
    liverFunction: {
      totalBilirubin: { value: '', status: '', range: '' },
      directBilirubin: { value: '', status: '', range: '' },
      indirectBilirubin: { value: '', status: '', range: '' },
      sgot:   { value: '', status: '', range: '' },
      sgpt:  { value: '', status: '', range: '' },
      gammaGt:  { value: '', status: '', range: '' },
      alkalinePhosphate:  { value: '', status: '', range: '' },
      totalProteins:{ value: '', status: '', range: '' },
      albumin1:  { value: '', status: '', range: '' },
    }, 
    renalFunction: {
      urea: { value: '', status: '', range: '' },
      creatinine: { value: '', status: '', range: '' },
      fastingBloodSugar: { value: '', status: '', range: '' },
    },

    heafMantouxTest: '',
    chestXray: '',

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
    bloodGroup: '',
  };
  const handleUnitSelect = (unit) => {
    setSelectedUnits((prev) => ({
      ...prev,
      [unit]: !prev[unit],
    }));
    if (selectedUnits[unit]) {
      setSelectAll((prev) => ({ ...prev, [unit]: false }));
      setSelectedTests((prev) => ({ ...prev, [unit]: {} }));
    }
  };

  const handleTestSelect = (unit, test) => {
    setSelectedTests((prev) => ({
      ...prev,
      [unit]: {
        ...prev[unit],
        [test]: !prev[unit]?.[test],
      },
    }));
  };

  const handleSelectAllTests = (unit) => {
    const allTestsSelected = !selectAll[unit];
    setSelectAll((prev) => ({ ...prev, [unit]: allTestsSelected }));

    setSelectedTests((prev) => ({
      ...prev,
      [unit]: allTestsSelected
        ? TESTS_BY_UNIT[unit].reduce((acc, test) => ({ ...acc, [test]: true }), {})
        : {},
    }));
  };

  const handleSelectAllTestsInUnit = (unit) => {
    setSelectedUnits((prev) => ({
      ...prev,
      [unit]: !prev[unit],
    }));
  };

  const handleSubmit = (values) => {
    console.log('Submitted data:', values);
  };

  return (
    <Formik initialValues={initialValues}  onSubmit={handleSubmit}>
      {() => (
        <Form>
          <h1><b>COMPREHENSIVE LABARATORY EXAMINATION REPORT</b></h1>

    {/* Urine Test Section */}
    <div className="test-section">
      <h3><label><input type="checkbox" checked={selectedUnits.urineTest || false} onChange={() => handleUnitSelect('urineTest')}/> <b>Urine Test</b></label>
        {selectedUnits.urineTest && (<label><input type="checkbox" checked={selectAll.urineTest || false} onChange={() => handleSelectAllTests('urineTest')}/>Select All</label>)}
      </h3>
      {selectedUnits.urineTest && (
         <>
           <div className="form-group">
             <label><input type="checkbox" checked={selectedTests.urineTest?.albumin || false} onChange={() => handleTestSelect('urineTest', 'albumin')}/> Albumin:</label>
             {selectedTests.urineTest?.albumin && ( <Field name="albumin" type="text" />)}
             <ErrorMessage name="albumin" component="div" className="error" />
          </div>
          <div className="form-group">
             <label><input type="checkbox" checked={selectedTests.urineTest?.sugar || false} onChange={() => handleTestSelect('urineTest', 'sugar')}/> Sugar:</label>
             {selectedTests.urineTest?.sugar && (<Field name="sugar" type="text" />)}
            <ErrorMessage name="sugar" component="div" className="error" />
          </div>
          <div className="form-group">
             <label><input type="checkbox" checked={selectedTests.urineTest?.microscopic || false} onChange={() => handleTestSelect('urineTest', 'microscopic')}/> Microscopic:</label>
             {selectedTests.urineTest?.microscopic && (<Field name="microscopic" type="text" />)}
            <ErrorMessage name="Microscopic" component="div" className="error" />
          </div>
          <div className="form-group">
             <label><input type="checkbox" checked={selectedTests.urineTest?.reaction || false} onChange={() => handleTestSelect('urineTest', 'reaction')}/> Reaction:</label>
             {selectedTests.urineTest?.sugar && (<Field name="sugar" type="text" />)}
            <ErrorMessage name="reaction" component="div" className="error" />
          </div>
         </>
       )}
    </div>

      {/* Blood Test Section */}
      <div className="test-section">
        <h3><label><input type="checkbox" checked={selectedUnits.bloodTest || false} onChange={() => handleUnitSelect('bloodTest')}/><b>Blood Test</b></label>
          {selectedUnits.bloodTest && (
            <label> <input type="checkbox" checked={selectAll.bloodTest || false} onChange={() => handleSelectAllTests('bloodTest')} />Select All</label>)}
        </h3>
         {selectedUnits.bloodTest && (
           <>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.bloodTest?.hivTest || false} onChange={() => handleTestSelect('bloodTest', 'hivTest')}/> HIV Test (I, II):</label>
               {selectedTests.bloodTest?.hivTest && (<Field name="bloodTest.hivTest" type="text" /> )}
               <ErrorMessage name="bloodTest.hivTest" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.bloodTest?.hbsAg || false} onChange={() => handleTestSelect('bloodTest', 'hbsAg')}/> HbsAg:</label>
               {selectedTests.bloodTest?.hivTest && (<Field name="bloodTest.hbsAg" type="text" /> )}
               <ErrorMessage name="bloodTest.hbsAg" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.bloodTest?.hcv || false} onChange={() => handleTestSelect('bloodTest', 'hcv')}/> HCV:</label>
               {selectedTests.bloodTest?.hivTest && (<Field name="bloodTest.hcv" type="text" /> )}
               <ErrorMessage name="bloodTest.hcv" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.bloodTest?.esr || false} onChange={() => handleTestSelect('bloodTest', 'esr')}/> ESR(1stHR):</label>
               {selectedTests.bloodTest?.esr && (<Field name="bloodTest.esr" type="text" /> )}
               <ErrorMessage name="bloodTest.esr" component="div" className="error" />
             </div>
           </>
        )}
       </div>

       {/* GeneralExam Test Section */}
      <div className="test-section">
        <h3><label><input type="checkbox" checked={selectedUnits.generalExamination || false} onChange={() => handleUnitSelect('generalExamination')}/><b>General Examination</b></label>
          {selectedUnits.generalExamination && (
            <label> <input type="checkbox" checked={selectAll.generalExamination || false} onChange={() => handleSelectAllTests('generalExamination')} />Select All</label>)}
        </h3>
         {selectedUnits.generalExamination && (
           <>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.generalExamination?.hernia || false} onChange={() => handleTestSelect('generalExamination', 'hernia')}/> Hernia:</label>
               {selectedTests.generalExamination?.hernia && (<Field name="generalExamination.hernia" type="text" /> )}
               <ErrorMessage name="generalExamination.hernia" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.generalExamination?.varicoseVein || false} onChange={() => handleTestSelect('generalExamination', 'varicoseVein')}/> Vericosevein:</label>
               {selectedTests.generalExamination?.varicoseVein && (<Field name="generalExamination.varicoseVein" type="text" /> )}
               <ErrorMessage name="generalExamination.varicoseVein" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.generalExamination?.rightEye || false} onChange={() => handleTestSelect('generalExamination', 'rightEye')}/> Right Eye:</label>
               {selectedTests.generalExamination?.rightEye && (<Field name="generalExamination.rightEye" type="text" /> )}
               <ErrorMessage name="generalExamination.rightEye" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.generalExamination?.leftEye || false} onChange={() => handleTestSelect('generalExamination', 'leftEye')}/> Left Eye:</label>
               {selectedTests.generalExamination?.leftEye && (<Field name="generalExamination.leftEye" type="text" /> )}
               <ErrorMessage name="generalExamination.leftEye" component="div" className="error" />
             </div>
           </>
        )}
       </div>

       {/* systemicexam Test Section */}
      <div className="test-section">
        <h3><label><input type="checkbox" checked={selectedUnits.systemicExamination || false} onChange={() => handleUnitSelect('systemicExamination')}/><b>Systemic Examination</b></label>
          {selectedUnits.systemicExamination && (
            <label> <input type="checkbox" checked={selectAll.systemicExamination || false} onChange={() => handleSelectAllTests('systemicExamination')} />Select All</label>)}
        </h3>
         {selectedUnits.systemicExamination && (
           <>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.systemicExamination?.heart || false} onChange={() => handleTestSelect('systemicExamination', 'heart')}/> Heart:</label>
               {selectedTests.systemicExamination?.heart && (<Field name="systemicExamination.heart" type="text" /> )}
               <ErrorMessage name="systemicExamination.heart" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.systemicExamination?.bloodPressure || false} onChange={() => handleTestSelect('systemicExamination', 'bloodPressure')}/> Blood Pressure:</label>
               {selectedTests.systemicExamination?.bloodPressure && (<Field name="systemicExamination.bloodPressure" type="text" /> )}
               <ErrorMessage name="systemicExamination.bloodPressure" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.systemicExamination?.pulseRate || false} onChange={() => handleTestSelect('systemicExamination', 'pulseRate')}/> Pulse Rate:</label>
               {selectedTests.systemicExamination?.pulseRate && (<Field name="systemicExamination.pulseRate" type="text" /> )}
               <ErrorMessage name="systemicExamination.pulseRate" component="div" className="error" />
             </div>
           </>
        )}
       </div>

        {/* systemicexam Test Section */}
      <div className="test-section">
        <h3><label><input type="checkbox" checked={selectedUnits.area1 || false} onChange={() => handleUnitSelect('area1')}/><b>Area 1</b></label>
          {selectedUnits.area1 && (
            <label> <input type="checkbox" checked={selectAll.area1 || false} onChange={() => handleSelectAllTests('area1')} />Select All</label>)}
        </h3>
         {selectedUnits.area1 && (
           <>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.stoolConsistency || false} onChange={() => handleTestSelect('area1', 'stoolConsistency')}/> stool Consistency:</label>
               {selectedTests.area1?.stoolConsistency && (<Field name="area1.stoolConsistency" type="text" /> )}
               <ErrorMessage name="area1.stoolConsistency" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.stoolMicroscopy || false} onChange={() => handleTestSelect('area1', 'stoolMicroscopy')}/> stoolMicroscopy:</label>
               {selectedTests.area1?.stoolMicroscopy && (<Field name="area1.stoolMicroscopy" type="text" /> )}
               <ErrorMessage name="area1.stoolMicroscopy" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.tpha || false} onChange={() => handleTestSelect('area1', 'tpha')}/> TPHA:</label>
               {selectedTests.area1?.tpha && (<Field name="area1.tpha" type="text" /> )}
               <ErrorMessage name="area1.tpha" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.vdrlTest || false} onChange={() => handleTestSelect('area1', 'vdrlTest')}/> VDRL Test:</label>
               {selectedTests.area1?.vdrlTest && (<Field name="area1.vdrlTest" type="text" /> )}
               <ErrorMessage name="area1.vdrlTest" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.venerealDisease || false} onChange={() => handleTestSelect('area1', 'venerealDisease')}/> venereal Disease:</label>
               {selectedTests.area1?.venerealDisease && (<Field name="area1.venerealDisease" type="text" /> )}
               <ErrorMessage name="area1.venerealDisease" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.pregnancyTest || false} onChange={() => handleTestSelect('area1', 'pregnancyTest')}/> Pregnancy Test:</label>
               {selectedTests.area1?.pregnancyTest && (<Field name="area1.pregnancyTest" type="text" /> )}
               <ErrorMessage name="area1.pregnancyTest" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.typhoid || false} onChange={() => handleTestSelect('area1', 'typhoid')}/> Typhoid:</label>
               {selectedTests.area1?.typhoid && (<Field name="area1.typhoid" type="text" /> )}
               <ErrorMessage name="area1.typhoid" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.hydrocele || false} onChange={() => handleTestSelect('area1', 'hydrocele')}/> Hydrocele:</label>
               {selectedTests.area1?.hydrocele && (<Field name="area1.hydrocele" type="text" /> )}
               <ErrorMessage name="area1.hydrocele" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.otherDeformities || false} onChange={() => handleTestSelect('area1', 'otherDeformities')}/> Other Deformities:</label>
               {selectedTests.area1?.otherDeformities && (<Field name="area1.otherDeformities" type="text" /> )}
               <ErrorMessage name="area1.otherDeformities" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.earRight || false} onChange={() => handleTestSelect('area1', 'earRight')}/> Ear Right:</label>
               {selectedTests.area1?.earRight && (<Field name="area1.earRight" type="text" /> )}
               <ErrorMessage name="area1.earRight" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.earLeft || false} onChange={() => handleTestSelect('area1', 'earLeft')}/> Ear Left:</label>
               {selectedTests.area1?.earLeft && (<Field name="area1.earLeft" type="text" /> )}
               <ErrorMessage name="area1.earLeft" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.lungs || false} onChange={() => handleTestSelect('area1', 'lungs')}/> Lungs:</label>
               {selectedTests.area1?.lungs && (<Field name="area1.lungs" type="text" /> )}
               <ErrorMessage name="area1.lungs" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.liver || false} onChange={() => handleTestSelect('area1', 'liver')}/> Liver:</label>
               {selectedTests.area1?.liver && (<Field name="area1.liver" type="text" /> )}
               <ErrorMessage name="area1.liver" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.spleen || false} onChange={() => handleTestSelect('area1', 'spleen')}/> spleen:</label>
               {selectedTests.area1?.spleen && (<Field name="area1.spleen" type="text" /> )}
               <ErrorMessage name="area1.spleen" component="div" className="error" />
             </div>
             <div className="form-group">
               <label><input type="checkbox" checked={selectedTests.area1?.bloodGroup || false} onChange={() => handleTestSelect('area1', 'bloodGroup')}/> Blood Group:</label>
               {selectedTests.area1?.bloodGroup && (<Field name="area1.bloodGroup" type="text" /> )}
               <ErrorMessage name="area1.bloodGroup" component="div" className="error" />
             </div>
             </>
        )}
       </div>

          {/* Full Haemogram Section */}
          <div className="test-section">
            <h3><label><input type="checkbox" checked={selectedUnits.fullHaemogram || false} onChange={() => handleSelectAllTestsInUnit('fullHaemogram')}/> Full Haemogram Report</label>
            </h3>
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
                {['wbc', 'lym', 'mid', 'gran', 'rbc', 'mcv', 'hgb', 'hct', 'mch', 'mchc', 'rwd', 'plcr', 'plt', 'mpv', 'pct', 'pdw'].map((test) => (
                  <TableRow
                    key={test}
                    testName={test.toUpperCase()}
                    namePrefix={`fullHaemogram.${test}`}
                    unitsPlaceholder="Units"
                    rangePlaceholder="Range"
                    disabled={!selectedUnits.fullHaemogram} 
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Liver Function Test Section */}
          <div className="test-section">
            <h3><label><input type="checkbox" checked={selectedUnits.liverFunction || false} onChange={() => handleSelectAllTestsInUnit('liverFunction')} /> Liver Function Test</label>
            </h3>
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
                {['totalBilirubin', 'directBilirubin', 'indirectBilirubin', 'sgot', 'sgpt', 'gammaGt', 'alkalinePhosphate', 'totalProteins', 'albumin1'].map((test) => (
                  <TableRow
                    key={test}
                    testName={test.replace(/([A-Z])/g, ' $1')}
                    namePrefix={`liverFunction.${test}`}
                    rangePlaceholder="Range"
                    disabled={!selectedUnits.liverFunction} 
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Renal Function Test Section */}
          <div className="test-section">
            <h3><label><input type="checkbox" checked={selectedUnits.renalFunction || false} onChange={() => handleSelectAllTestsInUnit('renalFunction')}/> Renal Function Test</label>
            </h3>
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
                {['urea', 'creatinine', 'fastingBloodSugar'].map((test) => (
                  <TableRow
                    key={test}
                    testName={test.replace(/([A-Z])/g, ' $1')}
                    namePrefix={`renalFunction.${test}`}
                    rangePlaceholder="Range"
                    disabled={!selectedUnits.renalFunction} 
                  />
                ))}
              </tbody>
            </table>
          </div>



       

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
export default Lab;