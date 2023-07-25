// GET HTML ELEMENTS //
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

const triangle = document.getElementById('triangle');
const userPickContainer = document.getElementById('user-pick-container');
const housePickContainer = document.getElementById('house-pick-container');
const userSelection = document.getElementById('user-selection');
const placeholder = document.getElementById('placeholder');
const houseSelection = document.getElementById('house-selection');

const youWinText = document.getElementById('win-text');
const youLoseText = document.getElementById('lose-text');
const drawText = document.getElementById('draw-text');
const playAgainButton = document.getElementById('play-again-button');

const scoreValue = document.getElementById('score-value');

// score equals saved score if exists or set to 0 //
let score = Number(localStorage.getItem('score')) || 0;

const rulesButton = document.getElementById('rules-button');
const rulesModal = document.getElementById('rules-modal');
const modalContent = document.getElementById('modal-content');
const closeIcon = document.getElementById('close-icon');

const resetButton = document.getElementById('reset-button');

// DEFINE EVENT HANDLER //
const makeSelection = (event) => {
    triangle.style.display = 'none';

    const clickedItem = event.target.id;
    userSelection.classList.add(clickedItem);

    userPickContainer.style.display = 'block';
    housePickContainer.style.display = 'block';

    const options = ['rock', 'paper', 'scissors'];
    const num = Math.floor(Math.random() * 3);  
    let selection = options[num];

   setTimeout(() => {
        placeholder.style.display = 'none';
        houseSelection.classList.add(selection);
        houseSelection.style.display = 'block';
            
        const house = selection;
        const user = event.target.id;
        let winner = 'house';

        if (house === user) {
            winner = 'draw';
        } else if(user === 'rock' && house === 'scissors' 
            || user === 'paper' && house === 'rock' 
            || user === 'scissors' && house === 'paper') {
            winner = 'user';
        }

        setTimeout(() => {
            userPickContainer.classList.add('shift-left');
            housePickContainer.classList.add('shift-right');
            if (winner === 'user') {
                youWinText.style.display = 'block';
                userSelection.classList.add('winner');
                scoreValue.innerHTML = score += 1;
                localStorage.setItem('score', score);
            } else if (winner === 'house') {
                youLoseText.style.display = 'block';
                houseSelection.classList.add('winner');
                scoreValue.innerHTML = score -= 1;
                localStorage.setItem('score', score);
            } else {
                drawText.style.display = 'block';
            }
            playAgainButton.style.display = 'block';

            let resetButtonStatus = window.getComputedStyle(resetButton).getPropertyValue('display');
            console.log(resetButtonStatus);

            if (score !== 0 && resetButtonStatus == 'none') {
                resetButton.style.display = 'block'; 
            }
        }, 500)   
    }, 1500)
};

// ADD EVENT HANDLER TO HTML ELEMENTS //
rockButton.addEventListener('click', makeSelection);
paperButton.addEventListener('click', makeSelection);
scissorsButton.addEventListener('click', makeSelection);

// EVENT HANDLER FOR PLAY AGAIN BUTTON//
const resetGame = () => {
    userPickContainer.style.display = 'none';
    housePickContainer.style.display = 'none';
    houseSelection.style.display = 'none';
    placeholder.style.display = 'block';
    playAgainButton.style.display = 'none';
    youLoseText.style.display = 'none';
    youWinText.style.display = 'none';
    drawText.style.display = 'none';
    triangle.style.display = 'block';

    userPickContainer.classList.remove('shift-left');
    housePickContainer.classList.remove('shift-right');
    houseSelection.classList.remove('rock', 'paper', 'scissors', 'winner');
    userSelection.classList.remove('rock', 'paper', 'scissors', 'winner');  
}

playAgainButton.addEventListener('click', resetGame);


// EVENT HANDLERS FOR RULES BUTTON //
const showRules = () => {
    rulesModal.style.display = 'block';
}

const closeRules = () => {
    rulesModal.style.display = 'none';
}

rulesButton.addEventListener('click', showRules);
closeIcon.addEventListener('click', closeRules);

window.onclick = function(event) {
    if (event.target == rulesModal) {
      closeRules();
    }
}

// SET SAVED SCORE WHEN PAGE LOADS //
const setScore = () => {
    scoreValue.innerHTML = score;
};

scoreValue.onload = setScore();

// RESET SCORE //
const resetScore = () => {
    score = 0;
    localStorage.setItem('score', score);
    scoreValue.innerHTML = score;
    resetButton.style.display = 'none';
}

resetButton.addEventListener('click', resetScore);

// SHOW RESET BUTTON ON LOAD IF SCORE IS NOT 0 //
const showReset = () => {
    if (score != 0) {
        resetButton.style.display = 'block';
    }
}

resetButton.onload = showReset();