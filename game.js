// game.js

var RandWordGen = function() {

 
console.log("game.js");

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

	console.log("game.js - randomWord generated = " + randomWord);

	return randomWord;

}

//RandWordGen();


module.exports = RandWordGen;