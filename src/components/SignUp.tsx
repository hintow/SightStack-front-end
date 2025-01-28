import React, { useState } from 'react';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number | ''>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const avatars = [
    '/avatar1.jpg',
    '/avatar2.jpg',
    '/avatar3.jpg',
    '/avatar4.jpg',
    '/avatar5.jpg',
    '/avatar6.jpg',
    '/avatar7.jpg',
    '/avatar8.jpg',
    '/avatar9.jpg',
  ];

  const handleSaveProfile = () => {
    if (!childName || !childAge || !selectedAvatar || !email || !password) {
      alert('Please fill out all fields and select an avatar!');
      return;
    }

    alert(`Profile saved!\nName: ${childName}\nAge: ${childAge}\nAvatar: ${selectedAvatar}\nEmail: ${email}`);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>

      {/* Profile Creation Section */}
      <div className="section">
        <h2>Create Profile</h2>
        <label htmlFor="child-name">Child's Name:</label>
        <input
          type="text"
          id="child-name"
          placeholder="Enter child's name"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
        />

        <label htmlFor="child-age">Child's Age:</label>
        <input
          type="number"
          id="child-age"
          placeholder="Enter child's age"
          value={childAge}
          onChange={(e) => setChildAge(Number(e.target.value) || '')}
        />
      </div>

      {/* Email and Password Section */}
      <div className="section">
        <h2>Account Information</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Avatar Selection */}
      <div className="section">
        <h2>Choose Avatar:</h2>
        <div>
          {avatars.map((avatar, index) => (
            <div className="avatar" key={index}>
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={selectedAvatar === avatar ? 'selected' : ''}
                onClick={() => setSelectedAvatar(avatar)}
              />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSaveProfile}>Save Profile</button>
    </div>
  );
};

export default SignUp;
