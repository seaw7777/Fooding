import React, { Suspense } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
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
import SearchPage from './components/views/SearchPage/SearchPage';
import FooderPage from './components/views/FooderPage/FooderPage';
import CheckReceiptPage from './components/views/ReviewPage/CheckReceiptPage';
import ReviewPage from './components/views/ReviewPage/ReviewPage';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <>
          <div style={{ paddingTop: '0', minHeight: 'calc(98vh - 45px)' }}>
            <NavBarPage />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>

            <Route exact path="/main" component={Auth(MainPage, true)} />

            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route
              exact
              path="/register/taste"
              component={Auth(RegisterTastePage, false)}
            />
            <Route exact path="/mypage" component={Auth(Mypage, true)} />
            <Route exact path="/follow" component={Auth(FollowPage, true)} />
            <Route
              exact
              path="/mypage/spoon"
              component={Auth(SpoonPage, true)}
            />
            <Route
              exact
              path="/mypage/update"
              component={Auth(UserUpdatePage, true)}
            />
            <Route
              exact
              path="/store/:StoreId"
              component={Auth(StoreDetailPage, true)}
            />
            <Route
              exact
              path="/fooder/:userId"
              component={Auth(FooderPage, true)}
            />
            <Route
              exact
              path="/accompany"
              component={Auth(AccompanyPage, true)}
            />
            <Route exact path="/search" component={Auth(SearchPage, true)} />
            <Route
              exact
              path="/review/check-receipt"
              component={Auth(CheckReceiptPage, true)}
            />
            <Route
              exact
              path="/review/post"
              component={Auth(ReviewPage, true)}
            />
          </div>
          <Footer />
        </>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
