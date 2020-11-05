import React from 'react';
import {Link} from "react-router-dom";
import cookie from 'react-cookies';
import axios from 'axios';
axios.defaults.withCredentials = true;

class Login extends React.Component {
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
            console.log(returnData.data.message);
            if (returnData.data.message) {
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
            <div>
                <div>ID</div>
                <input
                ref={ref => (this.id = ref)}
                placeholder="Input ID"/>
                <div>Password</div>
                <input
                ref={ref => (this.password = ref)}
                placeholder="Input Password"
                type="password"/>
                <button onClick={this.login}>로그인</button>
                <Link to={{pathname:"/Signup"}}>
                    <button>회원가입</button>
                </Link>
            </div>
        )
    }
}

export default Login;