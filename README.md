# 🎮 Past Tense -ED Pronunciation Game

An interactive web-based educational game designed to teach English past tense "-ed" pronunciation (/t/, /d/, /ɪd/) to primary students.

## 📁 Project Structure

```
ed-pronunciation-game/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles
├── js/
│   ├── main.js            # Core utilities and game controller
│   ├── game1.js           # Sorting Puzzle game
│   ├── game2.js           # Falling Words game
│   ├── game3.js           # Multiple Choice game
│   └── game4.js           # Boss Fight game
├── data/
│   └── words-ed.json      # Dataset with 55 words
├── assets/
│   ├── audio/             # MP3 files for word pronunciations
│   └── video/             # Intro and ending videos
│       ├── intro.mp4      # (Place your intro video here)
│       └── ending.mp4     # (Place your ending video here)
└── README.md              # This file
```

## 🎯 Features

### Four Mini-Games

1. **Sorting Puzzle** - Drag or click words into correct pronunciation categories
2. **Falling Words** - Quick reaction game with timer
3. **Multiple Choice** - Listen and select the correct pronunciation
4. **Boss Fight** - Find all words in target category within time limit

### Dataset Features

- **55 words** divided into three categories:
  - `/t/` pronunciation (15 words)
  - `/d/` pronunciation (20 words)  
  - `/ɪd/` pronunciation (20 words)
  
- Each word includes:
  - Word and base form
  - IPA pronunciation
  - Category
  - Audio file path
  - Example sentence
  - Difficulty level (1-3)

## 🚀 Getting Started

### 1. Audio Files

You need to add MP3 audio files for each word. Place them in `assets/audio/`:

- walked.mp3
- talked.mp3
- helped.mp3
- ... (see words-ed.json for complete list)

**How to generate audio files:**
- Use text-to-speech services (Google TTS, Amazon Polly, etc.)
- Record your own voice
- Use online tools like [TTSMaker](https://ttsmaker.com/) or [Natural Reader](https://www.naturalreaders.com/)

### 2. Videos

Place your CapCut videos in `assets/video/`:
- `intro.mp4` - Introduces the story and explains the three pronunciation rules
- `ending.mp4` - Wraps up the story and encourages replay

### 3. Running the Game

Simply open `index.html` in a web browser:

```bash
# Option 1: Double-click index.html

# Option 2: Use a local server (recommended)
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
Right-click index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000`

## 📝 Customization Guide

### Adding More Words

Edit `data/words-ed.json`:

```json
{
  "id": 56,
  "word": "jumped",
  "baseForm": "jump",
  "ipa": "/dʒʌmpt/",
  "category": "t",
  "audioFile": "jumped.mp3",
  "exampleSentence": "The cat jumped over the fence.",
  "difficulty": 1
}
```

### Changing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --color-t: #FF6B6B;    /* Red for /t/ */
    --color-d: #4ECDC4;    /* Teal for /d/ */
    --color-id: #FFE66D;   /* Yellow for /ɪd/ */
}
```

### Adjusting Difficulty

In the game files, you can modify:

**Game 1 (game1.js):**
- `maxRounds`: Number of rounds (default: 3)
- Words per category in `getBalancedWords(2)` call

**Game 2 (game2.js):**
- `timePerWord`: Time allowed per word in ms (default: 8000)
- `totalWords`: Total number of words (default: 15)

**Game 3 (game3.js):**
- `totalQuestions`: Number of questions (default: 10)

**Game 4 (game4.js):**
- `timeLimit`: Time limit in seconds (default: 30)
- `maxRounds`: Number of rounds (default: 3)
- Color hints toggle for difficulty control

### Changing Game Titles

Edit the text in `index.html` for each game screen.

## 🔄 Extending to Other Grammar Targets

The code is designed to be reusable for other grammar topics:

### Example: Plural -s/-es/-ies

1. **Create new dataset**: `data/words-plural.json`

```json
{
  "metadata": {
    "grammarTarget": "plural-s",
    "title": "Plural -s Pronunciation",
    "categories": [
      { "id": "s", "name": "/s/", "ipa": "/s/", "rule": "After voiceless sounds" },
      { "id": "z", "name": "/z/", "ipa": "/z/", "rule": "After voiced sounds" },
      { "id": "iz", "name": "/ɪz/", "ipa": "/ɪz/", "rule": "After sibilants" }
    ]
  },
  "words": [ /* your plural words */ ]
}
```

2. **Modify main.js** to load different datasets based on game mode

3. **Update HTML** with new category labels

4. **Reuse all game modules** - they work with any 3-category system!

## 🎨 Design Customization

### Changing Theme Colors

Edit in `css/style.css`:

```css
:root {
    --primary-color: #6C5CE7;      /* Main purple */
    --secondary-color: #A29BFE;    /* Light purple */
    --success-color: #00B894;      /* Green */
    --error-color: #D63031;        /* Red */
}
```

### Background Gradient

Change the body gradient:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📱 Responsive Design

The game is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🐛 Troubleshooting

### Audio Not Playing

- Check that MP3 files exist in `assets/audio/`
- Verify file names match those in `words-ed.json`
- Check browser console for errors
- Some browsers block autoplay - user interaction may be needed

### Dataset Not Loading

- Make sure `words-ed.json` is in the `data/` folder
- Check JSON syntax is valid
- Open browser console to see error messages
- Run from a web server, not file:// protocol

### Videos Not Showing

- Place MP4 files in `assets/video/`
- Name them `intro.mp4` and `ending.mp4`
- Check video codec compatibility (H.264 recommended)

## 🔧 Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📖 Code Documentation

All JavaScript files include detailed comments:

- **Function descriptions**: What each function does
- **Parameters**: Expected inputs
- **Return values**: What the function returns
- **Extension points**: Where and how to modify for new features

## 🎓 For Teachers

### Tracking Student Progress

Currently scores are displayed but not saved. To add persistence:

1. **LocalStorage** (simple):
```javascript
// Save score
localStorage.setItem('studentScore', totalScore);

// Load score
const savedScore = localStorage.getItem('studentScore');
```

2. **Server-side** (advanced):
- Set up a backend to save scores to a database
- Modify score update functions to send data to server

### Customizing for Your Class

- Adjust difficulty by changing timer values
- Add or remove words based on your curriculum
- Change the fantasy theme by editing text and colors
- Create different levels for different grade levels

## 📄 License

This educational game is free to use and modify for educational purposes.

## 🤝 Contributing

Feel free to enhance this game:
- Add more words to the dataset
- Create new mini-games
- Improve graphics and animations
- Add sound effects
- Implement score persistence

## ✨ Future Enhancement Ideas

- Add sound effects for correct/wrong answers
- Implement high score leaderboard
- Add user profiles
- Create additional grammar game modes
- Add badges and achievements
- Multi-language support
- Teacher dashboard for tracking multiple students

---

**Happy Teaching! 🎉**

For questions or issues, please refer to the code comments in each file.
