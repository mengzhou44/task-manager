import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Page from "../_common/page";
import SocialAuth from "./social-auth";
import {
  redirectBack,
  redirectAfterSignIn
} from "../../_utils/sign-in-redirect";
import { renderField } from "../_common/render-field";
import * as actions from "../../actions";
import Spinner from "../_common/spinner";
import styles from "./sign-in.module.scss";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { showSpinner: false };
  }
  componentDidMount() {
    if (this.props.authenticated === true) {
      this.props.history.push({ pathname: "/" });
    }
  }

  renderSignInButton() {
    if (this.state.showSpinner === true) {
      return <Spinner text="" />;
    }

    return (
      <button type="submit" className={styles["btn-block"]}>
        Sign In
      </button>
    );
  }

  onSubmit(props) {
    const account = { ...props };
    this.setState({ showSpinner: true });
    this.props.signIn("email", account, res => {
      this.setState({ showSpinner: false });
      if (res.success === false) {
        toast.error("Sorry, sign in failed!");
      } else {
        redirectAfterSignIn(this.props.history);
        if (window.signInSuccess !== undefined) {
          window.signInSuccess.executeAfterSignIn(res.profile);
          delete window.signInSuccess;
        }
        toast.success("Sign in successful.");
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className={styles.container}>
        <div  className={styles.content}>
          <div className={styles.title}>Sign In</div>

          <img
            className={styles["close-icon"]}
            src="/images/SVG/cross.svg"
            alt="close"
            onClick={() => redirectBack(this.props.history)}
          />
          <SocialAuth />

          <div className={styles.or}>Or</div>

          <div className={styles.section}>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className={styles.field}>
                <Field
                  name="email"
                  placeholder="Email"
                  component={renderField}
                  type="text"
                />
              </div>

              <div className={styles.field}>
                <Field
                  name="password"
                  component={renderField}
                  placeholder="Password"
                  type="password"
                />
              </div>

              <div className={styles.field}>{this.renderSignInButton()}</div>

              <Link className={styles["forget-password"]} to="/password/forgot">
                Forgot your password?
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required!";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  }

  return errors;
};

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated
  };
}

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    form: "signin-form",
    validate
  })(Page(SignIn))
);
