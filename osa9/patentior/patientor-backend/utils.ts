import { NewPatient, Gender, NewEntry, Diagnose, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('name is not a string.');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('date is not a string.');
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('SSN is not a string.');
  }
  return ssn;
};
const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender.');
  }
  return gender;
};

const parseOccupation = (occ: unknown): string => {
  if (!isString(occ)) {
    throw new Error('occupation is not a string.');
  }
  return occ;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if(!object || typeof object !== 'object' || object === null){
    throw new Error('Incorrect or missing data.');
  }
  
  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing.');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

const parseDescription = (desc: unknown): string => {
  if (!isString(desc)) {
    throw new Error('description is not a string.');
  }
  return desc;
};

const parseSpecialist = (spec: unknown): string => {
  if (!isString(spec)) {
    throw new Error('specialist is not a string.');
  }
  return spec;
};

const parseType = (type: unknown): "Hospital" | "OccupationalHealthcare" | "HealthCheck" => {
  if (!isString(type)) {
    throw new Error('type is not a string.');
  }else if(type === "Hospital" || type === "OccupationalHealthcare"  || type === "HealthCheck"){
    return type;
  }
  throw new Error('Incorrect type.');  
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  
  switch (rating) {
    case 0:
      return HealthCheckRating.Healthy;
    case 1:
      return HealthCheckRating.LowRisk;
    case 2:
      return HealthCheckRating.HighRisk;
    case 3:
      return HealthCheckRating.CriticalRisk;
    default:
      throw new Error('Incorrect health check rating.');
  }
};

const parseEmployerName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('employerName is not a string.');
  }
  return name;
};

const parseSickLeave = (leave: unknown): {startDate: string, endDate: string} => {
  if(!leave || typeof leave !== 'object' || !('startDate' in leave) || !('endDate' in leave)){
    throw new Error('incorrect sick leave');
  }
  return {
    startDate: parseDate(leave.startDate),
    endDate: parseDate(leave.endDate)
  };
};

const parseCriteria = (crit: unknown): string => {
  if (!isString(crit)) {
    throw new Error('criteria is not a string.');
  }
  return crit;
};

const parseDischarge = (discharge: unknown): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)){
    throw new Error('Incorrect discharge');
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria)
  };
};

export const toNewEntry = (object: unknown): NewEntry => {
  if(!object || typeof object !== 'object' || object === null){
    throw new Error('Incorrect or missing data.');
  }

  if('description' in object && 'date' in object && 'specialist' in object && 'type' in object){
    const newEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: parseType(object.type),
      diagnosisCodes: parseDiagnosisCodes(object)
    };

    switch (newEntry.type) {
      case 'HealthCheck':
        if('healthCheckRating' in object){
          return {...newEntry,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };          
        }
        throw new Error('Incorrect data: healthCheckRating is missing');
      case 'OccupationalHealthcare':
        if('employerName' in object){
          return {...newEntry, 
            type: 'OccupationalHealthcare',
            employerName: parseEmployerName(object.employerName),
            sickLeave: 'sickLeave' in object
              ? parseSickLeave(object.sickLeave)
              : undefined
          };          
        }
        throw new Error('Incorrect data: employerName is missing.');
      case 'Hospital':
        if('discharge' in object){
          return {...newEntry,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge)
          };          
        }
        throw new Error('Incorrect data: discharge is missing.');
    }
  }
  throw new Error('Incorrect data: some fields are missing.');
};