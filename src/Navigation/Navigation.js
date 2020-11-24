import React from 'react';
import './Navigation.css';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import '../FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navigation extends React.Component {
    handleClick = () => {
        const {history} = this.props;
        if(cookie.load("login_id") !== undefined) {
            cookie.remove("login_id");
            cookie.remove("login_nickname");
            window.location.href = "/";
        } else {
            window.location.href = "#/login";
        }
    }
    toHome = () => {
        window.location.href = "#/";
    }
    showSideBar = () => {
        const sideBar = document.querySelector(".sidebar_container");
        const sideBarLi = document.querySelector(".nav_side");
        
        if(sideBar.style.display === "none" || sideBar.style.display === "") {
            sideBarLi.style.color = "black";
            sideBar.style.display = "block";
            sideBar.style.animation = "show 0.5s";
        } else {
            sideBarLi.style.color = "#31a5f8";
            sideBar.style.display = "none";
        }
    }

    componentDidMount() {
        if(cookie.load("login_id") !== undefined) {
            this.logoutLi.innerText = "로그아웃"
            
        } else {
            this.logoutLi.innerText = "로그인"
        }
    }

    render() {
        let writeLi, myPageLi = null;
        if(cookie.load("login_id") !== undefined) {
            writeLi = <Link style={{textDecoration: 'none', color:'#31a5f8'}}
            to={{
                    pathname: "/BoardWrite",
                    goto: "Write"
                    }}>
                    <li className="nav_write">글쓰기</li>
                </Link>;

            myPageLi = <Link style={{textDecoration: 'none', color:'#31a5f8'}}
            to={{
                pathname:"/CheckPage",
                goto: "MyPage"
                }}>
                <li className="nav_myPage">마이페이지</li>
            </Link>;
        } else {
            writeLi = <Link style={{textDecoration: 'none', color:'#31a5f8'}}
            to={{
                    pathname: "/login"
                    }}>
                    <li className="nav_write">글쓰기</li>
                </Link>;

            myPageLi = <Link style={{textDecoration: 'none', color:'#31a5f8'}}
            to={{
                pathname:"/login"
                }}>
                <li className="nav_myPage">마이페이지</li>
            </Link>;
        }
        
        return (
            <div className="nav_container">
                <span onClick={this.toHome}>Pull Up Challenge</span>
                <ul>
                    {writeLi}
                    {myPageLi}
                    <li
                    ref={ref=>(this.logoutLi = ref)}
                    className="nav_logout" onClick={this.handleClick}>로그인</li>
                    <li
                    className="nav_side"
                    onClick={this.showSideBar}>
                        <FontAwesomeIcon icon="bars" />
                        </li>
                </ul>
            </div>
        )
    }
}

export default Navigation;