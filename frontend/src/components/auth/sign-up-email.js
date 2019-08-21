import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Page from "../_common/page";
import * as actions from "../../actions";

import SignUpEmailStep1 from "./sign-up-email-step1";
import SignUpEmailStep2 from "./sign-up-email-step2";
import SignUpEmailStep3 from "./sign-up-email-step3";
import SignUpEmailStep4 from "./sign-up-email-step4";
import { redirectBack } from "../../_utils/sign-in-redirect";
import Spinner from "../_common/spinner";

class SignUpEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      signUpData: {}
    };
  }

  componentDidMount() {
    const { email } = this.props.storage;

    if (email !== undefined) {
      this.setState({
        step: 2,
        signUpData: {
          email
        }
      });

      this.props.removeStorageItem("email");
    }
  }
  renderStep() {
    if (this.state.showSpinner === true) {
      return <Spinner />;
    }

    switch (this.state.step) {
      case 1:
        return (
          <SignUpEmailStep1
            data={this.state.signUpData}
            onEmailEntered={email => {
              const signUpData = { email };
              this.setState({
                signUpData
              });
            }}
            onNext={props => {
              const signUpData = props;
              this.setState({
                signUpData,
                step: 2
              });
            }}
          />
        );

      case 2:
        return (
          <SignUpEmailStep2
            data={this.state.signUpData}
            onNext={props => {
              const signUpData = props;
              this.setState({
                signUpData,
                step: 3
              });
            }}
            onPrevious={() => {
              this.setState({
                step: 1
              });
            }}
          />
        );
      case 3:
        return (
          <SignUpEmailStep3
            data={this.state.signUpData}
            onNext={props => {
              const signUpData = props;
              this.setState({
                signUpData,
                step: 4
              });
            }}
            onPrevious={() => {
              this.setState({
                step: 2
              });
            }}
          />
        );

      case 4:
        return (
          <SignUpEmailStep4
            data={this.state.signUpData}
            onNext={props => {
              this.setState({ showSpinner: true });
              delete props.confirmPassword;
              this.props.signUp("email", props, res => {
                this.setState({ showSpinner: false });
                if (res.success === true) {
                  redirectBack(this.props.history);
                  toast.success("Sign up successful!");
                } else {
                  toast.error("Sign up failed!");
                }
              });
            }}
            onPrevious={() => {
              this.setState({
                step: 2
              });
            }}
          />
        );
      default:
        return <div />;
    }
  }
  render() {
    return (
      <div className="sign-up-box">
        <div className="sign-up">
          <div className="sign-up__title">Sign Up with Email</div>
          {this.renderStep()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ storage }) {
  return { storage };
}

export default connect(
  mapStateToProps,
  actions
)(Page(SignUpEmail));
