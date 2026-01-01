// ========================================
// GAME 2: FALLING WORDS (REACTION GAME)
// ========================================
// Words appear one at a time with a countdown timer
// Players must quickly choose the correct pronunciation

let game2State = {
    currentWordIndex: 0,
    words: [],
    correctCount: 0,
    wrongCount: 0,
    timePerWord: 8000, // 8 seconds per word
    timer: null,
    timeLeft: 0,
    totalWords: 15
};

/**
 * Initialize Game 2
 */
function initGame2() {
    console.log('Initializing Game 2: Falling Words');
    
    // Reset game state
    game2State = {
        currentWordIndex: 0,
        words: [],
        correctCount: 0,
        wrongCount: 0,
        timePerWord: 8000,
        timer: null,
        timeLeft: 0,
        totalWords: 15
    };
    
    // Reset score
    scores.game2 = 0;
    updateScore('game2', 0);
    
    // Reset stats display
    document.getElementById('game2-correct').textContent = '0';
    document.getElementById('game2-wrong').textContent = '0';
    
    // Get random words
    game2State.words = getRandomWords(game2State.totalWords);
    
    // Set up answer buttons
    setupGame2Buttons();
    
    // Start first word
    showNextWord();
}

/**
 * Set up answer buttons
 */
function setupGame2Buttons() {
    const answerButtons = document.querySelectorAll('#game2-screen .answer-btn');
    
    answerButtons.forEach(btn => {
        btn.onclick = () => {
            handleAnswer(btn.dataset.answer);
        };
    });
    
    // Set up audio button
    const audioBtn = document.getElementById('game2-audio');
    if (audioBtn) {
        audioBtn.onclick = () => {
            const currentWord = game2State.words[game2State.currentWordIndex];
            if (currentWord) {
                playWordAudio(currentWord);
            }
        };
    }
}

/**
 * Show next word
 */
function showNextWord() {
    // Check if game is complete
    if (game2State.currentWordIndex >= game2State.words.length) {
        endGame2();
        return;
    }
    
    const currentWord = game2State.words[game2State.currentWordIndex];
    
    // Display word
    const wordDisplay = document.getElementById('current-word');
    if (wordDisplay) {
        wordDisplay.textContent = currentWord.word;
        
        // Animate in
        wordDisplay.style.animation = 'none';
        setTimeout(() => {
            wordDisplay.style.animation = 'fadeInDown 0.5s ease';
        }, 10);
    }
    
    // Enable buttons
    enableAnswerButtons();
    
    // Hide feedback
    hideFeedback('game2-feedback');
    
    // Start timer
    startTimer();
    
    // Auto-play audio (optional)
    setTimeout(() => {
        playWordAudio(currentWord);
    }, 500);
}

/**
 * Start countdown timer
 */
function startTimer() {
    // Clear any existing timer
    if (game2State.timer) {
        clearInterval(game2State.timer);
    }
    
    game2State.timeLeft = game2State.timePerWord;
    updateTimerDisplay();
    
    game2State.timer = setInterval(() => {
        game2State.timeLeft -= 100;
        updateTimerDisplay();
        
        if (game2State.timeLeft <= 0) {
            // Time's up
            handleTimeout();
        }
    }, 100);
}

/**
 * Update timer display
 */
function updateTimerDisplay() {
    const timeBar = document.getElementById('time-bar');
    if (timeBar) {
        const percentage = (game2State.timeLeft / game2State.timePerWord) * 100;
        timeBar.style.width = percentage + '%';
        
        // Change color as time runs out
        if (percentage < 30) {
            timeBar.style.backgroundColor = '#FF6B6B';
        } else if (percentage < 60) {
            timeBar.style.backgroundColor = '#FFE66D';
        } else {
            timeBar.style.backgroundColor = '#4ECDC4';
        }
    }
}

/**
 * Handle answer selection
 */
function handleAnswer(selectedCategory) {
    // Stop timer
    if (game2State.timer) {
        clearInterval(game2State.timer);
    }
    
    const currentWord = game2State.words[game2State.currentWordIndex];
    const isCorrect = selectedCategory === currentWord.category;
    
    // Disable buttons
    disableAnswerButtons();
    
    if (isCorrect) {
        // Correct answer
        game2State.correctCount++;
        document.getElementById('game2-correct').textContent = game2State.correctCount;
        
        // Calculate points based on speed
        const speedBonus = Math.floor((game2State.timeLeft / game2State.timePerWord) * 10);
        const points = 10 + speedBonus;
        updateScore('game2', points);
        
        showFeedback('game2-feedback', 
            `✓ Correct! +${points} points`, 
            'success', 1500);
        
        // Highlight correct button
        highlightButton(selectedCategory, 'correct');
        
    } else {
        // Wrong answer
        game2State.wrongCount++;
        document.getElementById('game2-wrong').textContent = game2State.wrongCount;
        
        updateScore('game2', -5);
        
        const correctCat = getCategoryInfo(currentWord.category);
        showFeedback('game2-feedback', 
            `✗ Wrong! Correct answer: ${correctCat.ipa}`, 
            'error', 2000);
        
        // Highlight wrong and correct buttons
        highlightButton(selectedCategory, 'incorrect');
        highlightButton(currentWord.category, 'correct');
    }
    
    // Move to next word after delay
    setTimeout(() => {
        clearButtonHighlights();
        game2State.currentWordIndex++;
        showNextWord();
    }, 2000);
}

/**
 * Handle timeout (no answer given)
 */
function handleTimeout() {
    if (game2State.timer) {
        clearInterval(game2State.timer);
    }
    
    game2State.wrongCount++;
    document.getElementById('game2-wrong').textContent = game2State.wrongCount;
    
    const currentWord = game2State.words[game2State.currentWordIndex];
    const correctCat = getCategoryInfo(currentWord.category);
    
    showFeedback('game2-feedback', 
        `⏰ Time's up! Correct answer: ${correctCat.ipa}`, 
        'error', 2000);
    
    // Highlight correct answer
    highlightButton(currentWord.category, 'correct');
    
    // Disable buttons
    disableAnswerButtons();
    
    // Move to next word
    setTimeout(() => {
        clearButtonHighlights();
        game2State.currentWordIndex++;
        showNextWord();
    }, 2000);
}

/**
 * Enable answer buttons
 */
function enableAnswerButtons() {
    const buttons = document.querySelectorAll('#game2-screen .answer-btn');
    buttons.forEach(btn => {
        btn.disabled = false;
    });
}

/**
 * Disable answer buttons
 */
function disableAnswerButtons() {
    const buttons = document.querySelectorAll('#game2-screen .answer-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
    });
}

/**
 * Highlight a button
 */
function highlightButton(category, className) {
    const button = document.querySelector(`#game2-screen .answer-btn[data-answer="${category}"]`);
    if (button) {
        button.classList.add(className);
    }
}

/**
 * Clear button highlights
 */
function clearButtonHighlights() {
    const buttons = document.querySelectorAll('#game2-screen .answer-btn');
    buttons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
    });
}

/**
 * End Game 2
 */
function endGame2() {
    // Stop timer
    if (game2State.timer) {
        clearInterval(game2State.timer);
    }
    
    // Calculate accuracy
    const accuracy = Math.round((game2State.correctCount / game2State.words.length) * 100);
    
    // Hide word display
    const wordDisplay = document.getElementById('current-word');
    if (wordDisplay) {
        wordDisplay.textContent = 'Game Complete!';
    }
    
    // Disable buttons
    disableAnswerButtons();
    
    // Show final results
    showFeedback('game2-feedback', 
        `🎉 Game 2 Complete!\n` +
        `Correct: ${game2State.correctCount} | Wrong: ${game2State.wrongCount}\n` +
        `Accuracy: ${accuracy}% | Final Score: ${scores.game2}`, 
        'success', 0);
    
    // Show message to return
    setTimeout(() => {
        if (confirm('Game 2 complete! Return to menu?')) {
            showScreen('game-nav-screen');
        }
    }, 3000);
}

console.log('Game 2 module loaded');
