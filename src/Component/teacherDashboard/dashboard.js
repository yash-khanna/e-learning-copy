import React, { Component } from "react";
import { Avatar, Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Addedcourses from "./courses";
import Payment from "./payment";
import Profile from "./TeacherProfile";
import TodaysSchedule from "./todaysSchdeule";
import "./dashboard.css"

const { Meta } = Card;

class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleKey: "TodaysSchedule",
      username: "",
      email: "",
    };
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };
  componentDidMount() {
    window.scrollTo(0, 0)

    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    this.setState({
      username: currentUser.username,
      email: currentUser.email,
    });
  }
  render() {
    const tabList = [
      {
        key: "TodaysSchedule",
        tab: "Courses Schedule",
      },
      {
        key: "profile",
        tab: "Profile",
      },
      {
        key: "adddedCourses",
        tab: "Added Courses",
      },
      {
        key: "payment",
        tab: "Payments History",
      },
    ];

    const contentList = {
      profile: <Profile />,
      adddedCourses: <Addedcourses />,
      TodaysSchedule: <TodaysSchedule />,
      payment: <Payment />,
    };

    return (
      <div style={{ margin: "8% 7% 5%" }}>
        <Row gutter={16}>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 6 }}
            sm={{ span: 10 }}
            md={{ span: 10 }}
          >
            <Card
              style={{ width: "100%" }}
              cover={
                <Avatar
                  size={150}
                  style={{ margin: "5% auto 2%" }}
                  icon={<UserOutlined style={{ margin: "auto" }} />}
                />
              }
            >
              <h6 style={{ textAlign: "center" }}>Teacher</h6>
              <p style={{ fontSize: "200%", textAlign: "Center" }}>
                {this.state.username}
              </p>
              <hr
                style={{
                  height: "2px",
                  width: "100%",
                  color: "black",
                  backgroundColor: "gray",
                }}
              />

              <Meta
                style={{ textAlign: "center" }}
                title="Email Address"
                description={this.state.email}
              />
        
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 14 }}>
            <Card
              style={{ width: "100%" }}
              headStyle={{ backgroundColor: "#D3D3D3" }}
              tabList={tabList}
              activeTabKey={this.state.titleKey}
              onTabChange={(key) => {
                this.onTabChange(key, "titleKey");
              }}
            >
              {contentList[this.state.titleKey]}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default dashboard;
