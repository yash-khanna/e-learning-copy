import React, { Component } from "react";
import { Input, Row, Col, Button, Typography, Collapse } from "antd";
import { Modal, Select, Form } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const successForCourses = () => {
  message.success("Succesfully Added a course");
};
const errorForCourseAddtion = (mssg) => {
  message.error(mssg);
};
const { Option } = Select;

const { Text } = Typography;
const { Panel } = Collapse;

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArray: [],
      timeSlot: [],
      days: "",
      allDays: [],
      teacher_name: "",
      teacher_mobile: "",
      teacher_email: "",
      loading: true,
      addCoursesloading: false,
      showSubmitButton: false,
    };
  }
  formRef = React.createRef();
  currentDay = "";
  final_selectedtime = [];
  children = [];

  setModal1Visible = () => {
    this.setState({ coursesModal: true });
  };

  onFinishCourseSelection = (values) => {
    this.setState({ addCoursesloading: true });
    const databody = {
      course_schedule: this.final_selectedtime,
      course_name: values.course_name,
      course_duration: values.course_duration,
      full_course_price: values.full_course_price,
      hour_based_course_price: values.hour_based_course_price,
      course_description: values.course_description,
      teacher_name: this.state.teacher_name,
      teacher_email: this.state.teacher_email,
      teacher_mobile: this.state.teacher_mobile,
    };
    axios
      .post("https://turnskill1to1server.herokuapp.com/teacher/addCourse", databody)
      .then((response) => {
        this.formRef.current.resetFields();
        this.setState({
          coursesModal: false,
          timeSlot: [],
          days: "",
          allDays: [],
          addCoursesloading: false,
        });
        this.final_selectedtime = [];
        successForCourses();
        this.getCoursesData();
      })
      .catch((error) => {
        this.setState({ addCoursesloading: false });
        errorForCourseAddtion(error.message);
      });
  };

  onFinishFailedCourseSelection = (errorInfo) => {
    console.log("errorInfo");
  };

  // @DESC SELECTED COURSE DAYS AND TIME SLOTS
  handleAdd = () => {
    this.setState({
      allDays: [...this.state.allDays, ""],
    });
  };

  removeRow = (e) => {
    this.state.allDays.splice(e.target.value, 1);
    this.setState({ allDays: this.state.allDays });
    this.final_selectedtime.splice(e.target.value, 1);
  };
  getselectedday = (day) => {
    this.currentDay = day;
  };
  selectedDay(e, index) {
    this.state.allDays[index] = e;
    this.setState({ allDays: this.state.allDays });
    this.setState({ days: e });
  }

  handleChange = (value, day) => {
    this.getselectedday(day);
    this.setState({ timeSlot: value });
    this.setState({ showSubmitButton: true });
    var courseSchedule = {
      day: this.currentDay,
      time: value,
    };
    for (const i in this.final_selectedtime) {
      if (this.final_selectedtime[i].day === this.currentDay) {
        this.final_selectedtime.splice(i, 1, courseSchedule);
        return;
      }
    }

    this.final_selectedtime.push(courseSchedule);
  };

  getCoursesData = () => {
    let teacherEmail;
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

    this.setState({
      teacher_name: currentUser.username,
      teacher_mobile: currentUser.phone,
      teacher_email: currentUser.email,
    });
    teacherEmail = currentUser.email;
    const headers = { "x-auth-token": currentUser.token };
    axios
      .get(
        `https://turnskill1to1server.herokuapp.com/teacher/addedCourseDetails/${teacherEmail}`,
        { headers }
      )
      .then((response) => {
        this.setState({ coursesArray: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  componentDidMount() {
    this.getCoursesData();
    for (let i = 8; i < 22; i = i + 1) {
      this.children.push(
        <Option key={i + "-" + (Number(i) + 1)}>
          {i + "-" + (Number(i) + 1)}
        </Option>
      );
    }
  }
  showModalForTeachers = () => {
    this.showTeacherModal();
  };
  render() {
    return (
      <Spin spinning={this.state.loading}>
        <div>
          <Row justify="space-around">
            <Col>
              <Button
                icon={
                  <PlusCircleTwoTone
                    style={{
                      position: "absolute",
                      left: "5%",
                      top: "25%",
                    }}
                  />
                }
                onClick={this.setModal1Visible}
              >
                <Text strong style={{ paddingLeft: "8%" }}>
                  Add New Course
                </Text>
              </Button>
            </Col>
          </Row>
          <br />
          {this.state.coursesArray.map((i) => (
            <Row
              justify="center"
              style={{ marginBottom: 10 }}
              key={i.course_id}
            >
              <Col span={20}>
                <Collapse>
                  <Panel key={i._id} header={i.course_name}>
                    {/* <p>{i.course_description}</p> */}
                    <p>Full Course Price: {i.full_course_price}</p>
                    <p>Half Course Price: {i.hour_based_course_price}</p>
                    <p>Course Duration: {i.course_duration}</p>
                    {i.course_schedule.map((j, index) => (
                      <p key={index}>
                        {j.day} -- {j.time + ","}
                      </p>
                    ))}
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          ))}

          <Modal
            width={600}
            title="Add Courses"
            style={{ top: 20 }}
            visible={this.state.coursesModal}
            footer={[]}
            onCancel={() => this.setState({ coursesModal: false })}
          >
            <Spin spinning={this.state.addCoursesloading}>
              <Form
                ref={this.formRef}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinishCourseSelection}
                onFinishFailed={this.onFinishFailedCourseSelection}
                size="medium"
              >
                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="course_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Course Name!",
                        },
                      ]}
                    >
                      <Input placeholder="Course Name" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="full_course_price"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Full Course Price!",
                        },
                      ]}
                    >
                      <Input placeholder="Full Course Price" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="hour_based_course_price"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Hour Based Course Price!",
                        },
                      ]}
                    >
                      <Input placeholder="Hour Based Course Price" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="course_duration"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Course Duration!",
                        },
                      ]}
                    >
                      <Input placeholder="Course Duration" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item
                      name="course_description"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Description of Course!",
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Description of Course" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  Course Schdedule
                  <PlusCircleOutlined onClick={this.handleAdd} />
                </Row>
                {this.state.allDays.map((day, index) => {
                  return (
                    <Row justify="space-between" key={index}>
                      <Col span={7}>
                        <Select
                          placeholder="Select Day"
                          onChange={(e) => this.selectedDay(e, index)}
                          value={day}
                          style={{ width: "100%" }}
                        >
                          <Select.Option value="Monday">Monday</Select.Option>
                          <Select.Option value="Tuesday">Tuesday</Select.Option>
                          <Select.Option value="Wednesday">
                            Wednesday
                          </Select.Option>
                          <Select.Option value="Thursday">
                            Thursday
                          </Select.Option>
                          <Select.Option value="Friday">Friday</Select.Option>
                          <Select.Option value="Saturday">
                            Saturday
                          </Select.Option>
                          <Select.Option value="Sunday">Sunday</Select.Option>
                        </Select>
                      </Col>
                      <Col span={15}>
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="Select Timeslots"
                          onChange={(e) => this.handleChange(e, day)}
                          onFocus={() => this.getselectedday(day)}
                        >
                          {this.children}
                        </Select>
                      </Col>
                      <Col>
                        <Button value={index} onClick={this.removeRow}>
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
                <br />
                {this.state.showSubmitButton ? (
                  <Row justify="center">
                    <Col>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                ) : null}
              </Form>
            </Spin>
          </Modal>
        </div>
      </Spin>
    );
  }
}

export default Courses;
