interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}

export const calculateExercise = (list: number[], target: number): Result => {

  if(list === undefined || target === undefined){
    throw new Error("parameters missing");
  }else if(isNaN(target) || list.some(item => isNaN(item))){
    throw new Error("malformatted parameters");
  }



  const periodLength = list.length;
  const trainingDays = list.filter(hours => hours>0).length;

  let totalHours = 0;
  list.forEach(hours => {
    totalHours += hours;
  });
  const average = totalHours/list.length;

  let rating: number;
  let ratingDescription: string;
  if(average>1){
    rating = 3;
    ratingDescription = 'good';
  }else if(average>0){
    rating = 2;
    ratingDescription = 'ok';
  }else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: rating>=target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average 
  };
};

if(process.argv.length > 2){
  const list = process.argv;
  list.shift();
  list.shift();
  const pTarget = Number(list.shift());
  const numberList = list.map(item => parseFloat(item));
  console.log(calculateExercise(numberList, pTarget));
}

