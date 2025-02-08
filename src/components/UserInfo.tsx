import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

const ACHIEVEMENT_THRESHOLDS = {
  "🌑 Mercury Explorer": 10,
  "🌟 Venus Voyager": 30,
  "🌍 Earth Defender": 50,
  "💫 Mars Adventurer": 80,
  "🛸 Jupiter Giant": 120,
  "🪐 Saturn Strategist": 160,
  "🌌 Uranus Innovator": 200,
  "🌠 Neptune Navigator": 250,
  "🏆 Solar System Champion": 300
};

interface Achievement {
  title: string;
  description: string;
  unlocked: boolean;
  required_score: number;
}

interface User {
  name: string;
  avatar: string;
  age: number;
  score: number;
  achievements: string[];
}

const allAchievements: Achievement[] = [
  { title: "🌑 Mercury Explorer", description: "Like the swift Mercury 🌕, you've taken your first steps in solving games! 🚀", required_score: 10, unlocked: false },
    { title: "🌟 Venus Voyager", description: "Your problem-solving is as radiant as Venus in the night sky 🌘. Great work on your games! 🌍", required_score: 30, unlocked: false },
    { title: "🌍 Earth Defender", description: "You've defended Earth 🌏 from the challenges of games. Keep it up! 🛡️", required_score: 50, unlocked: false },
    { title: "💫 Mars Adventurer", description: "Your adventurous spirit has led you to conquer the challenges of Mars! 🔴", required_score: 80, unlocked: false },
    { title: "🛸 Jupiter Giant", description: "Like Jupiter 🌑, your skills in games are gigantic! 💫", required_score: 100, unlocked: false },
    { title: "🪐 Saturn Strategist", description: "Your strategic mind has helped you solve the rings of challenges! 🪐", required_score: 150, unlocked: false },
    { title: "🌌 Uranus Innovator", description: "Your innovative solutions have made you a master of games! 🌟", required_score: 200, unlocked: false },
    { title: "🌠 Neptune Navigator", description: "You're navigating the deep oceans of games, just like Neptune rules the seas! 🌑🌊", required_score: 260, unlocked: false },
    { title: "🏆 Solar System Champion", description: "Congratulations! You've obtained more than 300 points and earned your place as a true Game Master! 🚀🌟", required_score: 300, unlocked: false }
];

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); 
  const [achievements, setAchievements] = useState<Achievement[]>([]); 
  const [lockedAchievement, setLockedAchievement] = useState<Achievement | null>(null); // 新增状态变量
  const navigate = useNavigate();
  const apiServer = 'https://sightstack-back-end.onrender.com';

  const handleClose = () => {
    document.dispatchEvent(new CustomEvent('toggleUserInfo'));
    navigate('/');
  }

  const checkScoreAchievements = (score: number) => {
  
      const updatedAchievements = allAchievements.map(achievement => ({
        ...achievement,
        unlocked: score >= ACHIEVEMENT_THRESHOLDS[achievement.title as keyof typeof ACHIEVEMENT_THRESHOLDS]
      }));

      setAchievements(updatedAchievements);
    };

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
          checkScoreAchievements(data.score);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []); // 空依赖数组表示只在组件挂载时执行

  useEffect(() => {
    const handleScoreUpdate = () => {
      const fetchUserInfo = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
  
        try {
          const response = await fetch(`${apiServer}/userInfo?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUser({
              name: data.childName,
              avatar: data.avatar,
              age: data.childAge,
              score: data.score,
              achievements: data.achievements,
            });
            checkScoreAchievements(data.score);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchUserInfo();
    };
    document.addEventListener('scoreUpdate', handleScoreUpdate);
    return () => {
      document.removeEventListener('scoreUpdate', handleScoreUpdate);
    };
  }, []);
  

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
          <button className="close-button" onClick={handleClose}>x</button>
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
                  onClick={(e) => {
                    if (achievement.unlocked) {
                      toggleDescription(e.currentTarget);
                    } else {
                      setLockedAchievement(achievement); // 设置未解锁成就
                    }
                  }}
                >
                  {achievement.title}<br />
                  <small>{achievement.unlocked ? achievement.description : "Locked"}</small>
                </div>
              ))}
            </div>
          </div>
          {/* Logout Button */}
          <button onClick={logout} className="logout-button">Logout</button>

          {/* 新增：未解锁成就提示弹窗 */}
          {lockedAchievement && (
            <div className="modal-overlay">
              <div className="modal-content">
                <p className="popup-message">
                  You need {lockedAchievement.required_score} points to unlock🔓!
                </p>
                <button onClick={() => setLockedAchievement(null)}>OK</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;

