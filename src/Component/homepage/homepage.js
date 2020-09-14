// @desc THIS PAGE CONTAINS COURSES CARASOUEL AND TEACHERINFO COMPONENTS OF HOMEPAGE

import React, { Component } from "react";
import { Row, Col, Card, Button } from "antd";
import axios from "axios";
import { Spin } from "antd";
import "./homepage.css";
import SearchInput, { createFilter } from "react-search-input";
import Teacher from "./teacher/teacher";
import { Link } from "react-router-dom";
import image from '../../images/responsive.svg';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const KEYS_TO_FILTERS = ["course_name"];


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 610 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 610, min: 0 },
    items: 1
  },
  
};
class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryItems: [],
      searchTerm: "",
      loader: true,
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }
  items;

  responsive = {
    0: { items: 1 },
    700: { items: 2 },
    1024: { items: 3 },
    1200: { items: 5 },
  };

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  filteredCourses = [];
  allCoursesArray = [];
  componentDidMount = () => {
    axios
      .get("https://turnskill1to1server.herokuapp.com/getallCourses")
      .then((response) => {
        this.allCoursesArray = response.data;

        axios
          .get(
            "https://turnskill1to1server.herokuapp.com/student/AllSelectedCoursesList"
          )
          .then((res) => {
            this.setState({ loader: false });
            var SelectedCoursesArr = [];
            SelectedCoursesArr = res.data;

            for (var i in this.allCoursesArray) {
              for (var j in SelectedCoursesArr) {
                if (
                  this.allCoursesArray[i].course_name ===
                  SelectedCoursesArr[j].course_name && SelectedCoursesArr[j].course_status===false  
                ) {
                  for (var k in this.allCoursesArray[i].course_schedule) {
                    for (var m in SelectedCoursesArr[j].selected_course_schedule) {
                      if (
                        this.allCoursesArray[i].course_schedule[k].day ===
                        SelectedCoursesArr[j].selected_course_schedule[m].day
                      ) {
                        for (var l in this.allCoursesArray[i].course_schedule[k]
                          .time)
                          if (
                            SelectedCoursesArr[j].selected_course_schedule[m]
                              .time ===
                            this.allCoursesArray[i].course_schedule[k].time[l]
                          ) {
                            this.allCoursesArray[i].course_schedule[
                              k
                            ].time.splice(l, 1);
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

        this.setState({
          galleryItems: this.allCoursesArray,
          loader: false,
        });
      })
      .catch((error) => {
      });
  };

  onCardClick = (i) => {
    sessionStorage.setItem("cardData", JSON.stringify(i));
    const path = `courseinfo`;
    this.props.history.push(path);
  };
  testarr = ["1"]
  render() {
    this.filteredCourses = this.state.galleryItems.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    const arr = this.filteredCourses.map((i) => (
      <div key={i._id} style={{ marginLeft: "14%" }}>
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
          cover={<img alt={"ALT"} src={image} height="180px" />}
          hoverable
          onClick={() => this.onCardClick(i)}
        >
          <p id="courseName">{i.course_name}</p>

        </Card>
      </div>
    ));

    return (
      <div>
        <div
          style={{
            paddingTop: 40,
            paddingBottom: 10,
          }}
        >
          <div className="bg-image">
            <Row className="heading">
              <h2>We Help you to tune your skill</h2>
            </Row>
            <br />
            <Row className="row-search">
              <Col xs={{ span: 20 }} xl={{ span: 12 }}>
                <div className="search">
                  <form className="search-form">
                    <SearchInput
                      onChange={this.searchUpdated}
                      placeholder="Search for a course"
                      id="navBar"
                      style={{ width: "100%", border: "none" }}
                    />
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div>
          <Row justify="space-between" >
            <Col>
              <h3
                style={{
                  color: "rgb(0,0,0.45)",
                  fontSize: "40px",
                  marginLeft: "20px",
                }}
              >
                Courses
              </h3>
            </Col>
            <Col style={{ marginRight: "20px" }}>
              <Button>
                <Link to="allcourses">View All</Link>
              </Button>
            </Col>
          </Row><br />
          {this.state.loader ? (
            <div className="example">
              <Spin spinning={this.state.loader}></Spin>
            </div>
          ) : (
              <div style={{ marginBottom: "5%" }}
              >
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  infinite={true}
                  autoPlay={this.props.deviceType !== "mobile" ? true : false}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}

                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={this.props.deviceType}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"

                  responsive={responsive}>
                  {arr}

                </Carousel>
              </div>
            )}
  
          <Teacher />
        </div>
      </div>
    );
  }
}

export default courses;
