# 🚀 Quick Start Guide

## ⚡ Get Started in 5 Minutes!

### Step 1: Verify File Structure ✅

Make sure your folder structure looks like this:

```
ed-pronunciation-game/
├── index.html ✓
├── css/
│   └── style.css ✓
├── js/
│   ├── main.js ✓
│   ├── game1.js ✓
│   ├── game2.js ✓
│   ├── game3.js ✓
│   └── game4.js ✓
├── data/
│   └── words-ed.json ✓
└── assets/
    ├── audio/ (needs MP3 files)
    └── video/ (needs MP4 files)
```

### Step 2: Add Audio Files 🔊

**Option A: Quick Test (Use Placeholder)**
For now, the game will work without audio - it just won't play sounds.

**Option B: Generate Audio (Recommended)**
1. Go to https://ttsmaker.com/
2. Copy this list of words:
   ```
   walked, talked, helped, watched, cooked, jumped, asked, looked, worked, liked, 
   washed, finished, laughed, stopped, dressed, played, called, cleaned, lived, 
   studied, opened, listened, rained, snowed, showed, turned, learned, climbed, 
   seemed, smiled, arrived, happened, enjoyed, moved, loved, wanted, needed, 
   started, ended, waited, visited, painted, planted, counted, added, decided, 
   invited, collected, created, shouted, repeated, pointed, printed, graduated, hunted
   ```
3. Generate audio for each word (one at a time)
4. Save as `wordname.mp3` in `assets/audio/`

### Step 3: Add Videos (Optional) 🎥

**Option A: Skip for Now**
You can test the game without videos. The video elements will just be empty.

**Option B: Create Simple Videos**
1. Open CapCut
2. Create a 30-second video explaining the three pronunciation rules
3. Export as `intro.mp4` to `assets/video/`
4. Create a 20-second "Congratulations" video
5. Export as `ending.mp4` to `assets/video/`

### Step 4: Run the Game 🎮

**Method 1: Direct Open (Simplest)**
- Double-click `index.html`
- Game opens in your default browser

**Method 2: Local Server (Recommended)**

**Using VS Code Live Server:**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Game opens at http://localhost:5500

**Using Python:**
```bash
# In the project folder
python -m http.server 8000
# Open browser to http://localhost:8000
```

**Using Node.js:**
```bash
npx http-server
# Open browser to http://localhost:8080
```

### Step 5: Test the Game 🧪

1. **Intro Screen** - Should show title and rules
2. **Game Selection** - Click any game button
3. **Game 1** - Try dragging words to categories
4. **Game 2** - Click pronunciation buttons
5. **Game 3** - Select answers
6. **Game 4** - Click words to find matches

---

## 🐛 Troubleshooting

### "Cannot load game data" error
- Check that `data/words-ed.json` exists
- Make sure you're running from a server (not file://)

### Audio not playing
- It's normal if you haven't added MP3 files yet
- Game still works without audio
- Add audio files when ready

### Videos not showing
- Videos are optional
- Game works fine without them
- Add later when you create them

### Styling looks weird
- Clear browser cache (Ctrl+F5)
- Check that `css/style.css` is loaded

---

## 📋 Checklist Before Sharing

- [ ] All MP3 files added to `assets/audio/`
- [ ] Intro video added to `assets/video/intro.mp4`
- [ ] Ending video added to `assets/video/ending.mp4`
- [ ] Tested on Chrome/Firefox/Safari
- [ ] All 4 games work correctly
- [ ] Audio plays correctly
- [ ] Videos play correctly
- [ ] Responsive design works on mobile

---

## 🎯 Testing Checklist

### Intro Screen
- [ ] Title displays
- [ ] Three rules show correctly
- [ ] Start button works
- [ ] Video plays (if added)

### Game 1: Sorting Puzzle
- [ ] Words appear in word pool
- [ ] Drag and drop works
- [ ] Click to select works
- [ ] Correct/incorrect feedback shows
- [ ] Score updates
- [ ] Next round button appears

### Game 2: Falling Words
- [ ] Word displays
- [ ] Timer counts down
- [ ] Answer buttons work
- [ ] Correct/wrong feedback shows
- [ ] Stats update
- [ ] Auto-advances to next word

### Game 3: Multiple Choice
- [ ] Question displays
- [ ] Example sentence shows
- [ ] Audio button works (if audio added)
- [ ] Choice buttons work
- [ ] Feedback shows
- [ ] Next button appears
- [ ] Progress counter updates

### Game 4: Boss Fight
- [ ] Word grid displays
- [ ] Timer counts down
- [ ] Clicking words works
- [ ] Color hints toggle works
- [ ] Found counter updates
- [ ] Round completes correctly

### Navigation
- [ ] Back buttons work
- [ ] Score displays correctly
- [ ] Screen transitions smooth
- [ ] Can return to menu

### Ending Screen
- [ ] Final score shows
- [ ] Video plays (if added)
- [ ] Play again button works

---

## 💡 Pro Tips

1. **Start Simple**
   - Test without audio/video first
   - Add media files gradually

2. **Browser DevTools**
   - Press F12 to open console
   - Check for any error messages
   - Helps debug issues

3. **Mobile Testing**
   - Open on phone/tablet
   - Check responsive design
   - Test touch interactions

4. **Performance**
   - Keep audio files under 200KB each
   - Keep videos under 50MB each
   - Compress if loading is slow

---

## 🎨 Quick Customization

### Change Colors
Edit `css/style.css` lines 8-10:
```css
--color-t: #FF6B6B;    /* Change this */
--color-d: #4ECDC4;    /* Change this */
--color-id: #FFE66D;   /* Change this */
```

### Add More Words
Edit `data/words-ed.json`:
- Copy an existing word object
- Change the values
- Don't forget the comma!

### Adjust Difficulty
- **Game 1:** Line 19 in `game1.js` - change `maxRounds: 3`
- **Game 2:** Line 11 in `game2.js` - change `timePerWord: 8000`
- **Game 3:** Line 11 in `game3.js` - change `totalQuestions: 10`
- **Game 4:** Line 14 in `game4.js` - change `timeLimit: 30`

---

## 📚 Learn More

- **Full Documentation:** See `README.md`
- **Audio Guide:** See `assets/audio/README.md`
- **Video Guide:** See `assets/video/README.md`
- **Code Comments:** Check JS files for detailed explanations

---

## ✨ Ready to Go!

Your game is ready to test! 

**Next Steps:**
1. Open index.html in browser
2. Play through each game
3. Add audio/video files
4. Customize to your needs
5. Share with students!

**Need Help?**
- Check browser console for errors (F12)
- Review code comments in JS files
- Test on different browsers
- Start simple and add features gradually

---

**Happy Gaming! 🎉**
