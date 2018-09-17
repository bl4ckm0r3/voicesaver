import React, { Component } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

class Voice extends Component {
  constructor(props) {
    super(props);
    this.initSpeech();
  }

  initSpeech = () => {
    this.speech = new SpeechRecognition();
    this.speech.onresult = this.props.onresult
    this.speech.onspeechstart = console.log;
    this.speech.onspeechend = () => {
      console.log("on speech end");
      setTimeout(this.restart, 1000);
    };
    this.speech.onerror = () => {
      console.log("on error");
      this.speech.abort();
      this.restart();
    };
    this.speech.continuous = true;
    this.speech.interimResults = true;
    this.speech.lang = "en-US";
    this.speech.start();
  };

  restart = async () => {
    try {
      await this.speech.stop();
      await this.speech.abort();
      await this.speech.start();
    } catch (e) {
      console.log(e.message);
    }
  };

  componentWillUnmount() {
    this.speech.stop();
  }

  render() {
    return null;
  }
}

export default Voice;
