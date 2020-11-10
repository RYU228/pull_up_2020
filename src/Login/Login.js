import React from 'react';
import {Link} from "react-router-dom";
import cookie from 'react-cookies';
import axios from 'axios';
import './login.css';
axios.defaults.withCredentials = true;

class Login extends React.Component {
    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.login();
        }
    }
    login = () => {
        const id = this.id.value;
        const password = this.password.value;

        if(id === "" || id === undefined) {
            alert("ID를 입력해주세요.");
            this.id.focus();
            return;
        } else if(password === "" || password === undefined) {
            alert("password 입력해주세요.");
            this.password.focus();
            return;
        }

        const send_param = {
            id,
            password
        }

        axios
        .post("http://localhost:8080/member/login", send_param)
        //정상 수행
        .then(returnData => {
            if (returnData.data.check) {
                cookie.save("login_id", returnData.data._id);
                cookie.save("login_nickname", returnData.data._nickname);
                const {history} = this.props;
                //history.push("/");
                window.location.href = "/";
            } else {
                alert(returnData.data.message);
            }
        })
        //에러
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="login_container">
                <div className="text_container">
                    <span>Welcome!</span>
                    <span>Try</span>
                    <span>Pull-Up</span>
                    <span>Challange!!</span>
                </div>
                <div className="id_container">
                    <span className="login_id">ID</span>
                    <input
                    className="login_inputId"
                    ref={ref => (this.id = ref)}
                    placeholder="Input ID"/>
                </div>
                <div className="pwd_container">
                    <div className="login_password">Password</div>
                    <input
                    className="login_inputPwd"
                    onKeyPress={this.handleKeyPress}
                    ref={ref => (this.password = ref)}
                    placeholder="Input Password"
                    type="password"/>
                </div>
                <button className="login_loginBtn" onClick={this.login}>로그인</button>
                <Link to={{pathname:"/Signup"}}>
                    <button className="login_signup">회원가입</button>
                </Link>
            </div>
        )
    }
}

export default Login;