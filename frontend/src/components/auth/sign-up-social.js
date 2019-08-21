import React, { Component } from "react";
import { connect } from "react-redux";

import { redirectBack } from "../../_utils/sign-in-redirect";
import * as actions from "../../actions";
import Page from "../_common/page";
import { isPhoneValid } from "../../_utils/validator";
import { toast } from "react-toastify";

class SignUpSocial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ""
    };
  }


  componentDidMount() {
    if (this.props.authenticated=== true) {
         this.props.history.push({pathname: "/"})
    }
}

  onSubmit() {
    if (isPhoneValid(this.state.phone) === false) {
      toast.error("Phone number is invalid.");
    } else {

      this.props.signUp(
        "social",
        {
        ...this.props.signUpData,
        phone: this.state.phone
       }, res => {
        if (res.success === true) {
          redirectBack(this.props.history);
          toast.success("Sign up successfully.");
        
        } else {
          toast.error("Sorry, sign up failed!");
        }
      });
    }
  }

  render() {
    return (
      <div className="signup-box">
        <div className="signup">
          <img
            className="signup__close"
            src="/images/SVG/cross.svg"
            alt="close"
            onClick={() => redirectBack(this.props.history)}
          />

          <div className="signup__title">Sign Up</div>

          <div className="signup__section">
            <div className="input-field">
              <input
                className="input"
                type="text"
                value={this.state.phone}
                onChange={e => this.setState({ phone: e.target.value })}
              />
              <span className="input-label">Phone</span>
            </div>
          </div>
          <div className="signup__section">
            <div className="signup__buttons">
              <button
                className="singup__button"
                onClick={() => this.onSubmit()}
              >
                Sign Up
              </button>
              <button
                className="singup__button  signup__cancel_button"
                onClick={() => redirectBack(this.props.history)}
              >
                Cancel
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
)(Page(SignUpSocial));

 
 
 