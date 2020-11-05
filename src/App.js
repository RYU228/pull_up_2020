import {HashRouter, Route} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import MyPage from './MyPage';
import Navigation from './Navigation';
import cookie from 'react-cookies';
import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    isCookie: undefined
  }

  componentDidMount() {
    if(cookie.load("login_id")) {
      this.setState({isCookie: cookie.load("login_id")})
      console.log(this.state.isCookie);
    }
  }

  render() {
    return (
      <div>
        <HashRouter>
          <Navigation />
          <Route path="/MyPage" component={MyPage}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Signup" component={Signup}/>
        </HashRouter>
      </div>
    );
  }
}

export default App;
