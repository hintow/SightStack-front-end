import { FC, useState, useEffect } from "react";
import './NavBar.css';
import SignUp from './SignUp'; 
import UserInfo from './UserInfo';
import LogIn from './LogIn';
import Rules from './Rules';
import Leaderboard from "./Leaderboard";


const NavBar: FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

useEffect(() => {
  const handleToggleSignUp = () => setShowSignUp(false);
  const handleToggleLogIn = () => setShowLogIn(false);

  document.addEventListener('toggleSignUp', handleToggleSignUp);
  document.addEventListener('toggleLogIn', handleToggleLogIn);
  
  return () => {
    document.removeEventListener('toggleSignUp', handleToggleSignUp);
    document.removeEventListener('toggleLogIn', handleToggleLogIn);
  };
}, []);  

  
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
    if (showLogIn) setShowLogIn(false); // Hide LogIn if SignUp is shown
  };

  const toggleLogIn = () => {
    setShowLogIn(!showLogIn);
    if (showSignUp) setShowSignUp(false); // Hide SignUp if LogIn is shown
  };

  const toggleRules = () => {
    setShowRules(!showRules);
    if (showSignUp) setShowSignUp(false); // Hide SignUp if Rules is shown
    if (showLogIn) setShowLogIn(false); // Hide LogIn if Rules is shown
  };

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
    if (showSignUp) setShowSignUp(false); // Hide SignUp if Leaderboard is shown
    if (showLogIn) setShowLogIn(false); // Hide LogIn if Leaderboard is shown
    if (showRules) setShowRules(false); // Hide Rules if Leaderboard is shown
  };

  return (
    <div>
      {/* navbar  */}
      <div className="navbar">
        {/* Logo */}
        <img src="/logo.png" alt="SpaceFun Logo" className="logo" />

        {/* link-button */}
        <div className="nav-links">
          <a href="#" onClick={toggleRules}>🚀Rules</a>
          <a href="#" onClick={toggleLeaderboard}>🏆Leaderboard</a> {/* Leaderboard */}
          <a href="#" onClick={() => setShowUserInfo(!showUserInfo)}>🧑‍🚀Account</a>
          <button className="signup-button" onClick={toggleSignUp}>
            Sign Up
          </button> 
          <button className="login-button" onClick={toggleLogIn}>
            Log In
          </button>
        </div>
      </div>

      {showLeaderboard && <Leaderboard />}
      {showSignUp && <SignUp />}
      {showUserInfo && <UserInfo />}
      {showLogIn && <LogIn />}
      {showRules && <Rules />}
    </div>
  );
};

export default NavBar;