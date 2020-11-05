import React from 'react';
import './Navigation.css';

class Navigation extends React.Component {
    render() {
        return (
            <div className="nav_container">
                <span>Pull Up Challenge</span>
                <ul>
                    <li>글쓰기</li>
                    <li>로그아웃</li>
                </ul>
            </div>
        )
    }
}

export default Navigation;