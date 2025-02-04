import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

interface Achievement {
  title: string;
  description: string;
  unlocked: boolean;
}

interface User {
  name: string;
  avatar: string;
  age: number;
  score: number;
  achievements: string[];
}


const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); 
  const [achievements, setAchievements] = useState<Achievement[]>([]); 
  const navigate = useNavigate();
  const apiServer = 'https://sightstack-back-end.onrender.com';



  const allAchievements: Achievement[] = [
    { title: "🌑 Mercury Explorer", description: "Like the swift Mercury 🌕, you've taken your first steps in solving games! 🚀", unlocked: false },
    { title: "🌟 Venus Voyager", description: "Your problem-solving is as radiant as Venus in the night sky 🌘. Great work on your games! 🌍", unlocked: false },
    { title: "🌍 Earth Defender", description: "You've defended Earth 🌏 from the challenges of games. Keep it up! 🛡️", unlocked: false },
    { title: "💫 Mars Adventurer", description: "Your adventurous spirit has led you to conquer the challenges of Mars! 🔴", unlocked: false },
    { title: "🛸 Jupiter Giant", description: "Like Jupiter 🌑, your skills in games are gigantic! 💫", unlocked: false },
    { title: "🪐 Saturn Strategist", description: "Your strategic mind has helped you solve the rings of challenges! 🪐", unlocked: false },
    { title: "🌌 Uranus Innovator", description: "Your innovative solutions have made you a master of games! 🌟", unlocked: false },
    { title: "🌠 Neptune Navigator", description: "You're navigating the deep oceans of games, just like Neptune rules the seas! 🌑🌊", unlocked: false },
    { title: "🏆 Solar System Champion", description: "Congratulations! You've obtained more than 300 points and earned your place as a true Game Master! 🚀🌟", unlocked: false }
  ];

    // 获取用户信息
    useEffect(() => {
      const fetchUserInfo = async () => {
        const userId = localStorage.getItem('userId'); // 从 localStorage 获取 userId
        if (!userId) {
          console.error('User ID not found');
          navigate('/login');
          return;
        }
  
        try {
          const response = await fetch(`${apiServer}/userInfo?userId=${userId}`); // 发送 GET 请求
          if (response.ok) {
            const data = await response.json();
            setUser({
              name: data.childName,
              avatar: data.avatar,
              age: data.childAge,
              score: data.score,
              achievements: data.achievements,
            });


          // 更新成就解锁状态
          const updatedAchievements = allAchievements.map(achievement => ({
            ...achievement,
            unlocked: data.achievements.includes(achievement.title),
          }));
          setAchievements(updatedAchievements);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []); // 空依赖数组表示只在组件挂载时执行

  // 切换描述的函数
  const toggleDescription = (element: HTMLElement) => {
    element.classList.toggle('active');
  };

  if (!user) {
    return <div>Loading...</div>; // 如果用户数据未加载，显示加载中
  }

  // logout function
  const logout = () => {
    localStorage.removeItem('userId');
    document.dispatchEvent(new CustomEvent('toggleUserInfo'));
    navigate('/');
  }

  return (
    <div>
      {user.name && (
        <div className="profile-container">
          <div className="profile-header">
            <div className="avatar">
              <img src={user.avatar} alt="User Avatar" />
            </div>
            <div className="profile-info">
              <h1>{user.name}</h1>
              <p>Age: {user.age}</p>
              <p>Total Score: <strong>{user.score}</strong></p>
            </div>
          </div>

          {/* 成就部分 */}
          <div className="section">
            <h2>Achievements</h2>
            <div className="achievements">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`achievement ${achievement.unlocked ? '' : 'locked'}`}
                  onClick={(e) => achievement.unlocked && toggleDescription(e.currentTarget)}
                >
                  {achievement.title}<br />
                  <small>{achievement.unlocked ? achievement.description : "Locked"}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <button onClick={logout} className="logout-button">Logout</button>

        </div>
      )}
    </div>
  );
};

export default UserInfo;
