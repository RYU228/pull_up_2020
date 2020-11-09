import React from 'react';
import './Navigation.css';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';

class Navigation extends React.Component {
    logout = () => {
        cookie.remove("login_id");
        cookie.remove("login_nickname");
        window.location.href = "/";
    }
    render() {
        return (
            <div className="nav_container">
                <span>Pull Up Challenge</span>
                <ul>
                    <Link to={{
                        pathname:"/UDPage",
                        goto: "MyPage"
                        }}>
                        <li>마이페이지</li>
                    </Link>
                    <Link to={{
                        pathname: "/BoardWrite",
                        goto: "Write"
                        }}>
                        <li>글쓰기</li>
                    </Link>
                    <li onClick={this.logout}>로그아웃</li>
                </ul>
            </div>
        )
    }
}

export default Navigation;