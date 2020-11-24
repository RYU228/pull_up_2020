import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import BoardComment from './BoardComment';
import './boarddetail.css';

class BoardDetail extends React.Component {
    state = {
        commentList: []
    }
    componentDidMount() {
        this.divContent.innerHTML = sessionStorage.getItem("content");
        this.loadComment();
        this.countViews();
    }

    countViews = async () => {
        //조회수 증가.
        //db에서 조회수 호출 후 증가.
        //같은 아이디로 하루에 한번반 조회수 증가.
        let readViews;
        const numId = sessionStorage.getItem("numId");
        let send_param = {
            numId: numId
        }
        await axios
        .post('http://localhost:8080/board/readViews', send_param)
        .then(res => {
            if(res.data.check) {
                readViews = res.data.data[0].views;
            }
        })
        .catch(err => {
            console.log(err);
        });
        if(readViews === null) {
            readViews = 0;
        }
        readViews++;
        
        send_param = {
            numId: numId,
            views: readViews
        }
        await axios
        .post('http://localhost:8080/board/updateViews', send_param);

        //하루에 한번만 조회수 증가.
        // const login_id = cookie.load("login_id");
        // const time = sessionStorage.getItem("time");
        // const date = time.slice("T");
        // localStorage.setItem(login_id, date);
    }
    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.addComment();
        }
    }
    addComment = () => {
        const numId = sessionStorage.getItem("numId");
        const comment = this.commentArea.value;
        const url = "http://localhost:8080/comment/create";
        const send_param = {
            writer: cookie.load("login_id"),
            numId: numId,
            comment: comment
        }

        axios
        .post(url, send_param)
        .then(returnData => {
            if(returnData.data.check) {
                console.log(returnData.data.message);
                window.location.reload();
            } else {
                alert(returnData.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    loadComment = () => {
        const numId = sessionStorage.getItem("numId");
        const send_pram = {
            numId
        }

        const url = "http://localhost:8080/comment/read";

        axios
        .post(url, send_pram)
        .then(res => {
            if(res.data.check) {
                this.setState({
                    commentList: res.data.list
                })
            } else {
                alert(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    change = () => {
        // const writer = sessionStorage.getItem("writer");
        // const cur_id = cookie.load("login_id");

        // if(writer === cur_id) {
        // }
        this.test.href = "";
        console.log(this.test.href);
    }
    delete = async () => {
        const writer = sessionStorage.getItem("writer");
        const cur_id = cookie.load("login_id");

        if(writer === cur_id) {
            const {location} = this.props;
            let url = "http://localhost:8080/board/delete";
            const send_param = {
                numId: location.numId
            }
    
            await axios
            .post(url, send_param)
            .then(res => {
                if(res.data.check) {
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    
            url = "http://localhost:8080/comment/delete";
    
            await axios
            .post(url, send_param)
            .then(res => {
                if(res.data.check) {
                    window.location.href = "/";
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            alert("삭제할 수 없습니다.");
        }
    }
    

    render() {
        const {location} = this.props;
        const {commentList} = this.state;
        if(location.title !== undefined) {
            sessionStorage.setItem("numId", location.numId);
            sessionStorage.setItem("title", location.title);
            sessionStorage.setItem("writer", location.writer);
            sessionStorage.setItem("time", location.time);
            sessionStorage.setItem("views", location.views);
            sessionStorage.setItem("content", location.content);
        }
        
        const numId = sessionStorage.getItem("numId");
        const title = sessionStorage.getItem("title");
        const writer = sessionStorage.getItem("writer");
        const time = sessionStorage.getItem("time");
        const views = sessionStorage.getItem("views");
        const content = sessionStorage.getItem("content");

        const cur_id = cookie.load("login_id");
        let change_link = {};
        if(writer === cur_id) {
            change_link = {
                pathname: "/BoardWrite",
                goto: "Update",
                numId: numId,
                title: title,
                content: content
            };
        }
        
        return (
            <div className="detail_container">
                <span className="detail_title">{title}</span>
                <div className="detail_writerTime">
                    <span className="detail_writer">{writer}</span>
                    <span className="detail_time">{time}</span>
                    <span className="detail_views">조회수 : {views}</span>
                </div>
                <div className="detail_content"
                ref={ref => (this.divContent = ref)}></div>
                <div className="dButton_container">
                    <Link to={change_link}>
                        <button>수정</button>
                    </Link>
                    <button onClick={this.delete}>삭제</button>
                </div>
                <div className="detail_comment">
                    <span className="detail_comWriter">{cookie.load("login_id")}</span>
                    <textarea
                    className="detail_comTextarea"
                    onKeyPress={this.handleKeyPress}
                    ref={ref => (this.commentArea = ref)}></textarea>
                    <button
                    className="detail_comBtn"
                    onClick={this.addComment}>추 가</button>
                </div>
                <div>
                    {commentList.map(comment => <BoardComment key={comment.time}
                    comment={comment.comment}
                    writer={comment.writer}
                    time={comment.time}/>)}
                </div>
            </div>
        )
    }
}

export default BoardDetail;