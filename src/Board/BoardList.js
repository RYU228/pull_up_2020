import React from 'react';
import axios from 'axios';
import BoardItem from './BoardItem';
import cookie from 'react-cookies';
import './boardlist.css';

class BoardList extends React.Component {
    state = {
        boardList: []
    }
    componentDidMount() {
        this.getBoardList(1);
        cookie.save("boardNumId", 0);
    }

    getPageList = (e) => {
        this.loadList(e.target.value);
    }
    loadList = async (startPage) => {
        const url = "http://localhost:8080/board/read";
        const amount = 8;
        const send_param = {
            start: startPage,
            amount: amount
        }
        let boardList = []
        let boardItem;
        await axios
        .post(url, send_param)
        .then(res => {
            if (res.data.check) {
                boardItem = res.data.list;
                for(let i = 0; i<boardItem.length; i++)
                {
                    boardList.push(boardItem[i]);
                }
                this.setState({
                    boardList: boardList
                });
            }
      })
      .catch(err => {
        console.log(err);
      });
    }
    getBoardList = async (startPage) => {
        const amount = 8;
        let totalCount;

        let url = "http://localhost:8080/board/readCount";
        
        await axios
        .post(url)
        .then(res => {
            if (res.data.check) {
                totalCount = res.data.count;
            }
        })
        .catch(err => {
            console.log(err);
        });

        if(totalCount > 0) {this.list_main_not.classList.add("notShowing");}
        const totalPage = Math.ceil(totalCount/amount);
        
        for(let i=0; i<totalPage; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.classList.add("list_pageBtn")
            pageBtn.innerText = i+1;
            pageBtn.value = i+1;
            pageBtn.addEventListener("click", this.getPageList);
            this.listPage.appendChild(pageBtn);
        }
        
        //아래 데이터 받는 부분 수정.
        url = "http://localhost:8080/board/read";
        const send_param = {
            start: startPage,
            amount: amount
        }
        let boardList = []
        let boardItem;
        await axios
        .post(url, send_param)
        .then(res => {
            if (res.data.check) {
                boardItem = res.data.list;
                for(let i = 0; i<boardItem.length; i++)
                {
                    boardList.push(boardItem[i]);
                }
                this.setState({
                    boardList: boardList
                });
            }
      })
      .catch(err => {
        console.log(err);
      });
    }

    render() {
        const {boardList} = this.state;
        return (
            <div
                className="list_container"
                ref={ref =>(this.container = ref)}>
                    <div className="list_image">
                        <span>Pull up for wide back</span>
                        <span>Do it now!</span>
                    </div>
                    <div className="list_header">
                        <div className="header_num">번호</div>
                        <div className="header_title">제 목</div>
                        <div className="header_writer">작성자</div>
                        <div className="header_time">시간</div>
                    </div>
                    <div
                    className="list_main">
                        {boardList.map(item =>
                        <BoardItem
                        key={item.numId}
                        numId={item.numId}
                        writer={item.writer}
                        title={item.title}
                        time={item.time}
                        views={item.views}
                        content={item.content}/>
                        )}
                    <div
                    className="list_main_not"
                    ref={ref=>(this.list_main_not = ref)}>
                        게시물이 없습니다.
                    </div>
                    <div
                    className="listPage_container"
                    ref={ref=>(this.listPage = ref)}></div>
                </div>
                </div>
        )
        
    }
}

export default BoardList;