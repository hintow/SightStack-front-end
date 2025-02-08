import React from "react";
import './Rules.css';


const Rules: React.FC = () => {
  const handleClose = () => {
    document.dispatchEvent(new CustomEvent('toggleRules'));
  };

  return (
    <div className="rules-container">
      <button className="close-button" onClick={handleClose}>×</button>
      <h2>Game Rules</h2>
      <ol>
        <li>
          <span role="img" aria-label="hatching chick">🐣</span> <strong>Pick Your Grade</strong> <span role="img" aria-label="mortar board">🎓</span>
          <p>Tap to choose your grade level and get ready to play!</p>
        </li>
        <li>
          <span role="img" aria-label="jigsaw">🧩</span> <strong>Fix the Word</strong>
          <p>Drag and drop the scrambled letters to put them in the correct order and make a word. You can do it!</p>
        </li>
        <li>
          <span role="img" aria-label="star">⭐</span> <strong>Daily Game Mode</strong>
          <p>Want a quick challenge? Try the Daily Game! You can even play across different grade levels—how many can you solve? <span role="img" aria-label="tada">🎉</span></p>
        </li>
      </ol>
      <p>Have fun and show us how smart you are! <span role="img" aria-label="sparkles">✨</span></p>
    </div>
  );
};

export default Rules;