import React from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import './boarditem.css';

class BoardItem extends React.Component {
    render() {
        const {title, numId, writer, time, views, content} = this.props;
        const date = time.split('T');
        if(Number(cookie.load("boardNumId")) < numId) cookie.save("boardNumId", numId);

        let path = "";
        if(cookie.load("login_id") === undefined || cookie.load("login_id") === "") {
            path = "/login";
        } else {
            path = "/boardDetail";
        }
        return (
            <Link style={{textDecoration: 'none', color:'black'}}
            to={{
            pathname: path,
            numId: numId,
            writer: writer,
            title: title,
            views: views,
            content: content,
            time: time
            }}>
                <div className="item_container">
                    <div className="item_numId">
                        {numId}
                    </div>
                    <div className="item_title">
                        {title}
                    </div>
                    <div className="item_writer">{writer}</div>
                    <div className="item_time">{date[0]}</div>
                </div>
            </Link>
        )
    }
}

export default BoardItem;