// letter.js

var WordToDisplay = function(randomWord, randWordLen, xLetterSave, wordToGuess, wordToDisplay, typeIt){

this.randomWord = randomWord;
this.randWordLen = randWordLen;
this.xLetterSave = xLetterSave;
this.wordToGuess = wordToGuess;
this.wordToDisplay = wordToDisplay;
this.typeIt = typeIt;

console.log("wtd - randomWord=" + this.randomWord);
console.log("wtd - randWordLen=" + this.randWordLen);


var typeItMsg      = "Type it here ==> ";
var typeItNotFnd   = "The letter entered was not in the word.  Try again.   ==> ";

 //var i = randomWord.search(x.letter);
 var i = this.randomWord.search(this.xLetterSave);
 
  console.log(" i=" + i);
                 if(i == -1){
                    // letter not found in word, update prompt msg
                    this.typeIt = typeItNotFnd;
                 } else {
                    // letter was found in word, use std prompt msg
                    this.typeIt = typeItMsg;
                 }

console.log("c");
                    while (i != -1) {   // if i=-1, then letter is not found in string
           //guessTheWord[i] = x.letter;
           //wordToGuessLen--;
console.log("d");
            this.wordToGuess[i] = "_";
            //wordToDisplay[i] = x.letter;
            this.wordToDisplay[i] = this.xLetterSave;

            this.randWordLen--;         // decrement for each letter found. 
                                        // when length is zero, word has been guessed

            this.randomWord = this.wordToGuess.join("");
            //wordToGuess = [...str];

            //i = randomWord.search(x.letter);
            i = this.randomWord.search(this.xLetterSave);
            };

     console.log("this.randWordLen a=" + this.randWordLen);  
     console.log("this.typeIt=" + this.typeIt);
     return this.randomWord, this.randWordLen, this.xLetterSave, this.wordToGuess, this.wordToDisplay, this.typeIt;
    }

 

module.exports = WordToDisplay;