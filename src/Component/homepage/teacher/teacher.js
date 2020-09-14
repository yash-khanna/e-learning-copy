import React, { Component } from "react";
import { Row } from "antd";
import "./teacher.css";
class Teacher extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          backgroundColor: "#fadde1",
          paddingTop: 30,
          paddingBottom: 50,
        }}
      >
        <Row
          justify="center"
          style={{ fontSize: 50, fontWeight: "800", color: "#C64752", fontFamily: "'Roboto Slab', serif", textAlign: "center" }}
        >
          How This Works
        </Row>
        <div className="main-div">
          <div className="child-div">
            <h3>REGISTER</h3>
            Want to teach something? Just register with some details and add
            atleast one course you specialise in and we'll find the students for
            you!
          </div>
          <div className="child-div">
            <h3>LOGIN AND UPDATE</h3>
            Keep adding courses you'd love to teach. Choose the time slots that
            you are comfortable with to teach
          </div>
          <div className="child-div">
            <h3>HAPPY TEACHING</h3>
            Based on the courses you've added, you can check your schedule
            depending upon the time slot chosen by the student and voila!
          </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
