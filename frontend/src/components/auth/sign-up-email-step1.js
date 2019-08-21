import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import validator from "validator";

import httpService from "../../_utils/http-service";

import { renderField } from "../_common/render-field";
import * as actions from "../../actions";
import { toast } from "react-toastify";

class SignUpEmailStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: false
    };
  }

  onSubmit(props) {
    this.setState({
      verifying: true
    });
    this.props.sendEmailVerificationRequest(props.email, res => {
      if (res.success === true) {
        toast.success("We sent you an email verification.");
      } else {
        toast.error("Sorry, unable to send you an email verification.");
      }
    });
  }

  renderButtons() {
    if (this.state.verifying === false) {
      return (
        <div className="sign-up__buttons">
          <button type="submit" className="btn-block">
            Next
          </button>
          <div className="u-height-2rem" />
          <button
            type="type"
            className="btn-block btn-secondary"
            onClick={() => this.props.history.push({ pathname: "/sign-up" })}
          >
            Cancel
          </button>
        </div>
      );
    }

    return (
      <div className="sign-up__buttons">
        <span> Verifying ...</span>
      </div>
    );
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="sign-up__section">
          <div className="sign-up__field">
            <Field
              name="email"
              placeholder="Email"
              component={renderField}
              type="text"
            />
          </div>
          {this.renderButtons()}
        </div>
      </form>
    );
  }
}

const asyncValidate = values => {
  return httpService
    .post("/email", {
      email: values.email
    })
    .then(res => {
      if (res.status === 200 && res.data.existed === true) {
        throw { email: "Email is taken!" };
      }
    });
};

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!validator.isEmail(values.email)) {
    errors.email = "Email is invalid!";
  }

  return errors;
};

function mapStateToProps(state, props) {
  return {
    initialValues: props.data
  };
}

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    form: "sign-up-email-step1",
    validate,
    asyncValidate,
    asyncBlurFields: ["email"],
    enableReinitialize: true
  })(withRouter(SignUpEmailStep1))
);
