import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Timings.css";

class Timings extends Component {
  render() {
    if (!this.props.timings.remainingHits) {
      return null;
    }
    return <div className="timings">{this.props.timings.remainingHits}</div>;
  }
}

Timings.propTypes = {};

export default Timings;
