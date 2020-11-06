import React from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import {Link} from 'react-router-dom';
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

    //닉네임 변경이나 마이페이지에 들어왔을때 로그인 된 닉네임 받아오기
    componentDidMount() {
        this.input_password.value = "";
        this.input_rePassword.value = "";
        this.input_nickname.value = cookie.load("login_nickname");
        this.login_id.value = cookie.load("login_id");
        console.log(cookie.load("login_id"));
    }

    render() {
        return (
            <div>
                <div>ID</div>
                <div
                ref={ref => (this.login_id = ref)}></div>
                <div>Nickname</div>
                <input
                onKeyPress={this.handleNickKeyPress}
                ref={ref => (this.input_nickname = ref)} />
                <button onClick={this.handleNickChange}>수정</button>
                {/* {this.AddNickDiv()} */}
                <div>Password</div>
                <input
                type="password"
                ref={ref => (this.input_password = ref)} />
                <input
                onKeyPress={this.handlePwdKeyPress}
                type="password"
                ref={ref => (this.input_rePassword = ref)} />
                <button onClick={this.handlePwdChange}>수정</button>
                <Link to={{
                    pathname: "/UDPage",
                    goto: "Delete"
                }}>
                    <button>삭제</button>
                </Link>
            </div>
        )
    }
}

export default MyPage;