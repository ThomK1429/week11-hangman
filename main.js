//DEPENDANCY FOR inquirer NPM PACKAGE
var inquirer = require('inquirer');

console.log("\n"); 
console.log("Hangman - main.js");


console.log("\n"); 
console.log("          *********************************************************");
console.log("          *                                                       *");
console.log("          *                   H A N G M A N                       *");
console.log("          *                                                       *");
console.log("          *           - - A Command Line Version - -              *");
console.log("          *                                                       *");
console.log("          *********************************************************");
console.log("\n"); 


var letter = "";
var lettersUsed = [];				// placeholder for letters used, stored in  a-z order
var wordToGuess = [];

var randomWord = randWordFunc();         // generate a random word to guess
var randWordLen = randomWord.length;
console.log("randomWord=" + randomWord + " randWordLen=" + randWordLen + "\n");

wordToGuess = randomWord.split('');      // convert string into an array of chars
console.log("wordToGuess0=" + wordToGuess + " " );


initArray(lettersUsed, 26);
//lettersUsed[25] = 'z';
//console.log("lettersUsed=" + dispTheArray(lettersUsed)); // w/ " " between each element
//console.log("lettersUsed=" + strTheArray(lettersUsed));  // w/ "|" between each element

//console.log('\033[2J');
promptIt();											 // prompt for a letter guess and process

// -----------------------------------------------------------------

	function dispTheArray(theArray) {
	// format any array into a string bordered by a spac
	// ex. a b c d e ...
		var stringVar = "";
		for (var i = 0; i < theArray.length; i++) {			
		  	stringVar = stringVar + " " + theArray[i] ;
		}
		
		return stringVar;
	}

// -----------------------------------------------------------------------

  function initArray(theArray, len) {
  	// format any array with the an underscore (no blanks)
	//  ex.   _ _ _ _ _ _ _ _ 	
  		for (var i = 0; i < len; i++) {
		  	theArray[i] = "_";
		}
		//console.log("initArray - theArray=" + theArray);
		return theArray;
	}

// -----------------------------------------------------------------------

function promptIt(){

//RUNS INQUIRER AND ASKS THE USER A SERIES OF QUESTIONS WHOSE REPLIES ARE 
//STORED WITHIN THE VARIABLE answers INSIDE OF THE .then STATEMENT.
inquirer.prompt([{
    name: "letter", 
    message: "Guess the word by selecting a letter on the keyboard ==> "
}]).then(function(x) {
    console.log("  You have selected letter ==> " + x.letter +  " " + (x.letter.toLowerCase().charCodeAt() - 97) + "\n");
    console.log("  You have selected letter ==> " + x.letter +  "");		

    //lettersUsed[(x.letter.toLowerCase().charCodeAt() - 96)] = x.letter;
    //console.log("lettersUsed2=" ); 
    if(x.letter == '9') return;		// allow the player to end the game

    // process the letter guess
    if (lettersUsed[(x.letter.toLowerCase().charCodeAt() - 97)] != x.letter){
    	  lettersUsed[(x.letter.toLowerCase().charCodeAt() - 97)] = x.letter; // save letter

    	  // --------------------------------------
					var i = randomWord.search(x.letter);
 				 console.log(" i=" + i);

 				    while (i != -1) {   // if i=-1, then letter is not found in string
            //guessTheWord[i] = x.letter;
           //wordToGuessLen--;

            wordToGuess[i] = "_";

            randomWord = wordToGuess.join("");
            //wordToGuess = [...str];

            i = randomWord.search(x.letter);
            };
            console.log("wordToGuess after =" + wordToGuess );
    	  
    	  	
 				// --------------------------------------
    	  	
    } else {
    	  console.log("  The letter " +  x.letter.toLowerCase() + "has already been selected.  Try again. ")
    }


		console.log("  lettersUsed=" + strTheArray(lettersUsed) + "\n");  // w/ "|" between each element


    // recursion, do it again
    promptIt();    								
}) 

}

// -----------------------------------------------------------------------

function processLetter() {
	
}

function randWordFunc() {

// a list of words, which will be selected at random, for the player of the game to guess
	var listOfWords = [ 'zeroth', 'first','second','third', 'fourth', 'fifth', 
						'sixth', 'seventh','eighth','nineth', 'tenth', 'meeeeow', 
						'eleventh', 'twelfth','thirteenth','fourteenth', 'fifteenth', 'baaaark'];

	var randNum = -1;					// a random number generated used for random selection from
										//    the listOfWords array
	var randomWord = "abc";		

	randNum = Math.floor(Math.random() * (listOfWords.length + 1));
	randomWord = listOfWords[randNum];
	//randomWord = listOfWords[1];			// test purposes - test a specific word

	//console.log(" randomWord generated = " + randomWord);

	return randomWord;

}

// -----------------------------------------------------------------------

	function strTheArray(theArray) {
	// format any array into a string bordered by a vertical bar
	// ex.   |a|b|_|d|_|_|_ ...
		var stringVar = "";
		for (var i = 0; i < theArray.length; i++) {			
		  	stringVar = stringVar + "|" + theArray[i] ;
		}
		stringVar = stringVar + "|";
		return stringVar;
	}