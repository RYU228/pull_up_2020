import React from 'react';
import axios from 'axios';
import './signup.css';
axios.defaults.withCredentials = true;

class Signup extends React.Component {
    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.join();
        }
    }
    handleIdChange = () => {
        const isKorean = /[A-Za-z0-9]/;
        if(!isKorean.test(this.id.value)) {
            this.idInfo.innerText = "ID는 영어와 숫자로만 구성해주세요.";
        } else {
            this.idInfo.innerText = "";
        }
    }
    handlePwdChange = () => {
        if(this.password.value !== this.Rpassword.value) {
            this.passwordInfo.innerText = "비밀번호를 다시 한번 확인해주세요.";
        } else {
            this.passwordInfo.innerText = "일치합니다.";
        }
    }

    cancel = () => {
        window.location.href = "#/login";
    }

    join = () => {
        const id = this.id.value;
        const nickname = this.nickname.value;
        const password = this.password.value;
        const Rpassword = this.Rpassword.value;

        if(id === "" || id === undefined) {
            alert("ID를 입력해주세요.");
            this.id.focus();
            return;
        } else if(nickname === "" || nickname === undefined) {
            alert("nickname을 입력해주세요.");
            this.nickname.focus();
            return;
        } else if(password === "" || password === undefined) {
            alert("password 입력해주세요.");
            this.password.focus();
            return;
        } else if(Rpassword === "" || Rpassword === undefined) {
            alert("password 입력해주세요.");
            this.Rpassword.focus();
            return;
        } else if(password !== Rpassword) {
            alert("password를 확인해주세요.");
            this.password.focus();
            return;
        }

        const {history} = this.props;
        const send_param = {
            id,
            nickname,
            password
        };
    axios
      .post("http://localhost:8080/member/join", send_param)
      //정상 수행
      .then(respone => {
          console.log(respone.data.message);
          history.push("/login");
        })
      //에러
      .catch(err => {console.log(err);});
    }

    render() {
        return (
            <div className="signup_container">
                <div className="id_container">
                    <span className="signup_id">ID</span>
                    <input
                    className="signup_inputId"
                    ref={ref => (this.id = ref)}
                    placeholder="Input ID"
                    onChange={this.handleIdChange}/>
                    <span
                    className="signup_IdInfo"
                    ref={ref => (this.idInfo = ref)}
                    ></span>
                </div>
                <div className="nick_container">
                    <span className="signup_nick">Nickname</span>
                    <input
                    className="signup_inputNick"
                    ref={ref => (this.nickname = ref)}
                    placeholder="Input Nickname"/>
                </div>
                <div className="pwd_container">
                    <span className="signup_Pwd">Password</span>
                    <input
                    className="signup_inputPwd"
                    ref={ref => (this.password = ref)}
                    placeholder="Input Password"
                    type="password"/>
                </div>
                <div className="rePwd_container">
                    <span className="signup_rePwd">Repeat password</span>
                    <input
                    className="signup_inputRePwd"
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handlePwdChange}
                    ref={ref => (this.Rpassword = ref)}
                    placeholder="Repeat Password"
                    type="password"/>
                    <div
                    className="signup_PwdInfo"
                    ref={ref => (this.passwordInfo = ref)}
                    ></div>
                </div>
                <div className="signupBtn_container">
                    <button className="signup_joinBtn" onClick={this.join}>확인</button>
                    <button className="signup_cancelBtn" onClick={this.cancel}>취소</button>
                </div>
            </div>
        )
    }
}

export default Signup;