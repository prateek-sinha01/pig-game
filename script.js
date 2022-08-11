'use strict';

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score0 = document.querySelector('#score-0');
const score1 = document.querySelector('#score-1');
const current0 = document.querySelector('#current-0');
const current1 = document.querySelector('#current-1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let currentScore, score, activePlayer, playing;

const initialState = function () {
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    dice.classList.add('hidden');
    document.getElementById('name-0').textContent = '➡️ Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    player0.classList.remove('player-winner');
    player1.classList.remove('player-winner');
    player0.classList.add('player-active');
    player1.classList.remove('player-active');

};

initialState();

const switchPlayer = function () {
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.getElementById(`name-${activePlayer}`).textContent = `➡️ Player ${activePlayer+1}`;
    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
};

btnRoll.addEventListener('click', function () {
    if (playing) {
        //Generate random dice roll value
        const diceValue = Math.trunc(Math.random() * 6) + 1;

        //Display dice
        dice.classList.remove('hidden');
        dice.src = `img/dice-${diceValue}.png`;

        //Check if dice value is 1
        if (diceValue !== 1) {
            currentScore += diceValue;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        }
        else {
            //Switch player.
            document.getElementById(`name-${activePlayer}`).textContent = `Player ${activePlayer+1}`;
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        //Add currrent score to active player's score
        score[activePlayer] += currentScore;

        document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer];

        //Check if active player's score is >= 100
        if (score[activePlayer] >= 10) {
            //Finish the game
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
            // document.querySelector('.modal').classList.remove('hidden');
        }
        else {
            //Switch player
            document.getElementById(`name-${activePlayer}`).textContent = `Player ${activePlayer+1}`;
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', initialState);