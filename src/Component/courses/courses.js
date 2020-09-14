// @desc THIS PAGE CONTAINS ALL COURSES

import React, { Component } from "react";
import { Card, Button } from "antd";
import { Row, Col } from "antd";
import { Spin } from "antd";
import "./courses.css";
import axios from "axios";
import SearchInput, { createFilter } from "react-search-input";
import ab from "../../images/responsive.svg";
const KEYS_TO_FILTERS = ["course_name", "teacher_name"];

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArray: [],
      searchTerm: "",
      loading: true,
      AllSelctedCoursesArr: [],
      loadmorebutton: false,
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  end = 12;
  slicedCoursesArray = [];
  newslicedCoursesArray = [];

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  onCardClick = (i) => {
    sessionStorage.setItem("cardData", JSON.stringify(i));
    const path = `courseinfo`;
    this.props.history.push(path);
  };

  loadMoreCourses = () => {
    this.end = this.end + 3;
    this.newslicedCoursesArray = this.slicedCoursesArray.slice(0, this.end);
    this.setState({ coursesArray: this.newslicedCoursesArray });
  };

  AllSelctedCoursesArr = [];
  componentDidMount = () => {
    window.scrollTo(0, 0)

    axios
      .get("https://turnskill1to1server.herokuapp.com/getallCourses")
      .then((response) => {
        this.slicedCoursesArray = response.data;

        axios
          .get(
            "https://turnskill1to1server.herokuapp.com/student/AllSelectedCoursesList"
          )
          .then((res) => {
            var SelectedCoursesArr = [];
            SelectedCoursesArr = res.data;

            for (var i in this.slicedCoursesArray) {
              for (var j in SelectedCoursesArr) {
                if (
                  this.slicedCoursesArray[i].course_name ===
                  SelectedCoursesArr[j].course_name && SelectedCoursesArr[j].course_status===false  
                ) {
                  for (var k in this.slicedCoursesArray[i].course_schedule) {
                    for(var m in SelectedCoursesArr[j].selected_course_schedule){
                    if (
                      this.slicedCoursesArray[i].course_schedule[k].day ===
                      SelectedCoursesArr[j].selected_course_schedule[m].day
                    ) {
                      for (var l in this.slicedCoursesArray[i].course_schedule[
                        k
                      ].time){
           
                        if (
                          SelectedCoursesArr[j].selected_course_schedule[m]
                            .time ===
                          this.slicedCoursesArray[i].course_schedule[k].time[l]
                        ) {
                          this.slicedCoursesArray[i].course_schedule[
                            k
                          ].time.splice(l, 1);
                        }
                    }
                  }
                  }
                }
                }
              }
            }
          })
          .catch((error) => {
          });

        this.newslicedCoursesArray = this.slicedCoursesArray.slice(0, this.end);
        if (this.slicedCoursesArray.length > 12) {
          this.setState({ loadmorebutton: true });
        }
        this.setState({ coursesArray: this.newslicedCoursesArray });
        this.setState({ loading: false });
      })
      .catch((error) => {
      });
  };

  render() {
    const filteredCourses = this.state.coursesArray.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <div style={{ marginTop: "100px", minHeight: 550 }}>
        <Row>
        <Col  xs={{ span: 20 ,offset:2}} xl={{ span: 8 ,offset:8}}>
            <div className="search">
              <form className="search-form">
                <SearchInput
                  onChange={this.searchUpdated}
                  placeholder="Search"
                  id="navBarSpecial"
                  style={{ width: "100%", border: "none" }}
                />
              </form>
            </div>
          </Col>
        </Row>
        <br /><br />
        <Spin spinning={this.state.loading}>
          <Row justify="space-around">
            {filteredCourses.map((i) => (
              <Col  key={i._id} xs={{  offset: 3 }} xl={{  offset: 2 }} sm={{offset:6}}>
                <Card
                  id="card1"
                  style={{
                    width: 280,
                    height: 290,
                    minWidth: 100,
                    marginBottom: 40,
                    backgroundColor: " white",
                    textAlign: "center",
                  }}
                  cover={<img alt={"ALT"} src={ab} height="180px" />}
                  hoverable
                  onClick={() => this.onCardClick(i)}
                >
                  <p id="courseName">{i.course_name}</p>
             
                </Card>
              </Col>
            ))}
          </Row>
          {this.state.loadmorebutton ? (
            <Row justify="center" id="last">
              <Button
                onClick={this.loadMoreCourses}
                danger
                style={{ marginBottom: 40 }}
              >
                Load More
              </Button>
            </Row>
          ) : null}
        </Spin>
      </div>
    );
  }
}

export default courses;
