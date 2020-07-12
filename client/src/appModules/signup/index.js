import React from 'react';
import { TextField } from '@material-ui/core';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { putSignupDetails } from '../../actions/index';
import Google from '../oauth/gmailOauth';
import Logo from '../../assets/vasitumlogo.jpeg';
import { getAccessToken } from '../../utils';
import '../../scss/loginStyles.scss';
import '../../scss/layoutStyles.scss';

class Signup extends React.Component {

    state = {
        email: '',
        password: '',
        emailerrMsg: '',
        passworderrMsg: '',
        catchErrMsg: '',
    }

    componentDidMount() {
        if (getAccessToken()) {
            this.props.history.push('/me');
        }
    }

    navigateToSignup = () => {
        this.props.history.push('/');
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, emailerrMsg: '', passworderrMsg: '', catchErrMsg: '' });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.email === '' || this.state.password === '') {
            if (this.state.email === '') {
                this.setState({ emailerrMsg: 'Please enter your email' });
            } else if (this.state.password === '') {
                this.setState({ passworderrMsg: 'Please enter your password' });
            }
        } else {
            const newUser = {
                email: this.state.email,
                password: this.state.password,
                currentInteger: 0,
                ProviderId: 'Manual',
                status: "active"
            };
            await this.props.putSignupDetails(newUser);
            await this.setState({ catchErrMsg: this.props.signupDetailsRes && this.props.signupDetailsRes.message });
        }
    }

    render() {
        this.componentDidMount();

        return (
            <div className="login-maindiv">
                <div className="login-main-header-div">
                    <div className="login-header-div">
                        <img src={Logo} className="login-logo" />
                        <span className="login-header-title">Vasitum</span>
                    </div>
                    <button className="login-header-button" onClick={this.handleSubmit}>Join</button>
                </div>
                <span className="login-main-title">Welcome to Vasitum</span>
                <div className="login-subdiv">
                    <form method="post" className="login-formtag" onSubmit={this.handleSubmit}>
                        <span className="errormsg">{this.state.catchErrMsg}</span>
                        <TextField
                            id="outlined-name"
                            name="email"
                            placeholder="Email"
                            type="email"
                            className="textfield"
                            InputProps={{
                                className: "input-textfield"
                            }}
                            value={this.state.email}
                            onChange={(e) => this.handleOnChange(e)}
                            margin="normal"
                        />
                        <span className="errormsg">{this.state.emailerrMsg}</span>
                        <TextField
                            id="outlined-name"
                            name="password"
                            placeholder="Password"
                            type="password"
                            className="textfield"
                            InputProps={{
                                className: "input-textfield"
                            }}
                            value={this.state.password}
                            onChange={(e) => this.handleOnChange(e)}
                            margin="normal"
                        />
                        <span className="errormsg">{this.state.passworderrMsg}</span>
                        <button type="submit" className="login-button" onClick={this.handleSubmit}>Join</button>
                    </form>
                </div>
                <span className="login-or">Or</span>
                <div className="login-google-oauth">
                    <Google />
                </div>
            </div>
        )
    }
}

function mapStateToProps({ userReducer }) {
    return {
        signupDetailsRes: userReducer.userSignupData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            putSignupDetails: putSignupDetails,
        },
        dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);