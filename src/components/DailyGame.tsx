import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyGame.css';

interface Word {
  word: string;
  hint: string;
  level: string;
}

const wordLibrary: Word[] = [
  { word: "and", hint: "Used to connect words or phrases", level: "prek" },
  { word: "away", hint: "At a distance from a place or person", level: "prek" },
  { word: "big", hint: "Large in size", level: "prek" },
  { word: "cat", hint: "A small domesticated carnivorous mammal", level: "prek" },
  { word: "dog", hint: "A domesticated carnivorous mammal, often kept as a pet", level: "prek" },
  { word: "sun", hint: "The star at the center of our solar system", level: "prek" },
  { word: "book", hint: "A set of written, printed, or blank pages", level: "prek" },
  { word: "tree", hint: "A woody perennial plant, typically having a single stem or trunk", level: "prek" },
  { word: "fish", hint: "A limbless cold-blooded vertebrate animal with gills", level: "prek" },
  { word: "moon", hint: "The natural satellite of the Earth", level: "prek" },
  { word: "star", hint: "A luminous point in the night sky", level: "prek" },
  { word: "ball", hint: "A spherical object used in games and sports", level: "prek" },
  { word: "bird", hint: "A warm-blooded egg-laying vertebrate animal with wings", level: "prek" }
];

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const startGame = () => {
    // 从单词库中随机选择一个单词
    const randomWord = wordLibrary[Math.floor(Math.random() * wordLibrary.length)];
    setCurrentWord(randomWord);
    
    // 打乱字母顺序
    const shuffledWord = randomWord.word
      .split('')                          // 将单词拆分成字母数组
      .sort(() => Math.random() - 0.5)     // 使用 Math.random() 随机打乱字母顺序
      .join('');                           // 将字母数组重新合并成一个字符串
    
    // 初始化答案，确保答案的长度与打乱后的单词相同
    setAnswer(Array(shuffledWord.length).fill(""));
    setShowHint(false);                   // 关闭提示
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

  const handleUndo = () => {
    const newAnswer = [...answer];
    const lastFilledIndex = newAnswer.lastIndexOf(draggedLetter || "");
    if (lastFilledIndex !== -1) {
      newAnswer[lastFilledIndex] = "";
      setAnswer(newAnswer);
    }
  };

  const handleSubmit = () => {
    if (currentWord && answer.join("") === currentWord.word) {
      alert("Correct!");
    } else {
      alert("Try again!");
    }
  };

  const goBackToHome = () => {
    navigate('/');  // 使用 navigate 跳转到主页
  };

  return (
    <div className="game">
      <div className="top-bar">
        <button onClick={startGame}>Start Game</button>
        <button className="return-button" onClick={goBackToHome}>Exit</button>
      </div>

      <div className="main-area">
        {currentWord && (
          <>
            <div id="puzzle">
              {currentWord.word.split("").map((letter, index) => (
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

            <button onClick={() => setShowHint(true)}>Show Hint</button>
            {showHint && <p className="hints-section">Hint: {currentWord.hint}</p>}
          </>
        )}
      </div>

      <div className="bottom-bar">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Game;
