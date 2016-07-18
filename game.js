// game.js - select a random word for the player
// this js will be called from main.js

var RandWordGen = function(){

// a list of words, which will be selected at random, for the player of the game to guess
	this.listOfWords = [ 'zeroth', 'first','second','third', 'fourth', 'fifth', 
						'sixth', 'seventh','eighth','nineth', 'tenth', 'meeeeow', 
						'eleventh', 'twelfth','thirteenth','fourteenth', 'fifteenth', 'baaaark'];

	this.randNum = -1;					// a random number generated used for random selection from
										//    the listOfWords array
	this.randomWord = "abc";		

	this.randNum = Math.floor(Math.random() * (this.listOfWords.length + 1));
	this.randomWord = this.listOfWords[this.randNum];
	//randomWord = listOfWords[1];			// test purposes - test a specific word

	//console.log("game.js -  randomWord generated = " + this.randomWord);
	return this.randomWord;
}

module.exports = RandWordGen;