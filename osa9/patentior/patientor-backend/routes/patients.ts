/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { v1 as uuid } from 'uuid';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getCensoredPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    
    res.json(newPatient); 
  } catch (error: unknown) {
    res.status(400).send(error);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatient(req.params.id);

  if(!patient){
    return res.status(404).json({ error: 'Patient not found.' });
  }

  return res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = {...toNewEntry(req.body), id: uuid() };
    
    res.json(newEntry); 
  } catch (error: unknown) {
    res.status(400).send(error);
  }
});


export default router;