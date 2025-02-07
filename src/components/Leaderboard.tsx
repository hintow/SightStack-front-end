import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

// 定义用户数据的类型
interface User {
  childName: string;
  score: number;
  avatar: string;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiServer = 'https://sightstack-back-end.onrender.com';

  // 获取积分榜数据
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${apiServer}/leaderboard`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      const data: User[] = await response.json();
      setLeaderboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时调用 API
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // 加载状态
  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  // 错误状态
  if (error) {
    return <div>Error: {error}</div>;
  }

  // 渲染积分榜
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboardData.map((user, index) => (
          <li key={index} className="leaderboard-item">
            <span className="medal">
              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
            </span>
            <img 
            src={user.avatar} 
            alt={`${user.childName}'s avatar`} 
            className="leaderboard-avatar"
            />
            <span className="child-name">{user.childName}</span>
            <span className="score">{user.score} points</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;