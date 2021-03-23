import React, { Suspense } from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import Auth from 'hoc/auth';
/// Pages for product
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
import StoreDetailPage from './components/views/StoreDetailPage/StoreDetailPage';
import AccompanyPage from './components/views/AccompanyPage/AccompanyPage';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <div style={{ paddingTop: '0', minHeight: 'calc(98vh - 45px)' }}>
          <NavBarPage />
          <Route exact path="/" component={Auth(MainPage, true)} />
          {/* 로그인, 회원가입 하단바가 안보여야함 */}

          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/register/taste"
            component={Auth(RegisterTastePage, false)}
          />
          <Route exact path="/mypage" component={Auth(Mypage, true)} />
          <Route exact path="/follow" component={Auth(FollowPage, true)} />
          <Route exact path="/mypage/spoon" component={Auth(SpoonPage, true)} />
          <Route
            exact
            path="/mypage/update"
            component={Auth(UserUpdatePage, true)}
          />
          <Route
            exact
            path="/store/:storeId"
            component={Auth(StoreDetailPage, true)}
          />
          <Route
            exact
            path="/accompany"
            component={Auth(AccompanyPage, true)}
          />
        </div>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
