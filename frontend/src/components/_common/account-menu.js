import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import * as actions from "../../actions";
import { redirectBack } from "../../_utils/sign-in-redirect";
import styles from "./account-menu.module.scss";

class AccountMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    if (window.location.pathname.startsWith("/account") === true) {
      this.setState({
        isOpen: true
      });
    }
  }

  closeMenu() {
    this.setState({ isOpen: false });
    redirectBack(this.props.history);
  }

  renderContent() {
    return (
      <div
        className={styles.contentBox}
        onClick={() => this.closeMenu()}
      >
        <div
          className={styles.content}
          onClick={e => e.stopPropagation()}
        >
          <div className={styles.profile}>
            <img src={this.props.profile.picture} alt="profile" />
            <div>{this.props.profile.email}</div>
          </div>
          <button
            className={styles.signOut}
            onClick={() => {
              this.props.signOut(res => {
                if (res.success === true) {
                  this.setState({ isOpen: false });
                  toast.success("Sign out successfully!");
                  this.props.history.push({ pathname: "/" });
                } else {
                  toast.error(res.message);
                }
              });
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.isOpen === false) {
      return (
        <div className={styles.containerClosed}>
          <img
            src={this.props.profile.picture}
            alt="profile display"
            onClick={() => {
              this.setState({ isOpen: true });
              localStorage.setItem("sourcePath", window.location.pathname);
            }}
          />
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div
          className={styles.closeIcon}
          onClick={() => this.closeMenu()}
        >
          <img src="/images/SVG/cross.svg" alt="close" />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated,
    profile: auth.profile
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(AccountMenu));
