import React, { Component } from "react";

import { connect } from "react-redux";
import { toast } from "react-toastify";

import validator from "validator";
import * as actions from "../../actions";

import Page from "../_common/page";
import Spinner from "../_common/spinner";

import styles from   "./forgot-password.module.scss";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", showSpinner: false };
  }
  render() {
    if (this.state.showSpinner === true) {
      return <Spinner fixed />;
    }

    return (
      <div>
        <div className={styles.content}>
          <img
            className={styles.close}
            src="/images/SVG/cross.svg"
            alt="close"
            onClick={() => this.props.history.push({ pathname: "/" })}
          />

          <div>
            <h3> Forgot Password?</h3>
            <p>Please enter your email address to request a password reset.</p>
          </div>

          <div className="section">
            <div className="input-field">
              <input
                type="text"
                className="input"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <span className="input-label">EMAIL ADDRESS</span>
            </div>

            <button
              className="btn-block"
              onClick={() => {
                if (validator.isEmail(this.state.email) === false) {
                  toast.error("Email address is invalid!");
                } else {
                  this.setState({ showSpinner: true });
                  this.props.forgotPassword(this.state.email, res => {
                    this.setState({ showSpinner: false });
                    if (res.success === true) {
                      toast.success(
                        "Password reset link was sent to your email."
                      );
                      this.setState({ email: "" });
                    } else {
                      toast.error("Password reset failed.");
                    }
                  });
                }
              }}
            >
              Send Me Password Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Page(ForgotPassword));
