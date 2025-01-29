import React, { useEffect, useState } from "react";
import "./Background.css"; // 确保包含星星相关样式

const SpaceBackground: React.FC = () => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starElements: JSX.Element[] = [];
      for (let i = 0; i < 30; i++) {
        // 随机生成星星属性
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const size = Math.random() * 3 + 1; // 1px ~ 4px
        const animationDuration = `${Math.random() * 3 + 2}s`;
        const animationDelay = `${Math.random() * 3}s`;

        // 添加星星 JSX
        starElements.push(
          <div
            key={i}
            className="star"
            style={{
              top,
              left,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration,
              animationDelay,
            }}
          ></div>
        );
      }
      setStars(starElements);
    };

    generateStars();
  }, []); // 仅在组件挂载时运行

  return <div className="background">{stars}</div>;
};

export default SpaceBackground;
