var wordBank = ['apples', 'dinosaur', 'whales', 'penguins', 'ikea', 'samsung', 'apricots', 'netflix', 'pokemon', 'fiji', 'snoopy'];
var RandomWord = "";

// console.log(wordBank);

function RandomWordGenerator(){
  randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

  console.log(randomWord);

}

// randomWordGenerator();

module.exports = RandomWordGenerator;