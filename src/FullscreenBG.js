import React, { Component } from "react";
import PropTypes from "prop-types";
import "./FullscreenBG.css";

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1524901548305-08eeddc35080?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bdb611ffd12edb371ec21cb919da0d1d&auto=format&fit=crop&w=2850&q=80";

class FullscreenBG extends Component {
  state = {
    foreground: 1, //0 : first, 1: second
    images: {
      fg: DEFAULT_BG
    }
  };

  preloadImage = src => {
    const img = new Image();
    img.onload = () => {
      const foregroundImage =
        this.state.foreground === 0 ? this.props.src : this.state.images.fg;
      const backgroundImage =
        this.state.foreground === 1 ? this.props.src : this.state.images.bg;
      const foreground = (this.state.foreground + 1) % 2;
      this.setState({
        foreground,
        images: {
          fg: foregroundImage || DEFAULT_BG,
          bg: backgroundImage
        }
      });
    };
    img.src = src;
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.preloadImage(nextProps.src);
      return false;
    }
    return true;
  }

  render() {
    const foreground = `bg foreground ${
      this.state.foreground === 0 ? "hidden" : "visible"
    }`;
    const background = `bg background ${
      this.state.foreground === 1 ? "hidden" : "visible"
    }`;
    return (
      <div className="cover">
        <img src={this.state.images.fg} alt="Foreground" className={foreground} />
        <img src={this.state.images.bg} alt="Background" className={background} />
      </div>
    );
  }
}

FullscreenBG.propTypes = {};

export default FullscreenBG;
