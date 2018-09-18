import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./VoiceSignal.css";

class VoiceSignal extends Component {
  render() {
    const className = `circle ${this.props.speechStarted === true ? "red" : "gray"}`
    return (
      <div className={className} />
    );
  }
}

VoiceSignal.propTypes = {

};

export default VoiceSignal;