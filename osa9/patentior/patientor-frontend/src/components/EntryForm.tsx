import axios from 'axios';
import { useState } from 'react';

import patientService from '../services/patients';
import { Diagnosis, Entry, EntryFormValues, HealthCheckRating, Patient} from '../types';



const EntryForm = ({ toggleFormView, diagnoses, setNotification, patient }: {
  toggleFormView: () => void
  diagnoses?: Diagnosis[]
  setNotification: (message: string) => void
  patient?: Patient
}): JSX.Element => {
  const diagnoseCodes: string[] = [];  
  const [formType, setFormType] = useState<Entry['type']>('HealthCheck');
  const [formFields, setFormFields] = useState({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: diagnoseCodes,
    dischargeDate: '',
    criteria: '',
    healthCheckRating: '0',
    employerName: '',
    startDate: '',
    endDate: ''
  });

  const entryTypes: Entry['type'][] = [
    'HealthCheck',
    'Hospital',
    'OccupationalHealthcare'
  ];

  if(!diagnoses || !patient){
    return <p>Diagnoses or patient was undefined.</p>
  }

  const handleNewForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      if(formFields.description === '' || formFields.date === '' || formFields.specialist === ''){
        throw new Error('Some fields are missing.')
      }else if(formFields.diagnosisCodes) {
        const codes = diagnoses.map((diagnosis) => diagnosis.code);
        if (!formFields.diagnosisCodes.every((code) => codes.includes(code))) {
          throw new Error('Invalid diagnosis code(s).');
        }
      }
      const common = {
        description: formFields.description,
        date: formFields.date,
        specialist: formFields.specialist
      };

      let entry: EntryFormValues;

      switch (formType) {
        case 'HealthCheck': {
          if (!formFields.healthCheckRating || isNaN(Number(formFields.healthCheckRating))) {
            throw new Error('Invalid health check rating.');
          }

          entry = {
            ...common,
            type: 'HealthCheck',
            healthCheckRating: Number(formFields.healthCheckRating)
          };
          break;
        }
        case 'Hospital': {
          if(!formFields.dischargeDate || !formFields.criteria){
            throw new Error('Discharge date or criteria is missing.');
          }

          entry = {
            ...common,
            type: 'Hospital',
            discharge: {
              date: formFields.dischargeDate,
              criteria: formFields.criteria
            }
          };
          break;
        }
        case 'OccupationalHealthcare': {
          if(!formFields.employerName){
            throw new Error('Employers name is missing.');
          }

          entry = {
            ...common,
            type: 'OccupationalHealthcare',
            employerName: formFields.employerName
          };

          if (formFields.startDate && formFields.endDate) {
            entry.sickLeave = {
              startDate: formFields.startDate,
              endDate: formFields.endDate
            };
          }
        }
      }

      if (formFields.diagnosisCodes) entry.diagnosisCodes = formFields.diagnosisCodes;

      const newEntry = await patientService.createEntry(patient.id, entry);

      setNotification('Entry added');

      patient.entries.push(newEntry);

      toggleFormView();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setNotification(e.message);
      } else {
        if (e instanceof Error) {
          setNotification(e.message);
        }
      }      
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleDiagnosisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormFields({ ...formFields, diagnosisCodes: formFields.diagnosisCodes.concat(e.target.value) });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!(value === 'HealthCheck' || value === 'Hospital' || value === 'OccupationalHealthcare')) {
      return null;
    }
    setFormType(value);
  };

  const handleHealthRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormFields({ ...formFields, healthCheckRating: e.target.value });
  };

  return (
    <div>
      <h2>New healthcheck entry</h2>
      <form onSubmit={handleNewForm}>
        <p>Description</p>
        <input
          id='description'
          name='description'
          onChange={handleInputChange}
        />

        <p>Date</p>
        <input
          id='date'
          type='date'
          name='date'
          onChange={handleInputChange}
        />

        <p>Specialist</p>
        <input
          id='specialist'
          name='specialist'
          onChange={handleInputChange}
        />

        <p>Diagnosis codes</p>
        <select
          id='diagnosisCodes'
          name='diagnosisCodes'
          onChange={handleDiagnosisChange}
          value={formFields.diagnosisCodes}
          multiple
        >
          {diagnoses.map((diagnosis) => (
            <option key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code}
            </option>
          ))}
        </select>

        <p>Type</p>
        <select
          id='type'
          onChange={handleTypeChange}
          value={formType}
        >
          {entryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {formType === 'Hospital' && (
          <div>
            <p>Discharge</p>
            <div style={{ padding: '0 12px' }}>
              <p>Date</p>
              <input
                id='dischargeDate'
                type='date'
                name='dischargeDate'
                onChange={handleInputChange}
              />

              <p>Criteria</p>
              <input
                id='criteria'
                name='criteria'
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {formType === 'HealthCheck' && (
          <div>
            <p>Health Check Rating</p>
            <select
              id='type'
              onChange={handleHealthRatingChange}
              value={formFields.healthCheckRating}
            >
              {Object.keys(HealthCheckRating)
                .filter((key) => isNaN(Number(key)))
                .map((key) => (
                  <option
                    key={key}
                    value={HealthCheckRating[key as keyof typeof HealthCheckRating]}
                  >
                    {key}
                  </option>
                ))}
            </select>
          </div>
        )}

        {formType === 'OccupationalHealthcare' && (
          <div>
            <p>Employer Name</p>
            <input
              id='employerName'
              name='employerName'
              onChange={handleInputChange}
            />
            <br/>
            <br/>
            <b>Sick Leave</b>
            <div>
              <p>Start Date</p>
              <input
                id='startDate'
                type='date'
                name='startDate'
                onChange={handleInputChange}
              />

              <p>End Date</p>
              <input
                id='endDate'
                type='date'
                name='endDate'
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <div>
          <button onClick={toggleFormView}>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;