import React from 'react';
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
  // 模拟用户数据
  const user: User = {
    name: "John Doe",
    avatar: "/avatar9.jpg",
    age: 7,
    score: 10,
    achievements: ["🌑 Mercury Explorer", "🏆 Solar System Champion"]
  };

  // 所有成就列表
  const allAchievements: Achievement[] = [
    { title: "🌑 Mercury Explorer", description: "Like the swift Mercury 🌕, you've taken your first steps in solving games! 🚀", unlocked: false },
    { title: "🌟 Venus Voyager", description: "Your problem-solving is as radiant as Venus in the night sky 🌘. Great work on your games! 🌍", unlocked: false },
    { title: "🌍 Earth Defender", description: "You've defended Earth 🌏 from the challenges of games. Keep it up! 🛡️", unlocked: false },
    { title: "💫 Mars Adventurer", description: "Your adventurous spirit has led you to conquer the challenges of Mars! 🔴", unlocked: false },
    { title: "🛸 Jupiter Giant", description: "Like Jupiter 🌑, your skills in games are gigantic! 💫", unlocked: false },
    { title: "🪐 Saturn Strategist", description: "Your strategic mind has helped you solve the rings of challenges! 🪐", unlocked: false },
    { title: "🌌 Uranus Innovator", description: "Your innovative solutions have made you a master of games! 🌟", unlocked: false },
    { title: "🌠 Neptune Navigator", description: "You're navigating the deep oceans of games, just like Neptune rules the seas! 🌑🌊", unlocked: false },
    { title: "🏆 Solar System Champion", description: "Congratulations! You've obtained more than 200 points and earned your place as a true Game Master! 🚀🌟", unlocked: false }
  ];

  // 更新成就解锁状态
  user.achievements.forEach(achievementTitle => {
    const achievement = allAchievements.find(a => a.title === achievementTitle);
    if (achievement) {
      achievement.unlocked = true;
    }
  });

  // 切换描述的函数
  const toggleDescription = (element: HTMLElement) => {
    element.classList.toggle('active');
  };

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
              {allAchievements.map((achievement, index) => (
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
        </div>
      )}
    </div>
  );
};

export default UserInfo;