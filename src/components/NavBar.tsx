import { FC, useState } from "react";
import './NavBar.css';
import SignUp from './SignUp'; 
import UserInfo from './UserInfo';
import LogIn from './LogIn';
import Rules from './Rules';


const NavBar: FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showRules, setShowRules] = useState(false);

  
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


  return (
    <div>
      {/* navbar  */}
      <div className="navbar">
        {/* Logo */}
        <img src="/logo.png" alt="SpaceFun Logo" className="logo" />

        {/* link-button */}
        <div className="nav-links">
          <a href="#" onClick={toggleRules}>🚀Rules</a>
          <a href="#" onClick={() => setShowUserInfo(!showUserInfo)}>🧑‍🚀Account</a>
          <button className="signup-button" onClick={toggleSignUp}>
            {showSignUp ? "Hide Sign Up" : "Sign Up"}
          </button> 
          <button className="login-button" onClick={toggleLogIn}>
            {showLogIn ? "Hide Log In" : "Log In"}
          </button>
        </div>
      </div>
      {showSignUp && <SignUp />}
      {showUserInfo && <UserInfo />}
      {showLogIn && <LogIn />}
      {showRules && <Rules />}
    </div>
  );
};

export default NavBar;