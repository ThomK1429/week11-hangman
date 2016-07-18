//Global variabls
var inquirer = require('inquirer');
var RandomWordGenerator = require('./gamex.js');
var guessRemain = 9;
var lettersGuessed = [];




RandomWordGenerator();//Displys the random word for testing

//Inquirer function called prompt
function prompt(){
  inquirer.prompt([
  {
    type: 'input',
    name: 'guess',
    message: 'Please enter a letter'
  }

  ]).then(function(userGuess){

    console.log("userGuess.guess " + userGuess.guess);
    // for (var i = 0; i <= 9 guessRemain.length; i++) {
    //   console.log(guessRemain);
    // }

  //adds letters used into an array 'lettersGuess', displays which letters have been picked
  if (lettersGuessed.indexOf(userGuess.guess) == -1){
    // lettersGuessed.push(userGuess);
    // console.log()
    lettersGuessed.push(userGuess.guess);
    console.log(lettersGuessed);
    //return;
  }

  //eliminating duplicate letters
     // if (lettersUsed.indexOf(userGuess) != -1){
     //    return;
     // }

    
    
    


    prompt();//Runs function prompt again
  })
}//end of function prompt


//Calls function prompt
prompt();


//Test to see if module.export works.. It does!
//RandomWordGenerator();