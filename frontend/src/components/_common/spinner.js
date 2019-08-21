import React, { Component } from "react";

export default class Spinner extends Component {
  renderSpinnerImage() {
    return <div className="loader" alt="loader" />;
  }

  render() {
    let text = "Loading";

    if (this.props.text !== undefined) {
      text = this.props.text;
    }

    if (this.props.boxedIn !== undefined) {
      return (
        <div className={`${this.props.boxedIn} spinner-box`}>
          <div>
            {this.renderSpinnerImage()}
            <div className="spinner__text">
              <span> {text}</span>
            </div>
          </div>
        </div>
      );
    }
    if (this.props.fixed === true) {
      return (
        <div className="spinner-fixed">
          {this.renderSpinnerImage()}
          <div className="spinner__text">
            <span> {text}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="spinner">
        {this.renderSpinnerImage()}
        <div className="spinner__text">
          <span> {text}</span>
        </div>
      </div>
    );
  }
}
