import React, { Component } from "react";
import { Form, Input, Button } from "antd";

class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      phone: "",
      email: "",
    };
  }

  onFinish = (values) => {
    console.log("Success:");
  };

   onFinishFailed = (errorInfo) => {
    console.log("Failed:");
  };
  componentDidMount() {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    this.setState({
      username: currentUser.username,
      email: currentUser.email,
      phone: currentUser.phone,
    });
  }
  render() {

    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

   

    return (
      <div>
        <Form
                {...layout}

          name="basic"
          initialValues={{
            remember: true,
          }}
          layout="Horizontal"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item label="Username">
            <Input value={this.state.username} disabled />
          </Form.Item>

          {/* <Form.Item label="Email">
            <Input value={this.state.email} />
          </Form.Item> */}

          <Form.Item label="Mobile Number">
            <Input value={this.state.phone} />
          </Form.Item>

          <Form.Item >
            <h6>Change Password</h6>
          </Form.Item>

          <Form.Item label="New Password" layout="inline" id="p1">
            <Input placeholder="Enter New Password" type="password"/>
          </Form.Item>

          <Form.Item label="Confirm Password" layout="inline" id="p2">
            <Input placeholder="Confirm Password" type="password"/>
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default TeacherProfile;
