import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class BoardDetail extends React.Component {
    update = () => {
        // const {location} = this.props;
        // const url = "https://localhost:8080/board/update";
        // const send_param = {

        // }
    }
    delete = () => {
        const {location} = this.props;
        const url = "https://localhost:8080/board/delete";
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
        return (
            <div>
                {location.title}{location.content}
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
        )
    }
}

export default BoardDetail;