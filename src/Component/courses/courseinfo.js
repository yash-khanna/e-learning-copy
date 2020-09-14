import React, { Component } from 'react';
import img from "../../images/responsive.svg";
import "./courseinfo.css";
import { Tabs } from "antd";
import {
  Select,
  Row,
  Col,
  Button,
  Radio,
  message,
  Form,
} from "antd";
import axios from "axios";
import { Spin } from "antd";



const { Option } = Select;
const { TabPane } = Tabs;

const successPaymentMessage = () => {
  message.success(" Course Payment Success");
};
const errormessage = (errorMessage) => {
  message.error(errorMessage);
};

class courseinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlot: [],
      days: "",
      selectedday: "",
      time: "",
      allDays: [],
      showButton: false,
      showPanel: true,
      showField: false,
      cardData: {},
      selectedTime: "",
      student_name: "",
      student_email: "",
      student_mobile: "",
      student_id: "",
      token: "",
      paymentdone: false,
      showButtonhalf: false,
      paymentdonehalf: false,
      loading: false,
      radiobuttonsubmit: false,
    };

    this.getFullCourseTimeSlot = this.getFullCourseTimeSlot.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.buyFullCourse = this.buyFullCourse.bind(this);
    this.getHourBasedCourseDay = this.getHourBasedCourseDay.bind(this);
  }
  halfcourseday = "";
  showField = false;
  halftimeslot = "";

  //For radio button group
  FullCourseTimeSlotArray = [];
  selectedday = "";

  getHourBasedCourseTimeSlot = (value) => {
    this.halftimeslot = value;
  };

  getHourBasedCourseDay = (value) => {
    this.halfcourseday = value;
    for (const i in this.state.cardData.course_schedule) {
      if (this.state.cardData.course_schedule[i].day === value) {
        this.setState({
          timeSlot: this.state.cardData.course_schedule[i].time,
          showField: true,
        });
        this.showField = true;
      }
    }
    this.setState({ days: value });
  };

  getSchedule = (data) => {
    this.selectedday = data;
  };
  getday = (day) => {
    return day;
  };

  getFullCourseTimeSlot = (e) => {
    this.setState({ radiobuttonsubmit: true });
    const body = {
      day: this.selectedday,
      time: e.target.value,
    };
    for (const i in this.FullCourseTimeSlotArray) {
      if (this.FullCourseTimeSlotArray[i].day === this.selectedday) {
        this.FullCourseTimeSlotArray.splice(i, 1, body);
        return;
      }
    }

    this.FullCourseTimeSlotArray.push(body);
  };

  buyFullCourse() {
    this.setState({ showButton: true });
    this.setState({ showPanel: false });
  }
  //Pay full course
  payfullCourse = () => {
    this.setState({ loading: true });
    const dataBody = {
      student_id: this.state.student_id,
      student_name: this.state.student_name,
      student_mobile: this.state.student_mobile,
      student_email: this.state.student_email,
      course_name: this.state.cardData.course_name,
      course_type: "Full",
      course_price: this.state.cardData.full_course_price,
      teacher_name: this.state.cardData.teacher_name,
      teacher_mobile: this.state.cardData.teacher_mobile,
      teacher_email: this.state.cardData.teacher_email,
      selected_course_schedule: this.FullCourseTimeSlotArray,
      course_id: this.state.cardData.course_id,
    };
    const headers = { "x-auth-token": this.state.token };
    axios
      .post(
        "https://turnskill1to1server.herokuapp.com/student/selectedcourse",
        dataBody,
        { headers }
      )
      .then((response) => {
        this.setState({
          showButton: false,
          loading: false,
          paymentdone: false,
        });
        this.props.history.push("/student/dashboard");
        successPaymentMessage();
      })
      .catch((error) => {
        var errorMessage;
        this.setState({ loading: false });
        if (error.message !== undefined) {
          if (error.message === "Request failed with status code 401") {
            errorMessage = "Login to buy the course";
          } else {
            errorMessage = "A Course already there at this time slot";
          }
        }
        errormessage(errorMessage);
      });
  };

  hourBasedCourseDataArray = [];
  buyHourBasedCourse = () => {
    this.setState({ showButtonhalf: true });
  };
  payhalfcourse = () => {
    this.setState({ loading: true });
    const data = {
      day: this.halfcourseday,
      time: this.halftimeslot,
    };
    this.hourBasedCourseDataArray.push(data);
    const dataBody = {
      student_id: this.state.student_id,
      student_name: this.state.student_name,
      student_mobile: this.state.student_mobile,
      student_email: this.state.student_email,
      course_name: this.state.cardData.course_name,
      course_type: "Hour-Based",
      course_price: this.state.cardData.hour_based_course_price,
      teacher_name: this.state.cardData.teacher_name,
      teacher_mobile: this.state.cardData.teacher_mobile,
      teacher_email: this.state.cardData.teacher_email,
      selected_course_schedule: this.hourBasedCourseDataArray,
      course_id: this.state.cardData.course_id,
    };

    const headers = { "x-auth-token": this.state.token };
    axios
      .post(
        "https://turnskill1to1server.herokuapp.com/student/selectedcourse",
        dataBody,
        { headers }
      )
      .then((response) => {
        this.props.history.push("/student/dashboard");

        successPaymentMessage();
        this.setState({
          showButtonhalf: false,
          paymentdonehalf: true,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        var errorMessage;
        if (error.message === "Request failed with status code 401") {
          errorMessage = "Login to buy the course";
        } else {
          errorMessage = "A Course already there at this time slot";
        }
        errormessage(errorMessage);
      });
  };
  onFinishFailed = (errorInfo) => {
    console.log("Failed:");
  };

  componentDidMount() {


    window.scrollTo(0, 0)

    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (currentUser) {
      this.setState({
        student_name: currentUser.username,
        student_email: currentUser.email,
        student_mobile: currentUser.phone,
        student_id: currentUser.studentid,
        token: currentUser.token,
      });
    }

  }
  componentWillMount() {

    var cardinfo = JSON.parse(window.sessionStorage.getItem("cardData"))
    if (!cardinfo) {
      window.location.href = "/allcourses"
    }
    else {
      this.setState({ cardData: cardinfo })

    }
  }


  callback(key) {
    console.log("key");
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
          <h2>          <b>{this.state.cardData.course_name}</b></h2>
        </div>
        <div className="main-div">
          <div className="child-div-1">
            <img src={img} alt="course" width="500px" height="300px" />
            <br />
            <br />

          </div>
          <div className="child-div-2">
            <h5>Course Fees:{this.state.cardData.full_course_price}</h5>

            <hr />
            <h5>Duration:{this.state.cardData.course_duration}</h5>
            <hr />
            <h5>Faculty Contact:{this.state.cardData.teacher_mobile}</h5>
            <hr />
            <h5>Faculty Name:{this.state.cardData.teacher_name}</h5>
            <hr />
          </div>


        </div>
        <div className="main-div-2" style={{ marginBottom: "6%" }}>
          <div className="card-container">

            <Tabs defaultActiveKey="1" onChange={this.callback} type="card" >
              <TabPane tab="Details" key="1">
                {this.state.cardData.course_description}
              </TabPane>
              <TabPane tab="Full Course" key="2">
                <Spin spinning={this.state.loading}>
                  <Form
                    name="basic"
                    onFinish={this.buyFullCourse}
                    onFinishFailed={this.onFinishFailed}
                  >
                    Teacher's available slots:
                  <ul style={{ lineHeight: 3 }}>
                      {this.state.cardData.course_schedule.map((i, index) => (
                        <div>
                          <hr />
                          <li onFocus={() => this.getSchedule(i.day)} key={index} style={{ marginBottom: "5px" }}>
                            <Row>
                              {i.day}
                              <Col className="radio" span={15}>
                              
                                {i.time.length===0 ? <b>: -No slots available </b> :   <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Select the time slot!",
                                    },
                                  ]}
                                >
                                  <Radio.Group
                                    onChange={this.getFullCourseTimeSlot}
                                    onClick={() => this.getday(i.day)}
                                    style={{ marginLeft: 30 }}
                                    options={i.time}
                                    required
                                  ></Radio.Group>
                                </Form.Item>}
                              </Col>
                            </Row>

                          </li>
                        </div>
                      ))}
                    </ul>


                    <Form.Item>
                      {this.state.radiobuttonsubmit ? (
                        <Row justify="center">
                          <Button
                            style={{ color: "#c64752", borderColor: "#c64752" }}
                            htmlType="submit"
                          >
                            Submit
                        </Button>
                        </Row>
                      ) : null}
                    </Form.Item>
                  </Form>
                Course Fees: Rs.{this.state.cardData.full_course_price}
                  {this.state.showButton ? (
                    <Button
                      type="primary"
                      onClick={this.payfullCourse}
                      htmlType="submit"
                      style={{ marginLeft: 15 }}
                    >
                      Pay
                    </Button>
                  ) : null}
                  {this.state.paymentdone ? (
                    <p style={{ color: "Red" }}>Paid Succesfully</p>
                  ) : null}
                </Spin>
              </TabPane>
              <TabPane tab="Hour Based" key="3">
                <Spin spinning={this.state.loading}>
                  <Form
                    name="basic"
                    onFinish={this.buyHourBasedCourse}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <Row>
                      <Col span={11}>
                        <Form.Item
                          name="day"
                          rules={[
                            { required: true, message: "Please Select the day!" },
                          ]}
                        >
                          <Select
                            style={{ minWidth: 150, maxWidth: 430 }}
                            value={this.state.days}
                            onChange={this.getHourBasedCourseDay}
                            placeholder="Select Day"
                          >
                            {this.state.cardData.course_schedule.map(
                              (i, index) => (
                                <Option value={i.day} key={index}>
                                  {i.day}
                                </Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        {this.showField ? (
                          <Form.Item
                            name="time"
                            rules={[
                              {
                                required: true,
                                message: "Please Select timeslot!",
                              },
                            ]}
                          >
                            <Select
                              style={{ minWidth: 150, maxWidth: 430 }}
                              onChange={this.getHourBasedCourseTimeSlot}
                              placeholder="Select timeslot"
                              required
                            >
                              {this.state.timeSlot.map((j, index) => (
                                <Option value={j} key={index}>
                                  {j}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        ) : null}
                      </Col>
                    </Row>
                    <br />
                    <Row className="submit2">
                      <Button
                        style={{ color: "#c64752", borderColor: "#c64752" }}
                        htmlType="submit"
                      >
                        Submit
                    </Button>
                    </Row><br />
                  </Form>
                  <Row>
                    <Col>
                      {" "}
                    Course Fees: Rs.
                    {this.state.cardData.hour_based_course_price}
                      {this.state.showButtonhalf ? (
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ marginLeft: 15 }}
                          onClick={this.payhalfcourse}
                        >
                          Pay
                        </Button>
                      ) : null}
                      {this.state.paymentdonehalf ? (
                        <p style={{ color: "Red" }}>Paid Succesfully</p>
                      ) : null}
                    </Col>
                  </Row><br />
                </Spin>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default courseinfo;