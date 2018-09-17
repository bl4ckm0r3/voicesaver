import React, { Component } from "react";
import PropTypes from "prop-types";
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
                <CSSTransition key={w} timeout={500} classNames="slideUp">
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
