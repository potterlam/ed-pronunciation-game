// ========================================
// GAME 1: SORTING PUZZLE
// ========================================
// Players drag or click words into the correct pronunciation category
// Provides immediate feedback on correct/incorrect placements

let game1State = {
    currentWords: [],
    correctPlacements: 0,
    totalWords: 0,
    round: 1,
    maxRounds: 3
};

/**
 * Initialize Game 1
 */
function initGame1() {
    console.log('Initializing Game 1: Sorting Puzzle');
    
    // Reset game state
    game1State = {
        currentWords: [],
        correctPlacements: 0,
        totalWords: 0,
        round: 1,
        maxRounds: 3
    };
    
    // Reset score for this game
    scores.game1 = 0;
    updateScore('game1', 0);
    
    // Start first round
    startGame1Round();
}

/**
 * Start a new round of Game 1
 */
function startGame1Round() {
    console.log(`Starting Game 1 Round ${game1State.round}`);
    
    // Get balanced words for this round (2 from each category)
    game1State.currentWords = getBalancedWords(2);
    game1State.totalWords = game1State.currentWords.length;
    game1State.correctPlacements = 0;
    
    // Clear previous content
    clearGame1();
    
    // Render words in the word pool
    renderWordPool();
    
    // Set up drag and drop or click functionality
    setupDragAndDrop();
    
    // Hide feedback and next button
    hideFeedback('game1-feedback');
    document.getElementById('game1-next').style.display = 'none';
}

/**
 * Clear game 1 elements
 */
function clearGame1() {
    // Clear word pool
    const wordPool = document.getElementById('word-pool');
    if (wordPool) wordPool.innerHTML = '';
    
    // Clear drop zones
    const dropAreas = document.querySelectorAll('.drop-area');
    dropAreas.forEach(area => {
        area.innerHTML = '';
    });
}

/**
 * Render words in the word pool
 */
function renderWordPool() {
    const wordPool = document.getElementById('word-pool');
    if (!wordPool) return;
    
    game1State.currentWords.forEach(wordObj => {
        const wordCard = createWordCard(wordObj);
        wordPool.appendChild(wordCard);
    });
}

/**
 * Create a word card element
 * @param {Object} wordObj - Word object from dataset
 * @returns {HTMLElement} Word card element
 */
function createWordCard(wordObj) {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.dataset.wordId = wordObj.id;
    card.dataset.category = wordObj.category;
    card.draggable = true;
    
    const wordText = document.createElement('span');
    wordText.className = 'word-text';
    wordText.textContent = wordObj.word;
    
    const audioBtn = document.createElement('button');
    audioBtn.className = 'word-audio-btn';
    audioBtn.innerHTML = '🔊';
    audioBtn.onclick = (e) => {
        e.stopPropagation();
        playWordAudio(wordObj);
    };
    
    card.appendChild(wordText);
    card.appendChild(audioBtn);
    
    return card;
}

/**
 * Set up drag and drop functionality
 */
function setupDragAndDrop() {
    const wordCards = document.querySelectorAll('.word-card');
    const dropAreas = document.querySelectorAll('.drop-area');
    
    // Drag events for word cards
    wordCards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        
        // Also allow click-to-select functionality
        card.addEventListener('click', handleCardClick);
    });
    
    // Drop events for drop zones
    dropAreas.forEach(area => {
        area.addEventListener('dragover', handleDragOver);
        area.addEventListener('drop', handleDrop);
        area.addEventListener('dragleave', handleDragLeave);
    });
}

let draggedElement = null;
let selectedCard = null;

/**
 * Handle drag start
 */
function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

/**
 * Handle drag end
 */
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

/**
 * Handle drag over
 */
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    e.target.classList.add('drag-over');
    return false;
}

/**
 * Handle drag leave
 */
function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

/**
 * Handle drop
 */
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    e.target.classList.remove('drag-over');
    
    if (draggedElement) {
        const targetCategory = e.target.dataset.category;
        const wordCategory = draggedElement.dataset.category;
        
        // Move the card to the drop zone
        e.target.appendChild(draggedElement);
        
        // Check if correct
        checkPlacement(draggedElement, targetCategory, wordCategory);
        
        draggedElement = null;
    }
    
    return false;
}

/**
 * Handle card click (alternative to drag and drop)
 */
function handleCardClick(e) {
    const card = e.currentTarget;
    
    // If no card is selected, select this one
    if (!selectedCard) {
        selectedCard = card;
        card.classList.add('selected');
        
        // Highlight drop zones
        document.querySelectorAll('.drop-area').forEach(area => {
            area.classList.add('clickable');
            area.onclick = () => {
                placeSelectedCard(area);
            };
        });
    } else {
        // Deselect if clicking the same card
        if (selectedCard === card) {
            deselectCard();
        }
    }
}

/**
 * Place selected card in a drop area
 */
function placeSelectedCard(dropArea) {
    if (!selectedCard) return;
    
    const targetCategory = dropArea.dataset.category;
    const wordCategory = selectedCard.dataset.category;
    
    // Move the card
    dropArea.appendChild(selectedCard);
    
    // Check if correct
    checkPlacement(selectedCard, targetCategory, wordCategory);
    
    // Deselect
    deselectCard();
}

/**
 * Deselect current card
 */
function deselectCard() {
    if (selectedCard) {
        selectedCard.classList.remove('selected');
        selectedCard = null;
    }
    
    // Remove clickable state from drop areas
    document.querySelectorAll('.drop-area').forEach(area => {
        area.classList.remove('clickable');
        area.onclick = null;
    });
}

/**
 * Check if placement is correct
 */
function checkPlacement(card, targetCategory, wordCategory) {
    const isCorrect = targetCategory === wordCategory;
    
    if (isCorrect) {
        card.classList.add('correct');
        card.classList.remove('incorrect');
        game1State.correctPlacements++;
        
        // Add points
        updateScore('game1', 10);
        
        // Play success sound (optional)
        showFeedback('game1-feedback', '✓ Correct!', 'success', 1000);
        
    } else {
        card.classList.add('incorrect');
        card.classList.remove('correct');
        
        // Show the correct category
        const correctCat = getCategoryInfo(wordCategory);
        showFeedback('game1-feedback', 
            `✗ Incorrect. "${card.querySelector('.word-text').textContent}" is pronounced ${correctCat.ipa}`, 
            'error', 3000);
        
        // Deduct points (optional)
        updateScore('game1', -5);
    }
    
    // Disable dragging and clicking for this card
    card.draggable = false;
    card.onclick = null;
    
    // Check if round is complete
    checkRoundComplete();
}

/**
 * Check if the round is complete
 */
function checkRoundComplete() {
    const placedCards = document.querySelectorAll('.drop-area .word-card');
    
    if (placedCards.length === game1State.totalWords) {
        // Round complete
        setTimeout(() => {
            const correctCount = document.querySelectorAll('.word-card.correct').length;
            const accuracy = Math.round((correctCount / game1State.totalWords) * 100);
            
            showFeedback('game1-feedback', 
                `Round ${game1State.round} complete! Accuracy: ${accuracy}%`, 
                'info', 0);
            
            // Show next button
            const nextBtn = document.getElementById('game1-next');
            if (nextBtn) {
                nextBtn.style.display = 'block';
                nextBtn.onclick = () => {
                    if (game1State.round < game1State.maxRounds) {
                        game1State.round++;
                        startGame1Round();
                    } else {
                        // Game complete
                        endGame1();
                    }
                };
            }
        }, 500);
    }
}

/**
 * End Game 1
 */
function endGame1() {
    showFeedback('game1-feedback', 
        `🎉 Game 1 Complete! Final Score: ${scores.game1}`, 
        'success', 0);
    
    const nextBtn = document.getElementById('game1-next');
    if (nextBtn) {
        nextBtn.textContent = 'Back to Menu';
        nextBtn.onclick = () => {
            showScreen('game-nav-screen');
        };
    }
}

console.log('Game 1 module loaded');
