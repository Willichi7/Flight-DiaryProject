interface BmiValue {
   height: number,
   weight: number
}

type Result = number | string

const parseArgument = (args: string[]): BmiValue => {
   if(args.length < 4){  throw new Error('Not enough arguments')}
   if(args.length > 4){ throw new Error('Too many arguments')}
   
   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
         height: Number(args[2]),
         weight: Number(args[3])
      }
   }
   throw new Error('Provided values are not numbers!')
}

export const calculateBmi = (height: number, weight: number): Result => {
   // convert centimeter to meter
   const newHeight = height / 100; 
   const bmi = weight / (newHeight * newHeight);
   
   console.log(bmi.toFixed(2))

   if (bmi < 18.5) {
      return 'Underweight';
   } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal range';
   } else if (bmi >= 24.9 && bmi < 30) {
      return 'Overweight';
   } else {
      return 'Obese';
   }
}

try {
   const {height, weight} = parseArgument(process.argv)
   console.log(calculateBmi(height, weight));
} catch (error: unknown) {
   let errorMessage = 'Something bad happened'
   if(error instanceof Error){
      errorMessage += ' Error: ' + error.message
   }
   console.log(errorMessage)
}

