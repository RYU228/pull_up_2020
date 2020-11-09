import React from 'react';
import CKEditor from 'ckeditor4-react';
import axios from 'axios';
import cookie from 'react-cookies';

class BoardWrite extends React.Component {
    state = {
        data: ""
    }

    writeBoard = () => {
        let url;
        let send_param;
    
        const title = this.inputTitle.value;
        const content = this.state.data;
    
        if (title === undefined || title === "") {
          alert("글 제목을 입력 해주세요.");
          title.focus();
          return;
        } else if (content === undefined || content === "") {
          alert("글 내용을 입력 해주세요.");
          content.focus();
        }
        
        const {location} = this.props;
        if(location.goto === "Update") {
          url = "http://localhost:8080/board/update";
        } else if(location.goto === "Write") {
          url = "http://localhost:8080/board/write";
        }
        
        send_param = {
            numId: Number(cookie.load("boardNumId"))+1,
            writer: cookie.load("login_id"),
            title: title,
            content: content
        };    
    
        axios
          .post(url, send_param)
          .then(returnData => {
            if (returnData.data.check) {
              window.location.href = "/";
            } else {
              alert("글쓰기 실패");
            }
          })
          //에러
          .catch(err => {
            console.log(err);
          });
      };

      onEditorChange = e => {
        this.setState({
          data: e.editor.getData()
        });
      };

    render() {
      const {location} = this.props;
      if(location.goto === "Write") {
        return (
          <div>
              <div>글 쓰기</div>
              <input
              ref={ref => (this.inputTitle = ref)}/>
              <CKEditor
              data={this.state.data}
              onChange={this.onEditorChange}
              ></CKEditor>
              <button onClick={this.writeBoard}>확인</button>
              <button>취소</button>
          </div>
        )
      } else if(location.goto === "Update") {
        const {location} = this.props;
        return (
          <div>
              <div>글 수정</div>
              <input
              ref={ref => (this.inputTitle = ref)}
              value={location.title}/>
              <CKEditor
              ref={ref => (this.updateEditor = ref)}
              data={location.content}
              onChange={this.onEditorChange}
              ></CKEditor>
              <button onClick={this.writeBoard}>수정</button>
              <button>취소</button>
          </div>
        )
      }
        
    }
}

export default BoardWrite;