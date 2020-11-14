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
        this.getBoardList();
        cookie.save("boardNumId", 0);
    }

    getBoardList = async () => {
        const url = "http://localhost:8080/board/read";
        let boardList = []
        let boardItem;
        await axios
        .post(url)
        .then(returnData => {
            if (returnData.data.check) {
                boardItem = returnData.data.list;
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
        if(boardList.length > 0) {
            return (
                <div
                className="list_container"
                ref={ref =>(this.container = ref)}>
                    <div className="list_header">
                        <div className="header_num">번호</div>
                        <div className="header_title">제 목</div>
                        <div className="header_writer">작성자</div>
                        <div className="header_time">시간</div>
                    </div>
                    {boardList.map(item =>
                    <BoardItem
                    key={item.numId}
                    numId={item.numId}
                    writer={item.writer}
                    title={item.title}
                    time={item.time}
                    content={item.content}/>
                    )}
                </div>
            )    
        } else {
            return (
                <div
                className="list_container"
                ref={ref =>(this.container = ref)}>
                    게시물이 없습니다.
                </div>
            )    
        }
        
        
    }
}

export default BoardList;