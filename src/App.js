import {HashRouter, Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Login/Signup';
import MyPage from './Login/MyPage';
import Navigation from './Navigation/Navigation';
import UDPage from './Login/CheckPage';
import BoardWrite from './Board/BoardWrite';
import BoardList from './Board/BoardList';
import BoardDetail from './Board/BoardDetail';
import Sidebar from './Sidebar/Sidebar';
import cookie from 'react-cookies';
import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    isCookie: undefined
  }

  componentDidMount() {
    // if(cookie.load("login_id")) {
    //   this.setState({isCookie: cookie.load("login_id")})
    // }
  }

  render() {
    return (
      <div className="app_container">
        <HashRouter>
          <Navigation />
          <div className="app_main">
            <Route exact path="/" component={BoardList}/>
            <Sidebar /> 
          </div>
          
          {/* <Route exact path="/my_info" render={()=>(
isLoggedIn?
(<MyInformation/>):
(<Redirect to="/login"/>)} */}
          <Route path="/CheckPage" component={UDPage}/>
          <Route path="/MyPage" component={MyPage}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Signup" component={Signup}/>
          <Route path="/BoardWrite" component={BoardWrite}/>
          <Route path="/BoardDetail" component={BoardDetail}/>
        </HashRouter>
      </div>
    );
  }
}

export default App;
