window.addEventListener('load', init);
/// globals
let time = 5;
let score = 0;
let isPlaying;

// Available Levels
const levels = {
  easy: 5,
  medium: 4,
  hard: 2
}

// To change Level
let currentLevel = levels.easy;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition',
  'phone',
  'programmer',
  'computer',
  'instagram',
  'facebook'
];

// Initialize Game
function init(){
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch(){
  if(matchWords()){
    isPlaying = true;
    score++;
    
    if(score > 4){
      currentLevel = levels.medium;
    }else if(score > 9){
      currentLevel = levels.hard;
    }
    seconds.innerHTML = currentLevel;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
  }
  scoreDisplay.innerHTML = score;
  
  if(isPlaying === false){
    score = 0;
    isPlaying = true;
    showWord(words);
    time = currentLevel + 1;
    wordInput.value = '';
  }
}
// Match currentWord to wordInput
function matchWords(){
  if(wordInput.value === currentWord.innerHTML){
    message.innerHTML = 'Correct!!!'
    return true;
  } else{
    message.innerHTML = '';
    return false;
  }
}

// Pick and show random word
function showWord(words){
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  //Output random word
  currentWord.innerHTML = words[randIndex];
}

function countdown(){
  // Check sure time is not out
  if(time > 0){
    // Decrement
    time--;
  }else if(time === 0){
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

//Check game status
function checkStatus(){
  if(!isPlaying && time == 0){
    message.innerHTML = 'Game Over!!! <br> Input any keywords to restart the game.'
  }
}