import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import './plan.css';

class Plan extends React.Component {
    componentDidMount() {
        const {curCount} = this.props;
        
        let input_count;
        if(curCount === undefined) {
            input_count = 0;
        } else {
            input_count = curCount;
        }

        this.input_count.value = input_count;
    }

    deletePlan = () => {
        const {content, loadPlan, changeAllPlan} = this.props;
        const planData_container = document.querySelector(".planData_container");
        const planData_title = planData_container.querySelector(".planData_title");
        
        const send_param = {
            id: cookie.load("login_id"),
            content
        }
        
        axios
            .post("http://localhost:8080/plan/delete", send_param)
            //정상 수행
            .then(res => {
                if (res.data.check) {
                    loadPlan();
                } else {
                    alert(res.data.message);
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
    }
    handleChange = (e) => {
        const {count} = this.props;
        const input_value = e.target.value;
        this.progress_bar.value = input_value;

        if(input_value > 0) {
            const value = Math.floor((input_value/count)*100);
            this.percent.innerText = `${value}%`;
        } else {
            this.percent.innerText = '0%';
        }
    }

    render() {
        const {content, count, curCount} = this.props;
        let input_count;
        
        if(curCount === undefined) {
            input_count = 0;
        } else {
            input_count = curCount;
        }
        
        const percent_value = Math.floor((input_count/count)*100);
        return (
            <div className="planData_container">
                <div className="planData_content">
                    <div className="planData_title">{content}</div>
                    <div className="planData_counts">
                        <input
                        ref={ref=>(this.input_count = ref)}
                        onChange={this.handleChange}
                        className="planData_inputCount"/>
                        <div className="planData_count">/ {count}</div>
                    </div>
                </div>
                <div>
                    <progress
                    className="planData_progress"
                ref={ref=> (this.progress_bar = ref)}
                value={input_count} max={count} / >
                    <span className="planData_percent"
                    ref={ref=>(this.percent = ref)}>{percent_value}%</span>
                    <button
                    onClick={this.deletePlan}
                    className="planData_changeBtn">❌</button>
                </div>
            </div>
        )
    }
}

export default Plan;