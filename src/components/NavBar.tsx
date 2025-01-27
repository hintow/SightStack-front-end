import { FC, useState } from "react";
import './NavBar.css';
import SignUp from './SignUp'; 

const NavBar: FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);

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
          <a href="#">🧑‍🚀Account</a>
          {/* <button className="signup-button">Sign Up</button> */}
          <button className="signup-button" onClick={() => setShowSignUp(!showSignUp)}>
            {showSignUp ? "Hide Sign Up" : "Sign Up"}
          </button>
          <button className="login-button">Log In</button>
        </div>
      </div>
      {showSignUp && <SignUp />}
    </div>
  );
};

export default NavBar;