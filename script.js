'use strict';

const player0El = document.querySelector( '.player--0' );
const player1El = document.querySelector( '.player--1' );
const score0El = document.querySelector( '#score--0' );
const score1El = document.querySelector( '#score--1' );
const current0El = document.querySelector( '#current--0' );
const current1El = document.querySelector( '#current--1' );

const dice = document.querySelector( '.dice' );

const btnNew = document.querySelector( '.btn--new' );
const btnRoll = document.querySelector( '.btn--roll' );
const btnHold = document.querySelector( '.btn--hold' );

score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add( 'hidden' );

let scores = [ 0, 0 ];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function ()
{
    document.getElementById( `current--${ activePlayer }` ).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle( 'player--active' );
    player1El.classList.toggle( 'player--active' );
};

btnRoll.addEventListener( 'click', function ()
{
    const diceNumber = Math.trunc( Math.random() * 6 ) + 1;

    dice.classList.remove( 'hidden' );
    dice.src = `images/dice-${ diceNumber }.png`;

    if ( diceNumber !== 1 )
    {
        currentScore += diceNumber;
        document.getElementById( `current--${ activePlayer }` ).textContent = currentScore;
        // current0El.textContent = currentScore;
    }
    else
    {
        switchPlayer();
    }
} );

btnHold.addEventListener( 'click', function ()
{
    scores[ activePlayer ] += currentScore;
    document.querySelector( `#score--${ activePlayer }` ).textContent = scores[ activePlayer ];
    if ( scores[ activePlayer ] >= 100 )
    {
        document.querySelector( `.player--${ activePlayer }` ).classList.add( 'player--winner' );
        document.querySelector( `.player--${ activePlayer }` ).classList.remove( 'player--active' );
        document.getElementById( `current--${ activePlayer }` ).textContent = 0;
        dice.classList.add( 'hidden' );
        currentScore = 0;
        btnRoll.disabled = true;
        btnHold.disabled = true;
    }
    else
    {
        switchPlayer();
    }
} );

btnNew.addEventListener( 'click', function ()
{
    document.querySelector( `.player--${ activePlayer }` ).classList.remove( 'player--winner' );

    scores = [ 0, 0 ];
    currentScore = 0;
    activePlayer = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    btnRoll.disabled = false;
    btnHold.disabled = false;
    dice.classList.add( 'hidden' );
    player0El.classList.add( 'player--active' );
    player1El.classList.remove( 'player--active' );
} );
