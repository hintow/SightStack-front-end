import React, { useState } from 'react';
import './DailyGame.css';

// use hardcorded words for now

const words = [
  'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
  'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla',
  'watermelon', 'xigua', 'yellowfruit', 'zucchini'
];

const getRandomWords = (num: number) => {
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const DailyGame: React.FC = () => {
  const [randomWords, setRandomWords] = useState<string[]>([]);

  const handleGenerateWords = () => {
    const newWords = getRandomWords(3);
    setRandomWords(newWords);
  };

  return (
    <div className="daily-game-container">
      <h2>Daily Challenge</h2>
      <button onClick={handleGenerateWords}>Get Random Words</button>
      {randomWords.length > 0 && (
        <ul>
          {randomWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailyGame;