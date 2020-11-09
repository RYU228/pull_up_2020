import React from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

class BoardItem extends React.Component {

    render() {
        const {title, numId, time, content} = this.props;
        if(Number(cookie.load("boardNumId")) < numId) cookie.save("boardNumId", numId);
        
        return (
            <div>
                {numId}
                <Link to={{
                    pathname:"boardDetail",
                    numId: numId,
                    title: title,
                    content: content
                    }}>
                    <div>{title}</div>
                </Link>
                <div>{time}</div>
            </div>
        )
    }
}

export default BoardItem;