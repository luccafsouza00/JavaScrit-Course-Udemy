'use strict';

// Selecting elements
const finalScore0El = document.querySelector('#score--0');
const finalScore1El = document.getElementById('score--1');
const imgDice = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const sectionPlayer0 = document.querySelector('.player--0');
const sectionPlayer1 = document.querySelector('.player--1');

const sections = document.querySelectorAll('.player');

let finalScores, currentPlayer, currentScore, playing;

function initGame() {
  finalScores = [0, 0];
  currentPlayer = 0;
  currentScore = 0;
  playing = true;

  finalScore0El.textContent = 0;
  finalScore1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  imgDice.classList.add('hidden');
  sectionPlayer0.classList.remove('player--winner');
  sectionPlayer1.classList.remove('player--winner');
  sectionPlayer0.classList.add('player--active');
  sectionPlayer1.classList.remove('player--active');
}

function changeCurrentPlayer() {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  sectionPlayer0.classList.toggle('player--active');
  sectionPlayer1.classList.toggle('player--active');
}

initGame();

btnRollDice.addEventListener('click', function () {
  if (playing) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    imgDice.classList.remove('hidden');
    imgDice.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
    } else {
      changeCurrentPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    finalScores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent = finalScores[currentPlayer];
    if (finalScores[currentPlayer] >= 10) {
      playing = false;
      imgDice.classList.add('hidden');
      document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
    } else {
      changeCurrentPlayer();
    }
  }
});

btnNewGame.addEventListener('click', initGame);
