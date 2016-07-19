// letter.js

var WordToDisplay = function(randomWord, randWordLen, xLetterSave, wordToGuess, wordToDisplay, typeIt){

this.randomWord = randomWord;
this.randWordLen = randWordLen;
this.xLetterSave = xLetterSave;
this.wordToGuess = wordToGuess;
this.wordToDisplay = wordToDisplay;
this.typeIt = typeIt;


//console.log("wtd - randomWord=" + this.randomWord);
//console.log("wtd - randWordLen=" + this.randWordLen);
// etc... display the input parms as necessary


var typeItMsg      = "Type it here ==> ";
var typeItNotFnd   = "The letter entered was not in the word.  Try again.   ==> ";

// search to see if your input letter is contained in the mystery word
var i = this.randomWord.search(this.xLetterSave);  // i will = -1 if not found
 
  // display in the input letter prompt area - letter found or not found
  if(i == -1){
      this.typeIt = typeItNotFnd;   // letter not found in word, update prompt msg
  } else {
      this.typeIt = typeItMsg;			// letter was found in word, use std prompt msg
  }

  while (i != -1) {                 // if i=-1, then letter is not found in string
  	this.wordToGuess[i]   = "_";    // blank out the letter
    this.wordToDisplay[i] = this.xLetterSave;  // update the screen display of letter found
    this.randWordLen--;             // decrement for each letter found. 
                                    //    when length is zero, word has been guessed
    this.randomWord = this.wordToGuess.join("");

    i = this.randomWord.search(this.xLetterSave);  // search again & go to top of loop
  };

  //console.log("letter.js - this.randWordLen a=" + this.randWordLen);  
  //console.log("letter.js - this.typeIt=" + this.typeIt);
  //
  // return the input fields updated back to the caller
  return this.randomWord, this.randWordLen, this.xLetterSave, this.wordToGuess, this.wordToDisplay, this.typeIt;
}

module.exports = WordToDisplay;