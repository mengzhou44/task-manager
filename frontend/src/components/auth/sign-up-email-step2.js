import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { renderField } from "../_common/render-field";
import * as actions from "../../actions";

class SignUpEmailStep2 extends Component {
  onSubmit(props) {
    this.props.onNext({...this.props.signUpData, ...props});
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="sign-up__section">
          
          <div className="sign-up__field">
            <Field
              name="password"
              placeholder="Password"
              component={renderField}
              type="password"
            />
          </div>
          <div className="sign-up__field">
            <Field
              name="confirmPassword"
              placeholder="Confirm"
              component={renderField}
              type="password"
            />
          </div>
          <div className="sign-up__buttons">
            <button type="submit" className="btn-block">
              Next
            </button>
            <div className='u-height-2rem' />
            <button
              type="type"
              className="btn-block btn-secondary"
              onClick={() => {
                this.props.removeItem("email");
                this.props.history.push({ pathname: "/sign-up" });
               }} 
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}



 
const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 6) {
    errors.password = "Password minimum length is 6";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Password confirm is required!";
  } else if (values.confirmPassword.length < 6) {
    errors.confirmPassword = "Password confirm minimum length is 6.";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password and confirm do not match.";
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
    form: "sign-up-email-step2",
    validate,
    asyncBlurFields: ["email"],
    enableReinitialize: true
  })(withRouter(SignUpEmailStep2))
);
