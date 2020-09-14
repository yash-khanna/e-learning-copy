import React, { Component } from "react";
import { Table } from "antd";
import axios from "axios";
import { Spin } from "antd";

class payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArray: [],
      loading: true,
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    const headers = { "x-auth-token": currentUser.token };
    axios
      .get(
        `https://turnskill1to1server.herokuapp.com/student/selectedCourse/${currentUser.studentid}`,
        { headers }
      )
      .then((response) => {
        this.setState({ loading: false });
        for (const i in response.data) {
          response.data[i].date = response.data[i].date.split("T")[0];
        }

        this.setState({ coursesArray: response.data });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const columns = [
      {
        key: "_id",
      },
      {
        title: "Course Name",
        dataIndex: "course_name",
        key: "course_name",
      },
     
      {
        title: "Payment Date",
        dataIndex: "date",
        key: "date",
      },
    
    
      {
        title: "Course Type",
        dataIndex: "course_type",
        key: "course_type",
        responsive: ["sm"],
      },
      {
        title: "Amount Paid",
        key: "course_price",
        dataIndex: "course_price",
      }
    ];
    return (
      <Spin spinning={this.state.loading}>
        <div>
          <Table
            columns={columns}
            dataSource={this.state.coursesArray}
            size="small"
          />
        </div>
      </Spin>
    );
  }
}

export default payment;
