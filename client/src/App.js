import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import LoginPage from './components/views/LoginPage/LoginPage';
import MainPage from './components/views/MainPage/MainPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import RegisterTastePage from './components/views/RegisterPage/RegisterTastePage';
import Mypage from './components/views/MyPage/MyPage';
import FollowPage from './components/views/FollowPage/FollowPage';
import SpoonPage from './components/views/SpoonPage/SpoonPage';
import Footer from './components/views/Footer/Footer';
import NavBarPage from './components/views/NavBar/NavBarPage';
import UserUpdatePage from './components/views/UserUpdatePage/UserUpdatePage';
function App() {
  return (
    <div className="App">
      <Router>
        <div style={{ paddingTop: '0', minHeight: 'calc(98vh - 45px)' }}>
          <NavBarPage />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/register/taste" component={RegisterTastePage} />
            <Route exact path="/mypage" component={Mypage} />
            <Route exact path="/follow" component={FollowPage} />
            <Route exact path="/mypage/spoon" component={SpoonPage} />
            <Route exact path="/mypage/update" component={UserUpdatePage} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
