import React from 'react';
import {Link} from "react-router-dom";
import cookie from 'react-cookies';
import axios from 'axios';
import './checkpage.css';

class UDPage extends React.Component {
    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.handleBtnClick();
        }
    }
    handleBtnClick = (e) => {
        if(this.password.value === "" || this.password.value === undefined) {
            alert("비밀번호를 입력해주세요.");
            this.password.focus();
            return ;
        }
        const {location, history} = this.props;

        if(location.goto === "MyPage") {
            history.push("/MyPage");
        } else if (location.goto === "Delete") {
            //history.push("/");
            console.log("adasd");
            const id = cookie.load("login_id");
            const pwd = this.password.value;

            const send_param = {
                id,
                pwd
            }
    
            axios
            .post("http://localhost:8080/member/delete", send_param)
            //정상 수행
            .then(res => {
                if (res.data.check) {
                    console.log("삭제");
                    cookie.remove("login_id");
                    cookie.remove("login_nickname");
                    window.location.href = "/";
                } else {
                    console.log("삭ㄴ제");
                    alert(res.data.message);
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
        } else {
            alert("잘못된 접근입니다.");
            history.push("/");
        }
    }
    handleMessage = () => {
        const {location, history} = this.props;
        const btn = document.createElement("button");
        btn.classList.add("check_btn");
        btn.innerText = "확인";
        this.container.appendChild(btn);

        if(location.goto === "MyPage") {
            this.message.innerText = "마이페이지에 들어가기 위해 비밀번호를 입력해주세요.";
            btn.addEventListener("click", this.handleBtnClick);
        } else if(location.goto === "Delete") {
            this.message.innerText = "정말 삭제하시겠으면 비밀번호를 입력해주세요.";
            btn.addEventListener("click", this.handleBtnClick);
        }
    }

    componentDidMount() {
        this.handleMessage();
    }

    render() {
        return (
            <div className="check_container"
            ref={ref => (this.container = ref)}>
                <span
                className="check_message"
                ref={ref => (this.message = ref)}
                ></span>
                <input
                className="check_input"
                ref={ref => (this.password = ref)}
                onKeyPress={this.handleKeyPress}
                placeholder="Input password"
                type="password"/>
            </div>
        )
    }
}

export default UDPage;