import React, { Component } from "react";
import { connect } from "react-redux";

import { redirectBack } from "../../_utils/sign-in-redirect";
import * as actions from "../../actions";
import Page from "../_common/page";
import SocialAuth from "./social-auth";
import { isPhoneValid } from "../../_utils/validator";
import { toast } from "react-toastify";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ""
    };
  }

  componentDidMount() {
    if (this.props.authenticated === true) {
      this.props.history.push({ pathname: "/" });
    }
  }

  onSubmit() {
    if (isPhoneValid(this.state.phone) === false) {
      toast.error("Phone number is invalid.");
    } else {
      this.props.signUp(
        {
          ...this.props.signUpData,
          phone: this.state.phone
        },
        res => {
          if (res.success === true) {
            redirectBack(this.props.history);
            toast.success("Sign up successfully.");
          } else {
            toast.error("Sorry, sign up failed!");
          }
        }
      );
    }
  }

  render() {
    return (
      <div className="sign-up-box">
        <div className="sign-up">
          <img
            className="sign-up__close"
            src="/images/SVG/cross.svg"
            alt="close"
            onClick={() => redirectBack(this.props.history)}
          />

          <div className="sign-up__title">Sign Up</div>

          <div className="sign-up__section">
            <SocialAuth />
          </div>

          <div className="or">Or</div>
          <div className="sign-up__section">
          <div className="sign-up__field">
            <button
              className="btn-sign-up"
              onClick={() =>
                this.props.history.push({ pathname: "/sign-up/email" })
              }
            >
              Sign Up with Email
            </button>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated,
    signUpData: auth.signUpData
  };
}

export default connect(
  mapStateToProps,
  actions
)(Page(SignUp));
