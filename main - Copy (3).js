//DEPENDANCY FOR inquirer NPM PACKAGE
var inquirer = require('inquirer');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Define variables and populate where necessary
//var letter       = "";
var letterEntered  = "";
var lettersUsed    = [];			   // placeholder for letters used, stored in  a-z order

var randomWord     = randWordFunc();   // generate a random word to guess
var randWordSave   = []; 
var randWordSave   = Array.from(randomWord);
var randWordLen    = randomWord.length;
console.log("randomWord=" + randomWord + "\n");
//console.log("randomWord=" + randomWord + " randWordLen=" + randWordLen + "\n");

var winCtr         = 0;
var winloss        = 0;

var turnCtr        = 14;               // you are allowed 14 tries to guess the word
var typeIt         = " ";
var typeItMsg      = "Type it here ==> ";
var typeItULose    = " Game Over.  You Lose!!!";
var typeItUWin     = " Game Over.  You Win!!!";
var typeItDup      = "The letter entered has already been selected.  Try again.   ==> ";
var typeItNotFnd   = "The letter entered was not in the word.  Try again.   ==> ";

var wordToGuess    = [];               // the is the word to guess
var wordToDisplay  = [];               // display the word with the letters as guessed

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

initArray(lettersUsed, 26);            // an array to store the letters used in alpha order
//console.log("lettersUsed=" + dispTheArray(lettersUsed)); // w/ " " between each element
//console.log("lettersUsed=" + strTheArray(lettersUsed));  // w/ "|" between each element

wordToGuess = randomWord.split('');    // convert string into an array of chars
console.log("wordToGuess0=" + wordToGuess + " " );

initArray(wordToDisplay, wordToGuess.length);            // display the word with the letters as guessed
console.log("wordToDisplay=" + wordToDisplay);

displayHdr();
//console.log("                             You entered: " + "\n"); 
//console.log("                          Guess the word: "       ); 

typeIt = typeItMsg;
promptIt();							   // 1st prompt for a letter guess and process

// -----------------------------------------------------------------------

function promptIt(){

//RUNS INQUIRER AND ASKS THE USER A SERIES OF QUESTIONS WHOSE REPLIES ARE 
//STORED WITHIN THE VARIABLE answers INSIDE OF THE .then STATEMENT.
inquirer.prompt([{
    name: "letter", 
    message: typeIt
    // message: "Type it here ==> "
}]).then(function(x) {

    //console.log("  You have selected letter ==> " + x.letter +  " " + (x.letter.toLowerCase().charCodeAt() - 97) + "\n");
    //console.log("                             You entered: " + x.letter + "");        

    //lettersUsed[(x.letter.toLowerCase().charCodeAt() - 96)] = x.letter;
    //console.log("lettersUsed2=" ); 
    if(x.letter == '9' || typeIt == typeItUWin) return;     // allow the player to end the game
    
    turnCtr--;


    // process the letter guess
    if (lettersUsed[(x.letter.toLowerCase().charCodeAt() - 97)] != x.letter){
          lettersUsed[(x.letter.toLowerCase().charCodeAt() - 97)] = x.letter; // save letter


          // --------------------------------------
                    var i = randomWord.search(x.letter);
                 //console.log(" i=" + i);
                 if(i == -1){
                    // letter not found in word, update prompt msg
                    typeIt = typeItNotFnd;
                 } else {
                    // letter was found in word, use std prompt msg
                    typeIt = typeItMsg;
                 }


                    while (i != -1) {   // if i=-1, then letter is not found in string
            //guessTheWord[i] = x.letter;
           //wordToGuessLen--;

            wordToGuess[i] = "_";
            wordToDisplay[i] = x.letter;

            randWordLen--;              // decrement for each letter found. 
                                        // when length is zero, word has been guessed

            randomWord = wordToGuess.join("");
            //wordToGuess = [...str];

            i = randomWord.search(x.letter);
            };

 
            console.log("randWordLen1=" + randWordLen);
            //check to see if you won?
            if(randWordLen ==0){
                console.log("randWordLen2=" + randWordLen);
            }


            //console.log("wordToGuess after =" + wordToGuess );
          
            
                // --------------------------------------
            
          letterEntered = x.letter;
          //typeIt = typeItMsg;
          displayHdr();
          if(randWordLen == 0 && turnCtr >= 0){
            //console.log("randWordLen3=" + randWordLen);
            //typeIt = typeItUWin;   // End Game, You Win msg       
            console.log('                                Congrats!!! '); 
            console.log('                   You guessed the mystery word ' + '"' + randWordSave.join("") + '".');
            console.log('                         ' + typeItUWin );
            console.log("\n\n");
            return;

          }

    } else {
          typeIt = typeItDup;
          displayHdr();

          //console.log("  The letter " +  x.letter.toLowerCase() + "has already been selected.  Try again. ")
    }


        if(turnCtr <= 0){
            console.log('                    Sorry...there are no more turns left. ');
            console.log('                     The mystery word was ' + '"' +  randWordSave.join("") + '". ');
            console.log('                         ' + typeItULose);
            console.log("\n\n");
            return;
        }

            console.log("randWordSave=" + randWordSave);


    // recursion, do it again
    promptIt();                                 
}) 

}



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

function displayHdr() {    
    process.stdout.write('\033c');

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
console.log("        --- Guess the word by selecting a letter on the keyboard ---");
 
console.log("                              " + wordToDisplay.join(" ") );
console.log("\n"); 

console.log("                               You entered: " );
console.log("                                    " + letterEntered );  
console.log("\n"); 

console.log("                          Remaining # of turns:");
console.log("                                    " + turnCtr );
console.log("\n"); 

console.log("                           Letters used so far:");
console.log("            " + strTheArray(lettersUsed) );  // w/ "|" between each element
console.log("\n"); 

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