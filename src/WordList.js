import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./WordList.css";

class WordList extends Component {
  static defaultProps = {
    words: []
  };
  render() {
    return (
      <ul>
        <TransitionGroup appear={true}>
          {this.props.words
            .map((w, i) => {
              return (
                <CSSTransition key={w} timeout={500} classNames="slide-right">
                  <li key={i}>{w.toUpperCase()}</li>
                </CSSTransition>
              );
            })
            .slice(0, 5)}
        </TransitionGroup>
      </ul>
    );
  }
}

WordList.propTypes = {};

export default WordList;
