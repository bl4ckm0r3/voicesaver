import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Timings.css";

class Timings extends Component {
  render() {
    return <div className="timings">{this.props.timings.remainingHits}</div>;
  }
}

Timings.propTypes = {};

export default Timings;
