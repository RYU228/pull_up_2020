import React from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import './boarditem.css';

class BoardItem extends React.Component {
    render() {
        const {title, numId, writer, time, content} = this.props;
        const date = time.split('T');
        if(Number(cookie.load("boardNumId")) < numId) cookie.save("boardNumId", numId);
        
        return (
            <Link style={{textDecoration: 'none', color:'black'}}
            to={{
            pathname:"boardDetail",
            numId: numId,
            writer: writer,
            title: title,
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