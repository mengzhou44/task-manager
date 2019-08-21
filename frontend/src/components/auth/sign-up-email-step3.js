import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { renderField } from "../_common/render-field";

class SignUpEmailStep3 extends Component {
  onSubmit(props) {
    this.props.onNext({ ...this.props.signUpData, ...props });
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="sign-up__section">
          <div className="sign-up__field">
            <Field
              name="firstName"
              placeholder="First Name"
              component={renderField}
              type="text"
            />
          </div>
          <div className="sign-up__field">
            <Field
              name="lastName"
              placeholder="Last Name"
              component={renderField}
              type="text"
            />
          </div>

          <div className="sign-up__buttons">
            <button type="submit" className="btn-block">
              Next
            </button>

            <div className="u-height-2rem" />
            <button
              type="button"
              className="btn-block btn-secondary"
              onClick={() => this.props.onPrevious()}
            >
              Previous
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "First Name is required!";
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
  null
)(
  reduxForm({
    form: "sign-up-email-step3",
    validate,
    enableReinitialize: true
  })(withRouter(SignUpEmailStep3))
);
