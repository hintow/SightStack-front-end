
import LogIn from './components/LogIn';
import NavBar from './components/NavBar.tsx';
import MianHome from './components/MainHome.tsx';
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
      <LogIn />
      hello! You are about to see a wondeful site here!!!
    </div>
  )
}

export default App


