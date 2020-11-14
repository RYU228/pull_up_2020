import React from 'react';
import './boardcomment.css';

class BoardComment extends React.Component {
    render() {
        const {writer, comment, time} = this.props;
        const slicedTime = time.split("T");
        return (
            <div className="comment_container">
                <div className="comment_writer">{writer}</div>
                <div className="comment_comment">{comment}</div>
                <div className="comment_time">{slicedTime[0]}</div>
            </div>
        )
    }
}

export default BoardComment;