// ========================================
// GAME 4: BOSS FIGHT (TIMED CATEGORY HUNT)
// ========================================
// Show many words at once
// Player must find all words in a specific target category within time limit
// Color hints can be toggled on/off for different difficulty levels

let game4State = {
    targetCategory: null,
    allWords: [],
    targetWords: [],
    foundWords: [],
    timeLimit: 30,
    timeLeft: 0,
    timer: null,
    colorHintsEnabled: true,
    round: 1,
    maxRounds: 3
};

/**
 * Initialize Game 4
 */
function initGame4() {
    console.log('Initializing Game 4: Boss Fight');
    
    // Reset game state
    game4State = {
        targetCategory: null,
        allWords: [],
        targetWords: [],
        foundWords: [],
        timeLimit: 30,
        timeLeft: 0,
        timer: null,
        colorHintsEnabled: true,
        round: 1,
        maxRounds: 3
    };
    
    // Reset score
    scores.game4 = 0;
    updateScore('game4', 0);
    
    // Set up color hints toggle
    setupColorHintsToggle();
    
    // Start first round
    startBossRound();
}

/**
 * Set up color hints toggle
 * 
 * DIFFICULTY SETTINGS:
 * - Color hints ON: Easier - words are color-coded by category
 * - Color hints OFF: Harder - all words are same color
 */
function setupColorHintsToggle() {
    const toggle = document.getElementById('color-hints-toggle');
    if (toggle) {
        toggle.checked = game4State.colorHintsEnabled;
        toggle.onchange = () => {
            game4State.colorHintsEnabled = toggle.checked;
            applyColorHints();
        };
    }
}

/**
 * Start a new boss round
 */
function startBossRound() {
    console.log(`Starting Boss Round ${game4State.round}`);
    
    // Choose a random target category
    const categories = ['t', 'd', 'id'];
    game4State.targetCategory = categories[randomInt(0, categories.length - 1)];
    
    // Get words for this round
    // Mix of target and non-target words
    const targetWords = getWordsByCategory(game4State.targetCategory, 8);
    const otherCategories = categories.filter(c => c !== game4State.targetCategory);
    const otherWords = [
        ...getWordsByCategory(otherCategories[0], 6),
        ...getWordsByCategory(otherCategories[1], 6)
    ];
    
    game4State.targetWords = targetWords;
    game4State.allWords = shuffleArray([...targetWords, ...otherWords]);
    game4State.foundWords = [];
    
    // Update display
    const targetDisplay = document.getElementById('target-category-display');
    if (targetDisplay) {
        const catInfo = getCategoryInfo(game4State.targetCategory);
        targetDisplay.textContent = catInfo.ipa;
        targetDisplay.style.color = catInfo.color;
    }
    
    // Update stats
    const totalEl = document.getElementById('boss-total');
    if (totalEl) {
        totalEl.textContent = game4State.targetWords.length;
    }
    document.getElementById('boss-found').textContent = '0';
    
    // Render word grid
    renderBossWordGrid();
    
    // Hide feedback and restart button
    hideFeedback('game4-feedback');
    document.getElementById('game4-restart').style.display = 'none';
    
    // Start timer
    startBossTimer();
}

/**
 * Render the word grid
 */
function renderBossWordGrid() {
    const grid = document.getElementById('boss-word-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    game4State.allWords.forEach(wordObj => {
        const wordCard = createBossWordCard(wordObj);
        grid.appendChild(wordCard);
    });
    
    // Apply color hints if enabled
    applyColorHints();
}

/**
 * Create a word card for boss fight
 */
function createBossWordCard(wordObj) {
    const card = document.createElement('div');
    card.className = 'boss-word-card';
    card.dataset.wordId = wordObj.id;
    card.dataset.category = wordObj.category;
    
    const wordText = document.createElement('span');
    wordText.textContent = wordObj.word;
    
    card.appendChild(wordText);
    
    // Click handler
    card.onclick = () => {
        handleBossWordClick(card, wordObj);
    };
    
    return card;
}

/**
 * Apply or remove color hints
 * 
 * TO MODIFY DIFFICULTY:
 * Change the colors in words-ed.json metadata section
 * Or add different visual hints here (shapes, icons, etc.)
 */
function applyColorHints() {
    const cards = document.querySelectorAll('.boss-word-card');
    
    cards.forEach(card => {
        if (game4State.colorHintsEnabled) {
            // Show color hints
            const category = card.dataset.category;
            const color = getCategoryColor(category);
            card.style.borderColor = color;
            card.style.boxShadow = `0 2px 8px ${color}33`;
        } else {
            // Remove color hints
            card.style.borderColor = '#ddd';
            card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });
}

/**
 * Handle word card click
 */
function handleBossWordClick(card, wordObj) {
    // Don't allow clicks if already found or timer expired
    if (card.classList.contains('found') || 
        card.classList.contains('wrong') || 
        game4State.timeLeft <= 0) {
        return;
    }
    
    const isTarget = wordObj.category === game4State.targetCategory;
    
    if (isTarget) {
        // Correct! This is a target word
        card.classList.add('found');
        game4State.foundWords.push(wordObj.id);
        
        // Update found count
        document.getElementById('boss-found').textContent = game4State.foundWords.length;
        
        // Add points
        updateScore('game4', 20);
        
        // Check if all found
        if (game4State.foundWords.length === game4State.targetWords.length) {
            roundComplete();
        }
        
    } else {
        // Wrong! This is not a target word
        card.classList.add('wrong');
        
        // Deduct points
        updateScore('game4', -10);
        
        // Remove wrong class after a delay
        setTimeout(() => {
            card.classList.remove('wrong');
        }, 1000);
    }
}

/**
 * Start the boss timer
 */
function startBossTimer() {
    // Clear any existing timer
    if (game4State.timer) {
        clearInterval(game4State.timer);
    }
    
    game4State.timeLeft = game4State.timeLimit;
    updateBossTimerDisplay();
    
    game4State.timer = setInterval(() => {
        game4State.timeLeft--;
        updateBossTimerDisplay();
        
        if (game4State.timeLeft <= 0) {
            timeUp();
        }
    }, 1000);
}

/**
 * Update boss timer display
 */
function updateBossTimerDisplay() {
    const timerEl = document.getElementById('boss-timer');
    if (timerEl) {
        timerEl.textContent = game4State.timeLeft;
        
        // Change color as time runs out
        if (game4State.timeLeft <= 5) {
            timerEl.style.color = '#FF6B6B';
        } else if (game4State.timeLeft <= 10) {
            timerEl.style.color = '#FFE66D';
        } else {
            timerEl.style.color = '#4ECDC4';
        }
    }
}

/**
 * Handle round complete
 */
function roundComplete() {
    // Stop timer
    if (game4State.timer) {
        clearInterval(game4State.timer);
    }
    
    // Bonus points for time remaining
    const timeBonus = game4State.timeLeft * 5;
    updateScore('game4', timeBonus);
    
    // Show all target words
    highlightAllTargetWords();
    
    showFeedback('game4-feedback', 
        `🎉 Perfect! All ${game4State.targetWords.length} words found!\n` +
        `Time bonus: +${timeBonus} points`, 
        'success', 0);
    
    // Show next round button
    showNextRoundButton();
}

/**
 * Handle time up
 */
function timeUp() {
    // Stop timer
    if (game4State.timer) {
        clearInterval(game4State.timer);
    }
    
    // Highlight all target words (including unfound ones)
    highlightAllTargetWords();
    
    const found = game4State.foundWords.length;
    const total = game4State.targetWords.length;
    const missed = total - found;
    
    showFeedback('game4-feedback', 
        `⏰ Time's up!\n` +
        `You found ${found} out of ${total} words.\n` +
        `Missed: ${missed}`, 
        'error', 0);
    
    // Show next round button
    showNextRoundButton();
}

/**
 * Highlight all target words
 */
function highlightAllTargetWords() {
    const cards = document.querySelectorAll('.boss-word-card');
    cards.forEach(card => {
        if (card.dataset.category === game4State.targetCategory) {
            if (!card.classList.contains('found')) {
                card.classList.add('missed');
            }
        }
    });
}

/**
 * Show next round button
 */
function showNextRoundButton() {
    const restartBtn = document.getElementById('game4-restart');
    if (restartBtn) {
        restartBtn.style.display = 'block';
        
        if (game4State.round < game4State.maxRounds) {
            restartBtn.textContent = 'Next Round';
            restartBtn.onclick = () => {
                game4State.round++;
                startBossRound();
            };
        } else {
            restartBtn.textContent = 'Complete!';
            restartBtn.onclick = () => {
                endGame4();
            };
        }
    }
}

/**
 * End Game 4
 */
function endGame4() {
    showFeedback('game4-feedback', 
        `🎉 Boss Fight Complete!\n` +
        `All ${game4State.maxRounds} rounds finished!\n` +
        `Final Score: ${scores.game4}`, 
        'success', 0);
    
    const restartBtn = document.getElementById('game4-restart');
    if (restartBtn) {
        restartBtn.textContent = 'Back to Menu';
        restartBtn.onclick = () => {
            // Ask if they want to see the ending
            if (confirm('Great job! Would you like to see the ending video?')) {
                showEnding();
            } else {
                showScreen('game-nav-screen');
            }
        };
    }
}

console.log('Game 4 module loaded');
