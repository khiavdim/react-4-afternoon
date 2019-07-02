import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ClassList.css";

export default class ClassList extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:3005/students?class=${this.props.match.params.class}`
      )
      .then(res => {
        this.setState({
          students: res.data
        });
      })
      .catch(err => console.log("Error getting students", err));
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    let { students } = this.state;
    let studentsArr = students.map(student => (
      <Link to={`/student/${student.id}`} key={student.id}>
        <h3>
          {student.first_name} {student.last_name}
        </h3>
      </Link>
    ));
    return (
      <div className="box">
        <h1>{this.props.match.params.class}</h1>
        <h2>ClassList:</h2>
        {studentsArr}
        <p>&emsp;</p>
        <button onClick={this.goBack} className="back_btn">
          {"< Go Back"}
        </button>
      </div>
    );
  }
}
