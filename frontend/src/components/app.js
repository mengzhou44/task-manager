import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import requireAuth from "./_common/require-auth";

import Home from "./home/home";
import SignIn from "./auth/sign-in";
import SignUp from "./auth/sign-up";
import SignUpSocial from "./auth/sign-up-social";
import SignUpEmail from "./auth/sign-up-email";
import VerifyEmail from "./auth/verify-email";
import ForgotPassword from "./auth/forgot-password";
import ResetPassword from "./auth/reset-password";

import Tasks from "./tasks/tasks";

import { history } from "../_utils/history";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="u-full-height">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/sign-up/social" component={SignUpSocial} />
            <Route exact path="/sign-up/email" component={SignUpEmail} />
            <Route
              exact
              path="/email/verify/:email?/:token?"
              component={VerifyEmail}
            />

            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route
              exact
              path="/password/reset/:token"
              component={ResetPassword}
            />

            <Route exact path="/tasks" component={requireAuth(Tasks)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
