import patientsData from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, CensoredPatient, NewPatient } from '../types';

const patients: Patient[] = patientsData;

const getCensoredPatients = (): CensoredPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
   name,
   dateOfBirth,
   gender,
   occupation
  }));
};


const addPatient = (patient: NewPatient): Patient => {
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const findPatient = (id: string) => {
  const patient = patients.find((patient) => patient.id === id);
  if(!patient) {
    return null;
  }
  return patient;
};

export default {
  getCensoredPatients, addPatient, findPatient
};