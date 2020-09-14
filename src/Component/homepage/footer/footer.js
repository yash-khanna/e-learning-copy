import React, { Component } from "react";
import "./footer.css";
import { Row, Col, Divider } from "antd";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="footer">
        <Row justify="space-around">
          <Col lg={{ span: 5 }} xs={{ span: 20 }} className="child-div">
            <h4>About Us</h4>
            <p>TurnSkill 1 to 1 is trusted Learning Network. Students, parents and
            professionals can compare multiple Tutors, Trainers and Institutes
            and choose the ones that best suit their requirements.</p>
          </Col>
          <Col lg={{ span: 5 }} xs={{ span: 20 }} className="child-div">
            <h4>Contact</h4>
            <p>Address: New Delhi, India</p>
            <p>Email: info@turnskill.com</p>
            <p>Phone: +919967492684</p>
          </Col>
          <Col lg={{ span: 5 }} xs={{ span: 20 }} className="child-div">
            <h4>Follow Us</h4>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </Col>
        </Row>
        <Divider></Divider>
        <div style={{ textAlign: "center" }}>Copyright @ All rights reserved</div>
        <br />
      </div>
    );
  }
}

export default Footer;
