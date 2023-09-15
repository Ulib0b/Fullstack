export const calculateBmi = (height: number, weight: number): string => {

  if(isNaN(height) || isNaN(weight)){
    throw new Error("Invalid arguments");    
  }

  const bmi = weight/((height/100)^2);

  if(bmi <= 18.5){
    return "You are underweight.";
  }else if(bmi <= 24.9){
    return "You are normal weight.";
  }else if(bmi <= 29.9){
    return "You are overweight.";
  }
  return "You are obese.";
};

if(process.argv.length > 2){
  console.log(calculateBmi(Number(process.argv[2]),Number(process.argv[3])));
}