# Audio Files Required

Place all MP3 files in the `assets/audio/` folder.

## /t/ Category (15 words)
- walked.mp3
- talked.mp3
- helped.mp3
- watched.mp3
- cooked.mp3
- jumped.mp3
- asked.mp3
- looked.mp3
- worked.mp3
- liked.mp3
- washed.mp3
- finished.mp3
- laughed.mp3
- stopped.mp3
- dressed.mp3

## /d/ Category (20 words)
- played.mp3
- called.mp3
- cleaned.mp3
- lived.mp3
- studied.mp3
- opened.mp3
- listened.mp3
- rained.mp3
- snowed.mp3
- showed.mp3
- turned.mp3
- learned.mp3
- climbed.mp3
- seemed.mp3
- smiled.mp3
- arrived.mp3
- happened.mp3
- enjoyed.mp3
- moved.mp3
- loved.mp3

## /ɪd/ Category (20 words)
- wanted.mp3
- needed.mp3
- started.mp3
- ended.mp3
- waited.mp3
- visited.mp3
- painted.mp3
- planted.mp3
- counted.mp3
- added.mp3
- decided.mp3
- invited.mp3
- collected.mp3
- created.mp3
- shouted.mp3
- repeated.mp3
- pointed.mp3
- printed.mp3
- graduated.mp3
- hunted.mp3

## Quick Audio Generation Guide

### Option 1: Online TTS Services (Free)
1. **TTSMaker** (https://ttsmaker.com/)
   - Supports multiple voices
   - Free download
   - Good quality

2. **Natural Reader** (https://www.naturalreaders.com/)
   - Natural-sounding voices
   - Free tier available

3. **Google Cloud TTS**
   - High quality
   - Multiple accents (US, UK, Australian English)

### Option 2: Batch Generation Script

You can use this Python script with gTTS (Google Text-to-Speech):

```python
# install: pip install gtts
from gtts import gTTS
import os

words = [
    "walked", "talked", "helped", "watched", "cooked",
    # ... add all 55 words
]

output_dir = "assets/audio"
os.makedirs(output_dir, exist_ok=True)

for word in words:
    tts = gTTS(word, lang='en', tld='com')
    tts.save(f"{output_dir}/{word}.mp3")
    print(f"Generated {word}.mp3")
```

### Option 3: Record Your Own
- Use Audacity (free)
- Record at 44.1kHz
- Export as MP3
- Keep files under 100KB each

## File Requirements
- Format: MP3
- Quality: 128kbps or higher
- Sample rate: 44.1kHz recommended
- Keep file sizes small (under 200KB each)

## Testing
After adding files, test in browser console:
```javascript
const audio = new Audio('assets/audio/walked.mp3');
audio.play();
```
