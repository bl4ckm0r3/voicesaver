import { Component } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const noop = () => {};

class Voice extends Component {
  static defaultProps = {
    onresult: noop,
    onspeechstart: noop,
    onspeechend: noop,
    onerror: noop
  };
  constructor(props) {
    super(props);
    this.initSpeech();
  }

  initSpeech = () => {
    this.speech = new SpeechRecognition();
    this.speech.onresult = this.props.onresult;
    this.speech.onspeechstart = () => {
      console.log("on speech start");
      this.props.onspeechstart();
    };
    this.speech.onspeechend = () => {
      console.log("on speech end");
      this.restart();
      this.props.onspeechend();
    };
    this.speech.onerror = (e) => {
      console.log("on error", e);
      this.restart();
      this.props.onerror();
    };
    this.speech.continuous = true;
    this.speech.interimResults = true;
    this.speech.lang = "en-US";
    this.speech.start();
  };

  restart = () => {
    this.speech.stop();
    this.speech.abort();
    setTimeout(() => {
      try {
        this.speech.start();
      } catch (e) {
        console.log(e.message);
        this.restart();
      }
    }, 100);
  };

  componentWillUnmount() {
    this.speech.stop();
  }

  render() {
    return null;
  }
}

export default Voice;
