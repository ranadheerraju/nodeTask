import axios from 'axios';
import { setAccessToken } from '../utils';

export const USER_LOGIN = 'USER_LOGIN'
export const USER_SIGNUP = 'USER_SIGNUP'
export const USER_DETAILS = 'USER_DETAILS'
export const UPDATE_USER_CURRENT_INTEGER = 'UPDATE_USER_CURRENT_INTEGER'
export const GOOGLE_OAUTH = 'GOOGLE_OAUTH'

export const putSignupDetails = data => async dispatch => {
    await axios.post('http://15.206.148.77/user/signup', data)
        .then((response) => {
            setAccessToken(response.data.token);
            dispatch({
                type: USER_SIGNUP,
                payload: response.data
            })
        }).catch((error) => {
            if (error.response.data.status === 409) {
                setAccessToken(error.response.data.token);
            }
            dispatch({
                type: USER_SIGNUP,
                payload: error.response.data
            })
        })
};

export const getUserDetails = token => async dispatch => {
    await axios.get('http://15.206.148.77/user/current', {
        headers: {
            'Authorization': token
        }
    }).then((response) => {
        dispatch({
            type: USER_DETAILS,
            payload: response.data
        })
    }).catch((error) => {
        dispatch({
            type: USER_DETAILS,
            payload: error.response.data
        })
    })
}

export const updateCurrentInteger = (data, token) => async dispatch => {
    await axios.put('http://15.206.148.77/user/update', data, {
        headers: {
            'Authorization': token
        }
    }).then((response) => {
        dispatch({
            type: UPDATE_USER_CURRENT_INTEGER,
            payload: response.data
        })
    }).catch((error) => {
        dispatch({
            type: UPDATE_USER_CURRENT_INTEGER,
            payload: error.response.data
        })
    })
};

export const oauthLogin = (data) => async dispatch => {
    await axios.post('http://15.206.148.77/user/signup', data)
        .then((response) => {
            setAccessToken(response.data.token);
            dispatch({
                type: GOOGLE_OAUTH,
                payload: response.data
            })
        }).catch((error) => {
            if (error.response.data.status === 409) {
                setAccessToken(error.response.data.token);
            }
            dispatch({
                type: GOOGLE_OAUTH,
                payload: error.response.data
            })
        })
}