import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { withRouter } from "react-router";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import * as actions from "../../actions";

import { redirectAfterSignIn } from "../../_utils/sign-in-redirect";
import styles from "./social-auth.module.scss";

class SocialAuth extends Component {
  responseGoogleSuccess = response => {
    const email = response.profileObj.email;
    this.onEmailValidated(email, {
      providerType: "google",
      providerToken: response.tokenId
    });
  };

  responseFacebook = response => {
    const email = response.email;
    this.onEmailValidated(email, {
      providerType: "facebook",
      providerToken: response.accessToken
    });
  };

  onEmailValidated(email, authResponse) {
    this.props.checkEmailExists(email, response => {
      if (response.success === false) {
        toast.error("Error occured when checking email exists...");
      } else {
        if (response.existed === true) {
          this.props.signIn("social", authResponse, res => {
            if (res.success === false) {
              toast.error("Sorry, sign in failed.");
            } else {
              redirectAfterSignIn(this.props.history);
              if (window.signInSuccess !== undefined) {
                window.signInSuccess.executeAfterSignIn(res.profile);
                delete window.signInSuccess;
              }
              toast.success("Sign in successful");
            }
          });
        } else {
          this.props.setSignUpData(authResponse);
          let pathname = `/sign-up/social`;
          this.props.history.push({ pathname });
        }
      }
    });
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.field}>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            fields="name,email,picture"
            disableMobileRedirect
            callback={this.responseFacebook}
            render={renderProps => (
              <button
                className={`${styles["btn-facebook"]} ${styles["btn-block"]}`}
                onClick={renderProps.onClick}
              >
                <img
                  className={styles["btn-facebook__image"]}
                  alt="facebook logo"
                  src="/images/SVG/facebook.svg"
                />
                <span>Continue with Facebook</span>
              </button>
            )}
          />
        </div>
        <div className={styles.field}>
          <GoogleLogin
            className={styles["btn-google"]}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={this.responseGoogleSuccess}
            onFailure={e => {
              toast.error("Google auth error");
            }}
          >
            <div className={styles["btn-google__content"]}>
              <img
                className={styles["btn-google__image"]}
                alt="google logo"
                src="/images/google.png"
              />
              <span>Continue With Google</span>
            </div>
          </GoogleLogin>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withRouter(SocialAuth));
