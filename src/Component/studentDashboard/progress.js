import React, { Component } from "react";
import { Card,Row,Col } from "antd";
import axios from "axios"
import { Spin } from "antd";

class progress extends Component {
constructor(props){
  super(props)
  this.state={
    enrolledCoursesArray:[],
    loading:true
  }
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
      this.setState({loading:false})
      for (const i in response.data) {
        response.data[i].date = response.data[i].date.split("T")[0];
      }
        this.setState({ enrolledCoursesArray: response.data });
      })
      .catch((error) => {
              this.setState({loading:false})

      });
  }
  render() {
    return (
      <Spin spinning={this.state.loading}>

      <div>
        <h5 style={{ marginBottom: 20 }}>Current Bought Courses: </h5>
        {this.state.enrolledCoursesArray.map(course=>
             <Card
             style={{ marginTop: 16 }}
             type="inner"
             title={course.course_name}
             key={course._id}
             extra={<h5>By:{course.teacher_name} </h5>}
           >
             <Row justify="space-around">
               <Col>              <p style={{ marginBottom: 0 }}><b>Teacher Mobile:</b> {course.teacher_mobile}</p>
               </Col>

<Col>            <p style={{ marginBottom: 0 }}><b>Course Type:</b> {course.course_type}</p>
</Col> 
             </Row><br />
             <Row justify="space-around">
               <Col>
             <p style={{ marginBottom: 0 }}><b>Course Bought date:</b> {course.date}</p>
             </Col>
             <Col>
             <p> <b>Course Status:</b> {course.course_status ?<b style={{color:"green"}}>Completed</b> : <b style={{color:"blue"}}>On Going </b>  }</p>  

             </Col>
             </Row>
<br />
                  <Row justify="center"><h5>Course Schedule</h5></Row>
                  {course.selected_course_schedule.map((j,index) => (
                <Row key={index} justify="center">
                      {j.day} -- {j.time + ","}
                      </Row>
                  ))} 

           
           </Card>
          )}
     
       
        
      </div>
      </Spin>
    );
  }
}

export default progress;
