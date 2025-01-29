// import NavBar from './components/NavBar.tsx';
// import MianHome from './components/MainHome.tsx';
// import Background from "./components/Background.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import MainHome from './components/MainHome.tsx';
import Background from "./components/Background.tsx";
import Game from './components/Game.tsx';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/daily-game" element={<Game />} />
          <Route path="/game/:grade" element={<Game />} /> 
        </Routes>
        <Background />
      </div>
    </Router>
  );
}

export default App;
// function App() {
//   return (
//     <div>
      
//       <NavBar />
//       <MianHome />
//       <Background />
//     </div>
//   )
// }

// export default App


