import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { renderField } from "../_common/render-field";
import ImageZone from "../_common/image-zone";
import { validatePhone } from "../../_utils/phone-validator";

class SignUpEmailStep4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }
  onSubmit(props) {
    if (this.state.image !== null) {
      props = { ...props, image: this.state.image };
    }
    this.props.onNext({ ...this.props.signUpData, ...props });
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="sign-up__section">
          <div className="sign-up__field">
            <Field
              name="phone"
              placeholder="Phone"
              component={renderField}
              type="text"
            />
          </div>
          <div className="sign-up__field">
            <ImageZone
              text="Add your photo ..."
              onImageLoaded={image =>
                this.setState({
                  image
                })
              }
            />
          </div>

          <div className="sign-up__buttons">
            <button type="submit" className="btn-block">
              Sign Up
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
  if (!values.phone) {
    errors.phone = "Phone number is required!";
  } else if (validatePhone(values.phone) === false) {
    errors.phone = "Phone number is invalid!";
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
    form: "sign-up-email-step4",
    validate,
    enableReinitialize: true
  })(withRouter(SignUpEmailStep4))
);
