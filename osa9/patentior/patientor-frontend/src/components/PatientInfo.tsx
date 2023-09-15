import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnosis';
import { Patient, Entry, Diagnosis, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import HealthRatingBar from './HealthRatingBar';
import { useEffect, useState } from 'react';
import EntryForm from './EntryForm';

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => { 

  const assertNever = (value: never) => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const HospitalEntryView: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
      <div>
        <p>{entry.date}</p>
        <p>{entry.description}</p>
        <p>Diagnose by {entry.specialist}</p>
        <br/>
      </div>
    );
  };

  const OccupationalHealthcareEntryView: React.FC<{
    entry: OccupationalHealthcareEntry;
  }> = ({ entry }) => {
    return (
      <div>
        <p>{entry.date}</p>
        <p>{entry.description}</p>
        <p>Diagnose by {entry.specialist}</p>
        <br/>
      </div>
    );
  };

  const HealthCheckEntryView: React.FC<{ entry: HealthCheckEntry }> = ({
    entry
  }) => {
    return (
      <div>
        <p>{entry.date}</p>
        <p>{entry.description}</p>
        {<HealthRatingBar rating={entry.healthCheckRating} showText={false} />}
        <p>Diagnose by {entry.specialist}</p>
        <br/>
      </div>
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryView entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryView entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryView entry={entry} />;
    default:
      return assertNever(entry);
  }
}

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [notification, setNotification] = useState<string>();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const id = useParams().id;

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        try {
          const patient = await patientService.getPatient(id);
          setPatient(patient);
          const diagnoses = await diagnosisService.getAll();
          setDiagnoses(diagnoses);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getPatient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const toggleForm = () => setIsFormVisible(!isFormVisible);

  const notify = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
  };

  const Noti = ():JSX.Element => {
    if(notification === undefined){
      return <></>
    }
    return (
      <div>
        <br/>
        <b>{notification}</b>
      </div>
    )
  }
  const entryForm = isFormVisible ? (
    <>
      <Noti />
      <EntryForm
        toggleFormView={toggleForm}
        setNotification={notify}
        patient={patient}
        diagnoses={diagnoses}
      />
    </>
  ) : (
    <button onClick={toggleForm}>Add new entry</button>
  );

  if (!patient) return null;

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>SSN: {patient.ssn}</p>
      <p>Gender: {patient.gender}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>Occupation: {patient.occupation}</p>
      <div>
        
        <p>
          Entries:
        </p>
        {patient.entries.map((entry: Entry) => {
          return (
            <EntryComponent key={entry.id} entry={entry} />
          );
        })}
      </div>      
      {entryForm}
    </div>
  );
};

export default PatientInfo;