import React, { Component, Fragment } from "react";
import "./App.css";
import Voice from "./Voice";
import WordList from "./WordList";
import FullscreenBG from "./FullscreenBG";

function throttle(fn, delay = 4000) {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

class App extends Component {
  state = {
    image: null,
    words: []
  };

  onWordRecognised = evt => {
    // console.log(evt.results);
    const [sentence] = [...evt.results].map(a => a[0]).slice(-1);
    if (sentence) {
      this.updateImage(sentence.transcript);
    }
  };

  updateImage = throttle(async (transcript = "") => {
    const sentence = transcript.split(" ").filter(a => a.length > 4);
    // console.log(sentence);
    if (sentence.length > 0) {
      const word = sentence[Math.floor(Math.random() * sentence.length)];
      if (this.state.words.includes(word)) {
        return;
      }
      //`https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_APP_ID}&query=${word}`
      // https://www.googleapis.com/customsearch/v1?q=${word}+background&searchType=image&imgSize=huge&imgType=photo&cx=`${process.env.REACT_APP_APP_ID}`;
      const url = `https://pixabay.com/api/?key=${
        process.env.REACT_APP_APP_ID
      }&q=${word}&orientation=horizontal&category=background&safesearch=true&image_type=photo&pretty=false`;
      const response = await fetch(url);
      console.log(response);
      const { hits: results } = await response.json();
      if (results.length > 0) {
        console.log(sentence, word, results);
        const { largeImageURL: image } = results[
          Math.floor(Math.random() * results.length)
        ];
        this.setState({
          image,
          words: [word, ...this.state.words]
        });
      }
    }
  });

  render() {
    this.updateImage();
    return (
      <Fragment>
        <FullscreenBG src={this.state.image} />
        <WordList words={this.state.words} />
        <Voice onresult={this.onWordRecognised} />
      </Fragment>
    );
  }
}

export default App;
