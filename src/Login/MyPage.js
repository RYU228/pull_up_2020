import React from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './mypage.css';
axios.defaults.withCredentials = true;

class MyPage extends React.Component {
    //닉네임 input에서 엔터 입력시  변경 함수 호출
    handleNickKeyPress = (e) => {
        if(e.key === "Enter") {
            this.handleNickChange();
        }
    }
    //비밀번호 input에서 엔터 입력시  변경 함수 호출
    handlePwdKeyPress = (e) => {
        if(e.key === "Enter") {
            this.handlePwdChange();
        }
    }

    handleChange = (e) => {
        const password = this.input_password.value;
        const rePassword = e.target.value;
        if(password !== rePassword) {
            this.pwdInfo.innerText = "비밀번호가 일치하지 않습니다.";
        } else if(password === rePassword) {
            this.pwdInfo.innerText = "비밀번호가 일치합니다.";
        } else {
            this.pwdInfo.innerText = "";
        }
    }

    //닉네임 변경 함수
    handleNickChange = () => {
        const nickname = this.input_nickname.value;

        if(nickname !== cookie.load("login_nickname")) {
            if(nickname === "" || nickname === undefined) {
                alert("변경할 Nickname을 입력해주세요.");
                this.input_nickaname.focus();
                return;
            }

            const send_param = {
                id: cookie.load("login_id"),
                nickname: nickname
            };
    
            axios
            .post("http://localhost:8080/member/updateNick", send_param)
            .then(returnData => {
                if (returnData.data.check) {
                    cookie.save("login_nickname", returnData.data._nickname);
                    alert(returnData.data.message);
                    window.location.reload();
                } else {
                    alert(returnData.data.message);
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
        }
    }

    //비밀번호 변경 함수
    handlePwdChange = () => {
        const password = this.input_password.value;
        const rePassword = this.input_rePassword.value;

        if(password.length > 0) {
            if(this.input_rePassword.value === "" || this.input_rePassword.value === undefined) {
                alert("변경할 password를 입력해주세요.");
                this.input_rePassword.focus();
                return;
            }
        }
        
        let send_param = {
            id: cookie.load("login_id"),
            password: password
        };

        axios
        .post("http://localhost:8080/member/updatePwd", send_param)
        //정상 수행
        .then(returnData => {
            //true 이면 성공했다. false이면 실패한 이유.
            if (returnData.data.check) {
                alert(returnData.data.message);
                window.location.reload();
            } else {
                alert(returnData.data.message);
            }
        })
        //에러
        .catch(err => {
            console.log(err);
        });
    }

    AddChangeDiv() {
        // return (
        //     <div
        //     ref={ref => (this.changeNick = ref)}>
        //         <input
        //         ref={ref => (this. = ref)}/>
        //         <button onClick={this.changeNickname}>변경</button>
        //     </div>
        // )
    }

    // handleNickChange = () => {
    //     this.changeNick.classList.add("none");
    // }

    componentDidMount() {
        this.input_password.value = "";
        this.input_rePassword.value = "";
        this.input_nickname.value = cookie.load("login_nickname");
        this.login_id.innerText = cookie.load("login_id");
    }

    render() {
        return (
            <div className="mypage_container">
                <div className="mypage_idContainer">
                    <span className="mypage_id">ID</span>
                    <span
                    className="mypage_loginId"
                    ref={ref => (this.login_id = ref)}></span>
                </div>
                <div className="mypage_nickContainer">
                    <span
                    className="mypage_nick">Nickname</span>
                    <input
                    className="mypage_loginNick"
                    onKeyPress={this.handleNickKeyPress}
                    ref={ref => (this.input_nickname = ref)} />
                    <button
                    className="mypage_changeNickBtn"
                    onClick={this.handleNickChange}>✔</button>    
                </div>
                <span className="mypage_nickInfo">변경할 닉네임을 입력하고 옆의 버튼이나 엔터를 눌러주세요.</span>
                {/* {this.AddNickDiv()} */}
                <div className="mypage_pwdContainer">
                    <span className="mypage_pwd">Password</span>
                    <input
                    className="mypage_inputPwd"
                    type="password"
                    placeholder="Input changed password"
                    ref={ref => (this.input_password = ref)} />
                    <button
                    className="mypage_changePwdBtn"
                    onClick={this.handlePwdChange}>✔</button>
                </div>
                <div className="mypage_rePwdContainer">
                    <span className="mypage_rePwd"></span>
                    <input
                    className="mypage_inputRePwd"
                    onKeyPress={this.handlePwdKeyPress}
                    onChange={this.handleChange}
                    type="password"
                    ref={ref => (this.input_rePassword = ref)} />
                    <span className="mypage_rePwdArea"> </span>
                </div>
                <span
                ref={ref => (this.pwdInfo = ref)}
                className="mypage_pwdInfo"></span>
                <Link to={{
                    pathname: "/CheckPage",
                    goto: "Delete"
                }}>
                    <button className="mypage_deleteBtn">회원탈퇴</button>
                </Link>
            </div>
        )
    }
}

export default MyPage;