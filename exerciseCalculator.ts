interface Exercises {
   periodLength: number;
   trainingDays: number;
   success: boolean;
   rating: number;
   ratingDescription: string;
   target: number;
   average: number;
}

interface ExercisesValues {
   daily: number[],
   target: number
}

const exercisesArgument = (args: string[]): ExercisesValues => {
   if (args.length < 4) { throw new Error('not enough arguments'); }

   const daily = args.slice(2, -1).map(num => {
      if (isNaN(Number(num))) {
         throw new Error('Provided values were not numbers!');
      }
      return Number(num);
   });

   const target = Number(args[args.length - 1]);
   if (isNaN(target)) {
      throw new Error('Provided target was not a number!');
   }

   return {
      daily: daily,
      target: target
   };
};

export const calculateExercises = (daily: number[], target: number): Exercises => {
   const trainingDays = daily.filter(e => e > 0).length;
   const average = daily.reduce((sum, value) => sum + value, 0) / daily.length;
   const success = average >= target;

   let rating: number;
   let ratingDescription: string;

   if (average >= target) {
      rating = 3;
      ratingDescription = "Very Good";
   } else if (average >= target * 0.5) {
      rating = 2;
      ratingDescription = "Not too bad but could do better";
   } else {
      rating = 1;
      ratingDescription = "You need to work harder";
   }

   return {
      periodLength: daily.length,
      trainingDays: trainingDays,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription,
      target: target,
      average: average
   };
};

try {
   const { daily, target } = exercisesArgument(process.argv);
   console.log(calculateExercises(daily, target));
} catch (error: unknown) {
   let errorMessage = 'Something bad happened';
   if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
   };
   console.log(errorMessage);
};


console.log(calculateExercises([1, 0, 2, 0, 3, 0, 2.5], 2.5));