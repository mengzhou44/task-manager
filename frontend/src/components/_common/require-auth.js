import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export default function (ComposedComponent) {
    class Auth extends Component {

        componentWillMount() {

            if (this.props.authenticated === false) {

                this.props.history.push('/');
            }
        }

        componentWillUpdate(nextProps) {

            if (nextProps.authenticated === false) {

                this.props.history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps({ auth }) {

        return {
            authenticated: auth.authenticated
        }
    }

    return connect(mapStateToProps)(withRouter(Auth));
}