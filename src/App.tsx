
import NavBar from './components/NavBar.tsx';
import MianHome from './components/MainHome.tsx';
import Background from "./components/Background.tsx";
// import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
// imoprt Home from './components/Home';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact component={Login} />
//         <Route path="/home" component={Home} />
//       </Switch>
//     </Router>
//   );
// }
function App() {
  return (
    <div>
      <NavBar />
      <MianHome />
      <Background />
    </div>
  )
}

export default App


