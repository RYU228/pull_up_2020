import React from 'react';
import './Navigation.css';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';

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

    componentDidMount() {
        if(cookie.load("login_id") !== undefined) {
            this.logoutLi.innerText = "로그아웃"
        } else {
            this.logoutLi.innerText = "로그인"
        }
        
    }

    render() {
        return (
            <div className="nav_container">
                <span>Pull Up Challenge</span>
                <ul>
                <Link style={{textDecoration: 'none', color:'#31a5f8'}}
                to={{
                        pathname: "/BoardWrite",
                        goto: "Write"
                        }}>
                        <li className="nav_write">글쓰기</li>
                    </Link>
                    <Link style={{textDecoration: 'none', color:'#31a5f8'}}
                    to={{
                        pathname:"/UDPage",
                        goto: "MyPage"
                        }}>
                        <li className="nav_myPage">마이페이지</li>
                    </Link>
                    <li
                    ref={ref=>(this.logoutLi = ref)}
                    className="nav_logout" onClick={this.handleClick}>로그인</li>
                </ul>
            </div>
        )
    }
}

export default Navigation;