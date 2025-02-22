import { FC } from "react";
import './MainHome.css';
import { useNavigate } from "react-router-dom";



interface Grade {
  label: string;
  className: string;
}

const MianHome: FC = () => {
  const navigate = useNavigate();

  const grades: Grade[] = [
    { label: "Pre-K", className: "pre-k" },
    { label: "Grade K", className: "grade-k" },
    { label: "Grade 1", className: "grade-1" },
    { label: "Grade 2", className: "grade-2" },
    { label: "Grade 3", className: "grade-3" },
    { label: "Grade 4", className: "grade-4" },
    { label: "Grade 5", className: "grade-5" },
    { label: "Grade 6+", className: "grade-6" },
  ];

  const navigateToDailyGame = () => {
    navigate('/daily-game');
  };

  const navigateToGame = (grade: string) => {
    navigate(`/game/${grade}`);  // 跳转到相应年级的游戏页面
  };


  return (
    <div>
      <div className="main-circle" onClick={navigateToDailyGame}>
        <span className="sun-text">Daily Game</span>
      </div>

      <div className="grade-container">
        {grades.map((grade, index) => (
          <div
          key={index}
          className={`grade-circle ${grade.className}`}
          onClick={() => navigateToGame(grade.className)}  // 跳转到对应年级的游戏页面
        >
          {grade.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MianHome;
