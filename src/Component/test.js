import React, { Component } from "react";
// import ab from "../../src/";
import "./test.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

class test extends Component {
  callback(key) {
    console.log(key);
  }

  render() {
    return (
      <div>
        <div
          style={{
            paddingTop: "76px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <h2>Course Details</h2>
        </div>
        <div className="main-div">
          <div className="child-div-1">
            {/* <img alt="course" width="600px" height="400px" /> */}
            <br />
            <br />
            <div className="main-div-2">
              <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Details" key="1">
                  Description
                </TabPane>
                <TabPane tab="Full Course" key="2">
                  Full Course
                </TabPane>
                <TabPane tab="Half Course" key="3">
                  Half Course
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div className="child-div-2">
            <h5>COURSE FEE</h5>
            <hr />
            <h5>COURSE TYPE</h5>
            <hr />
            <h5>DURATION</h5>
            <hr />
            <h5>STARTING</h5>
            <hr />
            <h5>FACULTY NAME</h5>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default test;
