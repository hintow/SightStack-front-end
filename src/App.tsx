import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import MainHome from './components/MainHome.tsx';
import Background from "./components/Background.tsx";
import Game from './components/Game';

// Update Game component to accept props
const GameWrapper: React.FC = () => {
  const { grade } = useParams();
  return <Game type={grade ? 'grade' : 'daily'} grade={grade} />;
};

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/daily-game" element={<GameWrapper />} />
          <Route path="/game/:grade" element={<GameWrapper />} /> 
        </Routes>
        <Background />
      </div>
    </Router>
  );
}

export default App;


