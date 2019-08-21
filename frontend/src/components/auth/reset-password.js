import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import { toast } from 'react-toastify';

import Page from '../_common/page';
import * as actions from '../../actions';
 
import styles from './reset-password.module.scss';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = { password1: '', password2: '' };
    }

    render() {
        return (<div className={styles["reset-password-box"]}>
            <div className='reset-password'>
                <h3 className='reset-password__title'>
                      Reset Your Password
                </h3>

                <div className='input-field' >
                    <input
                        type='password'
                        className='input'
                        value={this.state.password1}
                        onChange={e => this.setState({ password1: e.target.value })}
                    />
                    <span className='input-label'>
                         New Password
                    </span>
                </div>


                <div className='input-field' >
                    <input
                        type='password'
                        className='input'
                        value={this.state.password2}
                        onChange={e => this.setState({ password2: e.target.value })}
                    />
                    <span className='input-label'>
                        Re-enter New Password
                    </span>
                </div>


                <button
                    className='btn-block'
                    onClick={() => {
                        if (this.state.password1 !== this.state.password2) {
                            toast.error("Passwords do not match, please try again.");

                        } else if (this.state.password1.length < 6) {
                            toast.error("Password must be at least 6 characters long.");
                        } else {
                            this.props.resetPassword({
                                token: this.props.token,
                                newPassword: this.state.password1
                            },  (res) => {
                                if (res.success === true) {
                                    toast.success("Your password has been reset successfully!");
                                    setTimeout(() => {
                                        this.props.history.push({ pathname: '/sign-in' })
                                    }, 2000)
                                } else {
                                    toast.error("Sorry, password reset failed.");
                                }
                            });
                        }
                    }}
                >
                    Reset Password
                </button>

            </div>


        </div>);
    }
}

function mapStateToProps(state, props) {
    return {
        token: props.match.params.token || null
    }
}


export default connect(mapStateToProps, actions)(Page(ResetPassword));
 