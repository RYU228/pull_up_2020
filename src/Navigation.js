import React from 'react';
import './Navigation.css';
import {Link} from 'react-router-dom';

class Navigation extends React.Component {
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
                    <li>글쓰기</li>
                    <li>로그아웃</li>
                </ul>
            </div>
        )
    }
}

export default Navigation;