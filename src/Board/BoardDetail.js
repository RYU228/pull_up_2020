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
        const {location} = this.props;
        this.divContent.innerHTML = sessionStorage.getItem("content");
        this.loadComment();
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
        const url = "http://localhost:8080/comment/read";

        axios
        .post(url)
        .then(returnData => {
            if(returnData.data.check) {
                this.setState({
                    commentList: returnData.data.list
                })
            } else {
                alert(returnData.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    delete = () => {
        const {location} = this.props;
        const url = "http://localhost:8080/board/delete";
        const send_param = {
            numId: location.numId
        }

        axios
        .post(url, send_param)
        .then(returnData => {
            if(returnData.data.check) {
                console.log(returnData.data.message);
                window.location.href = "/";
            } else {
                alert(returnData.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    

    render() {
        const {location} = this.props;
        const {commentList} = this.state;
        if(location.title !== undefined) {
            sessionStorage.setItem("numId", location.numId);
            sessionStorage.setItem("title", location.title);
            sessionStorage.setItem("writer", location.writer);
            sessionStorage.setItem("time", location.time);
            sessionStorage.setItem("content", location.content);
        }
        
        const title = sessionStorage.getItem("title");
        const writer = sessionStorage.getItem("writer");
        const time = sessionStorage.getItem("time");

        return (
            <div className="detail_container">
                <span className="detail_title">{title}</span>
                <div className="detail_writerTime">
                    <span className="detail_writer">{writer}</span>
                    <span className="detail_time">{time}</span>
                </div>
                <div className="detail_content"
                ref={ref => (this.divContent = ref)}></div>
                <div className="dButton_container">
                    <Link to={{
                        pathname: "/BoardWrite",
                        goto: "Update",
                        title: location.title,
                        content: location.content
                    }}>
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
                    {commentList.map(comment => <BoardComment key={comment.numId}
                    comment={comment.comment}
                    writer={comment.writer}
                    time={comment.time}/>)}
                </div>
            </div>
        )
    }
}

export default BoardDetail;