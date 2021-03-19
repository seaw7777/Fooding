import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginPage from './components/views/LoginPage/LoginPage';
import MainPage from './components/views/MainPage/MainPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import RegisterTastePage from './components/views/RegisterPage/RegisterTastePage';
import Mypage from './components/views/MyPage/MyPage';
import FollowPage from './components/views/FollowPage/FollowPage';
import StoreDetailPage from './components/views/StoreDetailPage/StoreDetailPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/register/taste" component={RegisterTastePage} />
            <Route exact path="/mypage" component={Mypage} />
            <Route exact path="/follow" component={FollowPage} />
            <Route exact path="/store/:storeId" component={StoreDetailPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
