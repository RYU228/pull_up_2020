import React from 'react';
import './plan.css';

class Plan extends React.Component {
    handleChange = (e) => {
        const input_value = e.target.value;
        this.progress_bar.value = input_value;
    }

    render() {
        const {content, count} = this.props;
        return (
            <div className="planData_container">
                <div className="planData_content">
                    <div className="planData_title">{content}</div>
                    <div className="planData_counts">
                        <input
                        onChange={this.handleChange}
                        className="planData_inputCount"/>
                        <div className="planData_count">/ {count}</div>
                    </div>
                </div>
                <div>
                    <progress
                ref={ref=> (this.progress_bar = ref)}
                value="20" max="100" / >
                    <span>asdfasd</span>
                </div>
            </div>
        )
    }
}

export default Plan;