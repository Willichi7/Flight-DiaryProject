import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express()

app.use(express.json())


app.get('/', (_req, res) => {
   res.send('pong')
})

app.get('/bmi', (req, res) => {
   const weight = Number(req.query.weight);
   const height = Number(req.query.height);
   if (!weight || !height) {
      res.send({
         error: "malformatted parameters"
      });
      return;
   }
   try {
      const bmi = calculateBmi(height, weight);
      res.send({
         weight: weight,
         height: height,
         bmi: bmi
      });
   } catch (error: unknown) {
      let errorMessage = 'error: ';
      if (error instanceof Error) {
         errorMessage += error.message;
      }
      res.send({
         error: errorMessage
      });
   }
});

app.post('/exercises', (req, res) => {
   const { daily_exercises, target } = req.body;

   if (!daily_exercises || !target) {
      res.send({
         error: "parameters missing"
      });
      return;
   }

   if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
      res.send({
         error: "malformatted parameters"
      });
      return;
   }

   try {
      const result = calculateExercises(daily_exercises, target);
      res.send(result);
   } catch (error: unknown) {
      let errorMessage = 'error: ';
      if (error instanceof Error) {
         errorMessage += error.message;
      }
      res.send({
         error: errorMessage
      });
   }
});


const PORT = 3003

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
})