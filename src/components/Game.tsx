import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game.css';

interface Word {
  word: string;
  hint: string;
  level: string;
}

interface GameProps {
  type: 'daily' | 'grade';
  grade?: string;
}

const gradeToLevel = (grade: string): string => {
  switch (grade) {
    case 'pre-k':
      return 'prek';
    case 'grade-k':
      return 'k';
    case 'grade-1':
      return '1st';
    case 'grade-2':
      return '2nd';
    case 'grade-3':
      return '3rd';
    case 'grade-4':
      return '4th';
    case 'grade-5':
      return '5th';
    case 'grade-6':
      return '6th';
    default:
      return 'prek'; // Default to prek if invalid grade
  }
};

const fetchOptions = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
};

// const apiServer = 'http://127.0.0.1:5000';
const apiServer = 'https://sightstack-back-end.onrender.com';

const fetchDailyWord = async (): Promise<Word> => {
  try {
    const response = await fetch(`${apiServer}/words/daily`, fetchOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch daily word');
    }
    return await response.json();
  } catch (err) {
    throw new Error('Error fetching daily word: ' + err);
  }
};

const fetchWordByLevel = async (level: string): Promise<Word> => {
  try {
    const response = await fetch(`${apiServer}/words/level/${level}`, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch word for level ${level}`);
    }
    return await response.json();
  } catch (err) {
    throw new Error('Error fetching word: ' + err);
  }
};

const Game: React.FC<GameProps>  = ({ type, grade }) => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [shuffledWord, setShuffledWord] = useState<string[]>([]);
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const startGame = async () => {
    try {
      let randomWord: Word;
      
      if (type === 'daily') {
        randomWord = await fetchDailyWord();
      } else if (grade) {
        const level = gradeToLevel(grade);
        randomWord = await fetchWordByLevel(level);
      } else {
        throw new Error('Grade level is required for grade-specific games');
      }

      setCurrentWord(randomWord);
      const shuffled = shuffleArray(randomWord.word.split(''));
      setShuffledWord(shuffled);
      setAnswer(Array(shuffled.length).fill(""));
      setShowHint(false);
    } catch (err) {
      console.error('Failed to start game:', err);
    }
  };

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleDragStart = (letter: string) => {
    setDraggedLetter(letter);
  };

  const handleDrop = (index: number) => {
    if (draggedLetter && currentWord) {
      const newAnswer = [...answer];
      newAnswer[index] = draggedLetter;
      setAnswer(newAnswer);
    }
  };

  const handleReplay = () => {
    setAnswer(Array(answer.length).fill(""));
  };

  const handleSubmit = () => {
    if (currentWord && answer.join("") === currentWord.word) {
      alert("Correct!");
    } else {
      alert("Try again!");
    }
  };

  const handlePlayHint = () => {
    if (currentWord) {
      const utterance = new SpeechSynthesisUtterance(currentWord.hint);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const goBackToHome = () => {
    navigate('/'); // 使用 navigate 跳转到主页
  };

  return (
    <div className="game">
      <div className="top-bar">
        <button onClick={startGame}>Play</button>
        <button className="return-button" onClick={goBackToHome}>Exit</button>
      </div>

      <div className="main-area">
        {currentWord && (
          <>
            <div id="puzzle">
              {shuffledWord.map((letter, index) => (
                <div
                  key={index}
                  className="draggable"
                  draggable
                  onDragStart={() => handleDragStart(letter)}
                >
                  {letter}
                </div>
              ))}
            </div>

            <div id="placeholders">
              {answer.map((letter, index) => (
                <div
                  key={index}
                  className="placeholder"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                >
                  {letter}
                </div>
              ))}
            </div>

            <button className="show-hint-button" onClick={() => setShowHint(true)}>Show Hint</button>
            {showHint && (
              <div className="hints-section">
                <p>Hint: {currentWord.hint}</p>
                <button onClick={handlePlayHint} className="hint-audio-button">
                  🔊
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bottom-bar">
        <button onClick={handleReplay}>Replay</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Game;



//  local wordLibrary
// const wordLibrary: Word[] = [
//   { word: "and", hint: "Used to connect words or phrases", level: "prek" },
//   { word: "away", hint: "At a distance from a place or person", level: "prek" },
//   { word: "big", hint: "Large in size", level: "prek" },
//   { word: "cat", hint: "A small domesticated carnivorous mammal", level: "prek" },
//   { word: "dog", hint: "A domesticated carnivorous mammal, often kept as a pet", level: "prek" },
//   { word: "sun", hint: "The star at the center of our solar system", level: "prek" },
//   { word: "book", hint: "A set of written, printed, or blank pages", level: "prek" },
//   { word: "tree", hint: "A woody perennial plant, typically having a single stem or trunk", level: "prek" },
//   { word: "fish", hint: "A limbless cold-blooded vertebrate animal with gills", level: "prek" },
//   { word: "moon", hint: "The natural satellite of the Earth", level: "prek" },
//   { word: "star", hint: "A luminous point in the night sky", level: "prek" },
//   { word: "ball", hint: "A spherical object used in games and sports", level: "prek" },
//   { word: "bird", hint: "A warm-blooded egg-laying vertebrate animal with wings", level: "prek" },
//   { word: "school", hint: "A place where children go to learn", level: "2nd grade" },
//   { word: "family", hint: "A group of people related by blood or marriage", level: "2nd grade" },
//   { word: "friend", hint: "A person you like and trust", level: "2nd grade" },
//   { word: "water", hint: "A clear liquid that all living things need to survive", level: "2nd grade" },
//   { word: "happy", hint: "Feeling or showing pleasure or joy", level: "2nd grade" },
//   { word: "light", hint: "Something that makes things visible or bright", level: "2nd grade" },
//   { word: "apple", hint: "A round fruit that is red, green, or yellow", level: "2nd grade" },
//   { word: "paper", hint: "Material used for writing or drawing on", level: "2nd grade" },
//   { word: "plant", hint: "A living thing that grows in soil and has leaves and roots", level: "2nd grade" },
//   { word: "house", hint: "A building where people live", level: "2nd grade" },
//   { word: "tiger", hint: "A large wild cat with orange fur and black stripes", level: "2nd grade" },
//   { word: "clock", hint: "A device that shows the time", level: "2nd grade" },
//   { word: "music", hint: "Sounds that are sung or played and that people enjoy", level: "2nd grade" } 
// ];