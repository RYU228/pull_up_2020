import React from 'react';
import CKEditor from 'ckeditor4-react';
import axios from 'axios';
import cookie from 'react-cookies';
import './boardwrite.css';

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
          this.inputTitle.focus();
          return;
        } else if (content === undefined || content === "") {
          alert("글 내용을 입력 해주세요.");
          content.focus();
        }
        
        const {location} = this.props;
        let numId;
        if(location.goto === "Update") {
          url = "http://localhost:8080/board/update";
          numId = location.numId;
        } else if(location.goto === "Write") {
          url = "http://localhost:8080/board/write";
          numId = Number(cookie.load("boardNumId"))+1;
        }
        
        send_param = {
            numId: numId,
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
          <div className="write_container">
              <span className="write_title">글 쓰기</span>
              <div className="name_container">
                <span className="write_name">제목</span>
                <input
                className="write_inputName"
                placeholder="Input title"
                ref={ref => (this.inputTitle = ref)}/>
              </div>
              <CKEditor
              data={this.state.data}
              onChange={this.onEditorChange}
              config={{
                filebrowserBrowseUrl: "./browser/browse.php",
                filebrowserUploadUrl: "./uploader/upload.php?type=Files"
              }}
              ></CKEditor>
              <div className="write_btn">
                <button
                className="write_okBtn"
                onClick={this.writeBoard}>확인</button>
                <button className="write_cancelBtn">취소</button>
              </div>
          </div>
        )
      } else if(location.goto === "Update") {
        const {location} = this.props;
        return (
          <div className="write_container">
              <span className="write_title">글 수정</span>
              <div className="name_container">
                <span className="write_name">제목</span>
                <input
                className="write_inputName"
                ref={ref => (this.inputTitle = ref)}
                value={location.title}/>
              </div>
              <CKEditor
              ref={ref => (this.updateEditor = ref)}
              data={location.content}
              onChange={this.onEditorChange}
              ></CKEditor>
              <div className="write_btn">
                <button
                className="write_okBtn"
                onClick={this.writeBoard}>수정</button>
                <button className="write_cancelBtn">취소</button>
              </div>
          </div>
        )
      }
        
    }
}

export default BoardWrite;