import React from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

class Signup extends React.Component {
    handleIdChange = () => {
        const isKorean = /[A-Za-z0-9]/;
        if(isKorean.test(this.id.value)) {
            this.idInfo.innerText = "ID는 영어와 숫자로만 구성해주세요.";
        }
    }
    handlePwdChange = () => {
        if(this.password.value !== this.Rpassword.value) {
            this.passwordInfo.innerText = "비밀번호를 다시 한번 확인해주세요.";
        }
    }

    join = () => {
        const id = this.id.value;
        const nickname = this.nickname.value;
        const password = this.password.value;
        const Rpassword = this.Rpassword.value;

        if(id === "" || id === undefined) {
            alert("nickname을 입력해주세요.");
            this.nickname.focus();
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
            <div>
                <div>ID</div>
                <input 
                ref={ref => (this.id = ref)}
                placeholder="Input ID"/>
                <div
                ref={ref => (this.idInfo = ref)}
                ></div>
                <div>Nickname</div>
                <input 
                ref={ref => (this.nickname = ref)}
                placeholder="Input Nickname"/>
                <div>Password</div>
                <input
                ref={ref => (this.password = ref)}
                placeholder="Input Password"
                type="password"/>
                <div>Repeat password</div>
                <input
                onChange={this.handlePwdChange}
                ref={ref => (this.Rpassword = ref)}
                placeholder="Repeat Password"
                type="password"/>
                <div
                ref={ref => (this.passwordInfo = ref)}
                ></div>
                <button onClick={this.join}>확인</button>
                <button>취소</button>
            </div>
        )
    }
}

export default Signup;