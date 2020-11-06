import React from 'react';

class UDPage extends React.Component {
    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.handleBtnClick();
        }
    }
    handleBtnClick = () => {
        const {location, history} = this.props;

        if(location.goto === "MyPage") {
            history.push("/MyPage");
        } else if (location.goto === "Delete") {
            history.push("/Delete");
        } else {
            alert("잘못된 접근입니다.");
            history.push("/");
        }
    }
    handleMessage = () => {
        const {location, history} = this.props;
        const btn = document.createElement("button");
        btn.innerText = "확인";
        this.container.appendChild(btn);

        if(location.goto === "MyPage") {
            this.message.innerText = "마이페이지에 들어가기 위해 비밀번호를 입력해주세요.";
            btn.addEventListener("click", this.handleBtnClick);
        } else if(location.goto === "delete") {
            this.message.innerText = "정말 삭제하시겠으면 비밀번호를 입력해주세요.";
            btn.addEventListener("click", this.handleBtnClick);
        }
    }

    componentDidMount() {
        this.handleMessage();
    }

    render() {
        return (
            <div
            ref={ref => (this.container = ref)}>
                <div
                ref={ref => (this.message = ref)}
                ></div>
                <input
                onKeyPress={this.handleKeyPress}
                type="password"/>
            </div>
        )
    }
}

export default UDPage;