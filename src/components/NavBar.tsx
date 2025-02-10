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

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');

useEffect(() => {
  const handleToggleSignUp = () => setShowSignUp(false);
  const handleToggleLogIn = () => setShowLogIn(false);
  const handleToggleUserInfo = () => setShowUserInfo(false); 
  const handleToggleLeaderboard = () => setShowLeaderboard(false);
  const handleToggleRules = () => setShowRules(false);


  document.addEventListener('toggleSignUp', handleToggleSignUp);
  document.addEventListener('toggleLogIn', handleToggleLogIn);
  document.addEventListener('toggleUserInfo', handleToggleUserInfo);
  document.addEventListener('toggleLeaderboard', handleToggleLeaderboard);
  document.addEventListener('toggleRules', handleToggleRules);

  return () => {
    document.removeEventListener('toggleSignUp', handleToggleSignUp);
    document.removeEventListener('toggleLogIn', handleToggleLogIn);
    document.removeEventListener('toggleUserInfo', handleToggleUserInfo);
    document.removeEventListener('toggleLeaderboard', handleToggleLeaderboard);
    document.removeEventListener('toggleRules', handleToggleRules);
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

    // Update Account click handler
  const handleAccountClick = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setTooltipMessage('Please log in');
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    setShowUserInfo(true);
  };
  
  return (
    <div>
      <div className="navbar">
        <img src="/logo.png" alt="SpaceFun Logo" className="logo" />
        <div className="nav-links">
          <a href="#" onClick={toggleRules}>🚀Rules</a>
          <a href="#" onClick={toggleLeaderboard}>🏆Leaderboard</a> {/* Leaderboard */}          
          <div className="account-container">
          <a href="#" onClick={handleAccountClick}>🧑‍🚀Account</a>
          {showTooltip && (
            <div className="tooltip-popup">{tooltipMessage}</div>
          )}
        </div>
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