import React from 'react';
import './styles/index.css';

const Home: React.FC = () => {
  return (
    <>
      <div className="navbar">
        <img src="../src/assets/logo.png" alt="SpaceFun Logo" className="logo" />
        <input type="text" placeholder="Search AdaSpaceFun" className="search-bar" />
        <div className="nav-links">
          <a href="#">🚀About</a>
          <a href="#">🧑‍🚀Contact</a>
          <button className="signup-button">Sign Up</button>
          <button className="login-button">Log In</button>
        </div>
      </div>

      <div className="main-circle">
        <span className="sun-text">All game</span>
      </div>

      <div className="grade-container">
        <div className="grade-circle pre-k">Pre-K</div>
        <div className="grade-circle grade-k">Grade K</div>
        <div className="grade-circle grade-1">Grade 1</div>
        <div className="grade-circle grade-2">Grade 2</div>
        <div className="grade-circle grade-3">Grade 3</div>
        <div className="grade-circle grade-4">Grade 4</div>
        <div className="grade-circle grade-5">Grade 5</div>
        <div className="grade-circle grade-6">Grade 6+</div>
      </div>
    </>
  );
};

export default Home;