import React, { Component } from "react";
import "./aboutus.css";
import { Row, Col } from "antd";

class aboutus extends Component {
  render() {
    return (
      <div style={{ fontFamily: "sans-serif", paddingTop:"6%" }} className="first-div">
        <Row justify="center">
          <h1>ABOUT US</h1>
        </Row>
        <br />
        <Row justify="center">
          <Col span={16}>
            We are the one of the fastest growing online learning company. We
            have the best course available in our platform. Our philosophy to
            learn and collaborate together . We have best professionals from
            industry in our board who worked very hard to develop the best
            content and courses for our learners .
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col span={16}>
            Our courses are designed and packaged as per the industry need , we
            focused to industry ready courses so that its help our learners to
            improve their skills and get more achievements in their respective
            fields . Our core areas in courses are technology , sales ,
            marketing and entrepreneurship{" "}
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col span={16}>
            All our courses included the real time live projects which included
            the real time problem with in industry and we help to solve these
            real time industry problems with in our live projects. Our goal to
            produce industry ready resources. We wish to build the world's
            biggest and largest learning ecosystem with our learners and
            trainers .
          </Col>
        </Row>
        <br />
        <Row>
          <Col offset={4}>
            <h3>Our Vision</h3>
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col span={16}>
            To become world's largest social learning platform with learning
            ecosystem, our vision lets learn and collaborate together !
          </Col>
        </Row>
        <br />
        <Row>
          <Col offset={4}>
            <h3>Our Mission</h3>
          </Col>
        </Row>
        <br />
        <Row justify="center" style={{ marginBottom: "5%" }}>
          <Col span={16}>
            A alternative platform for learning to all professionals and
            learners who wish to enhance their skills in any specific areas , we
            give the platform where any one can learn 24 X 7 X 365 any time ,
            any where with their pace , we have the options of live classes and
            online self course. We developed the world's best team who create
            the best content and course which is requires in the next level of
            industry , we focused the industry specific course and content.
          </Col>
        </Row>
      </div>
    );
  }
}

export default aboutus;
