import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';

const SignUp: React.FC = () => {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number | ''>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const [popupMessage, setPopupMessage] = useState<string>(''); // 控制弹窗消息
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // 控制弹窗显示

  const apiServer = 'https://sightstack-back-end.onrender.com';

  //add close button
  const handleClose = () => {
    document.dispatchEvent(new CustomEvent('toggleSignUp')); 
  };

  const avatars = [
    'https://i.ibb.co/jmH8r5g/avatar0.jpg',
    'https://i.ibb.co/WvRgFxbd/avatar1.jpg',
    'https://i.ibb.co/Swn05jYX/avatar2.jpg',
    'https://i.ibb.co/5hwc44ZP/avatar3.jpg',
    'https://i.ibb.co/GzxyRcK/avatar4.jpg',
    'https://i.ibb.co/cS3S1kyv/avatar5.jpg',
    'https://i.ibb.co/Fk61BdrT/avatar6.jpg',
    'https://i.ibb.co/Cp1gKfLW/avatar7.jpg',
    'https://i.ibb.co/hFv9vsc9/avatar8.jpg',
    'https://i.ibb.co/zVk7b91j/avatar9.jpg',
  ];

  const validatePassword = (password: string) => {
    return password.length >= 6; 
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateAge = (age: number) => {
    return age >= 3 && age <= 12; 
  };
   

  const handleSaveProfile = async () => {
    if (!childName || !childAge || !selectedAvatar || !email || !password) {
      alert('Please fill out all fields and select an avatar!');
      return;
    }

      // Validate email format
    if (!validateEmail(email)) {
      setPopupMessage('Please enter a valid email address');
      setIsPopupOpen(true);
      return;
    }

    // Validate password length
    if (!validatePassword(password)) {
      setPopupMessage('Password must be at least 6 characters long');
      setIsPopupOpen(true);
      return;
    }

    // Validate age range
    if (!validateAge(Number(childAge))) {
      setPopupMessage('Child age must be between 3 and 12 years');
      setIsPopupOpen(true);
      return;
    }
 
    try {
      const response = await axios.post(`${apiServer}/register`, {
        childName,
        childAge,
        email,
        password, // 注意：在生产环境中，密码应该在发送前进行哈希处理
        avatar: selectedAvatar,
      });
  
      if (response.status === 201) {
        setPopupMessage('Profile saved successfully!');
        setIsPopupOpen(true);

        // 延迟跳转，等用户看到弹窗后
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent('toggleSignUp'));
          navigate('/'); 
        }, 2000); // 2秒后跳转
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setPopupMessage('Failed to save profile. Please try again.');
      setIsPopupOpen(true);
    }
  };

  return (
    <div className="container">
      <button className="close-button" onClick={handleClose}>x</button>
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
          onChange={(e) => {
            const age = Number(e.target.value);
            setChildAge(age >= 0 ? age : 0);
          }}
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

      <button className="save-profile-button" onClick={handleSaveProfile}>Save Profile</button>
          {/* Popup 组件 */}
          <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        message={popupMessage} 
      />
    </div>
  );
};

export default SignUp;
