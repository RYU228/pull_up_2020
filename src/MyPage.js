import React from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
axios.defaults.withCredentials = true;

class MyPage extends React.Component {
    changeNickname = () => {
        const changeNick = this.changeNick.value;

        if(changeNick === "" || changeNick === undefined) {
            alert("Nickname을 입력해주세요.");
            this.changeNick.focus();
            return;
        }

        const send_param = {
            nickname: changeNick
        }

        axios
        .post("http://localhost:8080/member/updateNick", send_param)
        //정상 수행
        .then(returnData => {
            if (returnData.data.message) {
                //cookie.save("login_id", id);
                //const {history} = this.props;
                //history.push("/");
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
    AddNickDiv() {
        return (
            <div
            ref={ref => (this.changeNick = ref)}>
                <input
                ref={ref => (this. = ref)}/>
                <button onClick={this.changeNickname}>변경</button>
            </div>
        )
    }

    handleNickChange = () => {
        this.changeNick.classList.add("none");
    }

    changePassword = () => {
        const currentPwd = this.currentPwd.value;
        const newPwd = this.newPwd.value;
        const repeatPwd = this.repeatPwd.value;

        if()
        if(changePwd === "" || changePwd === undefined) {
            alert("Nickname을 입력해주세요.");
            this.changePwd.focus();
            return;
        }

        const send_param = {
            nickname: changeNick
        }

        axios
        .post("http://localhost:8080/member/updateNick", send_param)
        //정상 수행
        .then(returnData => {
            if (returnData.data.message) {
                //cookie.save("login_id", id);
                //const {history} = this.props;
                //history.push("/");
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

    AddPwdDiv() {
        return (
            <div
            ref={ref => (this.changePwd = ref)}>
                <input
                placeholder="Current password"
                ref={ref => (this.currentPwd = ref)}/>
                <input
                placeholder="New password"
                ref={ref => (this.newPwd = ref)}/>
                <input
                placeholder="Repeat new password"
                ref={ref => (this.repeatPwd = ref)}/>
                <div
                ref={ref => (this.passwordInfo = ref)}></div>
                <button onClick={this.changePassword}>변경</button>
            </div>
        )
    }

    handlePwdChange = () => {

    }

    render() {
        return (
            <div>
                <div>ID</div>
                <div>ID</div>
                <div>Nickname</div>
                <button onClick={this.handleNickChange}>변경</button>
                {this.AddNickDiv()}
                <div>Password</div>
                <button onClick={this.handlePwdChange}>변경</button>
                {this.AddPwdDiv()}
            </div>
        )
    }
}

export default MyPage;