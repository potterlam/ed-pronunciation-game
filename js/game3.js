// ========================================
// GAME 3: MULTIPLE CHOICE
// ========================================
// Show a word with its sentence
// Players listen to audio and choose the correct pronunciation

let game3State = {
    currentQuestionIndex: 0,
    questions: [],
    correctAnswers: 0,
    totalQuestions: 10
};

/**
 * Initialize Game 3
 */
function initGame3() {
    console.log('Initializing Game 3: Multiple Choice');
    
    // Reset game state
    game3State = {
        currentQuestionIndex: 0,
        questions: [],
        correctAnswers: 0,
        totalQuestions: 10
    };
    
    // Reset score
    scores.game3 = 0;
    updateScore('game3', 0);
    
    // Get random words for questions
    game3State.questions = getRandomWords(game3State.totalQuestions);
    
    // Update total questions display
    const totalQuestionsEl = document.getElementById('total-questions');
    if (totalQuestionsEl) {
        totalQuestionsEl.textContent = game3State.totalQuestions;
    }
    
    // Set up choice buttons
    setupGame3Buttons();
    
    // Show first question
    showQuestion();
}

/**
 * Set up choice buttons
 */
function setupGame3Buttons() {
    const choiceButtons = document.querySelectorAll('#game3-screen .choice-btn');
    
    choiceButtons.forEach(btn => {
        btn.onclick = () => {
            handleChoice(btn.dataset.choice);
        };
    });
    
    // Set up audio button
    const audioBtn = document.getElementById('game3-audio');
    if (audioBtn) {
        audioBtn.onclick = () => {
            const currentQuestion = game3State.questions[game3State.currentQuestionIndex];
            if (currentQuestion) {
                playWordAudio(currentQuestion);
            }
        };
    }
    
    // Set up next button
    const nextBtn = document.getElementById('game3-next');
    if (nextBtn) {
        nextBtn.onclick = () => {
            nextQuestion();
        };
    }
}

/**
 * Show current question
 */
function showQuestion() {
    // Check if all questions answered
    if (game3State.currentQuestionIndex >= game3State.questions.length) {
        endGame3();
        return;
    }
    
    const currentQuestion = game3State.questions[game3State.currentQuestionIndex];
    
    // Update question number
    const questionNumberEl = document.getElementById('question-number');
    if (questionNumberEl) {
        questionNumberEl.textContent = game3State.currentQuestionIndex + 1;
    }
    
    // Display word
    const wordEl = document.getElementById('question-word');
    if (wordEl) {
        wordEl.textContent = currentQuestion.word;
    }
    
    // Display example sentence
    const sentenceEl = document.getElementById('question-sentence');
    if (sentenceEl) {
        sentenceEl.textContent = currentQuestion.exampleSentence || '';
    }
    
    // Reset button states
    enableChoiceButtons();
    clearChoiceHighlights();
    
    // Hide next button and feedback
    document.getElementById('game3-next').style.display = 'none';
    hideFeedback('game3-feedback');
    
    // Auto-play audio after a short delay
    setTimeout(() => {
        playWordAudio(currentQuestion);
    }, 500);
}

/**
 * Handle choice selection
 */
function handleChoice(selectedChoice) {
    const currentQuestion = game3State.questions[game3State.currentQuestionIndex];
    const isCorrect = selectedChoice === currentQuestion.category;
    
    // Disable all buttons
    disableChoiceButtons();
    
    if (isCorrect) {
        // Correct answer
        game3State.correctAnswers++;
        updateScore('game3', 15);
        
        showFeedback('game3-feedback', 
            `✓ Excellent! "${currentQuestion.word}" is pronounced ${getCategoryInfo(currentQuestion.category).ipa}`, 
            'success', 0);
        
        // Highlight correct button
        highlightChoice(selectedChoice, 'correct');
        
    } else {
        // Wrong answer
        updateScore('game3', -5);
        
        const correctCat = getCategoryInfo(currentQuestion.category);
        showFeedback('game3-feedback', 
            `✗ Not quite. "${currentQuestion.word}" is pronounced ${correctCat.ipa}\n${correctCat.rule}`, 
            'error', 0);
        
        // Highlight wrong and correct buttons
        highlightChoice(selectedChoice, 'incorrect');
        highlightChoice(currentQuestion.category, 'correct');
    }
    
    // Show next button
    document.getElementById('game3-next').style.display = 'block';
}

/**
 * Move to next question
 */
function nextQuestion() {
    game3State.currentQuestionIndex++;
    showQuestion();
}

/**
 * Enable choice buttons
 */
function enableChoiceButtons() {
    const buttons = document.querySelectorAll('#game3-screen .choice-btn');
    buttons.forEach(btn => {
        btn.disabled = false;
    });
}

/**
 * Disable choice buttons
 */
function disableChoiceButtons() {
    const buttons = document.querySelectorAll('#game3-screen .choice-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
    });
}

/**
 * Highlight a choice button
 */
function highlightChoice(choice, className) {
    const button = document.querySelector(`#game3-screen .choice-btn[data-choice="${choice}"]`);
    if (button) {
        button.classList.add(className);
    }
}

/**
 * Clear choice highlights
 */
function clearChoiceHighlights() {
    const buttons = document.querySelectorAll('#game3-screen .choice-btn');
    buttons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
    });
}

/**
 * End Game 3
 */
function endGame3() {
    // Calculate accuracy
    const accuracy = Math.round((game3State.correctAnswers / game3State.totalQuestions) * 100);
    
    // Hide question display
    const wordEl = document.getElementById('question-word');
    if (wordEl) {
        wordEl.textContent = '🎉 Quiz Complete!';
    }
    
    const sentenceEl = document.getElementById('question-sentence');
    if (sentenceEl) {
        sentenceEl.textContent = '';
    }
    
    // Disable buttons
    disableChoiceButtons();
    
    // Hide audio button
    const audioBtn = document.getElementById('game3-audio');
    if (audioBtn) {
        audioBtn.style.display = 'none';
    }
    
    // Show final results
    showFeedback('game3-feedback', 
        `Congratulations!\n` +
        `Correct Answers: ${game3State.correctAnswers}/${game3State.totalQuestions}\n` +
        `Accuracy: ${accuracy}%\n` +
        `Final Score: ${scores.game3}`, 
        'success', 0);
    
    // Change next button to return button
    const nextBtn = document.getElementById('game3-next');
    if (nextBtn) {
        nextBtn.textContent = 'Back to Menu';
        nextBtn.style.display = 'block';
        nextBtn.onclick = () => {
            // Reset audio button visibility
            if (audioBtn) audioBtn.style.display = 'inline-block';
            nextBtn.textContent = 'Next Question';
            showScreen('game-nav-screen');
        };
    }
}

console.log('Game 3 module loaded');
