import { FC, useState } from "react";
import './NavBar.css';
import SignUp from './SignUp'; 
import UserInfo from './UserInfo';
import LogIn from './LogIn';

const NavBar: FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  return (
    <div>
      {/*  background */}
      <div
        className="space-background"
        style={{ backgroundImage: "url('public/space-background.jpg')" }}
      ></div>

      {/* navbar  */}
      <div className="navbar">
        {/* Logo */}
        <img src="public/logo.png" alt="SpaceFun Logo" className="logo" />

        {/* link-button */}
        <div className="nav-links">
          <a href="#">🚀Rules</a>
          <a href="#" onClick={() => setShowUserInfo(!showUserInfo)}>🧑‍🚀Account</a>
          {/* <button className="signup-button">Sign Up</button> */}
          <button className="signup-button" onClick={() => setShowSignUp(!showSignUp)}>
            {showSignUp ? "Hide Sign Up" : "Sign Up"}
          </button>
          <button className="login-button" onClick={() => setShowLogIn(!showLogIn)}>
            {showSignUp ? "Hide Log In" : "Log In"}
          </button>
        </div>
      </div>
      {showSignUp && <SignUp />}
      {showUserInfo && <UserInfo />}
      {showSignUp && <LogIn />}
    </div>
  );
};

export default NavBar;