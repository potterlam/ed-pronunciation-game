"""
Audio Generator for Past Tense -ED Pronunciation Game
=====================================================

This script generates MP3 audio files for all words in the dataset
using Google Text-to-Speech (gTTS).

Installation:
    pip install gtts

Usage:
    python generate_audio.py

Output:
    MP3 files will be created in ../assets/audio/
"""

from gtts import gTTS
import os
import json

def load_words_from_json():
    """Load words from the JSON dataset"""
    json_path = os.path.join('..', 'data', 'words-ed.json')
    
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['words']
    except FileNotFoundError:
        print(f"Error: Could not find {json_path}")
        print("Make sure you're running this script from the scripts/ folder")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in {json_path}")
        return None

def generate_audio_files(words, output_dir='../assets/audio'):
    """Generate MP3 files for all words"""
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    total = len(words)
    print(f"\n🎵 Generating {total} audio files...")
    print("=" * 50)
    
    for idx, word_obj in enumerate(words, 1):
        word = word_obj['word']
        audio_file = word_obj['audioFile']
        output_path = os.path.join(output_dir, audio_file)
        
        # Skip if file already exists
        if os.path.exists(output_path):
            print(f"[{idx}/{total}] ⏭️  Skipping {audio_file} (already exists)")
            continue
        
        try:
            # Generate speech
            # Using US English accent
            tts = gTTS(text=word, lang='en', tld='com', slow=False)
            
            # Save to file
            tts.save(output_path)
            print(f"[{idx}/{total}] ✅ Generated {audio_file}")
            
        except Exception as e:
            print(f"[{idx}/{total}] ❌ Error generating {audio_file}: {str(e)}")
    
    print("=" * 50)
    print("✨ Audio generation complete!\n")

def generate_by_category(words, category, output_dir='../assets/audio'):
    """Generate audio files for a specific category only"""
    
    filtered_words = [w for w in words if w['category'] == category]
    
    print(f"\n🎯 Generating audio for category: /{category}/")
    generate_audio_files(filtered_words, output_dir)

def main():
    """Main function"""
    
    print("\n" + "=" * 50)
    print("🎙️  Audio File Generator")
    print("   Past Tense -ED Pronunciation Game")
    print("=" * 50)
    
    # Load words from JSON
    words = load_words_from_json()
    
    if not words:
        return
    
    print(f"\n📚 Loaded {len(words)} words from dataset")
    
    # Count by category
    t_count = len([w for w in words if w['category'] == 't'])
    d_count = len([w for w in words if w['category'] == 'd'])
    id_count = len([w for w in words if w['category'] == 'id'])
    
    print(f"   - /t/ category: {t_count} words")
    print(f"   - /d/ category: {d_count} words")
    print(f"   - /ɪd/ category: {id_count} words")
    
    # Menu
    print("\n📋 What would you like to do?")
    print("   1. Generate all audio files")
    print("   2. Generate /t/ category only")
    print("   3. Generate /d/ category only")
    print("   4. Generate /ɪd/ category only")
    print("   5. Exit")
    
    choice = input("\nEnter your choice (1-5): ").strip()
    
    if choice == '1':
        generate_audio_files(words)
    elif choice == '2':
        generate_by_category(words, 't')
    elif choice == '3':
        generate_by_category(words, 'd')
    elif choice == '4':
        generate_by_category(words, 'id')
    elif choice == '5':
        print("\n👋 Goodbye!")
        return
    else:
        print("\n❌ Invalid choice. Please run the script again.")
        return
    
    print("✅ Done! Audio files are ready in assets/audio/")
    print("\n💡 Tip: You can customize voice settings in this script")
    print("   - Change 'tld' parameter for different accents")
    print("   - Set 'slow=True' for slower pronunciation")
    print("   - Options: tld='com' (US), tld='co.uk' (UK), tld='com.au' (AU)")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
        print("👋 Goodbye!")
    except Exception as e:
        print(f"\n❌ Unexpected error: {str(e)}")
        print("Please check your setup and try again.")
