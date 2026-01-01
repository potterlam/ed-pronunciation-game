// ========================================
// MAIN.JS - Shared Utilities and Game Controller
// ========================================
// This file handles:
// - Loading the dataset from JSON
// - Audio playback utilities
// - Score management
// - Screen navigation
// - Shared game utilities

// ========================================
// GLOBAL STATE
// ========================================
let gameData = null; // Will store the loaded dataset
let totalScore = 0;  // Cumulative score across all games
let currentScreen = 'intro-screen'; // Track current screen

// Individual game scores
let scores = {
    game1: 0,
    game2: 0,
    game3: 0,
    game4: 0
};

// Audio element for playing word pronunciations
const audioPlayer = document.getElementById('word-audio');

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Initializing game...');
    
    // Load the dataset
    await loadGameData();
    
    // Set up navigation event listeners
    setupNavigation();
    
    // Show intro screen
    showScreen('intro-screen');
});

// ========================================
// DATA LOADING
// ========================================
/**
 * Load the words-ed.json dataset
 * This function loads the data and makes it available to all games
 * 
 * TO EXTEND: To add new grammar targets (e.g., plural -s), 
 * create a new JSON file (e.g., words-plural.json) and modify this 
 * function to load different datasets based on game mode
 */
async function loadGameData() {
    try {
        const response = await fetch('data/words-ed.json');
        if (!response.ok) {
            throw new Error('Failed to load game data');
        }
        gameData = await response.json();
        console.log('Game data loaded:', gameData);
        console.log(`Loaded ${gameData.words.length} words`);
    } catch (error) {
        console.error('Error loading game data:', error);
        alert('Failed to load game data. Please refresh the page.');
    }
}

/**
 * Get words filtered by category
 * @param {string} category - The category to filter by ('t', 'd', or 'id')
 * @param {number} limit - Maximum number of words to return (optional)
 * @returns {Array} Filtered array of word objects
 */
function getWordsByCategory(category, limit = null) {
    if (!gameData || !gameData.words) return [];
    
    const filtered = gameData.words.filter(word => word.category === category);
    
    if (limit) {
        return shuffleArray(filtered).slice(0, limit);
    }
    
    return filtered;
}

/**
 * Get random words from the dataset
 * @param {number} count - Number of words to get
 * @param {number} difficulty - Filter by difficulty level (optional)
 * @returns {Array} Random array of word objects
 */
function getRandomWords(count, difficulty = null) {
    if (!gameData || !gameData.words) return [];
    
    let words = gameData.words;
    
    // Filter by difficulty if specified
    if (difficulty !== null) {
        words = words.filter(word => word.difficulty === difficulty);
    }
    
    return shuffleArray(words).slice(0, count);
}

/**
 * Get words ensuring equal distribution across categories
 * @param {number} perCategory - Number of words per category
 * @returns {Array} Shuffled array with equal words from each category
 */
function getBalancedWords(perCategory) {
    const tWords = getWordsByCategory('t', perCategory);
    const dWords = getWordsByCategory('d', perCategory);
    const idWords = getWordsByCategory('id', perCategory);
    
    return shuffleArray([...tWords, ...dWords, ...idWords]);
}

// ========================================
// AUDIO UTILITIES
// ========================================
/**
 * Play audio for a specific word
 * @param {string} audioFile - The filename of the audio file
 * @returns {Promise} Resolves when audio finishes playing
 * 
 * NOTE: Audio files should be placed in assets/audio/
 * File format: MP3 recommended for broad browser support
 */
function playAudio(audioFile) {
    return new Promise((resolve, reject) => {
        if (!audioFile) {
            console.warn('No audio file specified');
            resolve();
            return;
        }
        
        audioPlayer.src = `assets/audio/${audioFile}`;
        audioPlayer.play()
            .then(() => {
                audioPlayer.onended = resolve;
            })
            .catch(error => {
                console.error('Error playing audio:', error);
                // Resolve anyway to not block game flow
                resolve();
            });
    });
}

/**
 * Play audio for a word object
 * @param {Object} wordObj - Word object from the dataset
 */
function playWordAudio(wordObj) {
    if (wordObj && wordObj.audioFile) {
        playAudio(wordObj.audioFile);
    }
}

/**
 * Stop currently playing audio
 */
function stopAudio() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

// ========================================
// SCORE MANAGEMENT
// ========================================
/**
 * Update score for a specific game
 * @param {string} game - Game identifier (e.g., 'game1', 'game2')
 * @param {number} points - Points to add (can be negative)
 */
function updateScore(game, points) {
    scores[game] = Math.max(0, (scores[game] || 0) + points);
    
    // Update display if element exists
    const scoreElement = document.getElementById(`${game}-score`);
    if (scoreElement) {
        scoreElement.textContent = scores[game];
    }
    
    // Update total score
    calculateTotalScore();
}

/**
 * Calculate and update total score
 */
function calculateTotalScore() {
    totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    const totalScoreElement = document.getElementById('total-score');
    if (totalScoreElement) {
        totalScoreElement.textContent = totalScore;
    }
}

/**
 * Reset all scores
 */
function resetScores() {
    scores = {
        game1: 0,
        game2: 0,
        game3: 0,
        game4: 0
    };
    totalScore = 0;
    calculateTotalScore();
}

// ========================================
// SCREEN NAVIGATION
// ========================================
/**
 * Show a specific screen and hide all others
 * @param {string} screenId - ID of the screen to show
 */
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        
        // Stop any playing audio when changing screens
        stopAudio();
    }
}

/**
 * Set up navigation event listeners
 */
function setupNavigation() {
    // Start game button
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            showScreen('game-nav-screen');
        });
    }
    
    // Game selection cards
    const gameCards = document.querySelectorAll('.game-card button');
    gameCards.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const gameNumber = index + 1;
            startGame(gameNumber);
        });
    });
    
    // Back buttons in games
    const backButtons = document.querySelectorAll('.btn-back');
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showScreen('game-nav-screen');
        });
    });
    
    // Play again button
    const playAgainBtn = document.getElementById('play-again-btn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', () => {
            resetScores();
            showScreen('intro-screen');
        });
    }
    
    // View results button
    const viewResultsBtn = document.getElementById('view-results-btn');
    if (viewResultsBtn) {
        viewResultsBtn.addEventListener('click', () => {
            showScreen('game-nav-screen');
        });
    }
    
    // Video ended events
    setupVideoHandlers();
}

/**
 * Set up video event handlers
 * 
 * TO CUSTOMIZE: 
 * - Intro video: Place your CapCut intro video at assets/video/intro.mp4
 * - Ending video: Place your ending video at assets/video/ending.mp4
 * - Videos will auto-advance when finished (optional)
 */
function setupVideoHandlers() {
    const introVideo = document.getElementById('intro-video');
    const endingVideo = document.getElementById('ending-video');
    
    // Optional: Auto-advance after intro video
    if (introVideo) {
        introVideo.addEventListener('ended', () => {
            console.log('Intro video ended');
            // Uncomment to auto-advance:
            // showScreen('game-nav-screen');
        });
    }
    
    // Optional: Actions after ending video
    if (endingVideo) {
        endingVideo.addEventListener('ended', () => {
            console.log('Ending video ended');
        });
    }
}

/**
 * Start a specific game
 * @param {number} gameNumber - Game number (1-4)
 */
function startGame(gameNumber) {
    const screenId = `game${gameNumber}-screen`;
    showScreen(screenId);
    
    // Initialize the specific game
    switch(gameNumber) {
        case 1:
            if (typeof initGame1 === 'function') initGame1();
            break;
        case 2:
            if (typeof initGame2 === 'function') initGame2();
            break;
        case 3:
            if (typeof initGame3 === 'function') initGame3();
            break;
        case 4:
            if (typeof initGame4 === 'function') initGame4();
            break;
    }
}

/**
 * Navigate to ending screen
 */
function showEnding() {
    // Update final score display
    const finalScoreElement = document.getElementById('final-score');
    if (finalScoreElement) {
        finalScoreElement.textContent = totalScore;
    }
    
    showScreen('ending-screen');
    
    // Auto-play ending video
    const endingVideo = document.getElementById('ending-video');
    if (endingVideo) {
        endingVideo.play().catch(e => console.log('Auto-play prevented:', e));
    }
}

// ========================================
// FEEDBACK UTILITIES
// ========================================
/**
 * Show feedback message
 * @param {string} elementId - ID of feedback element
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success', 'error', 'info')
 * @param {number} duration - How long to show (ms), 0 for permanent
 */
function showFeedback(elementId, message, type = 'info', duration = 2000) {
    const feedbackEl = document.getElementById(elementId);
    if (!feedbackEl) return;
    
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback-message feedback-${type}`;
    feedbackEl.style.display = 'block';
    
    if (duration > 0) {
        setTimeout(() => {
            feedbackEl.style.display = 'none';
        }, duration);
    }
}

/**
 * Hide feedback message
 * @param {string} elementId - ID of feedback element
 */
function hideFeedback(elementId) {
    const feedbackEl = document.getElementById(elementId);
    if (feedbackEl) {
        feedbackEl.style.display = 'none';
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
/**
 * Shuffle an array (Fisher-Yates algorithm)
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled copy of array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Get random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Wait for a specified duration
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Resolves after duration
 */
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get category information
 * @param {string} categoryId - Category ID ('t', 'd', or 'id')
 * @returns {Object} Category information object
 */
function getCategoryInfo(categoryId) {
    if (!gameData || !gameData.metadata) return null;
    return gameData.metadata.categories.find(cat => cat.id === categoryId);
}

/**
 * Get category color for visual hints
 * @param {string} categoryId - Category ID
 * @returns {string} Hex color code
 */
function getCategoryColor(categoryId) {
    const catInfo = getCategoryInfo(categoryId);
    return catInfo ? catInfo.color : '#999999';
}

// ========================================
// EXPORT FOR OTHER MODULES
// ========================================
// These functions are available globally for game modules to use
console.log('Main.js loaded - Utilities available');
