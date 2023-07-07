'use strict';

//selecting and storing the elements in variable
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const btnnew = document.querySelector('.btn--new');

//starting state of elements
let scores, currentscore, activeplayer, playing;

//functions

//starting and when new game button is clicked consition
const init = function () {
  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
};
init();

//when players switch
const switchplayer = function () {
  document.querySelector(`#current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = Number(!activeplayer);
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//button roll click event
btnroll.addEventListener('click', function () {
  if (playing) {
    //const number between 1 and 6 needed to generate
    const dice = Math.trunc(Math.random() * 6) + 1;

    //dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //score updating in current
    if (dice !== 1) {
      currentscore += dice;
      document.querySelector(`#current--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    //current score to be added to the players score
    scores[activeplayer] += currentscore;
    document.querySelector(`#score--${activeplayer}`).textContent =
      scores[activeplayer];

    //if players score >= 100 he won the game
    if (scores[activeplayer] >= 20) {
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    }
    //else switch the player
    else {
      switchplayer();
    }
  }
});

btnnew.addEventListener('click', init);
