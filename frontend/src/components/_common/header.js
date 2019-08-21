import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AccountMenu from "./account-menu";

import styles from "./header.module.scss";

class Header extends Component {
  renderHeaderContent() {
    if (this.props.authenticated === false) {
      return (
        <div className={styles["auth"]}>
          <button
            className={styles["btn-sign-in"]}
            onClick={() => this.props.history.push("/sign-in")}
          >
            Sign In
          </button>

          <button
              className={styles["btn-sign-up"]}
            onClick={() => this.props.history.push("/sign-up")}
          >
            Sign Up
          </button>
        </div>
      );
    }

    return <AccountMenu />;
  }

  render() {
    return (
      <header>
        <div className={styles["title"]}>Task Manager</div>

        <div className={styles["content"]}>{this.renderHeaderContent()}</div>
      </header>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated
  };
}
export default connect(
  mapStateToProps,
  null
)(withRouter(Header));
