import React, { Component } from "react";

import { connect } from "react-redux";

import * as actions from "../../actions";

import Page from "../_common/page";
import Spinner from "../_common/spinner";
import { toast } from "react-toastify";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { showSpinner: false };
  }

  componentDidMount() {
 
    if (
      this.props.token === null ||
      this.props.token === "" ||
      this.props.email === null ||
      this.props.email === ""
    ) {
      this.props.history.push({ pathname: "/" });
      toast.error("Sorry, this link is not valid!");
    } else {
      this.setState({ showSpinner: true });
      this.props.verifyEmail(
         {
          token: this.props.token,
          email: this.props.email
        },
        res => {
        
          this.setState({ showSpinner: false });

          if (res.success === true) {
            this.props.setStorageItem("email", this.props.email);
            toast.success("Thank You, your email is verified.");
            this.props.history.push({ pathname: "/sign-up/email" });
          } else {
            this.props.history.push({ pathname: "/" });
            toast.error("Sorry, email verification failed.");
          }
        }
      );
    }
  }

  renderSpinner() {
    if (this.state.showSpinner === true) {
      return <Spinner text="Verifying email ..." />;
    }
  }

  render() {
    return <div className="verify-email">{this.renderSpinner()}</div>;
  }
}

function mapStateToProps(state, props) {
  return {
    email: props.match.params.email || null,
    token: props.match.params.token || null
  };
}

export default connect(
  mapStateToProps,
  actions
)(Page(VerifyEmail));
