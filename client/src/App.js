import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginPage from './components/views/LoginPage/LoginPage';
import MainPage from './components/views/MainPage/MainPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import RegisterTastePage from './components/views/RegisterPage/RegisterTastePage';

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
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
