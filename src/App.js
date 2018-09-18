import React, { Component, Fragment } from "react";
import "./App.css";
import Voice from "./Voice";
import WordList from "./WordList";
import FullscreenBG from "./FullscreenBG";
import Timings from "./Timings";
import nlp from "compromise";
import VoiceSignal from "./VoiceSignal";
import { throttle } from './util';

class App extends Component {
  state = {
    image: null,
    words: [],
    timings: {
      remainingHits: null, // 2500
      totalHitsPer30Minutes: null // 2500
    }
  };

  onWordRecognised = evt => {
    // console.log(evt.results);
    const [sentence] = [...evt.results].map(a => a[0]).slice(-1);
    if (sentence) {
      this.updateImage(sentence.transcript);
    }
  };

  updateImage = throttle(async (transcript = "") => {
    const [word = transcript] = nlp(transcript)
      .nouns()
      .offset()
      .map(e => e.text);
    if (!word || this.state.words.includes(word)) {
      console.log('no word or word already present', word, transcript);
      return;
    }
    const query = word.split(" ").join("+");
    const url = `https://pixabay.com/api/?key=${
      process.env.REACT_APP_APP_ID
    }&q=${query}&orientation=horizontal&category=background&safesearch=true&image_type=photo&pretty=false`;
    const response = await fetch(url);
    const remainingHits = response.headers.get("X-RateLimit-Remaining");
    const totalHitsPer30Minutes = response.headers.get("X-RateLimit-Limit");

    const { hits: results } = await response.json();
    if (results.length > 0) {
      //console.log(word, results);
      const { largeImageURL: image } = results[
        Math.floor(Math.random() * results.length)
      ];
      this.setState({
        timings: {
          remainingHits,
          totalHitsPer30Minutes
        },
        image,
        words: [word, ...this.state.words]
      });
    }
  });
  onspeechstart = () => {
    this.setState({
      speechStarted: true
    });
  };
  onspeechend = () => {
    this.setState({
      speechStarted: false
    });
  };
  onspeecherror = () => {
    this.setState({
      speechStarted: false
    });
  };

  render() {
    this.updateImage();
    return (
      <Fragment>
        <FullscreenBG src={this.state.image} />
        <Timings timings={this.state.timings} />
        <WordList words={this.state.words} />
        <Voice
          onresult={this.onWordRecognised}
          onspeechstart={this.onspeechstart}
          onspeechend={this.onspeechend}
          onerror={this.onerror}
        />
        <VoiceSignal speechStarted={this.state.speechStarted} />
      </Fragment>
    );
  }
}

export default App;
