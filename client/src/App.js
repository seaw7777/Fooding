import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginPage from './components/views/LoginPage/LoginPage';
import MainPage from './components/views/MainPage/MainPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MyPage from './components/views/MyPage/MyPage';
import FollowPage from './components/views/FollowPage/FollowPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/follow" component={FollowPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
