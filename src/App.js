import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Profile from "./Component/teacherDashboard/TeacherProfile";
import TeacherDashboard from "./Component/teacherDashboard/dashboard";
import Courses from "./Component/teacherDashboard/courses";
import Payment from "./Component/teacherDashboard/payment";
import courseinfo from "./Component/courses/courseinfo";
import courses from "./Component/courses/courses";
import { PrivateRoute } from "./Component/Privateroute/index";
import Test from "./Component/test";
import Homepage from "./Component/homepage/homepage";
import Header from "./Component/homepage/Navbar/Header";
import Footer from "./Component/homepage/footer/footer";
import StudentDashboard from "./Component/studentDashboard/sDashboard";
import TeacherSchedule from "./Component/teacherDashboard/todaysSchdeule";

import Aboutus from "./Component/Aboutus/aboutus";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <PrivateRoute exact path="/teacher/profile" component={Profile} />
            <PrivateRoute
              exact
              path="/teacher/dashboard"
              component={TeacherDashboard}
            />
            <PrivateRoute
              exact
              path="/teacher/todayschedule"
              component={TeacherSchedule}
            />
            <PrivateRoute path="/teacher/payment" exact component={Payment} />
            <PrivateRoute
              path="/student/dashboard"
              exact
              component={StudentDashboard}
            />
            <PrivateRoute exact path="/teacher/courses" component={Courses} />
            <Route exact path="/allcourses" component={courses} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/courseinfo" component={courseinfo} />
            <Route exact path="/about-us" component={Aboutus} />
            <Route exact path="/test" component={Test} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
