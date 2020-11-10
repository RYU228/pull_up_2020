import React from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import './boarditem.css';

class BoardItem extends React.Component {

    render() {
        const {title, numId, time, content} = this.props;
        if(Number(cookie.load("boardNumId")) < numId) cookie.save("boardNumId", numId);
        
        return (
            <div className="item_container">
                <div className="item_numId">
                    {numId}
                </div>
                <div className="item_title">
                <Link to={{
                    pathname:"boardDetail",
                    numId: numId,
                    title: title,
                    content: content
                    }}>
                    {title}
                </Link>
                </div>
                <div className="item_time">{time}</div>
            </div>
        )
    }
}

export default BoardItem;