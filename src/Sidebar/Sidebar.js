import react, {Component} from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
// import Calendar from 'react-calendar';
// import './../../node_modules/react-calendar/dist/Calendar.css';
import Plan from './Plan';
import './sidebar.css';

class Sidebar extends Component {
    state = {
        data: []
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //문제있음.
        // if(prevState.data === undefined && this.state.data !== undefined) {
        //     this.loadPlan();
        // } else if(prevState.data.length !== this.state.data.length) {
        //     this.loadPlan();
        // }

        if(prevState.data.length !== this.state.data.length) {
            this.loadPlan();
        }
    }
    componentDidMount() {
        this.loadPlan();
    }
    loadPlan = () => {
        const send_param = {
            id: cookie.load("login_id")
        }

    axios
      .post("http://localhost:8080/plan/read", send_param)
      //정상 수행
      .then(res => {
          if(res.data.check) {
            this.setState({data: res.data.list});
          } else {
              alert(res.data.message);
          }
        })
      //에러
      .catch(err => {console.log(err);});
    }

    changeAllPlan = () => {
        const plans = document.getElementsByClassName("planData_title");
        const plans_curCount = document.getElementsByClassName("planData_inputCount");
        const plans_count = document.getElementsByClassName("planData_count");

        let list_content = [], list_curCount = [], list_count = [];
        for(let i = 0; i < plans.length; i++) {
            list_content.push(plans[i].innerText);
            if(plans_curCount[i].value === undefined || plans_curCount[i].value === "") {
                list_curCount.push(0);
            } else {
                list_curCount.push(Number(plans_curCount[i].value));
            }
            list_count.push(Number(this.state.data[i].count));
            console.log(Number(this.state.data[i].count));
        }
        
        const send_param = {
            id: cookie.load("login_id"),
            content: list_content,
            curCount: list_curCount,
            count: list_count
        }
        
        axios
      .post("http://localhost:8080/plan/update", send_param)
      //정상 수행
      .then(res => {
          if(res.data.check) {
            // this.setState({data: this.state.data.push(send_param)});
          } else {
              alert(res.data.message);
          }
        })
      //에러
      .catch(err => {console.log(err);});
    }
    savePlan = () => {
        const id = cookie.load("login_id");

        const content_input = document.querySelector(".content_input");
        const content = content_input.value;

        const count_input = document.querySelector(".count_input");
        const count = count_input.value;

        if(content === "" || content === undefined) {
            alert("목표를 입력해주세요.");
            content_input.focus();
            return;
        } else if(count === "" || count === undefined) {
            alert("목표를 입력해주세요.");
            count_input.focus();
            return;
        }

        const send_param = {
            id,
            content,
            count
        };

    axios
      .post("http://localhost:8080/plan/create", send_param)
      //정상 수행
      .then(res => {
          if(res.data.check) {
            this.setState({data: this.state.data.push(send_param)});
          } else {
              alert(res.data.message);
          }
        })
      //에러
      .catch(err => {console.log(err);});

      const div = document.querySelector(".plan_div");
        div.remove();
    }

    addPlan = () => {
        const content_input = document.createElement("input");
        const content_span = document.createElement("span");
        content_span.innerText = "목표";
        content_span.classList.add("content_span");
        content_input.classList.add("content_input");

        const count_input = document.createElement("input");
        const count_span = document.createElement("span");
        count_span.innerText = "갯수/kg";
        count_span.classList.add("count_span");
        count_input.classList.add("count_input");
        
        const count_btn = document.createElement("button");
        count_btn.classList.add("count_btn");
        count_btn.innerText = "✔";
        count_btn.addEventListener("click", this.savePlan);

        const content_container = document.createElement("div");
        content_container.classList.add("content_container");
        const count_container = document.createElement("div");
        count_container.classList.add("count_container");

        content_container.appendChild(content_span);
        content_container.appendChild(content_input);

        count_container.appendChild(count_span);
        count_container.appendChild(count_input);
        count_container.appendChild(count_btn);

        const plan_div = document.createElement("div");
        plan_div.classList.add("plan_div");
        plan_div.appendChild(content_container);
        plan_div.appendChild(count_container);

        this.plan.appendChild(plan_div);
    }

    render() {
        // const start = this.loadPlan;
        // start();
        let data = [];
        let mapPlan;
        if(this.state.data.length > 0) {
            data = this.state.data;
            mapPlan = data.map(item => <Plan key={item.content} content={item.content} count={item.count} curCount={item.curCount} loadPlan={this.loadPlan} changeAllPlan={this.changeAllPlan} />);
        }
        
        if(cookie.load("login_id") === undefined || cookie.load("login_id") === "") {
            return (
                <div className="sidebar_container">
                    <span className="sidebar_nLogin">로그인 후 이용 해주세요.</span>
                </div>
            )
        } else {
            const nick = cookie.load("login_nickname");
            return (
                <div className="sidebar_container">
                    <div className="sidebar_nick">{nick}</div>
                    {/* <Calendar /> */}
                    <div className="sidebar_plan">
                        <div className="plan_title">목표
                        </div>
                        <button onClick={this.addPlan} className="plan_add">➕</button>
                    </div>
                    <div
                    ref={ref=>(this.plan = ref)}
                    className="plan_container">
                        {mapPlan}
                        <div className="plan_changeMsg">변경 후 아래 버튼을 눌러주세요.</div>
                    <button onClick={this.changeAllPlan} className="plan_changeBtn">✔</button>
                    </div>
                </div>
            )
        }
    }
}

export default Sidebar;