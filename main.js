// main.js - author Thom. Keel - 7/18/2016
// This program plays the game of hangman.
// It uses NODE as its console to play it. 

//
// If you enter the word 'hint' (without the apostrophes), the game will
//   display the mystery word
// If you enter the word 'unhint', the game will undisplay the mystery word
//
// If you enter the number 100, depress enter key, you force the game to win for test purposes
//
// If you enter the number 20, depress enter key, the turn counter will be set to 2, 
//   speeding up the game for test purposes
//
// If you enter the number 9, depress enter key, the program will end
//
// If you enter the number 00, depress enter key, you force the game to 
//   lose for test purposes
//
//
//  mainv0.js - all user written code is contained within.
//  mainv1.js - code will be separated out into many js files
//


//DEPENDANCY FOR inquirer NPM PACKAGE
var inquirer      = require('inquirer');         // prompt processing api

var RandWordGen   = require('./game.js');        // select a random word
var WordToDisplay = require('./letter.js');      // update word display as guessed


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Define variables and populate where necessary
var clrScreen      = true;       // clear the screen on with each iteration
var hintWord       = "";         // placeholder to display mystery word if set

var letterEntered  = "";
var lettersUsed    = [];			   // placeholder for letters used, stored in  a-z order

var rwg            = new RandWordGen();  // generate a random word to guess  // game.js
var randomWord     = rwg.randWord;

//console.log("main.js - randomWord=" + JSON.stringify(randomWord));
//var randomWord   = randWordFunc();   // generate a random word to guess function
var randWordSave   = []; 
var randWordSave   = Array.from(randomWord);
var randWordLen    = randomWord.length;
//console.log("randomWord=" + randomWord + "\n");
//console.log("randomWord=" + randomWord + " randWordLen=" + randWordLen + "\n");

var winCtr         = 0;
var winloss        = 0;

var turnCtr        = 14;               // you are allowed 14 tries to guess the word

var typeIt         = " ";              // status msgs are loaded here
var typeItDup      = "The letter entered has already been selected.  Try again.   ==> ";
var typeItMsg      = "Type it here ==> ";
var typeItULose    = " Game Over.  You Lose!!!";
var typeItUWin     = " Game Over.  You Win!!!";
var typeItNotFnd   = "The letter entered was not in the word.  Try again.   ==> "; //func

var xLetter        = "";               // same as x.letter

var wordToGuess    = [];               // the is the word to guess
var wordToDisplay  = [];               // display the word with the letters as guessed

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

initArray(lettersUsed, 26);            // an array to store the letters used in alpha order
//console.log("lettersUsed=" + dispTheArray(lettersUsed)); // w/ " " between each element
//console.log("lettersUsed=" + strTheArray(lettersUsed));  // w/ "|" between each element

 
wordToGuess = randomWord.split('');    // convert string into an array of chars
//console.log("wordToGuess0=" + wordToGuess + " " );

initArray(wordToDisplay, wordToGuess.length);            // display the word with the letters as guessed
//console.log("wordToDisplay=" + wordToDisplay);

displayHdr();

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
    xLetter       =  x.letter;         // needed to pass to wtdf - display rtn


    //   letters or numbers which will cause the pgm to end, win, lose, for test
    //   start
    if(xLetter == '9' || xLetter == 'exit' || xLetter == 'quit' ) 
        return;                        // allow the player to end the game

    if(xLetter == '20') {             // For Test purposes
       turnCtr = 2;                    // speed up the game to 2 tries left
    }

    if(xLetter == '100') {             // For Test purposes
       //turnCtr = 0;                   // speed up the game - force a win
       randWordLen = 0; 
       displayHdr(); 
       dispWinMsg();
    }

    if(xLetter == '99') {             // For Test purposes
       turnCtr = 14;                    // reset ctr to 14 tries
    }

    if(xLetter == '00') {             // For Test purposes
       turnCtr = 0;                    // speed up the game - force a loss
    }
    
    if(xLetter == 'clson' || xLetter == 'clron')  {
       clrScreen  = true;
    } 

    if(xLetter == 'clsoff' || xLetter == 'clroff')  {
       clrScreen  = false;
    } 

    if(xLetter == 'hint')  {
       hintWord = (" - " + randWordSave.join(""));  // display the word to guess
    } 

    if(xLetter == 'unhint' || xLetter == 'un') { // undisplay the word to guess
       hintWord = " ";
    } 

    //   letters or numbers which will cause the pgm to end, win, lose, for test
    //   end




    // process the letter guess
    if (lettersUsed[(xLetter.toLowerCase().charCodeAt() - 97)] != xLetter){

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // Protect program from invalid characters - start
        // save letter only if length 1 and from a-z
        if(xLetter.length == 1 && (xLetter.toLowerCase().charCodeAt() >=97) 
                                && (xLetter.toLowerCase().charCodeAt() <= 127)){
          lettersUsed[(xLetter.toLowerCase().charCodeAt() - 97)] = xLetter; 
          turnCtr--;
        } else {
            // this will display only when clear screen option is off
            console.log("letter code = " + xLetter.toLowerCase().charCodeAt());

            //
            if(xLetter.toLowerCase().charCodeAt() == 63){ // if player enters ?
                xLetter = "hint";  // set var to display quess word
            } else {
                xLetter = " ";     // force valid character
            }

        } // Protect program from invalid characters - end
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - 


    // --------------------------------------  word display processing
      
    //wordToDisplayFunc();             // Function


    var wtdf      = new WordToDisplay(randomWord, randWordLen, xLetter, wordToGuess, wordToDisplay, typeIt);

    // fields returned to main.js from letter.js - make them accessible to program  
    randomWord    = wtdf.randomWord;
    //console.log("wtdf.randomWord=" + wtdf.randomWord);
    randWordLen   = wtdf.randWordLen;
    xLetter       = wtdf.xLetter;
    wordToGuess   = wtdf.wordToGuess;
    wordToDisplay = wtdf.wordToDisplay;
    typeIt        = wtdf.typeIt;
        
    // --------------------------------------
          

          letterEntered = xLetter;
          displayHdr();
          dispWinMsg(); 


          //}

    } else {
          typeIt = typeItDup;
          turnCtr--;                   // decrement turn counter for selecting dup char
          displayHdr();

          //console.log("  The letter " +  xLetter.toLowerCase() + "has already been selected.  Try again. ")
    }

         // check if you ran out of turns, if so, display you lose msg
         //if(turnCtr <= 0){
         dispLossMsg();  // function will ck if you are out of turns and exit
         //   return;
         //}

        
    promptIt();                        // recursion, prompt for next letter                           
}) 

}




// -----------------------------------------------------------------

    function clearTheScreen() { 
       // give the appearance of screen driven app rather than cmd line app
       if (clrScreen) {
          process.stdout.write('\033c'); // clear the screen 
        }

    }
    
// -----------------------------------------------------------------

    function dispLossMsg() {
       // check if you lost, if so, display msg, and end game
       if(turnCtr <= 0){
          console.log('                    Sorry...there are no more turns left. ');
          console.log('                     The mystery word was ' + '"' +  randWordSave.join("") + '". ');
          console.log('                         ' + typeItULose);
          console.log('                Deposit a quarter in the slot and try again.'); 
          console.log("\n\n");
          throwExit();                  // end the pgm NOW. 
          //return;
       }
    }

// -----------------------------------------------------------------

    function dispWinMsg() {
       // check if you win, if so, display msg, and end game
       if(randWordLen == 0 && turnCtr >= 0){
         console.log('                                Congrats!!! '); 
         console.log('                   You guessed the mystery word ' + '"' + randWordSave.join("") + '".');
         console.log('                         ' + typeItUWin );
         console.log("\n\n");
         throwExit();                  // end the pgm NOW. 
         //return;
       }
    }

// -----------------------------------------------------------------

	function dispTheArray(theArray) {
	// format any array into a string  with each char bordered by a space
	// ex. a b c d e ...
		var stringVar = "";
		for (var i = 0; i < theArray.length; i++) {			
		  	stringVar = stringVar + " " + theArray[i] ;
		}
		
		return stringVar;
	}

// -----------------------------------------------------------------------

function displayHdr( ) {    
    clearTheScreen();       // make app look less like command line interaction

    console.log("\n"); 
    console.log("Hangman - main.js" + hintWord);

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
     
    console.log("                                " + wordToDisplay.join(" ") );
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

function randWordFunc() {      // not used, replaced with call to game.js

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


    // -----------------------------------------------------------------------

    function throwExit() {
        throw exit;     // end the pgm NOW. 
    }


    // -----------------------------------------------------------------------

    function wordToDisplayFunc() {   //  replaced with letter.js processing
        // process/update the mystery word display on the screen 
        //    _ e _ _ h   ie for the word "tenth"

        //console.log("a - randomWord=" + randomWord);
        //var i = randomWord.search(xLetter);
        var i = randomWord.search(xLetter);
 

        //console.log("a2 - i=" + i);

        if(i == -1){
        // letter not found in word, update prompt msg
            typeIt = typeItNotFnd;
        } else {
        // letter was found in word, use std prompt msg
        typeIt = typeItMsg;
        }

        //console.log("b");
        while (i != -1) {   // if i=-1, then letter is not found in string
           //guessTheWord[i] = xLetter;
           //wordToGuessLen--;

            wordToGuess[i] = "_";
            //wordToDisplay[i] = xLetter;
            wordToDisplay[i] = xLetter;

            randWordLen--;              // decrement for each letter found. 
                                        // when length is zero, word has been guessed

            randomWord = wordToGuess.join("");
            //wordToGuess = [...str];

            //i = randomWord.search(xLetter);
            i = randomWord.search(xLetter);
          };

    //console.log("z");   
    }