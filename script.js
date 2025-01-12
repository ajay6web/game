const gameBoard = document.getElementById("gameBoard");
const timerElement = document.getElementById("timer");
const movesElement = document.getElementById("moves");
const winMessage = document.getElementById("winMessage");
const finalTime = document.getElementById("finalTime");
const finalMoves = document.getElementById("finalMoves");

const cardsArray = [
    "🍕", "🍕", "🍔", "🍔", "🍎", "🍎", "🍇", "🍇", 
    "🍓", "🍓", "🍉", "🍉", "🥑", "🥑", "🥥", "🥥"
];

let firstCard = null;
let secondCard = null;
let isFlipping = false;
let moves = 0;
let matchedPairs = 0;
let timer = 0;
let timerInterval;

// Shuffle Cards
function shuffleCards() {
    return cardsArray.sort(() => Math.random() - 0.5);
}

// Initialize the Game
function initGame() {
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    clearInterval(timerInterval);
    timerElement.textContent = "0";
    movesElement.textContent = "0";
    winMessage.classList.add("hidden");

    const shuffledCards = shuffleCards();
    gameBoard.innerHTML = "";

    shuffledCards.forEach((symbol) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-symbol", symbol);
        card.innerHTML = "❓";
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });

    startTimer();
}

// Start Timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = timer;
    }, 1000);
}

// Flip a Card
function flipCard() {
    if (isFlipping || this === firstCard) return;
    this.innerHTML = this.getAttribute("data-symbol");
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moves++;
        movesElement.textContent = moves;
        isFlipping = true;
        checkMatch();
    }
}

// Check for a Match
function checkMatch() {
    const match = firstCard.getAttribute("data-symbol") === secondCard.getAttribute("data-symbol");
    if (match) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        matchedPairs++;
        resetCards();
        if (matchedPairs === cardsArray.length / 2) {
            gameWin();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerHTML = "❓";
            secondCard.innerHTML = "❓";
            resetCards();
        }, 1000);
    }
}

// Reset Cards
function resetCards() {
    firstCard = null;
    secondCard = null;
    isFlipping = false;
}

// Winning Function
function gameWin() {
    clearInterval(timerInterval);
    winMessage.classList.remove("hidden");
    finalTime.textContent = timer;
    finalMoves.textContent = moves;
}

// Restart Game
function restartGame() {
    initGame();
}

// Start the game on load
initGame();
