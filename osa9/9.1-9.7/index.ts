import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {

  try {   
    const obj = req.query;
    obj.bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));
    res.send(obj);
  } catch (e) {
    res.status(400).send({error: "Malformatted parameters"});
  }

  
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.send(calculateExercise(daily_exercises, target));
  } catch (e) {    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.status(400).send({error: e.message});
  }
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});