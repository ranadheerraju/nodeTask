import React from 'react';
import { connect } from "react-redux";
import { getUserDetails, updateCurrentInteger } from '../../actions/index';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import { withRouter } from 'react-router';
import Logo from '../../assets/vasitumlogo.jpeg';
import { removeToken, getAccessToken } from '../../utils';
import '../../scss/loginStyles.scss';
import '../../scss/layoutStyles.scss';
import { bindActionCreators } from 'redux';

class Dashboard extends React.Component {
    state = {
        nextInteger: 0,
        updateInteger: true,
        currentInteger: '',
        errMsg: ''
    }

    async componentDidMount() {
        await this.props.getUserDetails(getAccessToken());
        await this.setState({
            nextInteger: this.props.userDetailsRes.currentInteger + 1,
            currentInteger: this.props.userDetailsRes.currentInteger
        });
    }

    logout = async () => {
        await removeToken();
        await this.props.history.push('/');
    }

    handleOnChange = (e) => {
        this.setState({ currentInteger: e.target.value, errMsg: '' });
    }

    generatenextInteger = async (ci) => {
        await this.setState({ nextInteger: ci + 1 })
        await this.props.updateCurrentInteger({ currentInteger: this.state.nextInteger }, getAccessToken());
        await this.componentDidMount();
    }

    updateCurrentInteger = () => {
        this.setState({ updateInteger: !this.state.updateInteger });
    }

    handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!isNaN(this.state.currentInteger) && this.state.currentInteger >= 0) {
            await this.props.updateCurrentInteger({ currentInteger: this.state.currentInteger }, getAccessToken());
            await this.componentDidMount();
        } else {
            this.setState({ errMsg: "Please enter valid positive integer value" })
        }
    }

    render() {
        const { userDetailsRes } = this.props;
        const { updateInteger, nextInteger, currentInteger, errMsg } = this.state;
        if (userDetailsRes && userDetailsRes.message === 'Unauthorized') {
            removeToken();
            setTimeout(() => {
                this.props.history.push('/')
            }, 100);
        }

        return (
            <div>
                <div className="login-main-header-div">
                    <div className="login-header-div">
                        <img src={Logo} className="login-logo" />
                        <span className="login-header-title">Vasitum</span>
                    </div>
                    <div className="db-email-div">
                        <span className="user-email">{userDetailsRes.email}</span>
                        <LogoutIcon className="logout" onClick={this.logout} />
                    </div>
                </div>
                <div className="db-task-title-div">
                    <span className="db-task-title">Task title:</span>
                    <span className="db-task-main-title">Incrementing integers as a service</span>
                </div>
                <br /><hr className="db-hr" />
                <div className="db-ci-buttons-div">
                    <div className="db-ci-div">
                        <span className="db-ci-title">Current Integer:</span>
                        <form method="post" onSubmit={(e) => this.handleOnSubmit(e)} className="db-form-tag">
                            <input ty="text" className="db-ci-value"
                                value={updateInteger ? `${userDetailsRes.currentInteger}` : `${currentInteger}`}
                                disabled={updateInteger}
                                onChange={(e) => this.handleOnChange(e)}
                            />
                            {
                                updateInteger ? '' :
                                    <button type="submit" className="db-single-button db-next-integer-btn"
                                        onClick={(e) => this.handleOnSubmit(e)}>Update</button>
                            }
                        </form>
                    </div>

                    <div className="db-buttons">
                        <button className="db-single-button" onClick={() => this.updateCurrentInteger()}>
                            {
                                updateInteger ? "Update Integer" : "Undo Update Integer"
                            }
                        </button>
                    </div>
                </div>
                <span className="db-errormsg">{errMsg}</span>
                <div className="db-ci-buttons-div">
                    <div className="db-ci-div">
                        <span className="db-ci-title">Next Integer:</span>
                        <span className="db-ci-value">{nextInteger}</span>
                    </div>
                    <div className="db-buttons">
                        <button className="db-single-button"
                            onClick={() => this.generatenextInteger(userDetailsRes.currentInteger)}>Generate Next Integer</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ userReducer }) {
    return {
        userDetailsRes: userReducer.userDetails,
        updateUserCurrentIntegerDetailsRes: userReducer.updateUserCurrentIntegerDetails
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserDetails: getUserDetails,
        updateCurrentInteger: updateCurrentInteger
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));