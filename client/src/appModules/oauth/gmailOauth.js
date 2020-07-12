import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import { connect } from "react-redux";
import { oauthLogin } from '../../actions/index';
import { withRouter } from 'react-router';
import { getAccessToken } from '../../utils';
import { bindActionCreators } from 'redux';

class GoogleOauthLogin extends Component {


    componentDidMount() {
        if (getAccessToken()) {
            this.props.history.push('/me');
        }
    }

    signup(res) {
        const googleresponse = {
            name: res.profileObj.name,
            email: res.profileObj.email,
            password: "123456",
            currentInteger: 0,
            ProviderId: 'Google',
            status: "active",
        };
        this.props.oauthLogin(googleresponse);
    };

    render() {
        this.componentDidMount();

        const responseGoogle = (response) => {
            var res = response.profileObj;
            this.signup(response);
        }

        return (
            <div>
                <GoogleLogin
                    clientId="868436562399-ckha6tq6n2fvlo1f1nvtarakhcof2uml.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                ></GoogleLogin>
            </div>
        )
    }
}

function mapStateToProps({ userReducer }) {
    return {
        oauthuserLoginRes: userReducer.oauthuserLogin,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        oauthLogin: oauthLogin,
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoogleOauthLogin));