// Card data - using Emojis (you can change these emojis to any you like)
const cardData = [
  { id: 1, icon: '🛍️', name: 'Heart', isEmoji: true },
  { id: 2, icon: '🧸', name: 'Star', isEmoji: true },
  { id: 3, icon: '🪭', name: 'Circle', isEmoji: true },
  { id: 4, icon: '🎀', name: 'Square', isEmoji: true },
  { id: 5, icon: '🎏', name: 'Triangle', isEmoji: true },
  { id: 6, icon: '💒', name: 'Diamond', isEmoji: true },
  { id: 7, icon: '🎡', name: 'Lightning', isEmoji: true },
  { id: 8, icon: '🎠', name: 'Flower', isEmoji: true },
  { id: 9, icon: '🩰', name: 'Moon', isEmoji: true },
  { id: 10, icon: '🎨', name: 'Sun', isEmoji: true },
  { id: 11, icon: '☁️', name: 'Cloud', isEmoji: true },
  { id: 12, icon: '🪅', name: 'Sparkle', isEmoji: true }
];

// Game state
let gameState = {
  difficulty: 'easy',
  cards: [],
  flippedCards: [],
  moves: 0,
  matches: 0,
  gameStarted: false,
  gameActive: false,
  timer: null,
  startTime: null,
  elapsedTime: 0
};

// Difficulty configurations
const difficultyConfig = {
  easy: {
    rows: 3,
    cols: 4,
    pairs: 6
  },
  hard: {
    rows: 4,
    cols: 6,
    pairs: 12
  }
};

// Initialize game on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeGame();
  loadBestScores();
});

function initializeGame() {
  const difficultySelect = document.getElementById('difficulty-select');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const gameBoard = document.getElementById('game-board');

  // Set initial difficulty
  gameState.difficulty = difficultySelect.value;

  // Event listeners
  difficultySelect.addEventListener('change', function() {
    gameState.difficulty = this.value;
    resetGame();
    updateBestScoreDisplay();
  });

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', resetGame);

  // Generate initial cards
  generateCards();
  updateBestScoreDisplay();
}

function generateCards() {
  const config = difficultyConfig[gameState.difficulty];
  const gameBoard = document.getElementById('game-board');
  
  // Clear existing board
  gameBoard.innerHTML = '';
  gameBoard.className = 'game-board';
  gameBoard.classList.add(`difficulty-${gameState.difficulty}`);

  // Select cards based on difficulty
  const selectedCards = cardData.slice(0, config.pairs);
  
  // Create pairs (each card appears twice)
  const cardPairs = [];
  selectedCards.forEach(card => {
    cardPairs.push({ ...card, pairId: card.id });
    cardPairs.push({ ...card, pairId: card.id });
  });

  // Shuffle cards
  shuffleArray(cardPairs);
  
  // Store cards in game state
  gameState.cards = cardPairs.map((card, index) => ({
    ...card,
    index: index,
    flipped: false,
    matched: false
  }));

  // Generate card elements
  gameState.cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index);
    gameBoard.appendChild(cardElement);
  });
}

function createCardElement(card, index) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'memory-card';
  cardDiv.dataset.index = index;
  cardDiv.dataset.pairId = card.pairId;

  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';

  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  cardFront.innerHTML = '<i class="bi bi-question-lg"></i>';

  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  // Check if it's an emoji or Bootstrap icon
  if (card.isEmoji) {
    cardBack.innerHTML = `<span style="font-size: 3rem;">${card.icon}</span>`;
  } else {
    cardBack.innerHTML = `<i class="bi ${card.icon}"></i>`;
  }

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardDiv.appendChild(cardInner);

  // Add click event
  cardDiv.addEventListener('click', function() {
    if (!gameState.gameActive || gameState.cards[index].flipped || gameState.cards[index].matched) {
      return;
    }

    if (gameState.flippedCards.length < 2) {
      flipCard(index);
    }
  });

  return cardDiv;
}

function flipCard(index) {
  const card = gameState.cards[index];
  if (card.flipped || card.matched || gameState.flippedCards.length >= 2) {
    return;
  }

  // Flip the card
  card.flipped = true;
  gameState.flippedCards.push(index);

  const cardElement = document.querySelector(`[data-index="${index}"]`);
  cardElement.classList.add('flipped');

  // Check if two cards are flipped
  if (gameState.flippedCards.length === 2) {
    gameState.moves++;
    updateStats();

    setTimeout(() => {
      checkMatch();
    }, 500);
  }
}

function checkMatch() {
  const [index1, index2] = gameState.flippedCards;
  const card1 = gameState.cards[index1];
  const card2 = gameState.cards[index2];

  if (card1.pairId === card2.pairId) {
    // Match found
    card1.matched = true;
    card2.matched = true;
    gameState.matches++;

    const cardElement1 = document.querySelector(`[data-index="${index1}"]`);
    const cardElement2 = document.querySelector(`[data-index="${index2}"]`);
    
    cardElement1.classList.add('matched');
    cardElement2.classList.add('matched');

    gameState.flippedCards = [];
    updateStats();

    // Check for win
    checkWin();
  } else {
    // No match - flip back
    setTimeout(() => {
      card1.flipped = false;
      card2.flipped = false;

      const cardElement1 = document.querySelector(`[data-index="${index1}"]`);
      const cardElement2 = document.querySelector(`[data-index="${index2}"]`);
      
      cardElement1.classList.remove('flipped');
      cardElement2.classList.remove('flipped');

      gameState.flippedCards = [];
    }, 1000);
  }
}

function checkWin() {
  const config = difficultyConfig[gameState.difficulty];
  if (gameState.matches === config.pairs) {
    // Game won!
    gameState.gameActive = false;
    stopTimer();
    showWinMessage();
    updateBestScore();
  }
}

function startGame() {
  if (gameState.gameStarted && gameState.gameActive) {
    return;
  }

  gameState.gameStarted = true;
  gameState.gameActive = true;
  gameState.moves = 0;
  gameState.matches = 0;
  gameState.flippedCards = [];
  gameState.startTime = Date.now();
  gameState.elapsedTime = 0;

  // Shuffle cards again
  const config = difficultyConfig[gameState.difficulty];
  const selectedCards = cardData.slice(0, config.pairs);
  const cardPairs = [];
  selectedCards.forEach(card => {
    cardPairs.push({ ...card, pairId: card.id });
    cardPairs.push({ ...card, pairId: card.id });
  });
  shuffleArray(cardPairs);

  gameState.cards = cardPairs.map((card, index) => ({
    ...card,
    index: index,
    flipped: false,
    matched: false
  }));

  // Reset and update card elements
  document.querySelectorAll('.memory-card').forEach((cardEl, index) => {
    if (index < gameState.cards.length) {
      const card = gameState.cards[index];
      cardEl.dataset.pairId = card.pairId;
      const cardBack = cardEl.querySelector('.card-back');
      // Check if it's an emoji or Bootstrap icon
      if (card.isEmoji) {
        cardBack.innerHTML = `<span style="font-size: 3rem;">${card.icon}</span>`;
      } else {
        cardBack.innerHTML = `<i class="bi ${card.icon}"></i>`;
      }
      cardEl.classList.remove('flipped', 'matched');
    }
  });

  // Update UI
  document.getElementById('start-btn').disabled = true;
  document.getElementById('restart-btn').disabled = false;
  document.getElementById('difficulty-select').disabled = true;
  document.getElementById('win-message').style.display = 'none';

  updateStats();
  startTimer();
}

function resetGame() {
  gameState.gameStarted = false;
  gameState.gameActive = false;
  gameState.moves = 0;
  gameState.matches = 0;
  gameState.flippedCards = [];
  gameState.elapsedTime = 0;

  stopTimer();

  // Reset all cards
  gameState.cards.forEach(card => {
    card.flipped = false;
    card.matched = false;
  });

  // Reset card elements
  document.querySelectorAll('.memory-card').forEach(cardEl => {
    cardEl.classList.remove('flipped', 'matched');
  });

  // Regenerate cards
  generateCards();

  // Update UI
  document.getElementById('start-btn').disabled = false;
  document.getElementById('restart-btn').disabled = true;
  document.getElementById('difficulty-select').disabled = false;
  document.getElementById('win-message').style.display = 'none';

  updateStats();
  updateTimerDisplay();
}

function updateStats() {
  document.getElementById('moves-count').textContent = gameState.moves;
  document.getElementById('matches-count').textContent = gameState.matches;
}

function startTimer() {
  stopTimer();
  gameState.startTime = Date.now() - gameState.elapsedTime;
  
  gameState.timer = setInterval(() => {
    gameState.elapsedTime = Date.now() - gameState.startTime;
    updateTimerDisplay();
  }, 100);
}

function stopTimer() {
  if (gameState.timer) {
    clearInterval(gameState.timer);
    gameState.timer = null;
  }
}

function updateTimerDisplay() {
  const seconds = Math.floor(gameState.elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
  document.getElementById('timer-display').textContent = timeString;
}

function showWinMessage() {
  const winMessage = document.getElementById('win-message');
  const winMoves = document.getElementById('win-moves');
  const winTime = document.getElementById('win-time');

  winMoves.textContent = gameState.moves;
  winTime.textContent = document.getElementById('timer-display').textContent;

  winMessage.style.display = 'block';
}

function updateBestScore() {
  const key = `memory-game-best-${gameState.difficulty}`;
  const currentBest = localStorage.getItem(key);
  const currentMoves = gameState.moves;

  if (!currentBest || currentMoves < parseInt(currentBest)) {
    localStorage.setItem(key, currentMoves.toString());
    updateBestScoreDisplay();
  }
}

function loadBestScores() {
  updateBestScoreDisplay();
}

function updateBestScoreDisplay() {
  const key = `memory-game-best-${gameState.difficulty}`;
  const bestScore = localStorage.getItem(key);
  const bestScoreElement = document.getElementById('best-score');

  if (bestScore) {
    bestScoreElement.textContent = bestScore + ' moves';
  } else {
    bestScoreElement.textContent = '-';
  }
}

// Utility function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

